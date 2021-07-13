function showLoginStart() {
    var div = document.getElementById("loginDiv");
    var elements = [generateButton("Åpne pengepung", showLoginInputFields),
                    document.createElement("br"),
                    generateButton("Opprett ny", showNewWalletInputFields)];
    updateElementsInDiv(div, elements);
}

function showLoginInputFields() {
    var div = document.getElementById("loginDiv");
    var br = document.createElement("br");
    var name = generateTextInput("Karakternavn");
    var pw = generateTextInput("Kodeord");
    var elements = [name, br, pw, br,
                    generateButton("Logg inn", function() {logIn(name.value, pw.value)}),
                    generateButton("Tilbake", showLoginStart)];
    updateElementsInDiv(div, elements);
}

function showNewWalletInputFields() {
    var div = document.getElementById("loginDiv");
    var br = document.createElement("br");
    var name = generateTextInput("Karakternavn");
    var pw1 = generateTextInput("Kodeord");
    var pw2 = generateTextInput("Gjenta kodeord");
    var elements = [name, br, pw1, br, pw2, br,
                    generateButton("Opprett", function() {createNewWallet(name.value, pw1.value, pw2.value)}),
                    generateButton("Tilbake", showLoginStart)];
    updateElementsInDiv(div, elements);
}

function logIn(name, pw) {
    alert(name + pw);
}

function createNewWallet(name, pw1, pw2) {
    alert(name + pw1 + pw2);
}