let num = 0;

function getNumber () {
    return num;
}

function genNumber (min, max) {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getNumber, genNumber }
   



