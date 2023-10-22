import randomWords from 'random-words';
import { TypemodeQuote } from 'data/types';
import { TypingWords } from 'components/Typing/types';

export function getRandomWords(quantity: number = 50): TypingWords {
  return getTypingWords(randomWords({ exactly: quantity, maxLength: 6 }));
}

export function getTypingWords(words: string[]): TypingWords {
  return words.map((word: string) => ({
    isIncorrect: false,
    chars: word.split('').map((char) => ({ content: char, type: 'none' })),
  }));
}

export function getTypingResults(
  typed: number,
  typedCorrectly: number,
  mistype: number,
  timeTook: number
): { wpm: number; raw: number; accuracy: number } {
  const timeTookInMin = timeTook / 60000;

  return {
    wpm: Math.round(typedCorrectly / 5 / timeTookInMin),
    accuracy: Number((((typed - mistype) / typed) * 100).toFixed(2)) || 100,
    raw: Math.round(typed / 5 / timeTookInMin),
  };
}

export function twoDecimals(n: number) {
  let log10 = n ? Math.floor(Math.log10(n)) : 0;
  let div = log10 < 0 ? Math.pow(10, 1 - log10) : 100;

  return Math.round(n * div) / div;
}

export async function getRandomQuote(
  length: TypemodeQuote,
  abortController?: AbortController | null
) {
  const response = await fetch(
    `https://api.quotable.io/random${
      length === 'short'
        ? '?maxLength=100'
        : length === 'medium'
        ? '?minLength=101&maxLength=250'
        : length === 'long'
        ? '?minLength=251'
        : ''
    }`,
    { method: 'get', signal: abortController?.signal }
  );

  return await response.json();
}

export function getTimeSince(date: number, strShort?: boolean) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = new Date().getTime() - date;

  const timeAgo = strShort
    ? {
        second: 's ago',
        minute: 'm ago',
        hour: 'hr ago',
        day: 'd ago',
        month: 'mnth ago',
        year: 'yr ago',
      }
    : {
        second: ' second(s) ago',
        minute: ' minute(s) ago',
        hour: ' hour(s) ago',
        day: ' day(s) ago',
        month: ' month(s) ago',
        year: ' year(s) ago',
      };

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + timeAgo.second;
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + timeAgo.minute;
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + timeAgo.hour;
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + timeAgo.day;
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + timeAgo.month;
  } else {
    return Math.round(elapsed / msPerYear) + timeAgo.year;
  }
}

export function addColorOpacity(color: string, opacity: number) {
  // coerce values so ti is between 0 and 1.
  let _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}
