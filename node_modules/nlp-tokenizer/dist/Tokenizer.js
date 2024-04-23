"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class Tokenizer {
    constructor() {
        this.version = '1.0.0';
    }
    _clean_text(text) {
        let output = [];
        for (let char of text) {
            let cp = char.charCodeAt(0);
            if (cp == 0 || cp == 0xfffd || utils_1.is_control(char))
                continue;
            if (utils_1.is_whitespace(char))
                output.push(" ");
            else
                output.push(char);
        }
        return output.join('');
    }
    _run_split_on_punc(text) {
        let i = 0;
        let start_new_word = true;
        let output = [];
        while (i < text.length) {
            let char = text[i];
            if (utils_1.is_punctuation(char)) {
                output.push([char]);
                start_new_word = true;
            }
            else {
                if (start_new_word)
                    output.push([]);
                start_new_word = false;
                output[output.length - 1].push(char);
            }
            i += 1;
        }
        return output.map(x => x.join(''));
    }
    _run_strip_accents(text) {
        text = text.normalize('NFD');
        let output = [];
        for (let char of text) {
            if (/\p{Mn}/gu.test(char))
                continue;
            output.push(char);
        }
        return output.join('');
    }
    tokenize(text) {
        text = this._clean_text(text);
        let orig_tokens = utils_1.whitespace_tokenize(text);
        let split_tokens = [];
        for (let i in orig_tokens) {
            let token = orig_tokens[i];
            token = token.toLowerCase();
            token = this._run_strip_accents(token);
            split_tokens = split_tokens.concat(this._run_split_on_punc(token));
        }
        return split_tokens;
    }
    lexical_diversity(text) {
        let data = this.tokenize(text);
        let word_count = data.length || 1;
        let vocab_size = (new Set(data)).size;
        let diversity_score = vocab_size / word_count;
        return [vocab_size, word_count, diversity_score];
    }
}
exports.default = Tokenizer;
// For CommonJS default export support
module.exports = Tokenizer;
module.exports.default = Tokenizer;
//# sourceMappingURL=Tokenizer.js.map