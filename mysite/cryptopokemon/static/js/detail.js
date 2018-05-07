
$(document).ready(function name(params) {
    App.initWeb3();
    var id2nature = {
        0: 'lonely',
        1: 'bold',
        2: 'timid',
        3: 'healthy'
    }

    var idx = $(".container").attr("id");
    console.log(idx);
    
    
    $("footer").css("position", "fixed");
    $("td").css("padding", "10px 10px 10px 10px");
    $("th").css("padding", "10px 10px 10px 10px");
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    App.contractInstance.getPokemonInfo.call(idx, function (error, info) {
        if (!error){
            $('.card-img-top').attr("src", "https://img.pokemondb.net/artwork/" + info[1] + ".jpg");
            $('.name').text(info[0].capitalize() + " #" + info[1]);
            $('.nickname').text(info[0].capitalize())
            $('.nature').text("Nature | " + id2nature[info[2]])
            $('.evolution').text("Level " + info[3])
            $('.dna').text("DNA | " + info[4])
            $('.level').text("Level | " + info[5])
            if (info[3] != 0){
                App.contractInstance.getPokemonDetails.call(idx, function (error, info) {
                    if (!error){
                        App.contractInstance.getPrimitive(parseInt(info[5]) + 1, function (error, result) {
                            if (!error) {
                                $(".sprite-name").text(result[0].capitalize());
                                $(".sprite").attr("src", "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/" + result[0] + ".png")
                            }
                        })
                        
                    }
                })
            }
            else {
                $(".evo").css("display", 'none')
            }
        }
    })

    App.contractInstance.getPokemonDetails.call(idx, function (error, info) {
        if (!error){
            myDate = new Date(1000*parseInt(info[0]));
            $('.readytime').text(myDate.toLocaleString())
            console.log(myDate.toString())
            $('.threshold').text(info[1])
            $('.exp').text(info[2])
            $('.wincount').text(info[3])
            $('.losscount').text(info[4])
            $('.primitiveID').text(info[5])
            
        }
    })

    App.contractInstance.getPokemonStats.call(idx, function (error, stats) {
        if (!error) {

            $(".attack").css("width", stats[0]/2.56+"%");
            $(".attack-num").text(stats[0]);
            $(".defense").css("width", stats[1]/2.56+"%");
            $(".defense-num").text(stats[1]);
            $(".speed").css("width", stats[2]/2.56+"%");
            $(".speed-num").text(stats[2]);
            $(".hp").css("width", stats[3]/2.56+"%")
            $(".hp-num").text(stats[3])
        }
        else {
            console.log(error);
        }
    })
})
