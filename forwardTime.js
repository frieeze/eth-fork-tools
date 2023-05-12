const { getTestProvider } = require('./utils/provider');
const { secPerWeek, envRPC } = require('./utils/constants');
const { getChainTime } = require('./chainTime');

async function faster_maurice(rpc, seconds) {
  const testProvider = getTestProvider(rpc);

  let chainTs = await getChainTime(rpc);
  console.log(
    'Previous time:  ',
    chainTs,
    '    ',
    new Date(chainTs * 1000).toUTCString(),
  );

  await testProvider.increaseTime({
    seconds,
  });
  await testProvider.mine({
    blocks: 1,
  });

  chainTs = await getChainTime(rpc);
  console.log(
    'New time:       ',
    chainTs,
    '    ',
    new Date(chainTs * 1000).toUTCString(),
  );
}

if (require.main === module) {
  faster_maurice(envRPC, secPerWeek * 4);
}
