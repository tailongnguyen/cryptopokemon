App = {
    web3Provider: null,
    myAccount: null,
    contract_address: "0x2e2d10b41b7c8ddb995568a87185428d9a513ead",
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
                        "type": "uint256"
                    },
                    {
                        "name": "_evolution",
                        "type": "uint256"
                    },
                    {
                        "name": "_dna",
                        "type": "uint32"
                    },
                    {
                        "name": "_level",
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
                "constant": false,
                "inputs": [],
                "name": "callWildPokemon",
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
                "inputs": [],
                "name": "countDownTime",
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
                "name": "primitives",
                "outputs": [
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "catchRate",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "name": "attack",
                                "type": "uint32"
                            },
                            {
                                "name": "defense",
                                "type": "uint32"
                            },
                            {
                                "name": "speed",
                                "type": "uint32"
                            },
                            {
                                "name": "hp",
                                "type": "uint32"
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
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "wildPokemons",
                "outputs": [
                    {
                        "name": "primitiveId",
                        "type": "uint256"
                    },
                    {
                        "name": "level",
                        "type": "uint32"
                    },
                    {
                        "name": "fledded",
                        "type": "uint256"
                    },
                    {
                        "name": "capturable",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
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
                        "name": "_primitiveId",
                        "type": "uint256"
                    }
                ],
                "name": "createStarter",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
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
                "constant": false,
                "inputs": [
                    {
                        "name": "_wildPokemonId",
                        "type": "uint256"
                    }
                ],
                "name": "capturePokemon",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": true,
                "stateMutability": "payable",
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
                        "type": "uint256"
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
                        "name": "primitiveId",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "name": "attack",
                                "type": "uint32"
                            },
                            {
                                "name": "defense",
                                "type": "uint32"
                            },
                            {
                                "name": "speed",
                                "type": "uint32"
                            },
                            {
                                "name": "hp",
                                "type": "uint32"
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
                        "type": "uint32"
                    },
                    {
                        "name": "_defense",
                        "type": "uint32"
                    },
                    {
                        "name": "_speed",
                        "type": "uint32"
                    },
                    {
                        "name": "_hp",
                        "type": "uint32"
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
                "constant": false,
                "inputs": [
                    {
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "name": "_catchRate",
                        "type": "uint256"
                    },
                    {
                        "name": "_attack",
                        "type": "uint32"
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
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "name": "_attack",
                        "type": "uint32"
                    },
                    {
                        "name": "_defense",
                        "type": "uint32"
                    },
                    {
                        "name": "_speed",
                        "type": "uint32"
                    },
                    {
                        "name": "_hp",
                        "type": "uint32"
                    }
                ],
                "name": "addFood",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
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
                        "type": "uint32"
                    },
                    {
                        "name": "_defense",
                        "type": "uint32"
                    },
                    {
                        "name": "_speed",
                        "type": "uint32"
                    },
                    {
                        "name": "_hp",
                        "type": "uint32"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
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
                "constant": true,
                "inputs": [
                    {
                        "name": "idx",
                        "type": "uint256"
                    }
                ],
                "name": "getPokemonDetails",
                "outputs": [
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
                    },
                    {
                        "name": "_primitiveId",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
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
                    }
                ],
                "name": "evolve",
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
                        "indexed": false,
                        "name": "_pokemonId",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "PokemonCaptured",
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
                        "type": "uint32[]"
                    }
                ],
                "name": "PokemonBattle",
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
                        "name": "_pokemonId",
                        "type": "uint256"
                    }
                ],
                "name": "PokemonEvolve",
                "type": "event"
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
            }
        ]);
        return App.initContract();
    },

    initContract: function () {
        var contractInstance = App.MyContract.at(App.contract_address);
        App.myAccount = web3.eth.accounts[0];
        App.contractInstance = contractInstance;        
        
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
