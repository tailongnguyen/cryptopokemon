pragma solidity ^0.4.18;

import "./pokemonownership.sol";

// 0xe3a0ec5cb60318a00ff9efc6371cfcdb836bbcf2
contract PokemonAuction is PokemonOwnership {

    struct Auction {
        address   winner;
        address     beneficiary;
        uint     firstPrice;
        uint     reversePrice;
        uint     endingTime;
        uint     currentPrice; 
        bool        ended;
    }

    Auction[] public auctions;
    uint public creationFee;

    modifier onlyBefore(uint _time) {require(now < _time); _;}
    modifier onlyAfter(uint _time) {require(now > _time); _;}

    // Events that will be fired on changes.
    event PriceDecreased(uint idx, uint amount);
    event AuctionCreated(uint idx, string name, address beneficiary);
    event AuctionEnded(uint idx, address winner);

    /// Initiate the contracts.
    function PokemonAuction (uint _creationFee) public {
        require(_creationFee > 0);
        creationFee = _creationFee;
    }

    /// Create a new auction.
    function createAuction (
        uint _pokemonId,
        uint _biddingTime,  
        uint _firstPrice, 
        uint _reversePrice ) 
    public payable {
        require(msg.value >= creationFee);
        require(_biddingTime > 0);
        require(_firstPrice > _reversePrice);
    
        Auction memory newAuction;
        newAuction.endingTime = now + _biddingTime;
        newAuction.beneficiary = msg.sender;
        newAuction.firstPrice = _firstPrice;
        newAuction.currentPrice = _firstPrice;
        newAuction.reversePrice = _reversePrice;
        auctions.push(newAuction);

        Pokemon memory pokemon = pokemons[_pokemonId];
        emit AuctionCreated(auctions.length - 1, pokemon.name, msg.sender);
    }
    
    function getAuctionsCount() public view returns (uint) {
        return auctions.length;
    }

    function getTimeInfo (uint idx) public view returns (bool, uint, uint) {
        return (auctions[idx].ended, now, auctions[idx].endingTime);
    }

    function getPriceInfo (uint idx) public view returns (uint, uint , uint){
        return (auctions[idx].firstPrice, auctions[idx].reversePrice, auctions[idx].currentPrice);
    }

    function getVariables (uint idx) public view returns (address, address) {
        require(idx < auctions.length);
        return (auctions[idx].beneficiary, auctions[idx].winner);
    }

    function setCreationFee(uint _fee) external onlyOwner {
        creationFee = _fee;
    }

    /// Make the deal with the current price.
    function bid(uint idx) public payable onlyBefore(auctions[idx].endingTime) {
        require(msg.value == auctions[idx].currentPrice);
        require(!auctions[idx].ended);

        auctions[idx].winner = msg.sender;
        address owner = pokemonToOwner[idx];
        owner.transfer(msg.value);
        _transfer(owner, msg.sender, idx);

        emit AuctionEnded(idx, msg.sender);
    }

    /// Lower the current price. 
    /// Only beneficiary can call this function.
    function lower(uint idx, uint price) public onlyBefore(auctions[idx].endingTime) {
        require(msg.sender == auctions[idx].beneficiary);
        require(price < auctions[idx].currentPrice);
        require(price >= auctions[idx].reversePrice);
        
        auctions[idx].currentPrice = price;
        PriceDecreased(idx, auctions[idx].currentPrice);
    }

    /// End the auction and send the bid to the beneficiary
    function auctionEnd(uint idx) public onlyOwner {
        require(!auctions[idx].ended);
        auctions[idx].ended = true;        
    }

    // Fallback function in case someone sends ether to the contract so it doesn't get lost 
    // and to increase the treasury of this contract that will be distributed in each game
    function() public payable {}
}
