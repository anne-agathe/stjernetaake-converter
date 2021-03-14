// counts number of input rows that have been added since page load
var deleteButtonCount = 0;

// generates an input element and a dropdown menu of individual coins from currencies.js
// onload and when +button is clicked
function generateDropdownFromCurrency() {
    var inputDiv = document.getElementById("columnleft");
    var addButton = document.getElementById("addbutton");

    // input amount
    var amount = document.createElement("input");
    amount.type = "text";
    amount.placeholder = "Antall";
    amount.size = "2";

    // dropdown
    var dropdown = document.createElement("select");
    dropdown.appendChild(hiddenOption("Velg valuta å konvertere fra"));
    // dropdown options grouped by country name(s)
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
        inputDiv.insertBefore(elements[i], addButton);
    }
}


// generates a dropdown menu of currencies from currencies.js onload
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


// a title for dropdown menus. used by generateDropdownFromCurrency()
// and generateDropdownToCurrency()
function hiddenOption(text) {
    var opt = new Option(text, "");
    opt.selected = "selected";
    opt.disabled = "disabled";
    opt.hidden = "hidden";
    return opt;
}


// onclick event for delete buttons
function deleteInput(buttonid) {
    var inputDiv = document.getElementById("columnleft");
    // will only be called if there are more than one row of inputs (otherwise unnecessary)
    if (numberOfInputs() > 1) {
        for (var i in inputDiv.childNodes) {
            // searches for element with buttonid as id and then looks back, removing elements
            if (inputDiv.childNodes[i].id == buttonid) {
                for (var j=0; j < 4; j++) {
                    // removes text input, dropdown, delete button and <br>
                    inputDiv.childNodes[i-2].remove();
                }
            }
        }
    }
}


// onclick event for convert button
function convert() {
    var errorMessages = checkRequirements();
    // will only convert if requirements are satisfied
    if (errorMessages == "") {
        var result = "";
        var inputValue = getTotalValue();
        for (var i in DATA.currencies) {
            // finds data entry of the to-currency
            if (DATA.currencies[i].name == document.getElementById("dropdownToCurrency").value) {
                var toCurrency = DATA.currencies[i];
                for (var j in toCurrency.types) {
                    var coin = toCurrency.types[j]
                    var amount = inputValue / coin.value;
                    // ignore this coin and continue, if inputValue would be less than one coin
                    if (amount < 1) {
                        continue;
                    }
                    if (Math.round(amount) > 0) {
                        inputValue -= Math.round(amount)*coin.value;
                        result += Math.round(amount) + " " + coin.name + "<br>";
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


// checks if there are missing values anywhere and returns error messages if yes.
// used by convert()
function checkRequirements() {
    var inputDiv = document.getElementById("columnleft");
    var errorMessages = "";
    for (var i=0; i < inputDiv.childNodes.length-1; i++) {
        var element = inputDiv.childNodes[i];
        var nextElement = inputDiv.childNodes[i+1];
        if (element.tagName == "INPUT" && element.type == "text") {
            if (element.value == "") {
                // if in a row no number has been written, no coin selected and there are more than one row,
                // just ignore this one
                if (nextElement.value == "" && numberOfInputs() > 1) {
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


// counts number of input rows. used by deleteInput() and checkRequirements()
function numberOfInputs() {
    var inputDiv = document.getElementById("columnleft");
    var count = 0;
    for (var i in inputDiv.childNodes) {
        if (inputDiv.childNodes[i].value == "x") {
            count += 1;
        }
    }
    return count;
}


// returns value of input in blankmynt
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
