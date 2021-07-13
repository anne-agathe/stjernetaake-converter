function generateButton(value, onclick, id="") {
    var element = document.createElement("input");
    element.type = "button";
    element.value = value;
    element.onclick = onclick;
    if (id) {
        element.id = id;
    }
    return element
}

function generateTextInput(placeholder, size="") {
    var element = document.createElement("input");
    element.type = "text";
    element.placeholder = placeholder;
    if (size) {
        element.size = size;
    }
    return element
}

function hiddenOption(text) {
    var opt = new Option(text, "");
    opt.selected = "selected";
    opt.disabled = "disabled";
    opt.hidden = "hidden";
    return opt
}

function updateElementsInDiv(div, elements) {
    div.innerHTML = "";
    for (var i in elements) {
        div.appendChild(elements[i])
    }
}

function updateElementsInDivBefore(div, elements, beforeElement) {
    for (var i in elements) {
        div.insertBefore(elements[i], beforeElement)
    }
}

