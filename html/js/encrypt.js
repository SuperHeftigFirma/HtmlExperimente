cryptoMain();

function cryptoMain() {
    var buttonList = document.getElementsByClassName('testbutton');
    for (var i = 0; i < buttonList.length; i++) {
        buttonList[i].addEventListener('click', function (event) { crypto(event.target); });
    }

    document.getElementById('shift').hidden = false;
    document.getElementById('key').hidden = true;

    var radioButtons = document.getElementsByName('selection');
    for (var i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('change', function (event) {
            if (event.target.value === 'caesar') {
                document.getElementById('shift').hidden = false;
                document.getElementById('key').hidden = true;
            } else if (event.target.value === 'cypher') {
                document.getElementById('shift').hidden = true;
                document.getElementById('key').hidden = false;
            }
        })
    }

    function crypto(caller) {
        var encrypted = document.getElementById('encrypted');
        var decrypted = document.getElementById('decrypted');
        var shift = Number(document.getElementById('shift').value);
        var key = document.getElementById('key').value;

        var radios = document.getElementsByName('selection');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                var selection = radios[i].value;
                break;
            }
        }

        if (selection === 'caesar') {
            if (caller.id === 'encrypt') {
                encrypted.value = caesarEncrypt(decrypted.value, shift);
            } else if (caller.id === "decrypt") {
                decrypted.value = caesarDecrypt(encrypted.value, shift);
            }
        } else if (selection === 'cypher') {
            if (caller.id === 'encrypt') {
                encrypted.value = xorCypherEncrypt(decrypted.value, key);
            } else if (caller.id === "decrypt") {
                decrypted.value = xorCypherDecrypt(encrypted.value, key);
            }
        }
    }
}

function caesarEncrypt(text, shift) {
    var output = '';

    for (var i = 0; i < text.length; i++) {
        output += String.fromCharCode(((text.charCodeAt(i) - 32 + shift) % 95) + 32);
    }

    return output;
}

function caesarDecrypt(text, shift) {
    var output = '';

    for (var i = 0; i < text.length; i++) {
        var char = (text.charCodeAt(i) - 32 - shift) % 95;

        if (char < 0) {
            output += String.fromCharCode(char + 127);
        } else {
            output += String.fromCharCode(char + 32);
        }
    }

    return output;
}

function xorCypherEncrypt(text, key) {
    var output = '';
    var j = 0;

    for (var i = 0; i < text.length; i++) {
        output += ' ' + (text.charCodeAt(i) ^ key.charCodeAt(j));
        j++;

        if (j >= key.length) {
            j = 0;
        }
    }

    return output;
}

function xorCypherDecrypt(text, key) {
    text = text.replace(/\s+/g, ' ')

    var code = new Array();
    code[0] = '';
    var j = 0;

    for (var i = 0; i < text.length; i++) {
        if (text[i] != ' ') {
            code[j] += text[i];
        }
        else if (code[j] != '') {
            j++;
            code[j] = '';
        }
    }

    var output = '';
    j = 0;

    for (i = 0; i < code.length; i++) {
        output += String.fromCharCode(code[i] ^ key.charCodeAt(j));
        j++;

        if (j >= key.length) {
            j = 0;
        }
    }

    return output;
}
