"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tokenizer_1 = require("./Tokenizer");
exports.Tokenizer = Tokenizer_1.default;
const NNTokenizer_1 = require("./NNTokenizer");
exports.NNTokenizer = NNTokenizer_1.default;
const WordPieceTokenizer_1 = require("./WordPieceTokenizer");
exports.WordPieceTokenizer = WordPieceTokenizer_1.default;
exports.default = Tokenizer_1.default;
// For CommonJS default export support
module.exports = Tokenizer_1.default;
module.exports.default = Tokenizer_1.default;
module.exports.Tokenizer = Tokenizer_1.default;
module.exports.NNTokenizer = NNTokenizer_1.default;
module.exports.WordPieceTokenizer = WordPieceTokenizer_1.default;
//# sourceMappingURL=index.js.map