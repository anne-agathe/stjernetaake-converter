var delBtnCount = 0; // counts number of input rows that have been added since page load

function loadConverterPage() {
    delBtnCount = 0;
    document.getElementById("title").innerHTML = "Stjernetåke Valutakalkulator";
    document.getElementById("subtitle").innerHTML = "<i>- fordi fantasy må være realistisk</i>";
    showLoginStart();
    converterColumnLeft();
    converterColumnCenter();
    converterColumnRight()
}

function converterColumnLeft() {
    var div = document.getElementById("columnleft");
    var row = generateOwnedCurrencyRow(div);
    updateElementsInDiv(div, row);
    div.insertBefore(document.createElement("br"), div.children[0])
}

function converterColumnCenter() {
    var div = document.getElementById("columncenter");
    var dropdown = generateConversionCurrencyDropdown();
    var convertBtn = generateButton("Konverter", startConversion);
    updateElementsInDiv(div, [dropdown, document.createElement("br"), document.createElement("br"), convertBtn])
}

function converterColumnRight() {
    var div = document.getElementById("columnright");
    var result = document.createElement("p");
    result.id = "result";
    div.appendChild(result)
}
