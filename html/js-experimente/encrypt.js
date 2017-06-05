function _crypto_ceasarEncrypt(text, shift) {
    var output = '';

    for (var i = 0; i < text.length; i++) {
        output += String.fromCharCode((text.charCodeAt(i) + shift) % 65536);
    }

    return output;
    }  

function _crypto_ceasarDecrypt(text, shift) {
    var output = '';

    for (var i = 0; i < text.length; i++) {
        output += String.fromCharCode((text.charCodeAt(i) - shift) % 65536);
    }

    return output;
}