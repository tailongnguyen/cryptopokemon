pragma solidity ^0.4.18;
// pragma experimental ABIEncoderV2;

// 0x66df61dd493c204a7cfcf980204727835b787d2e
contract Auction {
    address public beneficiary;
    address[] public winners;
    bytes32 public name;
    uint256 public units;
    uint256 public firstPrice;
    uint256 public reversePrice;
    uint256 public endingTime;
    uint256 public currentPrice; 
    uint256 public totalGains;

    struct WinningInfo {
        uint256 units;
        uint256 bid;
        uint256 change;
    }

    bool ended;
    mapping (address => uint256) public assetsInfo;
    mapping (address => WinningInfo) public winnerInfo;

    event TestValue(uint256 indexed value);
    event TestAddress(address indexed add);

    modifier onlyBefore(uint _time) {require(now < _time); _;}
    modifier onlyAfter(uint _time) {require(now > _time); _;}

    // Events that will be fired on changes.
    event HighestBidDecreased(uint256 amount);
    event UnitsDecreased(address winner);
    event AuctionEnded(address[] winners);

    /// Create a simple Dutch Auction
    function Auction (
        bytes32 _name,
        uint256 _biddingTime, 
        uint256 _units, 
        uint256 _firstPrice, 
        uint256 _reversePrice ) 
    public 
    {
        require(_biddingTime > 0);
        require(_firstPrice > _reversePrice);
        require(_units > 0);
        beneficiary = msg.sender;
        name = _name;
        endingTime = now + _biddingTime;
        assetsInfo[msg.sender] = _units;
        units = _units;
        firstPrice = _firstPrice;
        currentPrice = _firstPrice;
        reversePrice = _reversePrice;
    }
    
    function getVariables () public view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256, bytes32, address, address[]) {
        return (now, endingTime, firstPrice, reversePrice, totalGains, units, currentPrice, name, beneficiary, winners);
    }

    function getWinnerInfo (address add) public view returns (WinningInfo) {
        return winnerInfo[add];
    }

    function getAssetsInfo (address add) public view returns (uint256) {
        return assetsInfo[add];
    }

    /// Aggree with the current price
    function bid(uint256 numberOfUnits) public payable onlyBefore(endingTime) {
        require(units >= numberOfUnits);
        require(msg.value >= currentPrice * numberOfUnits);
        winners.push(msg.sender);
        winnerInfo[msg.sender].units = numberOfUnits;
        winnerInfo[msg.sender].bid = currentPrice;
        winnerInfo[msg.sender].change += msg.value - (currentPrice * numberOfUnits);
        units = units - numberOfUnits;
        totalGains = totalGains + currentPrice * numberOfUnits;
        UnitsDecreased(msg.sender);
        if (units == 0) {
            auctionEnd();
        }
    }

    /// Lower the current price. 
    /// Only beneficiary can call this function
    function lower(uint256 price) public onlyBefore(endingTime) {
        // TestAddress(msg.sender);
        // TestAddress(beneficiary);
        require(msg.sender == beneficiary);
        require(price < currentPrice);
        require(price >= reversePrice);
        require(units > 0);
        currentPrice = price;
        HighestBidDecreased(currentPrice);
    }

    /// Withdraw a bid that was overbid.
    function withdraw() public returns (bool) {
        uint amount = winnerInfo[msg.sender].change;
        if (amount > 0) {
            // It is important to set this to zero because the recipient
            // can call this function again as part of the receiving call
            // before `send` returns.
            winnerInfo[msg.sender].change = 0;

            if (!msg.sender.send(amount)) {
                // No need to call throw here, just reset the amount owing
                winnerInfo[msg.sender].change = amount;
                return false;
            }
        }
        return true;
    }

    /// End the auction and send the bid to the beneficiary
    function auctionEnd() public onlyAfter(endingTime) {
        require(!ended);
        ended = true;
        for (uint256 i = 0; i < winners.length; i++) {
            address bidderAddress = winners[i];
            assetsInfo[bidderAddress] += winnerInfo[bidderAddress].units;
            assetsInfo[beneficiary] -= winnerInfo[bidderAddress].units;
        }
        beneficiary.transfer(totalGains);
        AuctionEnded(winners);
    }

    // Fallback function in case someone sends ether to the contract so it doesn't get lost 
    // and to increase the treasury of this contract that will be distributed in each game
    function() public payable {}
}
