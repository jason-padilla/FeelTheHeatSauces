$(document).ready(function() {
    
    const rows_section = document.querySelector('#sauce-rows');
    let heat_products = $(".heat-title").html();
    displayProducts(all_products,rows_section);
    addFlames();
    highlightCurrentLink();
    function displayProducts(products,section) {
        section.innerHTML = "";
        row = document.createElement('div');
        row.classList.add('row');
        sauces_amount = all_products.length
        for (let j = 0; j < sauces_amount; j++) {
            let column = document.createElement('div');
            column.classList.add('col');
            column.classList.add('col-sm-4');
            column.classList.add('col-md-3');
            let product = document.createElement('div');
            product.classList.add('sauce');
            let info = "<a href=\"/collections/" + products[j].fields.spice + "/products/" + products[j].pk + 
            "\"><img src='/static/" + products[j].fields.image_name + "'/></a><div class=\"sauce-heat\">" + products[j].fields.spice + "</div><a href=\"/collections/" + products[j].fields.spice + "/products/" + products[j].pk + "\"><p>" + products[j].fields.name + "</p></a><p class=\"font-weight-bold\">$" + (products[j].fields.price).toFixed(2) + "</p>"
            
            product.innerHTML = info;
            column.appendChild(product);
            row.appendChild(column);
        }
        section.appendChild(row);
    }

    function highlightCurrentLink() {
        $(".nav-link").each(function(){
            let heat = $(this).html();
            if (heat == heat_products) {
                $(this).addClass('current');
            }
        })
    }

    function addFlames() {
        $(".sauce-heat").each(function(){
            let heat = $(this).html();
            let level = sauce_level(heat);
            $(this).html("")
            for (let i = 0; i < level; i++){
                $(this).append("<i class='fas fa-fire-alt' style='color:red; font-size:20x; margin: 2px;'></i>")
            }
            let rest = 5 - level 
            if(rest > 0) {
                for (let i = 0; i < rest; i++){
                    $(this).append("<i class='fas fa-fire-alt' style='color:#999; font-size:20x; margin: 2px;'></i>")
                }  
            }
        })
    }

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

    $('select').change(function() {
        var val = $("#sort-selection option:selected").val();
        if(val == 1) {sortByID(all_products);}
        else if(val == 2) {sortByAlpha(all_products);}
        else if(val == 3) {sortByPriceHighToLow(all_products);}
        else if(val == 4) {sortByPriceLowToHigh(all_products);}
        const rows_section = document.querySelector('#sauce-rows');
        displayProducts(all_products,rows_section);
        addFlames();
    });

    function sortByID(products) {
        products.sort(function(a,b) {
            if(a.pk == b.pk)
                return 0;
            if(a.pk < b.pk)
                return -1;
            if(a.pk > b.pk)
                return 1;
        });
    }

    function sortByAlpha(products) {
        products.sort(function(a,b) {
            if(a.fields.name == b.fields.name)
                return 0;
            if(a.fields.name < b.fields.name)
                return -1;
            if(a.fields.name > b.fields.name)
                return 1;
        });
    }

    function sortByPriceHighToLow(products) {
        products.sort(function(a,b) {
            if(a.fields.price == b.fields.price)
                return 0;
            if(a.fields.price > b.fields.price)
                return -1;
            if(a.fields.price < b.fields.price)
                return 1;
        });
    }

    function sortByPriceLowToHigh(products) {
        products.sort(function(a,b) {
            if(a.fields.price == b.fields.price)
                return 0;
            if(a.fields.price < b.fields.price)
                return -1;
            if(a.fields.price > b.fields.price)
                return 1;
        });
    }

});