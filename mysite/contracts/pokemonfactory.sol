pragma solidity ^0.4.19;

import "./ownable.sol";
import "./safemath.sol";
import "./primitive.sol";

contract PokemonFactory is Primitives {

    using SafeMath for uint256;
    using SafeMath for uint32;
    using SafeMath for uint16;

    event NewPokemon(uint pokemonId, string name, uint32 dna);

    uint cooldownTime = 30 seconds;

    struct Pokemon {
        string nickName;
        string name;
        uint nature;
        uint32 dna;
        uint32 level;
        uint32 readyTime;
        uint32 levelThreshold;
        uint32 exp;
        uint16 winCount;
        uint16 lossCount;
        uint primitiveId;
        BaseStats stats;
    }
    
    struct WildPokemon {
        uint primitiveId;
        uint32 level;
        uint fledded;
        bool capturable;
    }

    Pokemon[] public pokemons;
    WildPokemon[4] public wildPokemons;
    
    mapping (uint => address) public pokemonToOwner;
    mapping (address => uint) public ownerPokemonCount;
    
    function getPopulation() public view returns(uint) {
        return pokemons.length;
    }

    function getPokemonInfo(uint idx) public view returns(string _nickName, string _name, uint _nature, uint _evolution, uint32 _dna, uint32 _level) {
        require(idx < pokemons.length);
        Pokemon memory pokemon = pokemons[idx];
        _nickName = pokemon.nickName;
        _name = pokemon.name;
        _nature = pokemon.nature;
        _evolution = evolution[pokemon.primitiveId];
        _dna = pokemon.dna;
        _level = pokemon.level;
    }
    
    function getPokemonDetails(uint idx) public view returns(uint32 _readyTime, uint32 _lvTh, uint32 _exp, uint32 _win, uint32 _loss, uint _primitiveId){
        require(idx < pokemons.length);
        Pokemon memory pokemon = pokemons[idx];
        _readyTime = pokemon.readyTime;
        _lvTh = pokemon.levelThreshold;
        _exp = pokemon.exp;
        _win = pokemon.winCount;
        _loss = pokemon.lossCount;
        _primitiveId = pokemon.primitiveId;
    }
    
    function getPokemonStats(uint idx) public view returns(uint32 _attack, uint32 _defense, uint32 _speed, uint32 _hp) {
        Pokemon memory pokemon = pokemons[idx];
        _attack = pokemon.stats.attack;
        _defense = pokemon.stats.defense;
        _speed = pokemon.stats.speed;
        _hp = pokemon.stats.hp;
    }
    
    function getPrimitive(uint idx) public view returns(string _name, uint32 _attack, uint32 _defense, uint32 _speed, uint32 _hp) {
        PrimitivePokemon memory pokemon = primitives[idx];
        _name = pokemon.name;
        _attack = pokemon.stats.attack;
        _defense = pokemon.stats.defense;
        _speed = pokemon.stats.speed;
        _hp = pokemon.stats.hp;
    }

    function _createPokemon(string _name, uint32 _dna, uint _primitiveId) internal returns(uint) {
      // Note: We chose not to prevent the year 2038 problem... So don't need
      // worry about overflows on readyTime. Our app is screwed in 2038 anyway ;)
        uint32[] memory variant = new uint32[](6);
        uint clone = _dna;
        uint temp;
        for (uint index = 0; index < 6; index++) {
            temp = clone % 10;
            variant[index] = uint32(temp);
            clone = (clone - temp) / 10;
        }

        PrimitivePokemon memory primitive = primitives[_primitiveId];
        primitive.stats.attack += variant[0];
        primitive.stats.defense += variant[1];
        primitive.stats.speed += variant[2];
        primitive.stats.hp += variant[3] * 2;

        uint id = pokemons.push(Pokemon(_name, primitive.name, variant[5] % natures.length, _dna, 1, uint32(now + cooldownTime), variant[4] + 5, 0, 0, 0, _primitiveId, primitive.stats)) - 1;
        pokemonToOwner[id] = msg.sender;
        
        ownerPokemonCount[msg.sender] = ownerPokemonCount[msg.sender].add(1);
        NewPokemon(pokemons.length - 1, _name, _dna);
        return id;
    }

    function _generateRandomDna(string _str) internal view returns (uint32) {
        uint rand = uint(keccak256(_str)) + now;
        return uint32(rand % (10**6) + 10**6);
    }

    function createStarter(string _name, uint _primitiveId) public {
        require(_primitiveId == 0 || _primitiveId == 3 || _primitiveId == 6);
        uint32 randDna = _generateRandomDna(_name);
        _createPokemon(_name, randDna, _primitiveId);
    }
    
}