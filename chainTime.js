const { getProvider } = require('./utils/provider');
const { envRPC } = require('./utils/constants');

const getChainTime = async (rpc) => {
  if (!rpc) throw new Error('No RPC provided');

  const provider = getProvider(rpc);
  return provider.getBlock().then((block) => Number(block.timestamp));
};

async function run() {
  const timestamp = await getChainTime(envRPC);
  console.log('timestamp: ', timestamp);

  const date = new Date(timestamp * 1000);
  console.log(date.toUTCString());
}

if (require.main === module) run();

module.exports = {
  getChainTime,
  run,
};
