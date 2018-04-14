pragma solidity ^0.4.19;

import "./ownable.sol";


contract Primitives is Ownable {
    struct BaseStats {
        uint32 attack;
        uint32 defense;
        uint32 speed;
        uint32 hp;
    }

    struct Food {
        uint price;
        uint32 attack;
        uint32 defense;
        uint32 speed;
        uint32 hp;
    }

    struct PrimitivePokemon {
        string name;
        uint catchRate;
        BaseStats stats;
    }

    mapping (string=>Food) internal name2food;
    mapping (uint=>uint) internal evolution;
    
    BaseStats[] natures;
    PrimitivePokemon[] public primitives;

    function Primitives() public {
        primitives.push(PrimitivePokemon("bulbasaur", 20, BaseStats(55, 55, 45, 50)));    /// 205
        primitives.push(PrimitivePokemon("ivysaur", 50, BaseStats(70, 70, 60, 70)));      /// 270
        primitives.push(PrimitivePokemon("venusaur", 100, BaseStats(90, 90, 80, 90)));     /// 350
        primitives.push(PrimitivePokemon("charmander", 20, BaseStats(56, 47, 65, 39)));   /// 207
        primitives.push(PrimitivePokemon("charmaleon", 50, BaseStats(72, 62, 80, 58)));   /// 272  
        primitives.push(PrimitivePokemon("charizard", 100, BaseStats(97, 81, 100, 78)));   /// 356
        primitives.push(PrimitivePokemon("squirtle", 20, BaseStats(49, 65, 43, 44)));     /// 201
        primitives.push(PrimitivePokemon("wartortle", 50, BaseStats(64, 80, 58, 59)));    /// 261
        primitives.push(PrimitivePokemon("blastoise", 100, BaseStats(84, 103, 78, 79)));    /// 344   

        name2food["protein"] = Food(0.001 ether, 1, 0, 0, 0);     
        name2food["iron"] = Food(0.001 ether, 0, 1, 0, 0);     
        name2food["carbos"] = Food(0.001 ether, 0, 0, 1, 0);     
        name2food["milk"] = Food(0.001 ether, 0, 0, 0, 2);     

        natures.push(BaseStats(2, 1, 1, 2));
        natures.push(BaseStats(1, 2, 1, 2));
        natures.push(BaseStats(1, 1, 2, 2));
        natures.push(BaseStats(1, 1, 1, 4));
        
        evolution[0] = 16;
        evolution[1] = 32;
        evolution[3] = 16;
        evolution[4] = 32;
        evolution[6] = 16;
        evolution[7] = 32;
    }    

    function getPrimitivesSize() public view returns(uint){
        return primitives.length;
    }
}