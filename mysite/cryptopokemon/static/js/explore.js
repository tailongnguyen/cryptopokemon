
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

    $(".hero-object").on("click", function () {
        var id = $(this).attr('class').split(" ")[1].split('_')[1];
        console.log($(this).attr('class'));
        console.log(id);
        
        App.contractInstance.capturePokemon(parseInt(id), {
            gas: 400000,
            from: App.myAccount,
            value: web3.toWei(0, 'ether')
        }, async function (error, captured) {
            if (!error) {
                console.log("Captured: " + captured);
                var pokemonCaptureFailEvent = App.contractInstance.PokemonCaptureFail();

                await App.sleep(3000);
                pokemonCaptureFailEvent.watch((error1, result1) => {
                    if (!error1) {
                        alert("Grr! It breaks the ball!");
                        console.log(result1);
                        
                    }
                    else {
                        console.log(error);

                    }
                })
                var pokemonCapturedEvent = App.contractInstance.PokemonCaptured();

                pokemonCapturedEvent.watch((error2, result2) => {
                    if (!error2) {
                        console.log(result2);
                        alert("You have successfully capture a pokemon!");
                        $(".wild_" + id).find('.text').text("Captured!");
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
    for (let i = 0; i < 4; i++) {
        App.contractInstance.wildPokemons.call(i, function (error, result) {
            if (!error) {
                console.log(result);

                var primitiveId = result[0];
                var level = result[1];
                var capturable = result[2];
                if (!capturable) {
                    $(".wild_" + i).find('.text').text("Captured!");
                    $(".wild_" + i).on("click", function () { });
                }
                else {
                    $(".wild_" + i).find('.text').text("Level " + level);
                }
                App.contractInstance.getPrimitive.call(primitiveId, function (error, res) {
                    if (!error) {
                        $(".wild_" + i).find('img').attr('src', "https://img.pokemondb.net/artwork/" + res[0] + ".jpg");
                    }
                    else {
                        console.log(error);

                    }
                })
            }
        })

    }
})