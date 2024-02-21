import { QuoteLengthType } from '@/types';

const API_URL = 'https://api.quotable.io';

type QuoteType = {
  author: string;
  authorSlug: string;
  content: string;
  dateAdded: string;
  dateModified: string;
  length: number;
  tags: string[];
  _id: string;
};
export async function getRandomQuoteByLength(
  length: QuoteLengthType,
  abortController?: AbortController | null
) {
  const response = await fetch(
    `${API_URL}/random${
      length === 'short'
        ? '?maxLength=100'
        : length === 'medium'
        ? '?minLength=101&maxLength=250'
        : length === 'long'
        ? '?minLength=251'
        : ''
    }`,
    {
      method: 'get',
      signal: abortController?.signal,
    }
  );
  return (await response.json()) as QuoteType;
}

export async function getQuoteTagList() {
  const response = await fetch(`${API_URL}/tags`);

  return await response.json();
}
