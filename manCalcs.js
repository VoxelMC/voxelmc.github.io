const trevorCipher = [
    " ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", 
    "u", "v", "w", "x", "y", "z", "!", "?", ",", "/", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
    "`", "~", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "<", ">", "{", "}", ":", ";",
    "\\", "[", "]", "|", "'", '"', "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
    "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

console.log(
    f("Maths!")[2][1],
);

function f(string) {
    let out = [ [], [] , []];
    for (const letter of string) {
        out[0].push(trevorCipher.indexOf(letter));
        out[1].push((BigInt(trevorCipher.indexOf(letter)) ** BigInt(5)) % BigInt(13031));
        
    }
    out[2].push(BigInt(1545) ** BigInt(5117));
    out[2].push(BigInt(7405) ** BigInt(5117));
    return out;
}

