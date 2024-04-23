declare class WordPieceTokenizer {
    version: string;
    vocab: {
        [index: string]: number;
    };
    unk_token: string;
    max_len: number;
    constructor(vocab: {
        [index: string]: number;
    }, unk_token: string, max_len?: number);
    tokenize(text: string): string[];
}
export default WordPieceTokenizer;
