import { createContext, useCallback, useEffect, useState } from 'react';
import { httpGetProfile, httpPostCustomize } from '@/api/profile';
import { CaretStyleType, ThemeType } from '@/data/types';

interface CustomizeBooleans {
  liveWpm: boolean;
  liveAccuracy: boolean;
  smoothCaret: boolean;
  soundOnClick: boolean;
}

export interface ICustomize extends CustomizeBooleans {
  inputWidth: number;
  caretStyle: CaretStyleType;
  theme: ThemeType;
}

const customizeInitial: ICustomize = {
  liveWpm: false,
  liveAccuracy: false,
  inputWidth: 85,
  caretStyle: 'line',
  smoothCaret: true,
  soundOnClick: false,
  theme: 'default',
};

interface IProfile {
  username: string;
  customize: ICustomize;
}

interface Context {
  profile: IProfile;
  onLoadProfileData: (filter?: string[]) => void;
  onCustomizeUpdateState: (updatedProperties: Partial<ICustomize>) => void;
  onCustomizeToggleState: (property: keyof CustomizeBooleans) => void;
  onCustomizeResetState: () => void;
  onCustomizeUpdateServer: () => void;
}

const initial: Context = {
  profile: { username: '', customize: customizeInitial },
  onLoadProfileData: () => {},
  onCustomizeUpdateState: () => {},
  onCustomizeToggleState: () => {},
  onCustomizeResetState: () => {},
  onCustomizeUpdateServer: () => {},
};

export const ProfileContext = createContext(initial);

let customizeServerLatest: ICustomize;
export function ProfileContextProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState(initial.profile);

  const onLoadProfileData: Context['onLoadProfileData'] = (filter) => {
    httpGetProfile(filter).then((data) => {
      console.log(data);
      setProfile((state) => ({
        ...state,
        ...data,
      }));

      if (data.customize) {
        customizeServerLatest = data.customize;
      }
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
    console.log(update);
    if (Object.keys(update).length !== 0) {
      httpPostCustomize(update);
      customizeServerLatest = { ...profile.customize, ...update };
    }
  };

  useEffect(() => {
    onLoadProfileData(['username', 'customize']);
  }, []);

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
        onLoadProfileData,
        onCustomizeUpdateState,
        onCustomizeToggleState,
        onCustomizeResetState,
        onCustomizeUpdateServer,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
