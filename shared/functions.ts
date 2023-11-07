import { QuoteLengthType } from './types';

export function getQuoteFetchURL(length: QuoteLengthType) {
  return `https://api.quotable.io/random${
    length === 'short'
      ? '?maxLength=100'
      : length === 'medium'
      ? '?minLength=101&maxLength=250'
      : length === 'long'
      ? '?minLength=251'
      : ''
  }`;
}
