const {
  createPublicClient,
  createTestClient,
  http,
  createWalletClient,
} = require("viem");
const { mainnet } = require("viem/chains");
const { toAccount } = require("viem/accounts");

function getTestProvider(rpc) {
  return createTestClient({
    chain: mainnet,
    mode: "hardhat",
    transport: http(rpc),
  });
}

function getProvider(rpc) {
  return createPublicClient({
    chain: mainnet,
    transport: http(rpc),
  });
}

function getWalletClient(rpc, address) {
  return createWalletClient({
    chain: mainnet,
    transport: http(rpc),
    account: address,
  });
}

module.exports = {
  getTestProvider,
  getProvider,
  getWalletClient,
};
