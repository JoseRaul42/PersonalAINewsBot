import Tokenizer from './Tokenizer';
import WordPieceTokenizer from './WordPieceTokenizer';
declare class NNTokenizer {
    version: string;
    special_token_names: string[];
    max_len: number;
    unk_token: string;
    sep_token: string;
    pad_token: string;
    cls_token: string;
    mask_token: string;
    added_tokens_encoder: {
        [index: string]: number;
    };
    added_tokens_decoder: {
        [index: number]: string;
    };
    vocab: {
        [index: string]: number;
    };
    ids_to_tokens: {
        [index: number]: string;
    };
    basic_tokenizer: Tokenizer;
    wordpiece_tokenizer: WordPieceTokenizer;
    basic_tokenize: boolean;
    all_special_tokens: {
        [index: string]: boolean;
    };
    constructor(vocab?: string[], basic_tokenize?: boolean, unk_token?: string, sep_token?: string, pad_token?: string, cls_token?: string, mask_token?: string, max_len?: number);
    load_vocab(vocab: string[]): void;
    encoder_offset(): number;
    add_tokens(tokens: string[]): number;
    _token_to_id_with_added_voc(token: string): number;
    _token_to_id(token: string): number;
    _id_to_token(id: number): string;
    tokens_to_ids(tokens: string[] | string): number[];
    _ids_to_tokens(ids: number | number[]): string[];
    tokens_to_text(tokens: string[]): string;
    split_on_token(token: string, text: string): string[];
    split_on_tokens(tokens: string[], text: string): string[];
    tokenize(text: string): string[];
    _tokenize(text: string): string[];
    encode(text: string): number[];
    decode(token_ids: number[]): string[];
}
export default NNTokenizer;
