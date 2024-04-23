declare function is_whitespace(char: string): boolean;
declare function is_control(char: string): boolean;
declare function is_punctuation(char: string): boolean;
declare function whitespace_tokenize(text: string): string[];
export { is_whitespace, is_control, is_punctuation, whitespace_tokenize };
