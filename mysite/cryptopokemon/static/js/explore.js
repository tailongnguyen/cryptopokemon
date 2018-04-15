
$(document).ready(function name(params) {
    App.initWeb3();
    App.timestampConvert = function (value) {
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
        minutes = Math.floor((value - hours * 3600) / 60);
        seconds = value % 60;
        return String.format("{0}:{1}:{2}", hours, minutes, seconds);
    }

    App.contractInstance.countDownTime.call(function (error, result) {
        if (!error) {
            var x = setInterval(function () {
                var now = parseInt(new Date().getTime() / 1000);
                var remainingTime = result - now;
                $(".hero-text").find('h1').text(App.timestampConvert(remainingTime));
                if (remainingTime <= 0) {
                    clearInterval(x);
                    $(".hero-object").on("click", function () {});
                }
            }, 1000);
        }
    })

    for (let i = 0; i < 4; i++) {
        App.contractInstance.wildPokemons.call(i, function (error, result) {
            if (!error){
                var primitiveId = result[0];
                var level = result[1];
                var fledded = result[2];
                var capturable = result[3];
                if (!capturable){
                    $(".wild_" + i).find('.text').text("Captured!");
                }
                else{
                    $(".wild_" + i).find('.text').text("Level " + level);
                }
                App.contractInstance.getPrimitive.call(primitiveId, function (error, res) {
                    if (!error){
                        $(".wild_" + i).find('img').attr('src', "https://img.pokemondb.net/artwork/" + res[0] + ".jpg");
                    }
                    else{
                        console.log(error);
                    
                    }
                })
            }
        })
        
    }

    $(".hero-object").on("click", function () {
        var id = $(this).attr('class').split(" ")[3].split('_')[1];
        App.contractInstance.capturePokemon(parseInt(id), function (error, captured) {
            if (!error) {
                if (captured){
                    var newPokemonEvent = App.contractInstance.NewPokemon();
    
                    newPokemonEvent.watch(function (error, result) {
                        if (!error) {
                            console.log("New pokemon: " + result.args.pokemonId + " " + result.args.name + " " + result.args.dna);
                            alert("You have successfully capture a pokemon!");
                            $(".wild_" + id).find('.text').text("Captured!");
                        }
                        else {
                            console.log(error);
    
                        }
                    });
                }
                else{
                    alert("Grr! It breaks the ball!");
                }

            }
            else {
                console.log(error);

            }
        })
    })
})