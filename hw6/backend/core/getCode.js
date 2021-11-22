
const codeLEN = 4;
let code = '';
let settedCode = '';

function genNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

// -------

function genCode() {
    let num = genNumber(1, 9999)
    code = pad(num, codeLEN)
}

function getCode () {
    return code;
}

function setCode (codeInput) {
    settedCode = codeInput;
}

function getSettedCode () {
    return settedCode;
}

function genRandomCode() {
    let num = genNumber(1, 9999)
    return pad(num, codeLEN)
}

function genAB (code, guessed) {
    let sArr = new Array(10).fill(0);
    let gArr = new Array(10).fill(0);
    let cntA = 0;
    let cntB = 0;

    for (let i = 0; i < code.length; i++) {
        if(code[i] === guessed[i]){
            cntA ++;
        } else {
            sArr[code.charAt(i) - '0']++;
            gArr[guessed.charAt(i) - '0']++;
        }
    }
    for (let i = 0; i < sArr.length; i++) {
        cntB += Math.min(sArr[i], gArr[i]);
    }
    return {cntA, cntB}

}

export { genCode, getCode, setCode, getSettedCode, genRandomCode, genAB }
   



