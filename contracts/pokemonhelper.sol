pragma solidity ^0.4.19;

import "./pokemonfeeding.sol";

contract PokemonHelper is PokemonFeeding {

    uint levelUpFee = 0.001 ether;
    event PokemonLevelUp(uint _pokemonId, uint32 _level);

    modifier aboveLevel(uint _level, uint _pokemonId) {
        require(pokemons[_pokemonId].level >= _level);
        _;
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
        
        bytes32 temp = myPokemon.nature;

        if (temp == natures[0]) {
            myPokemon.stats.attack += 2;
        }
        else {
            myPokemon.stats.attack += 1;
        }
        if (temp == natures[1]) {
            myPokemon.stats.defense += 2;
        }
        else {
            myPokemon.stats.defense ++;
        }
        if (temp == natures[2]){
            myPokemon.stats.speed += 2;
        }
        else {
            myPokemon.stats.speed ++;
        }
        if (temp == natures[3]) {
            myPokemon.stats.hp += 4;
        }
        else {
            myPokemon.stats.hp += 2;
        }
    }

    function _levelUp(uint _pokemonId) internal {
        Pokemon storage myPokemon = pokemons[_pokemonId];
        myPokemon.level++;
        myPokemon.exp = 0;
        PokemonLevelUp(_pokemonId, myPokemon.level);
    }

    function changeNickName(uint _pokemonId, string _newNickName) external aboveLevel(2, _pokemonId) onlyOwnerOf(_pokemonId) {
        pokemons[_pokemonId].nickName = _newNickName;
    }

    function addPrimitive(string _name, uint8 _attack, uint8 _defense, uint8 _speed, uint8 _hp) external onlyOwner {
        primitives.push(PrimitivePokemon(_name, BaseStats(_attack, _defense, _speed, _hp)));
    }

    function addFood(string _name, uint price, uint8 _attack, uint8 _defense, uint8 _speed, uint8 _hp) external onlyOwner {
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
