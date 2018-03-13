App = {
  web3Provider: null,
  myAccount: null,
  contracts_address: "0x664decae427ba04b09a71253bfe73bd6c17fdfac", 
  // contracts_address: "0x5f3b6a98a5ec4bd9d185b05a541bc7a3fcc55c6a", 
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
        "constant": false,
        "inputs": [],
        "name": "auctionEnd",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
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
        "name": "getVariables",
        "outputs": [
          {
            "name": "",
            "type": "bool"
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
            "indexed": false,
            "name": "winner",
            "type": "address"
          }
        ],
        "name": "UnitsDecreased",
        "type": "event"
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
        var name = variables[8];
        for (let i = name.length-1; i > -1; i--) {
          if (name[i] != '0') {
            name = name.substring(0, i+1);
            break;
          }
        }
        
        var variables = {
          'name': web3.toAscii(name),
          'now': variables[1]['c'][0],
          'endingTime': variables[2]['c'][0],
          'firstPrice': variables[3]['c'][0]/1000,
          'reversePrice': variables[4]['c'][0]/1000,
          'totalGains': variables[5]['c'][0],
          'unitsLeft': variables[6]['c'][0],
          'currentPrice': variables[7]['c'][0]/1000,
          'beneficiary': variables[9],
          'winners': variables[10],
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
          panel.find('.alert').text("Only " + variables['unitsLeft'].toString() + " left!");
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
    var currentPrice = parseFloat(panel.find('.currentPrice').text());
    var nextPrice = parseFloat(panel.find("input").val());

    if (nextPrice >= currentPrice) {
      console.log("Oops!");
      
      $('.modal-btn').click();
    }
    else {
      console.log("Changing value to " + parseInt(nextPrice * 1000).toString());
      auctionInstance.lower(parseInt(nextPrice * 1000), function (error, result) {
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
    var currentPrice = parseFloat(panel.find('.currentPrice').text());
    var unitsLeft = parseInt(panel.find('.unitsLeft').text());
    var units = parseInt(panel.find("input").val());

    if (units > unitsLeft) {
      console.log("Oops!");
      $('.modal-btn').click();
    }
    else {
      console.log("Bidding with " + (web3.toWei(currentPrice * units, 'ether')).toString());
      
      auctionInstance.bid(units, {
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
  }

};

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
});
