import { createContext, useEffect } from 'react';
import { CaretStyleType, ThemeType } from '@/data/types';
import { useLocalStorageState } from '@/hooks';

interface ContextState {
  liveWpm: boolean;
  liveAccuracy: boolean;
  inputWidth: number;
  caretStyle: CaretStyleType;
  smoothCaret: boolean;
  soundOnClick: boolean;
  theme: ThemeType;
}

interface ContextFunctions {
  onToggleLiveWpm: () => void;
  onToggleLiveAccuracy: () => void;
  onUpdateInputWidth: (width: number) => void;
  onUpdateCaretStyle: (style: CaretStyleType) => void;
  onToggleSmoothCaret: () => void;
  onToggleSoundOnClick: () => void;
  onResetToDefault: () => void;
  onUpdateTheme: (theme: ThemeType) => void;
}

const defaultState: ContextState = {
  liveWpm: false,
  liveAccuracy: false,
  inputWidth: 100,
  caretStyle: 'line',
  smoothCaret: true,
  soundOnClick: false,
  theme: 'default',
};

const contextInitial: ContextState & ContextFunctions = {
  ...defaultState,
  onToggleLiveWpm: () => {},
  onToggleLiveAccuracy: () => {},
  onUpdateInputWidth: () => {},
  onUpdateCaretStyle: () => {},
  onToggleSmoothCaret: () => {},
  onToggleSoundOnClick: () => {},
  onResetToDefault: () => {},
  onUpdateTheme: () => {},
};

export const CustomizeContext = createContext(contextInitial);

interface Props {
  children: React.ReactNode;
}

export const CustomizeContextProvider = ({ children }: Props) => {
  const [state, setState] = useLocalStorageState('customize', defaultState);

  const onToggleLiveWpm: ContextFunctions['onToggleLiveWpm'] = () => {
    setState((state) => ({ ...state, liveWpm: !state.liveWpm }));
  };

  const onToggleLiveAccuracy: ContextFunctions['onToggleLiveAccuracy'] = () => {
    setState((state) => ({ ...state, liveAccuracy: !state.liveAccuracy }));
  };

  const onUpdateInputWidth: ContextFunctions['onUpdateInputWidth'] = (
    width: number
  ) => {
    setState((state) => ({ ...state, inputWidth: width }));
  };

  const onUpdateCaretStyle: ContextFunctions['onUpdateCaretStyle'] = (style) => {
    setState(() => ({ ...state, caretStyle: style }));
  };

  const onToggleSmoothCaret: ContextFunctions['onToggleSmoothCaret'] = () => {
    setState(() => ({ ...state, smoothCaret: !state.smoothCaret }));
  };

  const onToggleSoundOnClick: ContextFunctions['onToggleSoundOnClick'] = () => {
    setState((state) => ({ ...state, soundOnClick: !state.soundOnClick }));
  };

  const onResetToDefault: ContextFunctions['onResetToDefault'] = () => {
    setState(defaultState);
  };

  const onUpdateTheme: ContextFunctions['onUpdateTheme'] = (theme) => {
    setState((state) => ({ ...state, theme }));
  };

  useEffect(() => {
    const classList = document.body.classList;

    for (let i = 0; i < classList.length; i++) {
      if (classList[i].startsWith('theme--')) {
        classList.remove(classList[i]);
        break;
      }
    }

    document.body.classList.add(`theme--${state.theme || 'default'}`);
  }, [state.theme]);

  return (
    <CustomizeContext.Provider
      value={{
        ...state,
        onToggleLiveWpm,
        onToggleLiveAccuracy,
        onUpdateInputWidth,
        onUpdateCaretStyle,
        onToggleSmoothCaret,
        onToggleSoundOnClick,
        onResetToDefault,
        onUpdateTheme,
      }}
    >
      {children}
    </CustomizeContext.Provider>
  );
};
