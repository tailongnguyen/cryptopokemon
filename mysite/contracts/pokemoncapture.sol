pragma solidity ^0.4.19;

import "./pokemonattack.sol";

contract PokemonCapture is PokemonAttack {
    
    uint captureTime = 1 hours;
    uint public countDownTime;
    
    event PokemonCaptured(uint _pokemonId, address owner);
    event PokemonCaptureFail(uint _pokemonId, address owner);
    
    function PokemonCapture() public {
        countDownTime = now;
    }

    function callWildPokemon() external onlyOwner {
        require(uint(now) > countDownTime);
        for(uint i = 0; i < 4; i++){
            wildPokemons[i] = WildPokemon(randMod(primitives.length), uint32(randMod(50)), true);    
        }
    
        countDownTime = now + captureTime;
    }

    function capturePokemon(uint _wildPokemonId) external returns(bool _captured){
        uint rand = randMod(463);

        WildPokemon storage pokemon = wildPokemons[_wildPokemonId];
        require(now < countDownTime);
        require(pokemon.capturable);
        
        if (rand > primitives[pokemon.primitiveId].catchRate + uint(pokemon.level) * 4) {
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
            _captured = true;
        }
        else {
            PokemonCaptureFail(_wildPokemonId, msg.sender);
            _captured = false;
        }
    }
}