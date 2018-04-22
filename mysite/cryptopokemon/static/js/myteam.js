var SelectedPokemon = 0;
$(document).ready(function name(params) {
    App.initWeb3();
    var id2nature = {
        0: 'lonely',
        1: 'bold',
        2: 'timid',
        3: 'healthy'
    }
    $(".milk-food").find(".feeding-btn").click(function () {
        var SelectedPokemonId = $("#myModal").attr("SelectedPokemonId");
        App.contractInstance.feed(SelectedPokemonId, "milk", {
            gas: 300000,
            from: App.myAccount,
            value: web3.toWei(0.001, 'ether')
        }, function (error, result) {
            if (!error) {
                console.log(error);
            }
            else {
                console.log(error);

            }
        })
    });
    $(".iron-food").find(".feeding-btn").click(function () {
        var SelectedPokemonId = $("#myModal").attr("SelectedPokemonId");
        App.contractInstance.feed(SelectedPokemonId, "iron", {
            gas: 300000,
            from: App.myAccount,
            value: web3.toWei(0.001, 'ether')
        }, function (error, result) {
            if (!error) {
                console.log(error);
            }
            else {
                console.log(error);

            }
        })
    });
    $(".protein-food").find(".feeding-btn").click(function () {
        var SelectedPokemonId = $("#myModal").attr("SelectedPokemonId");
        App.contractInstance.feed(SelectedPokemonId, "protein", {
            gas: 300000,
            from: App.myAccount,
            value: web3.toWei(0.001, 'ether')
        }, function (error, result) {
            if (!error) {
                console.log(error);
            }
            else {
                console.log(error);

            }
        })
    });
    $(".carbos-food").find(".feeding-btn").click(function () {
        var SelectedPokemonId = $("#myModal").attr("SelectedPokemonId");
        App.contractInstance.feed(SelectedPokemonId, "carbos", {
            gas: 300000,
            from: App.myAccount,
            value: web3.toWei(0.001, 'ether')
        }, function (error, result) {
            if (!error) {
                console.log(error);
            }
            else {
                console.log(error);

            }
        })
    });
    App.contractInstance.getPokemonsByOwner.call(App.myAccount, function (error, results) {
        if (!error) {
            console.log("Your pokemons: " + results);
            var row = $(".pokemonList");
            if (results.length == 1) {
                results = [results];
            }
            for (let i = 0; i < results.length; i++) {
                var pokemon_template = $('.pokemonHolder').clone();
                pokemon_template.find(".card").attr("class", "card border-primary pokemon_" + results[i].toString());
                row.append(pokemon_template.clone().html());
                App.contractInstance.getPokemonInfo.call(results[i], function (error, info) {
                    if (!error) {
                        console.log(info);
                        $(".pokemon_" + results[i]).find(".card-title").text(info[0] + " (" + info[1] + ")");
                        $(".pokemon_" + results[i]).find(".nature").text(id2nature[info[2]]);
                        $(".pokemon_" + results[i]).find(".level").text(info[5]);
                        $(".pokemon_" + results[i]).find("img").attr("src", "https://img.pokemondb.net/artwork/" + info[1] + ".jpg");
                        $(".pokemon_" + results[i]).find(".feeding-btn").click(function () {
                            $("#myModal").attr("SelectedPokemonId", i);
                        });
                    }
                    else {
                        console.log(error);
                    }
                })
            }

            for (let i = 0; i < results.length; i++) {
                App.contractInstance.getPokemonStats.call(i, function (error, stats) {
                    if (!error) {
                        $(".pokemon_" + results[i]).find(".attack").text(stats[0]);
                        $(".pokemon_" + results[i]).find(".defense").text(stats[1]);
                        $(".pokemon_" + results[i]).find(".speed").text(stats[2]);
                        $(".pokemon_" + results[i]).find(".hp").text(stats[3])
                    }
                    else {
                        console.log(error);
                    }
                })
            }
        }
        else {
            console.log(error);

        }

    })
})
