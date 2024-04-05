import randomWords from 'random-words';
import { TypingWords } from '@/components/Typing/types';
import { data } from '@/data';

export function firstLetterUpperCase(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}

export function getRandomNumberBetween(from: number, to: number) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

export function getRandomWords(
  quantity: number,
  punctuation?: boolean,
  numbers?: boolean
): TypingWords {
  if (quantity === 0) return [];

  const wordsArr = randomWords({ exactly: quantity, maxLength: 6 });

  if (punctuation) {
    wordsArr[0] = firstLetterUpperCase(wordsArr[0]);

    let i = getRandomNumberBetween(2, 7);

    while (i < wordsArr.length - 2) {
      // Marks
      if (getRandomNumberBetween(0, 1) === 0) {
        const mark =
          data.punctuation.marks[
            getRandomNumberBetween(0, data.punctuation.marks.length - 1)
          ];

        switch (mark) {
          case '.':
          case '!':
          case '?':
            wordsArr[i] += mark;
            if (wordsArr[i + 1]) {
              wordsArr[i + 1] = firstLetterUpperCase(wordsArr[i + 1]);
            }
            break;
          case ',':
          case ':':
          case ';':
            wordsArr[i] += mark;
            break;
          case '"':
            wordsArr[i] = '"' + wordsArr[i] + '"';
            break;
          case '()':
            wordsArr[i] = '(' + wordsArr[i] + ')';
            break;
          case '-':
            wordsArr[i] = '-';
        }
      } else {
        // Words

        const word =
          data.punctuation.words[
            getRandomNumberBetween(0, data.punctuation.words.length - 1)
          ];

        wordsArr[i] = word;
      }
      i += getRandomNumberBetween(2, 7);
    }

    const lastMarkArr: (typeof data.punctuation.marks)[number][] = ['.', '!', '?'];

    wordsArr[wordsArr.length - 1] =
      wordsArr[wordsArr.length - 1] +
      lastMarkArr[getRandomNumberBetween(0, lastMarkArr.length - 1)];
  }

  if (numbers) {
    let numbersQuantityLeft = getRandomNumberBetween(
      quantity * 0.05,
      quantity * 0.3
    );

    let insertAt = -1;

    while (numbersQuantityLeft > 0) {
      insertAt++;
      const numberLength = getRandomNumberBetween(1, 4);

      const generatedNumber = getRandomNumberBetween(
        Number('1' + '0'.repeat(numberLength - 1)),
        Number('9'.repeat(numberLength))
      );
      insertAt += getRandomNumberBetween(
        1,
        Math.floor((quantity - insertAt) / numbersQuantityLeft)
      );

      if (insertAt < wordsArr.length - 1) {
        wordsArr[insertAt] = String(generatedNumber);
      } else {
        break;
      }
      numbersQuantityLeft--;
    }
  }

  return getTypingWords(wordsArr);
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
    accuracy: Math.max(Number((((typed - mistype) / typed) * 100).toFixed(2)), 0),
    raw: Math.round(typed / 5 / timeTookInMin),
  };
}

export function twoDecimals(n: number) {
  let log10 = n ? Math.floor(Math.log10(n)) : 0;
  let div = log10 < 0 ? Math.pow(10, 1 - log10) : 100;

  return Math.round(n * div) / div;
}

export function getTimeSince(date: Date, strShort?: boolean) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = new Date().getTime() - date.getTime();

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

export function ISOToDate(s: string) {
  const b: any = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}
