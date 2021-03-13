var deleteButtonCount = 0;

function generateDropdownFromCurrency() {
    var div = document.getElementById("columnleft");
    var addButton = document.getElementById("addbutton");

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

    // delete button
    var deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "x";
    deleteButton.id = "deletebutton" + deleteButtonCount;
    deleteButtonCount += 1;
    deleteButton.onclick = function() { deleteInput(deleteButton.id); };

    // combine everything
    var br = document.createElement("br");
    var elements = [amount, dropdown, deleteButton, br];
    for (var i in elements) {
        div.insertBefore(elements[i], addButton);
    }
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


function deleteInput(buttonid) {
    var div = document.getElementById("columnleft");
    if (numberOfInputs() > 1) {
        for (var i in div.childNodes) {
            if (div.childNodes[i].id == buttonid) {
                for (var j=0; j < 4; j++) {
                    div.childNodes[i-2].remove();
                }
            }
        }
    }
}


function convert() {
    var errorMessages = checkRequirements();
    if (errorMessages == "") {
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
                        result += Math.floor(amount) + " " + coin.name + "<br>";
                    }
                    if (inputValue <= 0) {
                        break;
                    }
                }
                break;
            }
        }
        document.getElementById("result").innerHTML = result;
    } else {
        document.getElementById("result").innerHTML = errorMessages;
    }
}


function checkRequirements() {
    var errorMessages = "";
    var inputDiv = document.getElementById("columnleft");
    for (var i=0; i < inputDiv.childNodes.length-1; i++) {
        var element = inputDiv.childNodes[i];
        var nextElement = inputDiv.childNodes[i+1];
        if (element.tagName == "INPUT" && element.type == "text") {
            if (element.value == "") {
                if (nextElement.value == "" && numberOfInputs() > 1) {
                    continue;
                }
                errorMessages += "Mangler antal <br>";
            } else if (Number.isInteger(parseInt(element.value))) {
                if (nextElement.value == "") {
                    errorMessages += "Mangler valuta å konvertere " + element.value + " fra <br>";
                }
            } else {
                errorMessages += "Antal må være et heltal <br>";
            }
            if (nextElement.value == "" && !Number.isInteger(parseInt(element.value))) {
                errorMessages += "Mangler valuta å konvertere fra <br>";
            }
        }
    }
    if (document.getElementById("dropdownToCurrency").value == "") {
        errorMessages += "Mangler valuta å konvertere til <br>";
    }
    return errorMessages;
}


function numberOfInputs() {
    var div = document.getElementById("columnleft");
    var count = 0;
    for (var i in div.childNodes) {
        if (div.childNodes[i].value == "x") {
            count += 1;
        }
    }
    return count;
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
