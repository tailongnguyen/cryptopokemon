pragma solidity ^0.4.19;

import "./pokemonfeeding.sol";

contract PokemonHelper is PokemonFeeding {

    uint levelUpFee = 0.001 ether;
    event PokemonLevelUp(uint _pokemonId, uint32 _level);
    event PokemonEvolve(uint _pokemonId);
    
    modifier aboveLevel(uint _level, uint _pokemonId) {
        require(pokemons[_pokemonId].level >= _level);
        _;
    }
    
    function _isEvovalble(uint _pokemonId) internal view returns(bool){
        Pokemon memory myPokemon = pokemons[_pokemonId];
        uint threshold = evolution[myPokemon.primitiveId];
        if (threshold > 0 && myPokemon.level >= threshold) {
            return true;
        }
        else{
            return false;
        }
    }
    
    function withdraw() external onlyOwner {
        owner.transfer(this.balance);
    }

    function setLevelUpFee(uint _fee) external onlyOwner {
        levelUpFee = _fee;
    }

    function levelUpByMoney(uint _pokemonId) external payable onlyOwnerOf(_pokemonId) {
        require(msg.value == levelUpFee);
        Pokemon storage myPokemon = pokemons[_pokemonId];
        _levelUp(_pokemonId);
        
        BaseStats memory stats = natures[myPokemon.nature];

        myPokemon.stats.attack += stats.attack;
        myPokemon.stats.defense += stats.defense;
        myPokemon.stats.speed += stats.speed;
        myPokemon.stats.hp += stats.hp;
    }

    function _levelUp(uint _pokemonId) internal {
        Pokemon storage myPokemon = pokemons[_pokemonId];
        myPokemon.level++;
        myPokemon.exp = 0;
        PokemonLevelUp(_pokemonId, myPokemon.level);
    }
    
    function evolve(uint _pokemonId) external onlyOwnerOf(_pokemonId) {
        Pokemon storage myPokemon = pokemons[_pokemonId];
        require(_isEvovalble(_pokemonId));
        myPokemon.primitiveId += 1;
        myPokemon.stats.attack += 15;
        myPokemon.stats.defense += 15;
        myPokemon.stats.speed += 15;
        myPokemon.stats.hp += 15;
        PokemonEvolve(_pokemonId);
    }

    function changeNickName(uint _pokemonId, string _newNickName) external aboveLevel(2, _pokemonId) onlyOwnerOf(_pokemonId) {
        pokemons[_pokemonId].nickName = _newNickName;
    }

    function addPrimitive(string _name, uint _catchRate, uint32 _attack, uint8 _defense, uint8 _speed, uint8 _hp) external onlyOwner {
        primitives.push(PrimitivePokemon(_name, _catchRate, BaseStats(_attack, _defense, _speed, _hp)));
    }

    function addFood(string _name, uint price, uint32 _attack, uint32 _defense, uint32 _speed, uint32 _hp) external onlyOwner {
        name2food[_name] = Food(price,_attack, _defense, _speed, _hp);
    }

    function getPokemonsByOwner(address _owner) external view returns(uint[]) {
        uint[] memory result = new uint[](ownerPokemonCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < pokemons.length; i++) {
            if (pokemonToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

}