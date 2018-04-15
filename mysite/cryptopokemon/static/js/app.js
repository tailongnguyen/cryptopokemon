App = {
    web3Provider: null,
    myAccount: null,
    // contracts_address: "0xa87f262938420a8ac8d651bdfcf34ae36351210e",
    // contracts_address: "0x41ac36fb95236e776baa8c8e4cd7ee3e2f00344b",
    contracts_address: "0xe4c1f8b0b54831f36602dde3f82eee835ef0bb32",
    auctionInstance: null,
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
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "idx",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "beneficiary",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "assetname",
                        "type": "bytes32"
                    },
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
                "inputs": [
                    {
                        "name": "idx",
                        "type": "uint256"
                    }
                ],
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
                        "name": "idx",
                        "type": "uint256"
                    },
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
                "constant": false,
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
                "name": "createAuction",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "idx",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "name",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "beneficiary",
                        "type": "address"
                    }
                ],
                "name": "AuctionCreated",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "idx",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "units",
                        "type": "uint256"
                    },
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
                        "name": "idx",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "PriceDecreased",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "idx",
                        "type": "uint256"
                    },
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
                "payable": true,
                "stateMutability": "payable",
                "type": "fallback"
            },
            {
                "inputs": [
                    {
                        "name": "_creationFee",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "name": "assetNames",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
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
                        "type": "bytes32"
                    }
                ],
                "name": "auctionNames",
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
                "name": "auctions",
                "outputs": [
                    {
                        "name": "beneficiary",
                        "type": "address"
                    },
                    {
                        "name": "assetName",
                        "type": "bytes32"
                    },
                    {
                        "name": "units",
                        "type": "uint256"
                    },
                    {
                        "name": "firstPrice",
                        "type": "uint256"
                    },
                    {
                        "name": "reversePrice",
                        "type": "uint256"
                    },
                    {
                        "name": "endingTime",
                        "type": "uint256"
                    },
                    {
                        "name": "currentPrice",
                        "type": "uint256"
                    },
                    {
                        "name": "totalGains",
                        "type": "uint256"
                    },
                    {
                        "name": "ended",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "creationFee",
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
                    },
                    {
                        "name": "name",
                        "type": "bytes32"
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
                "inputs": [
                    {
                        "name": "idx",
                        "type": "uint256"
                    },
                    {
                        "name": "add",
                        "type": "address"
                    }
                ],
                "name": "getAssetsInfoByIdx",
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
                "name": "getAuctionsCount",
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
                "name": "getPriceInfo",
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
                "name": "getTimeInfo",
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
                    },
                    {
                        "name": "name",
                        "type": "bytes32"
                    }
                ],
                "name": "getWinnerInfo",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ]);
        return App.initContract();
    },

    byte2string: function (bytes) {
        for (let i = bytes.length - 1; i > -1; i--) {
            if (bytes[i] != '0') {
                bytes = bytes.substring(0, i + 1);
                return web3.toAscii(bytes);
            }
        }  
    },

    timestamp2date: function (unix_timestamp) {
        var date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    },

    timestampConvert: function (value) {
        String.format = function () {
            var s = arguments[0];
            for (var i = 0; i < arguments.length - 1; i += 1) {
                var reg = new RegExp('\\{' + i + '\\}', 'gm');
                s = s.replace(reg, arguments[i + 1]);
            }
            return s;
        };
        if (value <= 0) {
            return String.format("{0}h:{1}m:{2}s", 0, 0, 0);
        }
        hours = Math.floor(value / 3600);
        minutes = Math.floor((value - hours * 3600)/60);
        seconds = value % 60;
        return String.format("{0}h:{1}m:{2}s", hours, minutes, seconds);
    },

    initContract: function () {
        var auctionInstance = App.MyContract.at(App.contracts_address);
        App.auctionInstance = auctionInstance;
        App.auctionInstance.getAuctionsCount.call(function (error, count) {
            if (error) {
                console.log("Error initializing contract!");
                console.log(error);
            }
            else {
                console.log("Number of active auctions: " + count.toString());
                
                var row = $("#objects-row");
                for (let i = 0; i < count; i++) {
                    var object_template = $('.holder').clone(); 
                    object_template.find('#objectTemplate').attr("class", "object_" + i.toString());
                    object_template.find('#objectTemplate').attr("style", "display: inline;");
                    object_template.find('.my-btn').attr("id", "my-btn_" + i.toString());
                    row.append(object_template.clone().html());
                }
                
                for (let i = 0; i < count; i++) {
                    console.log("Auction number " + i.toString());
                    // var object_template = $(".object_" + i.toString());
                    App.auctionInstance.getTimeInfo.call(i, function (error, results) {
                        console.log("Callback time " + i.toString());
                        if (!error) {
                            console.log(results);
                            if (!results[0]) {
                                $(".object_" + i.toString()).find(".w3-badge").text("Open");
                                $(".object_" + i.toString()).find(".w3-badge").attr("class", "w3-badge w3-green");
                            }
                            else{
                                $(".object_" + i.toString()).find(".w3-badge").text("Closed");
                                $(".object_" + i.toString()).find(".w3-badge").attr("class", "w3-badge w3-red");
                            }
                            // var remainingTime = Math.max(0, parseInt(results[2]['c'][0] - results[1]['c'][0]));
                            var endingTime = parseInt(results[2]['c'][0]);
                            
                            var x = setInterval(function () {
                                var now = parseInt(new Date().getTime()/1000);
                                var remainingTime = endingTime - now;
                                $(".object_" + i.toString()).find(".remainingTime").text(App.timestampConvert(remainingTime));
                                if (remainingTime <= 0) {
                                    clearInterval(x);
                                    $(".object_" + i.toString()).find('.my-btn').attr("disabled", true);
                                    if (!results[0]){
                                        $(".object_" + i.toString()).find(".w3-badge").text("Timeout");
                                    }
                                    App.bindCloseEvent(i);
                                }
                            }, 1000);
                        }
                        else {
                            console.log(error);
                        }
                    });

                    App.auctionInstance.getPriceInfo.call(i, function (error, results) {
                        console.log("Callback price " + i.toString());
                        
                        if (!error) {
                            console.log(results);
                            $(".object_" + i.toString()).find(".firstPrice").text(results[0]['c'][0].toString()[0] * (10 ** results[0]['e']/ 1e18));
                            $(".object_" + i.toString()).find(".reversePrice").text(results[1]['c'][0].toString()[0] * (10 ** results[1]['e']/ 1e18));
                            $(".object_" + i.toString()).find(".currentPrice").text(results[2]['c'][0].toString()[0] * (10 ** results[2]['e']/ 1e18));
                        }
                        else {
                            console.log(error);
                        }

                    });

                    App.auctionInstance.getVariables.call(i, function (error, variables) {
                        console.log("Callback variables " + i.toString());
                        
                        if (!error) {
                            console.log("Name: " + App.byte2string(variables[2]));
                            console.log("Units left: " + variables[0]['c'][0]);
                            console.log("Beneficiary: " + variables[3]);
                            console.log("Winners: " + variables[4]);
                            
                            $(".object_" + i.toString()).find(".panel-title").text(App.byte2string(variables[2]));
                            $(".object_" + i.toString()).find(".unitsLeft").text(variables[0]['c'][0]);
                            $(".object_" + i.toString()).find(".beneficiary").text(variables[3]);
                            $(".object_" + i.toString()).find(".winners-tooltip").attr('title', variables[4]);
                            $(".object_" + i.toString()).find(".winner-badge").text(variables[4].length);

                            
                            App.myAccount = web3.eth.accounts[0];
                            console.log(App.myAccount);
                            
                            if (App.myAccount == $(".object_" + i.toString()).find('.beneficiary').text()) {
                                console.log("You are owner of auction number " + i.toString());

                                $(".object_" + i.toString()).find('.my-btn').text('LOWER');
                                $(".object_" + i.toString()).find('input').attr("placeholder", "New price");
                                $(".object_" + i.toString()).find('.input-group-addon').text("ETH");
                                $(".object_" + i.toString()).find('.alert').text("You should set a lower price than the current one.");
                                App.bindEvents(0, i);
                            }
                            else {
                                console.log("You are not the owner of auction number " + i.toString());
                                $(".object_" + i.toString()).find('.my-btn').text('BID');
                                $(".object_" + i.toString()).find('input').attr("placeholder", "Number of units to bid");
                                $(".object_" + i.toString()).find('.input-group-addon').text("Units");
                                $(".object_" + i.toString()).find('.alert').text("Only " + $(".object_" + i.toString()).find('unitsLeft').text() + " left!");
                                App.bindEvents(1, i);
                            }
                        }
                        else {
                            console.log(error);
                        }
                    });

                }
            }
        })
        $('.add-btn').click(function () {
            var name = $("#myModalForm").find("#name").val();
            var time = $("#myModalForm").find("#time").val();
            var units = $("#myModalForm").find("#units").val();
            var fp = $("#myModalForm").find("#firstPrice").val();
            var rp = $("#myModalForm").find("#reversePrice").val();
            
            if (time <= 0 || units <= 0 || rp > fp){
                alert("Oops!");
            }
            else{
                App.auctionInstance.creationFee.call(function (error, result) {
                    if (!error){
                        App.auctionInstance.createAuction(name, parseInt(time), parseInt(units), parseInt(web3.toWei(fp, 'ether')), parseInt(web3.toWei(rp, 'ether')), 
                                                    {
                                                        gas: 300000,
                                                        from: App.myAccount,
                                                        value: result,
                                                    }, function (err, res) {
                                                        if (!err)
                                                            console.log(res);
                                                        else
                                                            console.log(err);
                                                    });
                    }
                    else{
                        console.log(error);
                        
                    }
                });
                $("#myModalForm").find('.dismiss-form').click();
            }
        })
        $(".asset-btn").click(function () {
            var name = $(".asset-input").val();
            if (name == "") {
                window.createNotification({
                    closeOnClick: true,
                    displayCloseButton: false,
                    positionClass: 'nfc-top-right',
                    showDuration: 10000,
                    theme: 'warning'
                })({
                    title: "Warning",
                    message: "You should specify what you are looking for, dumbass!"
                });
            }
            else{
                App.auctionInstance.getAssetsInfo.call(App.myAccount, name, function (error, result) {
                    if (!error){
                        $(".asset-count").text("Number :" + result);
                    }
                    else{
                        console.log(error);
                        
                    }
                })
            }
        })
        return App.eventWatch();
    },

    eventWatch: function () {
        
        var priceEvent = App.auctionInstance.PriceDecreased();
        var unitEvent = App.auctionInstance.UnitsDecreased();
        var endEvent = App.auctionInstance.AuctionEnded();
        var addEvent = App.auctionInstance.AuctionCreated();

        priceEvent.watch(function (error, result) {
            if (!error){
                // console.log("Price of auction " + result.args.idx + "th has been lowered to " + result.args.amount);
                window.createNotification({
                    closeOnClick: true,
                    displayCloseButton: false,
                    positionClass: 'nfc-top-right',
                    showDuration: 10000,
                    theme: 'info'
                })({
                    title: "Notification",
                    message: "Price of auction " + result.args.idx + "th has been lowered to " + result.args.amount / 1e18
                });
                $(".object_" + result.args.idx.toString()).find(".currentPrice").text(result.args.amount / 1e18);
                $(".object_" + result.args.idx.toString()).find('.my-btn').find("svg").remove();
            }
            else {
                console.log(error);
                
            }
        });

        unitEvent.watch(function (error, result) {
            if (!error){
                // console.log(result.args.winner + "has successfully bought some units of auction number" + result.args.idx);
                var _message;
                var _theme;
                if (result.args.winner == App.myAccount) {
                    _message = "Bidding success!";
                    _theme = 'success';
                }
                else{
                    _message = "Someone has successfully bought some units of auction number" + result.args.idx;
                    _theme = 'warning';
                }
                window.createNotification({
                    closeOnClick: true,
                    displayCloseButton: false,
                    positionClass: 'nfc-top-right',
                    showDuration: 10000,
                    theme: _theme
                })({
                    title: "Notification",
                    message: _message
                });
                $(".object_" + result.args.idx.toString()).find(".unitsLeft").text(result.args.units);
                $(".object_" + result.args.idx.toString()).find('.my-btn').find("svg").remove();
            }
            else {
                console.log(error);
                
            }
        });

        endEvent.watch(function (error, result) {
            if (!error){
                console.log("Auction number " + result.args.idx + " has been closed");
                window.createNotification({
                    closeOnClick: true,
                    displayCloseButton: false,
                    positionClass: 'nfc-top-right',
                    showDuration: 10000,
                    theme: 'error'
                })({
                    title: "Notification",
                    message: "Auction number " + result.args.idx + " has been closed"
                });
                if ($(".object_" + result.args.idx.toString()).find(".beneficiary").text() != App.myAccount){
                    $(".object_" + result.args.idx.toString()).find(".w3-badge").text("Closed");
                    $(".object_" + result.args.idx.toString()).find(".w3-badge").attr("class", "w3-badge w3-red");
                }
                else{
                    $(".object_" + result.args.idx.toString()).find(".close-btn").text("Closed");
                    $(".object_" + result.args.idx.toString()).find(".close-btn").attr("class", "w3-badge w3-red");
                }
                $(".object_" + result.args.idx.toString()).find('.my-btn').attr("disabled", true);
            }
            else {
                console.log(error);
                
            }
        });

        addEvent.watch(function (error, result) {
            if (!error){
                console.log("New auction of " + App.byte2string(result.args.name) + " has been created by " + result.args.beneficiary);
                window.createNotification({
                    closeOnClick: true,
                    displayCloseButton: false,
                    positionClass: 'nfc-top-right',
                    showDuration: 10000,
                    theme: 'info'
                })({
                    title: "Notification",
                    message: "A new auction has been created! Please reload the page!"
                });
            }
            else {
                console.log(error);
                
            }
        });

    },

    bindCloseEvent: function (idx) {
        
        App.auctionInstance.auctions.call(idx, function (error, result) {
            if (!error){
                if (App.myAccount == result[0] && !result[8]) {
                    var btn = $(".object_" + idx.toString()).find(".w3-badge");
                    btn.attr("class", "close-btn btn btn-danger");
                    btn.text("Close");
                    btn.click({"idx": idx}, App.handleClose);
                }
            }
            else{
                console.log(error);

            }
        })
    }
    ,
    bindEvents: function (mode, idx) {
        if (mode == 0) {
            var btn = $('#my-btn_' + idx.toString());
            $('#my-btn_' + idx.toString()).click({"idx": idx}, App.handleLower);
        }
        else {
            $('#my-btn_' + idx.toString()).click({ 'idx': idx }, App.handleBid);
        }
    },
    
    handleClose: function (event) {
        event.preventDefault();
        
        App.auctionInstance.auctionEnd(event.data['idx'], function (error, result) {
            if (!error)
                console.log(result);
            else
                console.log(error);
        });
    },

    handleLower: function (event) {
        event.preventDefault();
        
        var object_template = $(".object_" + event.data['idx'].toString());
        var currentPrice = parseFloat(object_template.find('.currentPrice').text());
        var nextPrice = parseFloat(object_template.find("input").val());

        if (nextPrice >= currentPrice) {
            console.log("Oops!");
            $('.modal-btn').click();
        }
        else {
            console.log("Changing value to " + parseInt(nextPrice).toString());
            object_template.find('.my-btn').append("<i class='fa fa-spinner fa-spin'></i>");
            App.auctionInstance.lower(event.data['idx'], parseInt(web3.toWei(nextPrice, 'ether')), function (error, result) {
                if (!error)
                    console.log(result);
                else
                    console.log(error);
            })
        }
    },

    handleBid: function (event) {
        event.preventDefault();
        
        var object_template = $(".object_" + event.data['idx'].toString());
        var currentPrice = parseFloat(object_template.find('.currentPrice').text());
        var unitsLeft = parseInt(object_template.find('.unitsLeft').text());
        var units = parseInt(object_template.find("input").val());

        if (units > unitsLeft) {
            console.log("Oops!");
            $('.modal-btn').click();
        }
        else {
            console.log("Bidding with " + (web3.toWei(currentPrice * units, 'ether')).toString());
            object_template.find('.my-btn').append("<i class='fa fa-spinner fa-spin'></i>");
            App.auctionInstance.bid(event.data['idx'], units, {
                gas: 300000,
                from: App.myAccount,
                value: web3.toWei(currentPrice * units, 'ether')
            },
                function (error, result) {
                    if (!error)
                        console.log(result)
                    else
                        console.log(error);
                });
        }
    }

};

$(function () {
    $(window).load(function () {
        App.initWeb3();
    });
});

// phan tinh nang search. Tim tat cac cac objectTemplate duoc dung. Cai nao phu hop voi search thi dung display:block. Cai nao ko phu hop search thi dung display:none de hidden.
$("#btnSearch").click(function(){
	var txtSearch = document.getElementById("txtSearch").value;
    var parent = document.getElementById("objects-row");
	var children = parent.children;
	for(let i=0; i<children.length; i++) {
		var child = children[i];
		child.style="display:block";
		var header = child.children[0].children[0].children[0].children[0].innerHTML;
		if (header.indexOf(txtSearch) == -1)
			child.style="display:none";
	}
});
