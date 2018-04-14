pragma solidity ^0.4.19;

import "./pokemoncapture.sol";
import "./erc721.sol";

contract PokemonOwnership is PokemonCapture, ERC721 {

    mapping (uint => address) pokemonApprovals;

    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPokemonCount[_owner];
    }

    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        return pokemonToOwner[_tokenId];
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        require(pokemonToOwner[_tokenId] != _to);
        ownerPokemonCount[_to] = ownerPokemonCount[_to].add(1);
        ownerPokemonCount[_from] = ownerPokemonCount[_from].sub(1);
        pokemonToOwner[_tokenId] = _to;
        Transfer(_from, _to, _tokenId);
    }

    function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        _transfer(msg.sender, _to, _tokenId);
    }

    function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        pokemonApprovals[_tokenId] = _to;
        Approval(msg.sender, _to, _tokenId);
    }

    function takeOwnership(uint256 _tokenId) public {
        require(pokemonApprovals[_tokenId] == msg.sender);
        address owner = ownerOf(_tokenId);
        _transfer(owner, msg.sender, _tokenId);
    }
}
