var SmartGreenBond = artifacts.require("./SmartGreenBond.sol");
// var Oracle = artifacts.require("./oracle/Oracle.sol");

module.exports = async function (deployer) {
  await deployer.deploy(
    SmartGreenBond,
    "First bond",
    "10000000000000000",
    0,
    3,
    10,
    100,
    10,
    100,
    "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"
  );
  // deployer.deploy(Oracle);

  const smartGreenBondContract = await SmartGreenBond.deployed();

  console.log("Smart Green bond deployed at:", smartGreenBondContract.address);
};
