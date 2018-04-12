pragma solidity ^0.4.19;

import "./ownable.sol";


contract Primitives is Ownable {
    struct BaseStats {
        uint8 attack;
        uint8 defense;
        uint8 speed;
        uint8 hp;
    }

    struct Food {
        uint price;
        uint8 attack;
        uint8 defense;
        uint8 speed;
        uint8 hp;
    }

    struct PrimitivePokemon {
        string name;
        BaseStats stats;
    }

    mapping (string=>Food) internal name2food;

    bytes32[] public natures;
    PrimitivePokemon[] public primitives;

    function Primitives() public {
        primitives.push(PrimitivePokemon("bulbasaur", BaseStats(55, 55, 45, 50)));    /// 205
        primitives.push(PrimitivePokemon("ivysaur", BaseStats(70, 70, 60, 70)));      /// 270
        primitives.push(PrimitivePokemon("venusaur", BaseStats(90, 90, 80, 90)));     /// 350
        primitives.push(PrimitivePokemon("charmander", BaseStats(56, 47, 65, 39)));   /// 207
        primitives.push(PrimitivePokemon("charmaleon", BaseStats(72, 62, 80, 58)));   /// 272  
        primitives.push(PrimitivePokemon("charizard", BaseStats(97, 81, 100, 78)));   /// 356
        primitives.push(PrimitivePokemon("squirtle", BaseStats(49, 65, 43, 44)));     /// 201
        primitives.push(PrimitivePokemon("wartortle", BaseStats(64, 80, 58, 59)));    /// 261
        primitives.push(PrimitivePokemon("venusaur", BaseStats(84, 103, 78, 79)));    /// 344  

        name2food["protein"] = Food(0.001 ether, 1, 0, 0, 0);     
        name2food["iron"] = Food(0.001 ether, 0, 1, 0, 0);     
        name2food["carbos"] = Food(0.001 ether, 0, 0, 1, 0);     
        name2food["milk"] = Food(0.001 ether, 0, 0, 0, 2);     

        natures.push(keccak256("lonely"));
        natures.push(keccak256("bold"));
        natures.push(keccak256("timid"));
        natures.push(keccak256("healthy"));
    }    

    function getPrimitivesSize() public view returns(uint){
        return primitives.length;
    }
}