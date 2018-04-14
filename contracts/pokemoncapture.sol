pragma solidity ^0.4.19;

import "./pokemonattack.sol";

contract PokemonCapture is PokemonAttack {
    
    uint captureTime = 1 days;
    uint public countDownTime;
    
    event PokemonCaptured(uint _pokemonId, address owner);
    function PokemonCapture() public {
        countDownTime = now;
    }

    function callWildPokemon() external onlyOwner {
        require(uint(now) > countDownTime);
        for(uint i = 0; i < 4; i++){
            wildPokemons[i] = WildPokemon(randMod(primitives.length), uint32(randMod(50)), now + captureTime, true);    
        }
    
        countDownTime = now + captureTime;
    }

    function capturePokemon(uint _wildPokemonId) external payable returns(bool){
        uint rand = randMod(200);

        WildPokemon storage pokemon = wildPokemons[_wildPokemonId];
        require(now < pokemon.fledded);
        require(pokemon.capturable);
        
        if (rand > primitives[pokemon.primitiveId].catchRate + uint(pokemon.level)) {
            // yay, caught it
            uint32 dna = _generateRandomDna(name);
            uint id = _createPokemon(name, dna, pokemon.primitiveId);
            string memory name = primitives[pokemon.primitiveId].name;
            BaseStats memory stats = natures[pokemons[id].nature];
            
            pokemons[id].level = pokemon.level;
            pokemons[id].stats.attack += uint32(stats.attack * (pokemon.level - 1));
            pokemons[id].stats.defense += uint32(stats.defense * (pokemon.level - 1));
            pokemons[id].stats.speed += uint32(stats.speed * (pokemon.level - 1));
            pokemons[id].stats.hp += uint32(stats.hp * (pokemon.level - 1));
            
            PokemonCaptured(id, msg.sender);
            pokemon.capturable = false;
            return true;
        }
        else {
            return false;
        }
    }
}