pragma solidity ^0.4.19;

import "./ownable.sol";
import "./safemath.sol";
import "./primitive.sol";

contract PokemonFactory is Primitives {

    using SafeMath for uint256;
    using SafeMath for uint32;
    using SafeMath for uint16;

    event NewPokemon(uint pokemonId, string name, uint32 dna);

    uint dnaDigits = 9;
    uint dnaModulus = 10 ** dnaDigits;
    uint cooldownTime = 30 seconds;

    struct Pokemon {
        string nickName;
        string name;
        bytes32 nature;
        uint32 dna;
        uint32 level;
        uint32 readyTime;
        uint32 levelThreshold;
        uint32 exp;
        uint16 winCount;
        uint16 lossCount;
        BaseStats stats;
    }

    Pokemon[] public pokemons;

    mapping (uint => address) public pokemonToOwner;
    mapping (address => uint) public ownerPokemonCount;

    function getPopulation() public view returns(uint) {
        return pokemons.length;
    }

    function getPokemonInfo(uint idx) public view returns(string _nickName, string _name, bytes32 _nature, uint32 _dna, uint32 _level, uint32 _readyTime, uint32 _lvTh, uint32 _exp, uint32 _win, uint32 _loss) {
        Pokemon memory pokemon = pokemons[idx];
        _nickName = pokemon.nickName;
        _name = pokemon.name;
        _nature = pokemon.nature;
        _dna = pokemon.dna;
        _level = pokemon.level;
        _readyTime = pokemon.readyTime;
        _lvTh = pokemon.levelThreshold;
        _exp = pokemon.exp;
        _win = pokemon.winCount;
        _loss = pokemon.lossCount;
    }

    function getPrimitive(uint idx) public view returns(string _name, uint8 _attack, uint8 _defense, uint8 _speed, uint8 _hp) {
        PrimitivePokemon memory pokemon = primitives[idx];
        _name = pokemon.name;
        _attack = pokemon.stats.attack;
        _defense = pokemon.stats.defense;
        _speed = pokemon.stats.speed;
        _hp = pokemon.stats.hp;
    }

    function getPokemonStats(uint idx) public view returns(uint8 _attack, uint8 _defense, uint8 _speed, uint8 _hp) {
        Pokemon memory pokemon = pokemons[idx];
        _attack = pokemon.stats.attack;
        _defense = pokemon.stats.defense;
        _speed = pokemon.stats.speed;
        _hp = pokemon.stats.hp;
    }

    function _createPokemon(string _name, uint32 _dna) internal {
      // Note: We chose not to prevent the year 2038 problem... So don't need
      // worry about overflows on readyTime. Our app is screwed in 2038 anyway ;)
        uint8[] memory variant = new uint8[](6);
        uint clone = _dna;
        uint temp;
        for (uint index = 0; index < 6; index++) {
            temp = clone % 10;
            variant[index] = uint8(temp);
            clone = (clone - temp) / 10;
        }

        PrimitivePokemon memory primitive = primitives[clone % primitives.length];
        primitive.stats.attack += variant[0];
        primitive.stats.defense += variant[1];
        primitive.stats.speed += variant[2];
        primitive.stats.hp += variant[3] * 2;

        pokemons.push(Pokemon(_name, primitive.name, natures[variant[5] % natures.length], _dna, 1, uint32(now + cooldownTime), variant[4] + 5, 0, 0, 0, primitive.stats));
        pokemonToOwner[pokemons.length - 1] = msg.sender;
        
        ownerPokemonCount[msg.sender] = ownerPokemonCount[msg.sender].add(1);
        NewPokemon(pokemons.length - 1, _name, _dna);
    }

    function _generateRandomDna(string _str) private view returns (uint32) {
        uint rand = uint(keccak256(_str)) + now;
        if (uint32(rand % dnaModulus) < 100000) {
            return 100000;
        }
        return uint32(rand % dnaModulus);
    }

    function createRandomPokemon(string _name) public {
        // require(ownerPokemonCount[msg.sender] == 0);
        uint32 randDna = _generateRandomDna(_name);
        _createPokemon(_name, randDna);
    }

}
