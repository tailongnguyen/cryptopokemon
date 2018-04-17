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
        primitives.push(PrimitivePokemon("bulbasaur", 204, BaseStats(57, 57, 45, 45)));
        primitives.push(PrimitivePokemon("ivysaur", 262, BaseStats(71, 71, 60, 60)));
        primitives.push(PrimitivePokemon("venusaur", 342, BaseStats(91, 91, 80, 80)));
        primitives.push(PrimitivePokemon("charmander", 206, BaseStats(56, 46, 65, 39)));
        primitives.push(PrimitivePokemon("charmeleon", 271, BaseStats(72, 61, 80, 58)));
        primitives.push(PrimitivePokemon("charizard", 355, BaseStats(96, 81, 100, 78)));
        primitives.push(PrimitivePokemon("squirtle", 200, BaseStats(49, 64, 43, 44)));
        primitives.push(PrimitivePokemon("wartortle", 261, BaseStats(64, 80, 58, 59)));
        primitives.push(PrimitivePokemon("blastoise", 343, BaseStats(84, 102, 78, 79)));
        primitives.push(PrimitivePokemon("caterpie", 142, BaseStats(25, 27, 45, 45)));
        primitives.push(PrimitivePokemon("metapod", 142, BaseStats(22, 40, 30, 50)));
        primitives.push(PrimitivePokemon("butterfree", 262, BaseStats(67, 65, 70, 60)));
        primitives.push(PrimitivePokemon("weedle", 142, BaseStats(27, 25, 50, 40)));
        primitives.push(PrimitivePokemon("kakuna", 142, BaseStats(25, 37, 35, 45)));
        primitives.push(PrimitivePokemon("beedrill", 267, BaseStats(67, 60, 75, 65)));
        primitives.push(PrimitivePokemon("pidgey", 173, BaseStats(40, 37, 56, 40)));
        primitives.push(PrimitivePokemon("pidgeotto", 241, BaseStats(55, 52, 71, 63)));
        primitives.push(PrimitivePokemon("pidgeot", 331, BaseStats(75, 72, 101, 83)));
        primitives.push(PrimitivePokemon("rattata", 177, BaseStats(40, 35, 72, 30)));
        primitives.push(PrimitivePokemon("raticate", 282, BaseStats(65, 65, 97, 55)));
        primitives.push(PrimitivePokemon("spearow", 185, BaseStats(45, 30, 70, 40)));
        primitives.push(PrimitivePokemon("fearow", 303, BaseStats(75, 63, 100, 65)));
        primitives.push(PrimitivePokemon("ekans", 189, BaseStats(50, 49, 55, 35)));
        primitives.push(PrimitivePokemon("arbok", 294, BaseStats(80, 74, 80, 60)));
        primitives.push(PrimitivePokemon("pikachu", 222, BaseStats(52, 45, 90, 35)));
        primitives.push(PrimitivePokemon("raichu", 327, BaseStats(90, 67, 110, 60)));
        primitives.push(PrimitivePokemon("sandshrew", 194, BaseStats(47, 57, 40, 50)));
        primitives.push(PrimitivePokemon("sandslash", 294, BaseStats(72, 82, 65, 75)));
        primitives.push(PrimitivePokemon("nidoran♀", 185, BaseStats(43, 46, 41, 55)));
        primitives.push(PrimitivePokemon("nidorina", 245, BaseStats(58, 61, 56, 70)));
        primitives.push(PrimitivePokemon("nidoqueen", 335, BaseStats(83, 86, 76, 90)));
        primitives.push(PrimitivePokemon("nidoran♂", 184, BaseStats(48, 40, 50, 46)));
        primitives.push(PrimitivePokemon("nidorino", 245, BaseStats(63, 56, 65, 61)));
        primitives.push(PrimitivePokemon("nidoking", 335, BaseStats(93, 76, 85, 81)));
        primitives.push(PrimitivePokemon("clefairy", 213, BaseStats(52, 56, 35, 70)));
        primitives.push(PrimitivePokemon("clefable", 318, BaseStats(82, 81, 60, 95)));
        primitives.push(PrimitivePokemon("vulpix", 200, BaseStats(45, 52, 65, 38)));
        primitives.push(PrimitivePokemon("ninetales", 338, BaseStats(78, 87, 100, 73)));
        primitives.push(PrimitivePokemon("jigglypuff", 202, BaseStats(45, 22, 20, 115)));
        primitives.push(PrimitivePokemon("wigglytuff", 309, BaseStats(77, 47, 45, 140)));
        primitives.push(PrimitivePokemon("zubat", 169, BaseStats(37, 37, 55, 40)));
        primitives.push(PrimitivePokemon("golbat", 309, BaseStats(72, 72, 90, 75)));
        primitives.push(PrimitivePokemon("oddish", 197, BaseStats(62, 60, 30, 45)));
        primitives.push(PrimitivePokemon("gloom", 247, BaseStats(75, 72, 40, 60)));
        primitives.push(PrimitivePokemon("vileplume", 307, BaseStats(95, 87, 50, 75)));
        primitives.push(PrimitivePokemon("paras", 172, BaseStats(57, 55, 25, 35)));
        primitives.push(PrimitivePokemon("parasect", 247, BaseStats(77, 80, 30, 60)));
        primitives.push(PrimitivePokemon("venonat", 204, BaseStats(47, 52, 45, 60)));
        primitives.push(PrimitivePokemon("venomoth", 304, BaseStats(77, 67, 90, 70)));
        primitives.push(PrimitivePokemon("diglett", 185, BaseStats(45, 35, 95, 10)));
        primitives.push(PrimitivePokemon("dugtrio", 290, BaseStats(75, 60, 120, 35)));
        primitives.push(PrimitivePokemon("meowth", 209, BaseStats(42, 37, 90, 40)));
        primitives.push(PrimitivePokemon("persian", 309, BaseStats(67, 62, 115, 65)));
        primitives.push(PrimitivePokemon("psyduck", 212, BaseStats(58, 49, 55, 50)));
        primitives.push(PrimitivePokemon("golduck", 332, BaseStats(88, 79, 85, 80)));
        primitives.push(PrimitivePokemon("mankey", 207, BaseStats(57, 40, 70, 40)));
        primitives.push(PrimitivePokemon("primeape", 307, BaseStats(82, 65, 95, 65)));
        primitives.push(PrimitivePokemon("growlithe", 232, BaseStats(70, 47, 60, 55)));
        primitives.push(PrimitivePokemon("arcanine", 370, BaseStats(105, 80, 95, 90)));
        primitives.push(PrimitivePokemon("poliwag", 215, BaseStats(45, 40, 90, 40)));
        primitives.push(PrimitivePokemon("poliwhirl", 269, BaseStats(57, 57, 90, 65)));
        primitives.push(PrimitivePokemon("poliwrath", 334, BaseStats(82, 92, 70, 90)));
        primitives.push(PrimitivePokemon("abra", 212, BaseStats(62, 35, 90, 25)));
        primitives.push(PrimitivePokemon("kadabra", 272, BaseStats(77, 50, 105, 40)));
        primitives.push(PrimitivePokemon("alakazam", 337, BaseStats(92, 70, 120, 55)));
        primitives.push(PrimitivePokemon("machop", 204, BaseStats(57, 42, 35, 70)));
        primitives.push(PrimitivePokemon("machoke", 265, BaseStats(75, 65, 45, 80)));
        primitives.push(PrimitivePokemon("machamp", 324, BaseStats(97, 82, 55, 90)));
        primitives.push(PrimitivePokemon("bellsprout", 194, BaseStats(72, 32, 40, 50)));
        primitives.push(PrimitivePokemon("weepinbell", 254, BaseStats(87, 47, 55, 65)));
        primitives.push(PrimitivePokemon("victreebel", 319, BaseStats(102, 67, 70, 80)));
        primitives.push(PrimitivePokemon("tentacool", 222, BaseStats(45, 67, 70, 40)));
        primitives.push(PrimitivePokemon("tentacruel", 347, BaseStats(75, 92, 100, 80)));
        primitives.push(PrimitivePokemon("geodude", 180, BaseStats(55, 65, 20, 40)));
        primitives.push(PrimitivePokemon("graveler", 240, BaseStats(70, 80, 35, 55)));
        primitives.push(PrimitivePokemon("golem", 309, BaseStats(87, 97, 45, 80)));
        primitives.push(PrimitivePokemon("ponyta", 275, BaseStats(75, 60, 90, 50)));
        primitives.push(PrimitivePokemon("rapidash", 335, BaseStats(90, 75, 105, 65)));
        primitives.push(PrimitivePokemon("slowpoke", 209, BaseStats(52, 52, 15, 90)));
        primitives.push(PrimitivePokemon("slowbro", 307, BaseStats(87, 95, 30, 95)));
        primitives.push(PrimitivePokemon("magnemite", 197, BaseStats(65, 62, 45, 25)));
        primitives.push(PrimitivePokemon("magneton", 292, BaseStats(90, 82, 70, 50)));
        primitives.push(PrimitivePokemon("farfetch'd", 244, BaseStats(74, 58, 60, 52)));
        primitives.push(PrimitivePokemon("doduo", 210, BaseStats(60, 40, 75, 35)));
        primitives.push(PrimitivePokemon("dodrio", 320, BaseStats(85, 65, 110, 60)));
        primitives.push(PrimitivePokemon("seel", 217, BaseStats(45, 62, 45, 65)));
        primitives.push(PrimitivePokemon("dewgong", 317, BaseStats(70, 87, 70, 90)));
        primitives.push(PrimitivePokemon("grimer", 215, BaseStats(60, 50, 25, 80)));
        primitives.push(PrimitivePokemon("muk", 327, BaseStats(85, 87, 50, 105)));
        primitives.push(PrimitivePokemon("shellder", 187, BaseStats(55, 62, 40, 30)));
        primitives.push(PrimitivePokemon("cloyster", 322, BaseStats(90, 112, 70, 50)));
        primitives.push(PrimitivePokemon("gastly", 209, BaseStats(67, 32, 80, 30)));
        primitives.push(PrimitivePokemon("haunter", 272, BaseStats(82, 50, 95, 45)));
        primitives.push(PrimitivePokemon("gengar", 334, BaseStats(97, 67, 110, 60)));
        primitives.push(PrimitivePokemon("onix", 244, BaseStats(37, 102, 70, 35)));
        primitives.push(PrimitivePokemon("drowzee", 214, BaseStats(45, 67, 42, 60)));
        primitives.push(PrimitivePokemon("hypno", 317, BaseStats(73, 92, 67, 85)));
        primitives.push(PrimitivePokemon("krabby", 202, BaseStats(65, 57, 50, 30)));
        primitives.push(PrimitivePokemon("kingler", 302, BaseStats(90, 82, 75, 55)));
        primitives.push(PrimitivePokemon("voltorb", 234, BaseStats(42, 52, 100, 40)));
        primitives.push(PrimitivePokemon("electrode", 350, BaseStats(65, 75, 150, 60)));
        primitives.push(PrimitivePokemon("exeggcute", 212, BaseStats(50, 62, 40, 60)));
        primitives.push(PrimitivePokemon("exeggutor", 340, BaseStats(110, 80, 55, 95)));
        primitives.push(PrimitivePokemon("cubone", 202, BaseStats(45, 72, 35, 50)));
        primitives.push(PrimitivePokemon("marowak", 265, BaseStats(65, 95, 45, 60)));
        primitives.push(PrimitivePokemon("hitmonlee", 295, BaseStats(77, 81, 87, 50)));
        primitives.push(PrimitivePokemon("hitmonchan", 290, BaseStats(70, 94, 76, 50)));
        primitives.push(PrimitivePokemon("lickitung", 252, BaseStats(57, 75, 30, 90)));
        primitives.push(PrimitivePokemon("koffing", 207, BaseStats(62, 70, 35, 40)));
        primitives.push(PrimitivePokemon("weezing", 307, BaseStats(87, 95, 60, 65)));
        primitives.push(PrimitivePokemon("rhyhorn", 224, BaseStats(57, 62, 25, 80)));
        primitives.push(PrimitivePokemon("rhydon", 314, BaseStats(87, 82, 40, 105)));
        primitives.push(PrimitivePokemon("chansey", 375, BaseStats(20, 55, 50, 250)));
        primitives.push(PrimitivePokemon("tangela", 279, BaseStats(77, 77, 60, 65)));
        primitives.push(PrimitivePokemon("kangaskhan", 342, BaseStats(67, 80, 90, 105)));
        primitives.push(PrimitivePokemon("horsea", 192, BaseStats(55, 47, 60, 30)));
        primitives.push(PrimitivePokemon("seadra", 290, BaseStats(80, 70, 85, 55)));
        primitives.push(PrimitivePokemon("goldeen", 214, BaseStats(51, 55, 63, 45)));
        primitives.push(PrimitivePokemon("seaking", 298, BaseStats(78, 72, 68, 80)));
        primitives.push(PrimitivePokemon("staryu", 227, BaseStats(57, 55, 85, 30)));
        primitives.push(PrimitivePokemon("starmie", 347, BaseStats(87, 85, 115, 60)));
        primitives.push(PrimitivePokemon("mr. mime", 294, BaseStats(72, 92, 90, 40)));
        primitives.push(PrimitivePokemon("scyther", 337, BaseStats(82, 80, 105, 70)));
        primitives.push(PrimitivePokemon("jynx", 307, BaseStats(82, 65, 95, 65)));
        primitives.push(PrimitivePokemon("electabuzz", 330, BaseStats(89, 71, 105, 65)));
        primitives.push(PrimitivePokemon("magmar", 326, BaseStats(97, 71, 93, 65)));
        primitives.push(PrimitivePokemon("pinsir", 325, BaseStats(90, 85, 85, 65)));
        primitives.push(PrimitivePokemon("tauros", 337, BaseStats(70, 82, 110, 75)));
        primitives.push(PrimitivePokemon("magikarp", 149, BaseStats(12, 37, 80, 20)));
        primitives.push(PrimitivePokemon("gyarados", 357, BaseStats(92, 89, 81, 95)));
        primitives.push(PrimitivePokemon("lapras", 362, BaseStats(85, 87, 60, 130)));
        primitives.push(PrimitivePokemon("ditto", 192, BaseStats(48, 48, 48, 48)));
        primitives.push(PrimitivePokemon("eevee", 217, BaseStats(50, 57, 55, 55)));
        primitives.push(PrimitivePokemon("vaporeon", 359, BaseStats(87, 77, 65, 130)));
        primitives.push(PrimitivePokemon("jolteon", 359, BaseStats(87, 77, 130, 65)));
        primitives.push(PrimitivePokemon("flareon", 327, BaseStats(112, 85, 65, 65)));
        primitives.push(PrimitivePokemon("porygon", 249, BaseStats(72, 72, 40, 65)));
        primitives.push(PrimitivePokemon("omanyte", 212, BaseStats(65, 77, 35, 35)));
        primitives.push(PrimitivePokemon("omastar", 309, BaseStats(87, 97, 55, 70)));
        primitives.push(PrimitivePokemon("kabuto", 219, BaseStats(67, 67, 55, 30)));
        primitives.push(PrimitivePokemon("kabutops", 317, BaseStats(90, 87, 80, 60)));
        primitives.push(PrimitivePokemon("aerodactyl", 362, BaseStats(82, 70, 130, 80)));
        primitives.push(PrimitivePokemon("snorlax", 364, BaseStats(87, 87, 30, 160)));
        primitives.push(PrimitivePokemon("articuno", 377, BaseStats(90, 112, 85, 90)));
        primitives.push(PrimitivePokemon("zapdos", 384, BaseStats(107, 87, 100, 90)));
        primitives.push(PrimitivePokemon("moltres", 379, BaseStats(112, 87, 90, 90)));
        primitives.push(PrimitivePokemon("dratini", 195, BaseStats(57, 47, 50, 41)));
        primitives.push(PrimitivePokemon("dragonair", 275, BaseStats(77, 67, 70, 61)));
        primitives.push(PrimitivePokemon("dragonite", 385, BaseStats(117, 97, 80, 91)));
        primitives.push(PrimitivePokemon("mewtwo", 458, BaseStats(132, 90, 130, 106)));
        primitives.push(PrimitivePokemon("mew", 400, BaseStats(100, 100, 100, 100)));

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