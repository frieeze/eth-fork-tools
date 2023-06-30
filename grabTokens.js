const { parseEther, isAddress } = require("viem");
const chalk = require("chalk").bold;

const ERC20ABI = require("./abi/erc20");

const { envRPC } = require("./utils/constants");
const { prettierEthers } = require("./utils");
const { getWalletClient, getTestProvider } = require("./utils/provider");

const address = "0x3Dbf0047dd16BfEC26b18419be6F36382e383852";

const tokens = [
  {
    symbol: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    from: "0x60FaAe176336dAb62e284Fe19B885B095d29fB7F",
    amount: parseEther("35000000"),
  },
  // {
  //   symbol: "CRV",
  //   address: "0xD533a949740bb3306d119CC777fa900bA034cd52",
  //   from: "0xF977814e90dA44bFA03b6295A0616a897441aceC",
  //   amount: parseEther("35000000"),
  // },
  // {
  //   symbol: "AURA",
  //   address: "0xC0c293ce456fF0ED870ADd98a0828Dd4d2903DBF",
  //   from: "0xBB19053E031D9B2B364351B21a8ed3568b21399b",
  //   amount: parseEther("100000"),
  // },
  // {
  //   symbol: "CVX",
  //   address: "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B",
  //   from: "0x15A5F10cC2611bB18b18322E34eB473235EFCa39",
  //   amount: parseEther("200000"),
  // },
];

async function grabToken(token) {
  if (!isAddress(token.address) || !isAddress(token.from) || !token.amount)
    throw new Error("invalid token");

  console.log(
    "transfering",
    chalk.bold.cyan(`${prettierEthers(token.amount)} ${token.symbol}`)
  );
  console.log("from", chalk.yellow(token.from));

  const testClient = getTestProvider(envRPC);
  await testClient.setBalance({
    address: token.from,
    value: parseEther("1000"),
  });
  try {
    await testClient.impersonateAccount({ address: token.from });
    const walletClient = getWalletClient(envRPC, token.from);

    await walletClient.writeContract({
      address: token.address,
      abi: ERC20ABI,
      functionName: "transfer",
      args: [address, token.amount],
    });
  } catch (e) {
    console.error(e);
  } finally {
    await testClient.stopImpersonatingAccount({ address: token.from });
  }

  console.log(chalk.green("done"));
}

async function run() {
  console.log("using rpc:", chalk.yellow(envRPC));
  console.log("receiver:", chalk.yellow(address));
  for (const token of tokens) {
    await grabToken(token);
  }
}

if (require.main === module) {
  run();
}
