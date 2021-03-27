function sauce_level(sauce_heat) {
    let sauce_level;
    if(sauce_heat == "Hottest") 
        sauce_level = 5;
    else if(sauce_heat == "Hot") 
        sauce_level = 4;
    else if(sauce_heat == "Medium") 
        sauce_level = 3;
    else if(sauce_heat == "Mild") 
        sauce_level = 2;
    return sauce_level;
}

$(function() {
    $(".sauce-heat").each(function(){
        let heat = $(this).html();
        let level = sauce_level(heat);
        $(this).html("")
        for (let i = 0; i < level; i++){
            $(this).append("<i class='fas fa-fire-alt flame' style='color:red; font-size:20x; margin: 2px;'></i>")
        }
        let rest = 5 - level 
        if(rest > 0) {
            for (let i = 0; i < rest; i++){
                $(this).append("<i class='fas fa-fire-alt flame' style='color:#999; font-size:20x; margin: 2px;'></i>")
            }  
        }
    })
    $(".main-heat").each(function(){
        let heat = $(this).html();
        let level = sauce_level(heat);
        $(".nav-link").each(function(){
            let linkheat = $(this).html();
            let main_heat = heat+" Sauces";
            if (linkheat == main_heat) {
                $(this).addClass('current');
            }
        })
        $(this).html("")
        for (let i = 0; i < level; i++){
            $(this).append("<i class='fas fa-fire-alt' style='color:red; font-size:24x; margin: 2px;'></i>")
        }
        let rest = 5 - level 
        if(rest > 0) {
            for (let i = 0; i < rest; i++){
                $(this).append("<i class='fas fa-fire-alt' style='color:#999; font-size:24x; margin: 2px;'></i>")
            }  
        }
    })
});