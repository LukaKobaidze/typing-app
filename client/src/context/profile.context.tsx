import { createContext, useEffect, useState } from 'react';
import {
  GetProfileFilterType,
  httpGetHistory,
  httpGetProfile,
  httpPostCustomize,
} from '@/api/profile';
import { CaretStyleType, ThemeType } from '@/data/types';
import { TypingResult } from '@/types';
import { httpTypingCompleted, httpTypingStarted } from '@/api/typing';
import { ISOToDate } from '@/helpers';

interface CustomizeBooleans {
  liveWpm: boolean;
  liveAccuracy: boolean;
  smoothCaret: boolean;
  soundOnClick: boolean;
}

export interface ICustomize extends CustomizeBooleans {
  inputWidth: number;
  fontSize: number;
  caretStyle: CaretStyleType;
  theme: ThemeType;
}

const customizeInitial: ICustomize = {
  liveWpm: false,
  liveAccuracy: false,
  inputWidth: 85,
  fontSize: 24,
  caretStyle: 'line',
  smoothCaret: true,
  soundOnClick: false,
  theme: 'default',
};

type StatsAverageType = { wpm: number; accuracy: number; raw: number };

export interface IProfile {
  username: string;
  customize: ICustomize;
  stats: {
    testsStarted?: number;
    testsCompleted?: number;
    average?: StatsAverageType;
    highest?: StatsAverageType;
  };
  history: { items: Record<number, TypingResult[]>; totalPages: number };
}

interface Context {
  profile: IProfile;
  loading: GetProfileFilterType[] | null;
  onLoadProfileData: (filter?: GetProfileFilterType[]) => void;
  onLoadHistory: (...args: Parameters<typeof httpGetHistory>) => void;
  onCustomizeUpdateState: (updatedProperties: Partial<ICustomize>) => void;
  onCustomizeToggleState: (property: keyof CustomizeBooleans) => void;
  onCustomizeResetState: () => void;
  onCustomizeUpdateServer: () => void;
  onTestsStartedUpdate: () => void;
  onTestsCompletedUpdate: (result: TypingResult) => void;
  onClearProfile: () => void;
}

const initial: Context = {
  profile: {
    username: '',
    customize: customizeInitial,
    stats: { testsStarted: 0, testsCompleted: 0 },
    history: { items: {}, totalPages: 1 },
  },
  loading: null,
  onLoadProfileData: () => {},
  onLoadHistory: () => {},
  onCustomizeUpdateState: () => {},
  onCustomizeToggleState: () => {},
  onCustomizeResetState: () => {},
  onCustomizeUpdateServer: () => {},
  onTestsStartedUpdate: () => {},
  onTestsCompletedUpdate: () => {},
  onClearProfile: () => {},
};

export const ProfileContext = createContext(initial);

let historyAbortController: AbortController;
let customizeServerLatest: ICustomize;

