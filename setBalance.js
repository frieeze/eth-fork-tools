const chalk = require("chalk").bold;
const { getTestProvider, getProvider } = require("./utils/provider");
const { envRPC } = require("./utils/constants");
const { formatEther, parseEther } = require("viem");

const addresses = [
  "0x3Dbf0047dd16BfEC26b18419be6F36382e383852",
  "0x45F34f0fda6E059116A5ac7333e9aD0Ca3b19ED6",
  "0x9Efd10736EFf4D95fEe7d1a494B37850AE9dcB5F",
];
const balance = parseEther("1000");

async function setBalance(address) {
  console.log("setting balance for", chalk.yellow(address));
  const testClient = getTestProvider(envRPC);
  const provider = getProvider(envRPC);

  console.log("connecting to:", chalk.yellow(envRPC));
  await testClient.setBalance({
    address,
    value: balance,
  });
  console.log("balance set to", chalk.cyan(`${formatEther(balance)}Ξ`));
  const userBalance = await provider.getBalance({ address });

  if (userBalance !== balance) {
    throw new Error(
      `balance not set correctly, read: ${formatEther(userBalance)}`
    );
  }

  console.log(chalk.green("done"));
}

async function run() {
  addresses.forEach(async (address) => await setBalance(address));
}

if (require.main === module) {
  run();
}
