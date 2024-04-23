declare class Tokenizer {
    version: string;
    constructor();
    _clean_text(text: string): string;
    _run_split_on_punc(text: string): string[];
    _run_strip_accents(text: string): string;
    tokenize(text: string): string[];
    lexical_diversity(text: string): number[];
}
export default Tokenizer;