export function ProfileContextProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState(initial.profile);
  const [loading, setLoading] = useState(initial.loading);

  useEffect(() => {
    onLoadProfileData();
  }, []);

  const onLoadProfileData: Context['onLoadProfileData'] = (filter) => {
    httpGetProfile(filter).then((data: any) => {
      const filteredData: any = {};

      Object.keys(data).forEach((key) => {
        if (Object.keys(data[key]).length !== 0) {
          filteredData[key] = data[key];
        }
      });

      if (filteredData.history) {
        filteredData.history = filteredData.history.map((result: any) => ({
          ...result,
          date: ISOToDate(result.date),
        }));
      }

      setProfile((state) => ({
        ...state,
        ...filteredData,
      }));
      if (filteredData.customize) {
        customizeServerLatest = filteredData.customize;
      }

      setLoading(null);
    });
  };

  const onLoadHistory: Context['onLoadHistory'] = (page, limit) => {
    historyAbortController?.abort();
    historyAbortController = new AbortController();

    httpGetHistory(page, limit, historyAbortController).then((data) => {
      console.log(data);

      setProfile((state) => ({
        ...state,
        history: {
          items: {
            ...state.history.items,
            [data.currentPage]: data.items.map((result: any) => ({
              ...result,
              date: ISOToDate(result.date),
            })),
          },
          totalPages: data.totalPages,
        },
      }));
    });
  };

  const onCustomizeUpdateServer = () => {
    let update: Partial<ICustomize> = {};

    const keys = Object.keys(profile.customize) as (keyof ICustomize)[];

    if (!customizeServerLatest) {
      update = profile.customize;
    } else {
      keys.forEach((key) => {
        if (
          customizeServerLatest[key] === undefined ||
          profile.customize[key] !== customizeServerLatest[key]
        ) {
          Object.assign(update, { [key]: profile.customize[key] });
        }
      });
    }
    if (Object.keys(update).length !== 0) {
      httpPostCustomize(update);
      customizeServerLatest = { ...profile.customize, ...update };
    }
  };

  const onCustomizeUpdateState: Context['onCustomizeUpdateState'] = (
    updatedProperties
  ) => {
    setProfile((state) => ({
      ...state,
      customize: { ...state.customize, ...updatedProperties },
    }));
  };

  const onCustomizeToggleState: Context['onCustomizeToggleState'] = (property) => {
    setProfile((state) => ({
      ...state,
      customize: {
        ...state.customize,
        [property]: !state.customize[property],
      },
    }));
  };

  const onCustomizeResetState: Context['onCustomizeResetState'] = () => {
    setProfile((state) => ({
      ...state,
      customize: customizeInitial,
    }));
  };

  const onTestsStartedUpdate: Context['onTestsStartedUpdate'] = () => {
    httpTypingStarted();
    setProfile((state) => ({
      ...state,
      stats: { ...state.stats, testsStarted: (state.stats.testsStarted || 0) + 1 },
    }));
  };

  const onTestsCompletedUpdate: Context['onTestsCompletedUpdate'] = (result) => {
    httpTypingCompleted(result);

    const resultLatest = result.timeline[result.timeline.length - 1];

    setProfile((state) => {
      const statsAverageKeys = [
        'wpm',
        'accuracy',
        'raw',
      ] as (keyof StatsAverageType)[];

      const average = { ...state.stats.average } as StatsAverageType;
      const highest = { ...state.stats.highest } as StatsAverageType;

      statsAverageKeys.forEach((key) => {
        // Average
        const keyAverage = (state.stats.average && state.stats.average[key]) || 0;
        const testsCompleted = state.stats.testsCompleted || 0;

        average[key] = Number(
          (
            (keyAverage * testsCompleted + resultLatest[key]) /
            (testsCompleted + 1)
          ).toFixed(2)
        );

        // Highest
        const keyHighest = (state.stats.highest && state.stats.highest[key]) || 0;

        if (keyHighest < resultLatest[key]) {
          highest[key] = resultLatest[key];
        }
      });

      return {
        ...state,
        stats: {
          ...state.stats,
          testsCompleted: (state.stats.testsCompleted || 0) + 1,
          average,
          highest,
        },
        history: initial.profile.history,
      };
    });
  };

  const onClearProfile: Context['onClearProfile'] = () => {
    setProfile(initial.profile);
  };

  useEffect(() => {
    const classList = document.body.classList;

    for (let i = 0; i < classList.length; i++) {
      if (classList[i].startsWith('theme--')) {
        classList.remove(classList[i]);
        break;
      }
    }

    document.body.classList.add(`theme--${profile.customize.theme || 'default'}`);
  }, [profile.customize.theme]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        onLoadProfileData,
        onLoadHistory,
        onCustomizeUpdateState,
        onCustomizeToggleState,
        onCustomizeResetState,
        onCustomizeUpdateServer,
        onClearProfile,
        onTestsStartedUpdate,
        onTestsCompletedUpdate,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
