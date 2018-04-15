
$(document).ready(function name(params) {
    App.initWeb3();
    var id2nature = {
        0: 'lonely',
        1: 'bold',
        2: 'timid',
        3: 'healthy'
    }
    
    App.contractInstance.getPopulation.call(function (error, result) {
        if (!error) {
            console.log("Population: " + result.toString());
            var row = $(".pokemonList");
            for (let i = 0; i < result; i++) {
                var pokemon_template = $('.pokemonHolder').clone();
                pokemon_template.find(".card").attr("class", "card border-primary pokemon_" + i.toString());
                row.append(pokemon_template.clone().html());
            }
        }
        else {
            console.log(error);
    
        }
    
        for (let i = 0; i < result; i++) {
            App.contractInstance.getPokemonInfo.call(i, function (error, info) {
                if (!error) {
                    $(".pokemon_" + i).find(".card-title").text(info[0] + " (" + info[1] + ")");
                    $(".pokemon_" + i).find(".nature").text(id2nature[info[2]]);
                    $(".pokemon_" + i).find(".level").text(info[5]);
                    $(".pokemon_" + i).find("img").attr("src", "https://img.pokemondb.net/artwork/" + info[1] + ".jpg");
                }
                else {
                    console.log(error);
    
                }
            })
    
        }

        for (let i = 0; i < result; i++) {
            App.contractInstance.getPokemonStats.call(i, function (error, stats) {
                if (!error) {
                    $(".pokemon_" + i).find(".attack").text(stats[0]);
                    $(".pokemon_" + i).find(".defense").text(stats[1]);
                    $(".pokemon_" + i).find(".speed").text(stats[2]);
                    $(".pokemon_" + i).find(".hp").text(stats[3])
                }
                else {
                    console.log(error);
    
                }
            })
    
        }
    })
})


// var newPokemonEvent = App.contractInstance.NewPokemon();
// var pokemonLevelUpEvent = App.contractInstance.PokemonLevelUp();
// var pokemonBattleEvent = App.contractInstance.PokemonBattle();

// newPokemonEvent.watch(function (error, result) {
//     if (!error) {
//         console.log("New pokemon: " + result.args.pokemonId + " " + result.args.name + " " + result.args.dna);

//     }
//     else {
//         console.log(error);

//     }
// });

// pokemonLevelUpEvent.watch(function (error, result) {
//     if (!error) {
//         console.log("Pokemon number " + result.args._pokemonId + " has reached a new level of " + result.args._level);

//     }
//     else {
//         console.log(error);

//     }
// });

// pokemonBattleEvent.watch(function (error, result) {
//     if (!error) {
//         console.log("Pokemon number " + result.args._id1 + " has fighted with pokemon number " + result.args._id2 + " and the winner is " + result.args._winner);
//         console.log(result.args.turns);

//     }
//     else {
//         console.log(error);

//     }
// });