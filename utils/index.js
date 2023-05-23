const { formatEther } = require("viem");

function prettierNumber(num) {
  return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "_");
}

function prettierEthers(eth) {
  return prettierNumber(formatEther(eth));
}

module.exports = {
  prettierEthers,
};
