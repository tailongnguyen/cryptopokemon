pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Auction.sol";

contract TestAuction {
    Auction auction = Auction(DeployedAddresses.Auction());
    event TestValue(uint256 indexed value);
    event TestAddress(address indexed add);
    function testConstruction() public {
        uint256 reGains;
        uint256 reFirstPrice;
        uint256 reReversePrice;
        uint256 reEndingTime;
        uint256 reUnits;
        uint256 reCurrentPrice;
        bytes32 reName;
        uint256 reNow;
        (reNow, reEndingTime, reFirstPrice, reReversePrice, reGains, reUnits, reCurrentPrice, reName) = auction.getVariables();
        Assert.equal(reGains, 0, "Initial gains should be zero!");
        Assert.equal(reFirstPrice, 100000, "First price should be 100000!");
        Assert.equal(reName, "mypie", "Name should be mypie!");
        Assert.equal(reReversePrice, 1000, "Reverse price should be 1000!");
        Assert.equal(reUnits, 3, "Units should be 3!");
        Assert.equal(reCurrentPrice, 100000, "Current price should be 100000!");
        (reNow, reEndingTime, reFirstPrice, reReversePrice, reGains, reUnits, reCurrentPrice, reName) = auction.getVariables();
        auction.lower(1611);
        Assert.equal(reCurrentPrice, 1611, "Now current price should be 1611!");
    }

    function testAssets() public {
        uint256 returned = auction.getAssetsInfo(msg.sender);
        TestAddress(msg.sender);
        TestValue(returned);
        Assert.equal(returned, 3, "Beneficiary should have 3 units of asset!");
    }

    // function testLower() public {
    //     // address bidder = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";
    //     auction.lower(1611);
    //     uint256 current = auc
    // }
}