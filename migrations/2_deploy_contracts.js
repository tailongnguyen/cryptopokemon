var Auction = artifacts.require("Auction");

module.exports = function (deployer) {
    deployer.deploy(Auction, 'mypie', 3000, 3, 100000, 1000);
};