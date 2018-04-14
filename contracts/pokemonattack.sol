pragma solidity ^0.4.19;

import "./pokemonhelper.sol";

contract PokemonAttack is PokemonHelper {
    
    uint randNonce = 0;
    event PokemonBattle(uint _id1, uint _id2, uint32[] turns);
    
    function randMod(uint _modulus) internal returns(uint) {
        randNonce++;
        return uint(keccak256(now, msg.sender, randNonce)) % _modulus;
    }

    function sub(uint32 a, uint32 b) internal pure returns (uint32){
        if (a >= b) {
            return a - b;
        }
        else {
            return 0;
        }
    }

    function abs(uint32 a, uint32 b) internal pure returns (uint32) {
        if (a >= b) {
            return a - b;
        }
        else {
            return b - a;
        }
    }

    function attack(uint _pokemonId, uint _targetId) external onlyOwnerOf(_pokemonId) returns (uint) {
        Pokemon storage myPokemon = pokemons[_pokemonId];
        Pokemon storage enemyPokemon = pokemons[_targetId];
        uint rand;
        uint32 outlevel;
        uint32 my_damage;
        uint32 enemy_damage;
        uint32 my_hp = myPokemon.stats.hp;
        uint32 enemy_hp = enemyPokemon.stats.hp;
        uint32[] memory turns = new uint32[](50);
        uint counter = 0;

        outlevel = abs(myPokemon.level, enemyPokemon.level);
        require(outlevel < 5);

        my_damage = myPokemon.stats.attack / 10 * 3 + sub(myPokemon.stats.attack, enemyPokemon.stats.defense);        
        enemy_damage = enemyPokemon.stats.attack / 10 * 3 + sub(enemyPokemon.stats.attack, myPokemon.stats.defense);

        while (my_hp > 0 && enemy_hp > 0) {
            if (myPokemon.stats.speed  >=  enemyPokemon.stats.speed){
                rand = randMod(800);
                if (rand > enemyPokemon.stats.speed){
                    enemy_hp = sub(enemy_hp, my_damage);
                    turns[counter] = my_damage;
                    if (enemy_hp == 0) {
                        break;
                    }
                }
                else{
                    turns[counter] = 0;
                }
                counter++;

                rand = randMod(800);
                if (rand > myPokemon.stats.speed){
                    my_hp = sub(my_hp, enemy_damage);
                    turns[counter] = enemy_damage;
                    if (my_hp == 0) {
                        break;
                    }
                }
                else{
                    turns[counter] = 0;
                }
                counter++;
            }
            else {
                rand = randMod(800);
                if (rand > myPokemon.stats.speed){
                    my_hp = sub(my_hp, enemy_damage);
                    turns[counter] = enemy_damage;
                    if (my_hp == 0) {
                        break;
                    }
                }     
                else{
                    turns[counter] = 0;
                }
                counter++;

                rand = randMod(800);
                if (rand > enemyPokemon.stats.speed){
                    enemy_hp = sub(enemy_hp, my_damage);
                    turns[counter] = my_damage;
                    if (enemy_hp == 0) {
                        break;
                    }
                }
                else{
                    turns[counter] = 0;
                }
                counter++;
            }
        }

        if (enemy_hp == 0 ){
            // win xD
            myPokemon.winCount++;
            if (myPokemon.level >= enemyPokemon.level){
                myPokemon.exp++;
            }
            else{
                if (myPokemon.exp + outlevel >= myPokemon.levelThreshold){
                    uint32 exp_left = myPokemon.exp + outlevel - myPokemon.levelThreshold;
                    _levelUp(_pokemonId);
                    myPokemon.exp += exp_left; 
                }
                else{
                    myPokemon.exp += outlevel;
                }
            }
    
            PokemonBattle(_pokemonId, _targetId, turns);
            return (_pokemonId);
        } 
        else {
            // lose :(
            myPokemon.lossCount++;
            PokemonBattle(_pokemonId, _targetId, turns);
            _triggerCooldown(myPokemon);
            return (_targetId);
        }
    }
}
