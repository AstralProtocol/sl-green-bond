var SmartGreenBond = artifacts.require("./GreenBond.sol");

module.exports = function (deployer) {
  deployer.deploy(SmartGreenBond);

  console.log("Gravity deployed at:", SmartGreenBond.address);
};
