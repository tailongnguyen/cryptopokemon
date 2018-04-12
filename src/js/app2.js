App = {
    web3Provider: null,
    myAccount: null,
    contract_address: "0x1b0854594edfa67b046290631224da71abb2d734",
    contractInstance: null,
    initWeb3: function () {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);
        App.MyContract = web3.eth.contract([
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "name": "_attack",
                        "type": "uint8"
                    },
                    {
                        "name": "_defense",
                        "type": "uint8"
                    },
                    {
                        "name": "_speed",
                        "type": "uint8"
                    },
                    {
                        "name": "_hp",
                        "type": "uint8"
                    }
                ],
                "name": "addFood",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "name": "_attack",
                        "type": "uint8"
                    },
                    {
                        "name": "_defense",
                        "type": "uint8"
                    },
                    {
                        "name": "_speed",
                        "type": "uint8"
                    },
                    {
                        "name": "_hp",
                        "type": "uint8"
                    }
                ],
                "name": "addPrimitive",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "pokemonId",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "name": "dna",
                        "type": "uint32"
                    }
                ],
                "name": "NewPokemon",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "_pokemonId",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "_level",
                        "type": "uint32"
                    }
                ],
                "name": "PokemonLevelUp",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "_id1",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "_id2",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "turns",
                        "type": "uint8[]"
                    }
                ],
                "name": "PokemonBattle",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "_approved",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_pokemonId",
                        "type": "uint256"
                    },
                    {
                        "name": "_targetId",
                        "type": "uint256"
                    }
                ],
                "name": "attack",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_pokemonId",
                        "type": "uint256"
                    },
                    {
                        "name": "_newNickName",
                        "type": "string"
                    }
                ],
                "name": "changeNickName",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_name",
                        "type": "string"
                    }
                ],
                "name": "createRandomPokemon",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_pokemonId",
                        "type": "uint256"
                    },
                    {
                        "name": "_foodName",
                        "type": "string"
                    }
                ],
                "name": "feed",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_pokemonId",
                        "type": "uint256"
                    }
                ],
                "name": "levelUpByMoney",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_fee",
                        "type": "uint256"
                    }
                ],
                "name": "setLevelUpFee",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "takeOwnership",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "withdraw",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "name": "_balance",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "idx",
                        "type": "uint256"
                    }
                ],
                "name": "getPokemonInfo",
                "outputs": [
                    {
                        "name": "_nickName",
                        "type": "string"
                    },
                    {
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "name": "_nature",
                        "type": "bytes32"
                    },
                    {
                        "name": "_dna",
                        "type": "uint32"
                    },
                    {
                        "name": "_level",
                        "type": "uint32"
                    },
                    {
                        "name": "_readyTime",
                        "type": "uint32"
                    },
                    {
                        "name": "_lvTh",
                        "type": "uint32"
                    },
                    {
                        "name": "_exp",
                        "type": "uint32"
                    },
                    {
                        "name": "_win",
                        "type": "uint32"
                    },
                    {
                        "name": "_loss",
                        "type": "uint32"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "getPokemonsByOwner",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "idx",
                        "type": "uint256"
                    }
                ],
                "name": "getPokemonStats",
                "outputs": [
                    {
                        "name": "_attack",
                        "type": "uint8"
                    },
                    {
                        "name": "_defense",
                        "type": "uint8"
                    },
                    {
                        "name": "_speed",
                        "type": "uint8"
                    },
                    {
                        "name": "_hp",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getPopulation",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "idx",
                        "type": "uint256"
                    }
                ],
                "name": "getPrimitive",
                "outputs": [
                    {
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "name": "_attack",
                        "type": "uint8"
                    },
                    {
                        "name": "_defense",
                        "type": "uint8"
                    },
                    {
                        "name": "_speed",
                        "type": "uint8"
                    },
                    {
                        "name": "_hp",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getPrimitivesSize",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "natures",
                "outputs": [
                    {
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "ownerOf",
                "outputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "ownerPokemonCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "pokemons",
                "outputs": [
                    {
                        "name": "nickName",
                        "type": "string"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "nature",
                        "type": "bytes32"
                    },
                    {
                        "name": "dna",
                        "type": "uint32"
                    },
                    {
                        "name": "level",
                        "type": "uint32"
                    },
                    {
                        "name": "readyTime",
                        "type": "uint32"
                    },
                    {
                        "name": "levelThreshold",
                        "type": "uint32"
                    },
                    {
                        "name": "exp",
                        "type": "uint32"
                    },
                    {
                        "name": "winCount",
                        "type": "uint16"
                    },
                    {
                        "name": "lossCount",
                        "type": "uint16"
                    },
                    {
                        "components": [
                            {
                                "name": "attack",
                                "type": "uint8"
                            },
                            {
                                "name": "defense",
                                "type": "uint8"
                            },
                            {
                                "name": "speed",
                                "type": "uint8"
                            },
                            {
                                "name": "hp",
                                "type": "uint8"
                            }
                        ],
                        "name": "stats",
                        "type": "tuple"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "pokemonToOwner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "primitives",
                "outputs": [
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "components": [
                            {
                                "name": "attack",
                                "type": "uint8"
                            },
                            {
                                "name": "defense",
                                "type": "uint8"
                            },
                            {
                                "name": "speed",
                                "type": "uint8"
                            },
                            {
                                "name": "hp",
                                "type": "uint8"
                            }
                        ],
                        "name": "stats",
                        "type": "tuple"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ]);
        return App.initContract();
    },

    initContract: function () {
        var contractInstance = App.MyContract.at(App.contract_address);
        App.myAccount = web3.eth.accounts[0];
        console.log("Your account is " + App.myAccount);
        
        
        App.contractInstance = contractInstance;

        App.contractInstance.getPopulation.call(function (error, result) {
            if (!error) {
                console.log("Population: " + result.toString());
                var row = $(".pokemonList");
                for (let i = 0; i < result; i++) {
                    var pokemon_template = $('.pokemonHolder').clone();
                    pokemon_template.find(".pokemonTemplate").attr("class", "pokemonTemplate col-lg-4 col-sm-6 text-center mb-4 pokemon_" + i.toString());
                    pokemon_template.find(".pokemonTemplate").attr("style", "display: block;");
                    // pokemon_template.find('img').attr("src", "https://ih0.redbubble.net/image.238999342.2817/flat,800x800,075,t.u1.jpg");
                    row.append(pokemon_template.clone().html());
                }
            }
            else {
                console.log(error);

            }

            for (let i = 0; i < result; i++) {
                App.contractInstance.getPokemonInfo.call(i, function (error, info) {
                    if (!error){
                        console.log("Pokemon number " + i);
                        $(".pokemon_" + i).find(".pokemonName").text(info[0] + " (" + info[1] + ")");
                        $(".pokemon_" + i).find(".pokemonNature").text(info[2]);
                        $(".pokemon_" + i).find("img").attr("src", "https://img.pokemondb.net/artwork/" + info[1] + ".jpg");
                    }
                    else{
                        console.log(error);
                        
                    }
                })
                
            }
        })
        

        var newPokemonEvent = App.contractInstance.NewPokemon();
        var pokemonLevelUpEvent = App.contractInstance.PokemonLevelUp();
        var pokemonBattleEvent = App.contractInstance.PokemonBattle();

        newPokemonEvent.watch(function (error, result){
            if (!error) {
                console.log("New pokemon: " + result.args.pokemonId + " " +  result.args.name + " " + result.args.dna);
                
            }
            else {
                console.log(error);

            }
        });

        pokemonLevelUpEvent.watch(function (error, result) {
            if (!error) {
                console.log("Pokemon number " + result.args._pokemonId + " has reached a new level of " + result.args._level);

            }
            else {
                console.log(error);

            }
        });        

        pokemonBattleEvent.watch(function (error, result) {
            if (!error) {
                console.log("Pokemon number " + result.args._id1 + " has fighted with pokemon number " + result.args._id2 + " and the winner is " + result.args._winner);
                console.log(result.args.turns);
                
            }
            else {
                console.log(error);

            }
        });        
    }
    ,
    getPokemon: function (idx) {
        App.contractInstance.getPokemonInfo.call(idx, function (error, result) {
            if (!error){
                console.log(result);
                
            }
            else{
                console.log(error);
                
            }
        })
    }

};

$(function () {
    $(window).on("load", function () {
        App.initWeb3();
    });
});
