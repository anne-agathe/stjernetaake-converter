// generates an input element and a dropdown menu of individual coins from currencies.js
function ownedCurrencyDropdown() {
    var amount = generateTextInput("Antall", 2);
    var dropdown = document.createElement("select");
    dropdown.appendChild(hiddenOption("Velg valuta å konvertere fra"));
    for (var i in DATA.currencies) {
        var currency = DATA.currencies[i];
        var optgroup = document.createElement("optgroup");
        optgroup.label = currency.area;
        for (var j in currency.types) {
            var coin = currency.types[j];
            var opt = new Option(coin.name, coin.value);
            optgroup.appendChild(opt)
        }
        dropdown.appendChild(optgroup)
    }
    var btnId = "deletebutton"+delBtnCount;
    var delBtn = generateButton("x", function() {deleteInput(btnId)}, btnId);
    delBtnCount += 1;
    row = [amount, dropdown, delBtn, document.createElement("br")];
    return row
}

function addRow(div, self) {
    var row = ownedCurrencyDropdown();
    updateElementsInDivBefore(div, row, self)
}

// onclick event for delete buttons
function deleteInput(btnId) {
    var div = document.getElementById("columnleft");
    // will only be called if there are more than one row of inputs (otherwise unnecessary)
    if (numberOfRows() > 1) {
        for (var i in div.childNodes) {
            // searches for element with buttonid as id and then looks back, removing elements
            if (div.childNodes[i].id == btnId) {
                for (var j=0; j < 4; j++) {
                    // removes text input, dropdown, delete button and <br>
                    div.childNodes[i-2].remove()
                }
            }
        }
    }
}

// counts number of input rows. used by deleteInput() and checkRequirements()
function numberOfRows() {
    var div = document.getElementById("columnleft");
    var count = 0;
    for (var i in div.childNodes) {
        if (div.childNodes[i].value == "x") {
            count += 1
        }
    }
    return count
}

function generateOwnedCurrencyRow(div) {
    var row = ownedCurrencyDropdown();
    var addBtn = generateButton("+", function () {addRow(div, addBtn)});
    return row.concat([addBtn])
}

function generateConversionCurrencyDropdown() {
    var dropdown = document.createElement("select");
    dropdown.appendChild(hiddenOption("Velg valuta å konvertere til"));
    for (var i in DATA.currencies) {
        var currency = DATA.currencies[i];
        var opt = new Option(currency.name + " (" + currency.area + ")", currency.name);
        dropdown.appendChild(opt);
    }
    dropdown.id = "dropdownToCurrency";
    return dropdown
}
