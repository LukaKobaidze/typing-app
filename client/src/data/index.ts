import { QuoteLengthType } from 'shared/types';

export const data = {
  theme: ['default', 'midnight', 'retro', 'superuser', 'vscode'],

  typemode: {
    time: [15, 30, 60, 120],
    words: [10, 25, 50, 100],
    quote: ['all', 'short', 'medium', 'long'] as QuoteLengthType[],
  },

  caret: ['line', 'underline', 'block', 'off'],
} as const;
