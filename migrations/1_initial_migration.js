const Crowdfunding = artifacts.require("crowdfunding");

module.exports = function (deployer) {
  deployer.deploy(Crowdfunding);
};
