function startConversion() {
    var errorMessages = checkRequirements();
    if (errorMessages == "") {
        var value = getBlankmyntValue();
        var toCurrency = getToCurrency();
        var result = convert(value, toCurrency);
        document.getElementById("result").innerHTML = result;
    }
    else {
        document.getElementById("result").innerHTML = errorMessages
    }
}

// returns value of input in blankmynt
function getBlankmyntValue() {
    var div = document.getElementById("columnleft");
    var value = 0;
    for (var i=0; i < div.childNodes.length-1; i++) {
        var element = div.childNodes[i];
        if (element.tagName == "INPUT" && element.value != "+") {
            var nextElement = div.childNodes[i+1];
            if (nextElement.tagName == "SELECT") {
                value += element.value * nextElement.value
            }
        }
    }
    return value
}

function getToCurrency() {
    for (var i in DATA.currencies) {
        // finds data entry of the to-currency
        if (DATA.currencies[i].name == document.getElementById("dropdownToCurrency").value) {
            return DATA.currencies[i]
        }
    }
}

function convert(value, toCurrency) {
    var result = "";
    for (var j in toCurrency.types) {
        var coin = toCurrency.types[j];
        var amount = value / coin.value;
        // ignore this coin and continue, if inputValue would be less than one coin
        if (amount < 1) {
            continue;
        }
        value -= Math.floor(amount)*coin.value;
        result += Math.floor(amount) + " " + coin.name + "<br>";
        if (value <= 0) {
            break
        }
    }
    return result
}

function checkRequirements() {
    var div = document.getElementById("columnleft");
    var errorMessages = "";
    for (var i=0; i < div.childNodes.length-1; i++) {
        var element = div.childNodes[i];
        var nextElement = div.childNodes[i+1];
        if (element.tagName == "INPUT" && element.type == "text") {
            if (element.value == "") {
                // if in a row no number has been written, no coin selected and there are more than one row,
                // just ignore this one
                if (nextElement.value == "" && numberOfRows() > 1) {
                    continue;
                }
                errorMessages += "Mangler antal <br>";
            // an integer has been correctly entered
            } else if (Number.isInteger(parseInt(element.value))) {
                // no coin has been selected
                if (nextElement.value == "") {
                    errorMessages += "Mangler valuta å konvertere " + element.value + " fra <br>";
                }
            // no integer has been entered
            } else {
                errorMessages += "Antal må være et heltal <br>";
            }
            // no coin has been selected (the no-integer error message will also be called in this instance)
            if (nextElement.value == "" && !Number.isInteger(parseInt(element.value))) {
                errorMessages += "Mangler valuta å konvertere fra <br>";
            }
        }
    }
    // no to-currency has been selected
    if (document.getElementById("dropdownToCurrency").value == "") {
        errorMessages += "Mangler valuta å konvertere til <br>";
    }
    return errorMessages;
}
