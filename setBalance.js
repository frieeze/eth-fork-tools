const chalk = require('chalk').bold;
const { getTestProvider, getProvider } = require('./utils/provider');
const { envRPC } = require('./utils/constants');
const {formatEther, parseEther} = require('viem');

const address = "0x3Dbf0047dd16BfEC26b18419be6F36382e383852"
const balance = parseEther('100')

async function run() {
    console.log('setting balance for', chalk.yellow(address))
    const testClient = getTestProvider(envRPC);
    const provider = getProvider(envRPC);

    console.log("connecting to:", chalk.yellow(envRPC))
    await testClient.setBalance({ 
        address,
        value: balance
      })
    console.log('balance set to', chalk.cyan(`${formatEther(balance)}Ξ`))
    const userBalance = await provider.getBalance({address});

    if (userBalance !== balance) {
        throw new Error(`balance not set correctly, read: ${formatEther(userBalance)}`);
    }

    console.log(chalk.green('done'));
}

if (require.main === module) {
    run();
  }
  