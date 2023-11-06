import { createContext, useEffect } from 'react';
import { useLocalStorageState } from '@/hooks';
import { TypingResult } from '@/components/Typing/types';

type TestStats = {
  wpm: number;
  accuracy: number;
  raw: number;
};

interface Context {
  testsStarted: number;
  testsCompleted: number;
  highest: TestStats | null;
  average: TestStats | null;
  recentTests: TypingResult[];
  bestTest: TypingResult | null;
  onTestStart: () => void;
  onTestComplete: (result: TypingResult) => void;
}

const initial: Context = {
  testsStarted: 0,
  testsCompleted: 0,
  highest: null,
  average: null,
  recentTests: [],
  bestTest: null,
  onTestStart: () => {},
  onTestComplete: () => {},
};

export const StatsContext = createContext(initial);

interface Props {
  children: React.ReactNode;
}

export function StatsContextProvider({ children }: Props) {
  const [testsStarted, setTestsStarted] = useLocalStorageState(
    'stats-testsStarted',
    initial.testsStarted
  );
  const [testsCompleted, setTestsCompleted] = useLocalStorageState(
    'stats-testsCompleted',
    initial.testsCompleted
  );
  const [highest, setHighest] = useLocalStorageState(
    'stats-highest',
    initial.highest
  );
  const [average, setAverage] = useLocalStorageState(
    'stats-average',
    initial.average
  );
  const [recentTests, setRecentTests] = useLocalStorageState(
    'stats-recentTests',
    initial.recentTests
  );
  const [bestTest, setBestTest] = useLocalStorageState(
    'stats-bestTest',
    initial.bestTest
  );

  const onTestStart: Context['onTestStart'] = () => {
    setTestsStarted((state) => state + 1);
  };

  const onTestComplete: Context['onTestComplete'] = (result) => {
    setTestsCompleted((state) => state + 1);

    const resultStats = result.timeline[result.timeline.length - 1];

    setBestTest((state) => {
      if (
        !state ||
        resultStats.wpm > state.timeline[state.timeline.length - 1].wpm
      ) {
        return result;
      }

      return state;
    });

    setHighest((state) => {
      if (!state) {
        return {
          wpm: resultStats.wpm,
          accuracy: resultStats.accuracy,
          raw: resultStats.raw,
        };
      }

      return {
        wpm: resultStats.wpm > state.wpm ? resultStats.wpm : state.wpm,
        accuracy:
          resultStats.accuracy > state.accuracy
            ? resultStats.accuracy
            : state.accuracy,
        raw: resultStats.raw > state.raw ? resultStats.raw : state.raw,
      };
    });

    setRecentTests((state) => {
      return [result, ...state].slice(0, 100);
    });
  };

  useEffect(() => {
    // Calculate average
    const sum = recentTests.reduce(
      (acc, test) => {
        const { wpm, accuracy, raw } = test.timeline[test.timeline.length - 1];

        acc.wpm += wpm;
        acc.accuracy += accuracy;
        acc.raw += raw;

        return acc;
      },
      {
        wpm: 0,
        accuracy: 0,
        raw: 0,
      } as NonNullable<Context['average']>
    );

    const len = recentTests.length;

    setAverage({
      wpm: Math.round(sum.wpm / len),
      accuracy: Number((sum.accuracy / len).toFixed(2)),
      raw: Math.round(sum.raw / len),
    });
  }, [recentTests, setAverage]);

  return (
    <StatsContext.Provider
      value={{
        testsStarted,
        testsCompleted,
        highest,
        average,
        recentTests,
        bestTest,
        onTestStart,
        onTestComplete,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}
