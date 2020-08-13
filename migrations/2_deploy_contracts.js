var SmartGreenBond = artifacts.require("./SmartGreenBond.sol");
var Oracle = artifacts.require("./oracle/Oracle.sol");

module.exports = async function (deployer) {
  await deployer.deploy(
    SmartGreenBond,
    "First bond",
    100,
    18,
    5,
    40000,
    10000,
    100,
    100
  );
  deployer.deploy(Oracle);

  const smartGreenBondContract = await SmartGreenBond.deployed();

  console.log("Smart Green bond deployed at:", smartGreenBondContract.address);
};
