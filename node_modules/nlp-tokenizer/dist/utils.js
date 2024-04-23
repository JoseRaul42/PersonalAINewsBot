"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function is_whitespace(char) {
    if (char == " " || char == "\t" || char == "\n" || char == "\r") {
        return true;
    }
    if (/\p{Zs}/g.test(char))
        return true;
    return false;
}
exports.is_whitespace = is_whitespace;
function is_control(char) {
    if (char == "\t" || char == "\n" || char == "\r") {
        return false;
    }
    // Cc: \Control
    // Cf: \Format
    // Cs: \Surrogate
    // Co: \Private_Use
    // Cn: \Unassigned
    let startsWithC = [/\p{Cc}/gu, /\p{Cf}/gu, /\p{Cs}/gu, /\p{Co}/gu, /\p{Cn}/gu].some(expr => {
        return expr.test(char);
    });
    return startsWithC;
}
exports.is_control = is_control;
function is_punctuation(char) {
    let cp = char.charCodeAt(0);
    if ((cp >= 33 && cp <= 47) || (cp >= 58 && cp <= 64) ||
        (cp >= 91 && cp <= 96) || (cp >= 123 && cp <= 126))
        return true;
    // Pc: \Connector_Punctuation
    // Pd: \Dash_Punctuation
    // Ps: \Open_Punctuation
    // Pe: \Close_Punctuation
    // Pi: \Initial_Punctuation
    // Pf: \Final_Punctuation
    // Po: \Other_Punctuation
    let startsWithC = [/\p{Pc}/gu, /\p{Pd}/gu, /\p{Ps}/gu, /\p{Pe}/gu, /\p{Pi}/gu, /\p{Pf}/gu, /\p{Po}/gu].some(expr => {
        return expr.test(char);
    });
    return startsWithC;
}
exports.is_punctuation = is_punctuation;
function whitespace_tokenize(text) {
    text = text.trim();
    if (!text)
        return [];
    let tokens = text.split(/\s+/);
    return tokens;
}
exports.whitespace_tokenize = whitespace_tokenize;
// For CommonJS default export support
module.exports = whitespace_tokenize;
module.exports.is_whitespace = is_whitespace;
module.exports.is_control = is_control;
module.exports.is_punctuation = is_punctuation;
module.exports.whitespace_tokenize = whitespace_tokenize;
//# sourceMappingURL=utils.js.map