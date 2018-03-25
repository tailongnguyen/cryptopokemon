pragma solidity ^0.4.18;
// pragma experimental ABIEncoderV2;

// 0xe3a0ec5cb60318a00ff9efc6371cfcdb836bbcf2
contract Ethauction {

    struct WinningInfo {
        uint256 units;
        uint256 bid;
        uint256 change;
    }

    struct Auction {
        address[]   winners;
        address     beneficiary;
        bytes32     assetName;
        uint256     units;
        uint256     firstPrice;
        uint256     reversePrice;
        uint256     endingTime;
        uint256     currentPrice; 
        uint256     totalGains;
        bool        ended;
        mapping (address => uint256)        assetsInfo;
        mapping (address => WinningInfo)    winnerInfo;
    }

    uint256 public creationFee;
    mapping (bytes32 => uint256) public auctionNames;
    Auction[] public auctions;

    modifier onlyBefore(uint _time) {require(now < _time); _;}
    modifier onlyAfter(uint _time) {require(now > _time); _;}

    // Events that will be fired on changes.
    event PriceDecreased(uint256 idx, uint256 amount);
    event AuctionCreated(uint256 idx, bytes32 name, address beneficiary);
    event UnitsDecreased(uint256 idx, uint256 units, address winner);
    event AuctionEnded(uint256 idx, address beneficiary, bytes32 assetname, address[] winners);

    /// Initiate the contracts.
    function Ethauction (uint256 _creationFee) public {
        require(_creationFee > 0);
        creationFee = _creationFee;
    }

    /// Create a new auction.
    function createAuction (
        bytes32 _name,
        uint256 _biddingTime, 
        uint256 _units, 
        uint256 _firstPrice, 
        uint256 _reversePrice ) 
    public payable {
        require(msg.value >= creationFee);
        require(_biddingTime > 0);
        require(_firstPrice > _reversePrice);
        require(_units > 0);

        Auction memory newAuction;
        newAuction.assetName = _name;
        newAuction.endingTime = now + _biddingTime;
        newAuction.beneficiary = msg.sender;
        newAuction.units = _units;
        newAuction.firstPrice = _firstPrice;
        newAuction.currentPrice = _firstPrice;
        newAuction.reversePrice = _reversePrice;
        auctions.push(newAuction);
        auctions[auctions.length - 1].assetsInfo[msg.sender] = _units;
        auctionNames[_name] = auctions.length - 1;
        AuctionCreated(auctions.length - 1, _name, msg.sender);
    }
    
    function getAuctionsCount() public view returns (uint256) {
        return auctions.length;
    }

    function getTimeInfo (uint256 idx) public view returns (bool, uint256, uint256) {
        return (auctions[idx].ended, now, auctions[idx].endingTime);
    }

    function getPriceInfo (uint256 idx) public view returns (uint256, uint256 , uint256){
        return (auctions[idx].firstPrice, auctions[idx].reversePrice, auctions[idx].currentPrice);
    }

    function getVariables (uint256 idx) public view returns 
        ( 
            uint256, 
            uint256, 
            bytes32, 
            address, 
            address[]) {
        require(idx < auctions.length);
        return (
            auctions[idx].units, 
            auctions[idx].totalGains, 
            auctions[idx].assetName, 
            auctions[idx].beneficiary, 
            auctions[idx].winners);
    }

    function getWinnerInfo(address add, bytes32 name) public view returns (uint256, uint256, uint256){
        uint256 idx = auctionNames[name];
        WinningInfo inf = auctions[idx].winnerInfo[add];
        return (inf.units, inf.bid, inf.change);
    }

    function getAssetsInfo (address add, bytes32 name) public view returns (uint256) {
        uint256 idx = auctionNames[name];
        return auctions[idx].assetsInfo[add];
    }
    
    function getAssetsInfoByIdx(uint256 idx, address add) public view returns (uint256) {
        return auctions[idx].assetsInfo[add];
    }

    /// Make the deal with the current price.
    function bid(uint256 idx, uint256 numberOfUnits) public payable onlyBefore(auctions[idx].endingTime) {
        require(auctions[idx].units >= numberOfUnits);
        require(msg.value >= auctions[idx].currentPrice * numberOfUnits);

        auctions[idx].winners.push(msg.sender);
        auctions[idx].winnerInfo[msg.sender].units = numberOfUnits;
        auctions[idx].winnerInfo[msg.sender].bid = auctions[idx].currentPrice;
        auctions[idx].winnerInfo[msg.sender].change += msg.value - (auctions[idx].currentPrice * numberOfUnits);
        auctions[idx].units -= numberOfUnits;
        auctions[idx].totalGains += auctions[idx].currentPrice * numberOfUnits;
        UnitsDecreased(idx, auctions[idx].units, msg.sender);
        if (auctions[idx].units == 0) {
            auctionEnd(idx);
        }
    }

    /// Lower the current price. 
    /// Only beneficiary can call this function.
    function lower(uint256 idx, uint256 price) public onlyBefore(auctions[idx].endingTime) {
        // TestAddress(msg.sender);
        // TestAddress(beneficiary);
        require(msg.sender == auctions[idx].beneficiary);
        require(price < auctions[idx].currentPrice);
        require(price >= auctions[idx].reversePrice);
        require(auctions[idx].units > 0);
        auctions[idx].currentPrice = price;
        PriceDecreased(idx, auctions[idx].currentPrice);
    }

    /// Withdraw a bid that was overbid.
    function withdraw(uint256 idx) public returns (bool) {
        uint amount = auctions[idx].winnerInfo[msg.sender].change;
        if (amount > 0) {
            // It is important to set this to zero because the recipient
            // can call this function again as part of the receiving call
            // before `send` returns.
            auctions[idx].winnerInfo[msg.sender].change = 0;

            msg.sender.transfer(amount);
        }
        return true;
    }

    /// End the auction and send the bid to the beneficiary
    function auctionEnd(uint256 idx) public onlyAfter(auctions[idx].endingTime) {
        require(!auctions[idx].ended);
        auctions[idx].ended = true;
        for (uint256 i = 0; i < auctions[idx].winners.length; i++) {
            address bidderAddress = auctions[idx].winners[i];
            auctions[idx].assetsInfo[bidderAddress] += auctions[idx].winnerInfo[bidderAddress].units;
            auctions[idx].assetsInfo[auctions[idx].beneficiary] -= auctions[idx].winnerInfo[bidderAddress].units;
        }
        auctions[idx].beneficiary.transfer(auctions[idx].totalGains);
        AuctionEnded(idx, auctions[idx].beneficiary, auctions[idx].assetName, auctions[idx].winners);
    }

    // Fallback function in case someone sends ether to the contract so it doesn't get lost 
    // and to increase the treasury of this contract that will be distributed in each game
    function() public payable {}
}
