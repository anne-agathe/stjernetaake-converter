function generateDropdownFromCurrency(onload) {
    var div = document.getElementById("columnleft");
    var addbutton = document.getElementById("addbutton");

    // input amount
    var amount = document.createElement("input");
    amount.type = "text";
    amount.placeholder = "Antal";
    amount.size = "2";

    // dropdown
    var dropdown = document.createElement("select");
    dropdown.appendChild(hiddenOption("Velg valuta å konvertere fra"));
    // dropdown options
    for (var i in DATA.currencies) {
        var currency = DATA.currencies[i];
        var optgroup = document.createElement("optgroup");
        optgroup.label = currency.area;
        for (var j in currency.types) {
            var coin = currency.types[j];
            var opt = new Option(coin.name, coin.value);
            optgroup.appendChild(opt);
        }
        dropdown.appendChild(optgroup);
    }

    var br = document.createElement("br");

    // combine everything
    if (onload) {
        div.insertBefore(amount, addbutton);
        div.insertBefore(dropdown, addbutton);
    } else {
        div.appendChild(amount);
        div.appendChild(dropdown);
    }
    div.appendChild(br);
}


function generateDropdownToCurrency() {
    var div = document.getElementById("columncenter");
    var dropdown = document.createElement("select");
    dropdown.appendChild(hiddenOption("Velg valuta å konvertere til"));
    for (var i in DATA.currencies) {
        var currency = DATA.currencies[i];
        var opt = new Option(currency.name + " (" + currency.area + ")", currency.name);
        dropdown.appendChild(opt);
    }
    dropdown.id = "dropdownToCurrency";
    div.insertBefore(dropdown, div.childNodes[0]);
}


function hiddenOption(text) {
    var opt = new Option(text, "");
    opt.selected = "selected";
    opt.disabled = "disabled";
    opt.hidden = "hidden";
    return opt;
}


function convert() {
    var inputValue = getTotalValue();
    var result = "";
    for (var i in DATA.currencies) {
        if (DATA.currencies[i].name == document.getElementById("dropdownToCurrency").value) {
            var toCurrency = DATA.currencies[i];
            for (var j in toCurrency.types) {
                var coin = toCurrency.types[j]
                var amount = inputValue / coin.value;
                inputValue = amount - Math.floor(amount);
                if (Math.floor(amount) > 0) {
                    result += Math.floor(amount) + " " + coin.name + "<br>"
                }
                if (inputValue <= 0) {
                    break
                }
            }
            break
        }
    }
    document.getElementById("result").innerHTML = result;
}


function getTotalValue() {
    var inputDiv = document.getElementById("columnleft");
    var totalValue = 0;
    for (var i=0; i < inputDiv.childNodes.length-1; i++) {
        var element = inputDiv.childNodes[i];
        if (element.tagName == "INPUT" && element.id != "addbutton") {
            var nextElement = inputDiv.childNodes[i+1];
            if (nextElement.tagName == "SELECT") {
                totalValue += element.value * nextElement.value;
            }
        }
    }
    return totalValue;
}
