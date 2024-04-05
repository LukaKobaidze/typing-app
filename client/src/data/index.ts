import { QuoteLengthType } from '@/types';

export const data = {
  apiUrl: import.meta.env.PROD ? '' : 'http://localhost:8080',

  theme: ['default', 'midnight', 'retro', 'superuser', 'vscode'],

  typemode: {
    time: [15, 30, 60, 120],
    words: [10, 25, 50, 100],
    quote: ['all', 'short', 'medium', 'long'] as QuoteLengthType[],
  },

  caret: ['line', 'underline', 'block', 'off'],

  punctuation: {
    marks: ['.', ',', '?', '!', ';', ':', '-', '"', '()'],
    words: [
      "aren't",
      "can't",
      "couldn't",
      "doesn't",
      "don't",
      "hadn't",
      "he'd",
      "he's",
      "I'd",
      "I'll",
      "I'm",
      "isn't",
      "it's",
      "I've",
      "she'd",
      "she's",
      "that's",
      "there's",
      "they'd",
      "they're",
      "they've",
      "wasn't",
      "we'd",
      "we'll",
      "we're",
      "weren't",
      "we've",
      "what's",
      "where's",
      "who'd",
      "who's",
      "won't",
      "wouldn't",
      "you'd",
      "you'll",
      "you're",
      "you've",
    ],
  },
} as const;
