App = {
  web3Provider: null,
  myAccount: null,
  contracts_address: "0xe6769a0049b7d3b0b9eb776c606d0bf16c4e17e4", //0xd1790491fc546debf76f8fb5f9b6145e1d02605d
  initWeb3: function() {
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
        "constant": true,
        "inputs": [],
        "name": "endingTime",
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
        "name": "totalGains",
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
        "name": "reversePrice",
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
        "name": "name",
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
        "inputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "name": "assetsInfo",
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
        "name": "units",
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
        "name": "getVariables",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "bytes32"
          },
          {
            "name": "",
            "type": "address"
          },
          {
            "name": "",
            "type": "address[]"
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
            "name": "add",
            "type": "address"
          }
        ],
        "name": "getAssetsInfo",
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
        "name": "firstPrice",
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
        "name": "winners",
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
        "inputs": [],
        "name": "currentPrice",
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
            "type": "address"
          }
        ],
        "name": "winnerInfo",
        "outputs": [
          {
            "name": "units",
            "type": "uint256"
          },
          {
            "name": "bid",
            "type": "uint256"
          },
          {
            "name": "change",
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
        "name": "beneficiary",
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
            "name": "add",
            "type": "address"
          }
        ],
        "name": "getWinnerInfo",
        "outputs": [
          {
            "components": [
              {
                "name": "units",
                "type": "uint256"
              },
              {
                "name": "bid",
                "type": "uint256"
              },
              {
                "name": "change",
                "type": "uint256"
              }
            ],
            "name": "",
            "type": "tuple"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "winners",
            "type": "address[]"
          }
        ],
        "name": "AuctionEnded",
        "type": "event"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "withdraw",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "HighestBidDecreased",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "add",
            "type": "address"
          }
        ],
        "name": "TestAddress",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "TestValue",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "winner",
            "type": "address"
          }
        ],
        "name": "UnitsDecreased",
        "type": "event"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "price",
            "type": "uint256"
          }
        ],
        "name": "lower",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "auctionEnd",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "numberOfUnits",
            "type": "uint256"
          }
        ],
        "name": "bid",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "_name",
            "type": "bytes32"
          },
          {
            "name": "_biddingTime",
            "type": "uint256"
          },
          {
            "name": "_units",
            "type": "uint256"
          },
          {
            "name": "_firstPrice",
            "type": "uint256"
          },
          {
            "name": "_reversePrice",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
      }
    ]);
    return App.initContract();
  },

  initContract: function() {
    var auctionInstance = App.MyContract.at(App.contracts_address);
    auctionInstance.getVariables.call(function(error, variables) {
      if (error) {
        console.log("Error initializing contract!");
        console.log(error);
      }  
      else {
        var name = variables[7];
        for (let i = name.length-1; i > -1; i--) {
          if (name[i] != '0') {
            name = name.substring(0, i+1);
            break;
          }
        }
        
        var variables = {
          'name': web3.toAscii(name),
          'now': variables[0]['c'][0],
          'endingTime': variables[1]['c'][0],
          'firstPrice': variables[2]['c'][0],
          'reversePrice': variables[3]['c'][0],
          'totalGains': variables[4]['c'][0],
          'unitsLeft': variables[5]['c'][0],
          'currentPrice': variables[6]['c'][0],
          'beneficiary': variables[8],
          'winners': variables[9],
        };
        console.log(variables);

        var panel = $('.panel-body');
    
        panel.find('img').attr('src', '../images/chocopie.jpeg');
        panel.find('.remainingTime').text(variables['endingTime'] - variables['now']);
        panel.find('.currentPrice').text(variables['currentPrice']);
        panel.find('.unitsLeft').text(variables['unitsLeft']);
        panel.find('.reversePrice').text(variables['reversePrice']);
        
        App.myAccount = web3.eth.accounts[0];
        if (App.myAccount == variables['beneficiary']) {
          panel.find('.my-btn').text('LOWER');
          panel.find('input').attr("placeholder", "New price");
          panel.find('.input-group-addon').text("ETH");
          App.bindEvents(0);
        }
        else {
          console.log("Not owner!");
          
          panel.find('.my-btn').text('BID');
          panel.find('input').attr("placeholder", "Number of units to bid");
          panel.find('.input-group-addon').text("Units");
          App.bindEvents(1);
        }
      }
    })
    return App.markBidded();
  },

  bindEvents: function(mode) {
    if (mode == 0) {
      $(document).on('click', '.my-btn', App.handleLower); 
    }
    else {
      $(document).on('click', '.my-btn', App.handleBid);
    }
  },

  markBidded: function() {
    console.log("Marking bidded!");
    var auctionInstance = App.MyContract.at(App.contracts_address);

  },

  handleLower: function(event) {
    event.preventDefault();

    var auctionInstance = App.MyContract.at(App.contracts_address);
    var panel = $(".panel-body");
    var currentPrice = parseInt(panel.find('.currentPrice').text());
    var nextPrice = parseInt(panel.find("input").val());

    if (nextPrice >= currentPrice) {
      console.log("Oops!");
      
      $('.modal-btn').click();
    }
    else {
      console.log("Changing value to " + nextPrice.toString());
      auctionInstance.lower(nextPrice, function (error, result) {
        if (!error)
        console.log(result);
      else
        console.log(error);
      })
    }
  },

  handleBid: function() {
    event.preventDefault();

    var auctionInstance = App.MyContract.at(App.contracts_address);
    var panel = $('.panel-body');
    var currentPrice = parseInt(panel.find('.currentPrice').text());
    var units = parseInt(panel.find("input").val());
 
    console.log("Bidding with " + (web3.toWei(currentPrice * units, 'ether')).toString());
    
    auctionInstance.bid(web3.eth.currentPrice * units, {
                                              gas: 300000,
                                              from: App.myAccount,
                            value: web3.toWei(currentPrice * units, 'ether')}, 
                                              function (error, result) {
    if (!error)
      console.log(result)
    else
      console.log(error);
    });
  }

};

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
});
