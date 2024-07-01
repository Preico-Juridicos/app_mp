$(document).ready(function () {
    let selectedColor = '#FF5733';
    let selectedColorBackground = null;
    selectColor(selectedColor);
});

function hexToRGBA(hex, opacity) {
    // Expresión regular para extraer los componentes RGBA del color hexadecimal
    let rgba = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);

    // Convierte cada componente hexadecimal a decimal
    let r = parseInt(rgba[1], 16);
    let g = parseInt(rgba[2], 16);
    let b = parseInt(rgba[3], 16);

    // Retorna el color en formato RGBA con la opacidad deseada
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
}

function selectColor(color) {
    selectedColor = color;
    selectedColorBackground = hexToRGBA(color, 0.3);
    $('#tempSponsorColor').val(color);
    // console.log(color);
    $('.p-color, #colorSelector').removeClass('selected-color');
}

function rgbaToHex(rgbaColor, hasAlpha = true) {
    // Extraer los valores de RGBA del string
    let match = rgbaColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);

    if (!match) {
        throw new Error('Formato de color RGBA inválido');
    }

    // Convertir los valores a enteros
    let r = parseInt(match[1], 10);
    let g = parseInt(match[2], 10);
    let b = parseInt(match[3], 10);

    // Convertir el canal alfa a un valor de 0 a 255 y luego a hexadecimal
    let a = match[4] ? parseFloat(match[4]) : 1; // Si no se especifica alfa, por defecto es 1
    let alphaHex = Math.round(a * 255).toString(16).padStart(2, '0');

    // Convertir cada componente RGB a hexadecimal
    let rHex = r.toString(16).padStart(2, '0');
    let gHex = g.toString(16).padStart(2, '0');
    let bHex = b.toString(16).padStart(2, '0');

    // Combinar los componentes hexadecimales
    let hexColor = '';
    if (hasAlpha) {
        hexColor = `#${rHex}${gHex}${bHex}${alphaHex}`;
    } else {
        hexColor = `#${rHex}${gHex}${bHex}`;
    }

    return hexColor.toLowerCase();
}