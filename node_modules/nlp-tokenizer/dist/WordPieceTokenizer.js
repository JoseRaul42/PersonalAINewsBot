"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class WordPieceTokenizer {
    constructor(vocab, unk_token, max_len = 100) {
        this.version = '1.0.0';
        this.vocab = vocab;
        this.unk_token = unk_token;
        this.max_len = max_len;
    }
    tokenize(text) {
        let result = [];
        utils_1.whitespace_tokenize(text).map(token => {
            if (token.length > this.max_len) {
                result.push(this.unk_token);
                return null;
            }
            let is_bad = false;
            let start = 0;
            let len = token.length;
            let sub_tokens = [];
            while (start < len) {
                let accept_substr = null;
                let end = len;
                for (; end > start; end--) {
                    let substr = token.slice(start, end);
                    // TODO: different from original implmentation
                    if (this.vocab[substr] != undefined) {
                        accept_substr = start > 0 ? `##${substr}` : substr;
                        break;
                    }
                }
                if (!accept_substr) {
                    is_bad = true;
                    break;
                }
                sub_tokens.push(accept_substr);
                start = end;
            }
            if (is_bad) {
                result.push(this.unk_token);
            }
            else {
                result = result.concat(sub_tokens);
            }
            return null;
        });
        return result;
    }
}
exports.default = WordPieceTokenizer;
// For CommonJS default export support
module.exports = WordPieceTokenizer;
module.exports.default = WordPieceTokenizer;
//# sourceMappingURL=WordPieceTokenizer.js.map