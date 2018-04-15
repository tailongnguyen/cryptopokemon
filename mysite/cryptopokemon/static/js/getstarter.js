$(document).ready(function name(params) {
    
    $(".hero-object").on("click", function () {
        var name = $(this).attr('class').split(" ")[3];
        var name2id = {
            'bulbasaur': 0,
            'charmander': 1,
            'squirtile': 2,
        }
        App.contractInstance.createStarter(name, name2id[name], function (error, result) {
            if (!error) {
                var newPokemonEvent = App.contractInstance.NewPokemon();

                newPokemonEvent.watch(function (error, result) {
                    if (!error) {
                        console.log("New pokemon: " + result.args.pokemonId + " " + result.args.name + " " + result.args.dna);
                        $(".starter-row").remove();
                        $(".hero-text").text("You have successfully adopt a " + name);
                    }
                    else {
                        console.log(error);

                    }
                });
                
            }
            else {
                console.log(error);
        
            }
        })
    })
})    
