const { createPublicClient, createTestClient, http } = require('viem');
const { mainnet, foundry } = require('viem/chains');

function getTestProvider(rpc) {
  return createTestClient({
    chain: mainnet,
    mode: 'hardhat',
    transport: http(rpc),
  });
}

function getProvider(rpc) {
  return createPublicClient({
    chain: mainnet,
    transport: http(rpc),
  });
}

module.exports = {
  getTestProvider,
  getProvider,
};
