# tokenizer
tokenizer utils for NLP

## Install

```
$ npm install nlp-tokenizer
```

## Basic Tokenizer

```js
import { Tokenizer, NNTokenizer, WordPieceTokenizer }  from 'nlp-tokenizer';
// or
const { Tokenizer, NNTokenizer, WordPieceTokenizer } = require('nlp-tokenizer');

let tokenizer = new Tokenizer()
let tokens = tokenizer.tokenize("one two three, four, five.")
// tokens == ['one', 'two', 'three', ',', 'four', ',', 'five', '.']

let result = tokenizer.lexical_diversity("aa aa bb bb cc cc 😀 πüé Grüße")
// 6 unique words, 9 words, lexical diversity is 6/9
// result == [6,9,6/9]
```

## Word Piece Tokenizer

```js
import { Tokenizer, NNTokenizer, WordPieceTokenizer }  from 'nlp-tokenizer';
// or
const { Tokenizer, NNTokenizer, WordPieceTokenizer } = require('nlp-tokenizer');

let token_to_id = {'one': 1, 'two': 2, 'un': 3, 'able': 4, 'aff': 5}
let unknown_token = '[UNK]'
let tokenizer = new WordPieceTokenizer(token_to_id, unknown_token)
let t = tokenizer.tokenize('unaffable')
// t == ['un', '##aff', '##able']
````

## NN Tokenizer

```js
import { Tokenizer, NNTokenizer, WordPieceTokenizer }  from 'nlp-tokenizer';
// or
const { Tokenizer, NNTokenizer, WordPieceTokenizer } = require('nlp-tokenizer');

let vocabulary = ['one', 'two', 'three', 'four', 'five', ',', '.']
let extra_vocabulary = ['foo', 'bar']
let tokenizer = new NNTokenizer(vocabulary)
tokenizer.add_tokens(extra_vocabulary)
let t = tokenizer.tokenize('one two three, four foo, five.')
// tokens == ['one', 'two', 'three', ',', 'four', 'foo', ',', 'five', '.']

let encoded = tokenizer.encode('one two three, four foo unknowned, five.')
// vocabulary ranges from 0 to 6
// unknown token takes 7
// extra vocabulary ranges from 8 to 9
// encoded == [0, 1, 2, 5, 3, 8, 7, 5, 4, 6]

````
