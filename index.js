const letters = [
    " ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", 
    "u", "v", "w", "x", "y", "z", "!", "?", ",", "/", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
    "`", "~", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "<", ">", "{", "}", ":", ";",
    "\\", "[", "]", "|", "'", '"', "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
    "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];
document.getElementById("genButton").onclick = () => {
    const p = document.getElementById("p").value === 0 ? 0 : document.getElementById("p").value;
    const q = document.getElementById("q").value === 0 ? 0 : document.getElementById("q").value;
    
    const N = getN(p, q);
    const phiN = phi(N);
    const e = getE(N);
    const d = getD(getE(getN(p, q)), phi(getN(p, q)));

    document.getElementById("first").innerHTML     =  `<b>p = ${p}, q = ${q}</b>`;
    document.getElementById("second").innerHTML    =  `<b>N = pq = ${N}</b>`;
    document.getElementById("third").innerHTML     =  `phi(N) (number of integers coprime with <em>N</em>) => <b>phi(N) = ${phiN}</b>`;
    document.getElementById("fourth").innerHTML    =  `Find <em>e</em> where e is coprime with <em>N</em> and <em>phi(N)</em> => <b>e = ${e}</b>`;
    document.getElementById("fifth").innerHTML     =  `Public Lock is (e, N) = <b>(${getLock(p, q)})</b>`;
    document.getElementById("sixth").innerHTML     =  `Find <em>d</em> where <em>de</em> (<em>mod N</em>) = 1 => ${e}d (<em>mod ${N}</em>) = 1 => <b>d = ${d}</b>`;
    document.getElementById("seventh").innerHTML   =  `Private Key is (d, N) = <b>(${getKey(p, q)})</b>`;

    document.getElementById("lockVal1").innerHTML  =  e;
    document.getElementById("lockVal2").innerHTML  =  N;
    document.getElementById("keyVal1").innerHTML   =  d;
    document.getElementById("keyVal2").innerHTML   =  N;
};

document.getElementById("encodeButton").onclick = () => {
    const e = BigInt(document.getElementById("lockVal1").value);
    const lockN = BigInt(document.getElementById("lockVal2").value);
    const message = document.getElementById("message").value;

    let encrypted = "";
    let msgNumerals = "";
    let encryptedMessage = "";
    for (const char of message) {
        if (!letters.includes(char)) continue;
        const numChar = letters.indexOf(char.toLowerCase());
        const encode = (BigInt(numChar) ** BigInt(e)) % BigInt(lockN);
        encrypted += `${encode} `;
        msgNumerals += `${numChar} `;
        encryptedMessage += letters[encode];
    }
    document.getElementById("first").innerHTML     =  `Your message was: ${message}`;
    document.getElementById("second").innerHTML    =  `Which becomes: ${msgNumerals}`;
    document.getElementById("third").innerHTML     =  `After encryption, this becomes: ${encrypted}`;
    document.getElementById("fourth").innerHTML    =  `This, when stringified, becomes: ${encryptedMessage}`;
    document.getElementById("fifth").innerHTML     =  "";
    document.getElementById("sixth").innerHTML     =  "";
    document.getElementById("seventh").innerHTML   =  "";
};

document.getElementById("decodeButton").onclick = () => {
    const d = BigInt(document.getElementById("keyVal1").value);
    const keyN = BigInt(document.getElementById("keyVal2").value);
    let message = document.getElementById("message").value;
    let decrypted = "";
    let decryptedMessage = "";
    let parseAsString = true
    if (isNaN(message.split("")[0])) {
        message = message.split("");
    }
    else {
        parseAsString = false;
        message = message.split(" ");
    }
    for (const encd of message) {
        const decode = parseAsString ? (BigInt(letters.indexOf(encd.toLowerCase())) ** BigInt(d)) % BigInt(keyN) : (BigInt(encd) ** BigInt(d)) % BigInt(keyN);
        decrypted += `${decode} `;
        decryptedMessage += `${letters[decode]}`;
    }
    document.getElementById("first").innerHTML     =  `Decrypts down to => \n${decrypted}`;
    document.getElementById("second").innerHTML    =  `Which becomes: ${decryptedMessage}`;
    document.getElementById("third").innerHTML     =  "";
    document.getElementById("fourth").innerHTML    =  "";
    document.getElementById("fifth").innerHTML     =  "";
    document.getElementById("sixth").innerHTML     =  "";
    document.getElementById("seventh").innerHTML   =  "";
};

document.getElementById("bothButton").onclick = () => {
    const e = BigInt(document.getElementById("lockVal1").value);
    const lockN = BigInt(document.getElementById("lockVal2").value);
    const d = BigInt(document.getElementById("keyVal1").value);
    const keyN = BigInt(document.getElementById("keyVal2").value);
    const message = document.getElementById("message").value;

    let encrypted = "";
    let msgNumerals = "";
    let encryptedMessage = "";
    let decrypted = "";
    let decryptedMessage = "";
    for (const char of message) {
        if (!letters.includes(char)) continue;
        const numChar = letters.indexOf(char.toLowerCase());
        const encode = (BigInt(numChar) ** BigInt(e)) % BigInt(lockN)
        encrypted += `${encode} `;
        msgNumerals += `${numChar} `;
        encryptedMessage += letters[encode];
    }
    document.getElementById("first").innerHTML = `Your message was: ${message}`;
    document.getElementById("second").innerHTML = `Which becomes: ${msgNumerals}`;
    document.getElementById("third").innerHTML = `After encryption, this becomes: ${encrypted}`;
    document.getElementById("fourth").innerHTML = `This, when stringified, becomes: ${encryptedMessage}`;
    encrypted = encrypted.split(" ");
    encrypted.pop();
    for (const encd of encrypted) {
        const decode = (BigInt(encd) ** BigInt(d)) % BigInt(keyN);
        decrypted += `${decode} `;
        decryptedMessage += `${letters[decode]}`;
    }
    document.getElementById("fifth").innerHTML = `Decrypts down to => \n${decrypted}`;
    document.getElementById("sixth").innerHTML = `Which becomes: ${decryptedMessage}`;
    document.getElementById("seventh").innerHTML = "";
};

/**  /////////////////////////////////////////////////////////////////////////
 *                     ALL MATHEMATICAL FUNCTIONS BELOW
 */

/**
 * Obtain `N` value by multiplying `p` value and `q` value.
 * @param { Number } p 
 * @param { Number } q 
 */
function getN(p, q) {
    return p * q;
}

/**
 * Obtain `e` value from `N` value.
 * @param { Number } N 
 */
function getE(N) {
    return chooseFrom(N, phi(N));
}

/**
 * Obtain `d` value from `e` value and `N` value.
 * @param { Number } e 
 * @param { Number } N 
 */
function getD(e, N) {
    // de (mod N) = 1
    for (let d = 0; d !== -1; d++) {
        if (((e * d) % N == 1) && d != e) return d;
    }
}

/**
 * Get stringified lock from `p` value and `q` value.
 * @param { Number } p 
 * @param { Number } q 
 */
function getLock(p, q) {
    let e = getE(getN(p, q));
    let N = getN(p, q);
    return `${e}, ${N}`;
}

/**
 * Get stringified key from `p` value and `q` value.
 * @param { Number } p 
 * @param { Number } q 
 */
function getKey(p, q) {
    let d = getD(getE(getN(p, q)), phi(getN(p, q)));
    let N = getN(p, q);
    return `${d}, ${N}`;
}

/**
 * Totient function of any number `n`.
 * @param { Number } n 
 */
function phi(n) {
    let result = n; 
    for (let p = 2; p * p <= n; p++)
    {
        if (n % p === 0)
        { 
            while (n % p === 0) n /= p; 
            result *= (1.0 - (1.0 / p)); 
        } 
    }
    if (n > 1) {
        result *= (1.0 - (1.0 / n));
    }
    return Math.floor(result);
}

/**
 * Get greatest common divisor of `a` and `b`.
 * @param { Number } a 
 * @param { Number } b 
 */
function gcdEuclid(a, b) {
    let t;
    while (b !== 0) {
        t = b;
        b = a % b;
        a = t;
    }
    return a;
}

/**
 * Returns true if Greatest Common Denominator of `a` and `b` is equal to `1`.
 * @param { Number } a 
 * @param { Number } b 
 */
function checkIfCoPrime(a, b) {
    return gcdEuclid(a, b) === 1;
}

/**
 * Chooses the first number that is coprime to `N` value and the `totient` of `N` AKA `(phi(N))`.
 * @param { Number } N 
 * @param { Number } phiN 
 */
function chooseFrom(N = 0, phiN = 0) {
    for (let i = 0; i !== -1; i++) {
        if (checkIfCoPrime(i, N) && checkIfCoPrime(i, phiN) && i !== 1) {
            return i;
        }
    }
}