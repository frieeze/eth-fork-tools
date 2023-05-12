require('dotenv').config();

const envRPC = process.env.ETH_FORK_TOOLS_RPC;

const secPerWeek = 7 * 24 * 60 * 60;

module.exports = {
  secPerWeek,
  envRPC,
};
