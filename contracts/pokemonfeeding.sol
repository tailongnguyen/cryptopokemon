pragma solidity ^0.4.19;

import "./pokemonfactory.sol";

contract PokemonFeeding is PokemonFactory {

    modifier onlyOwnerOf(uint _pokemonId) {
        require(msg.sender == pokemonToOwner[_pokemonId]);
        _;
    }

    function _triggerCooldown(Pokemon storage _pokemon) internal {
        _pokemon.readyTime = uint32(now + cooldownTime);
    }

    function _isReady(Pokemon storage _pokemon) internal view returns (bool) {
        return (_pokemon.readyTime <= now);
    }

    function feed(uint _pokemonId, string _foodName) external payable onlyOwnerOf(_pokemonId) {
        Pokemon storage myPokemon = pokemons[_pokemonId];
        Food memory food = name2food[_foodName];
        require(_isReady(myPokemon));
        require(msg.value == food.price);
        myPokemon.stats.attack += food.attack;
        myPokemon.stats.defense += food.defense;
        myPokemon.stats.speed += food.speed;
        myPokemon.stats.hp += food.hp;
        _triggerCooldown(myPokemon);
    }

}
