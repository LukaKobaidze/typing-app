import { createContext } from 'react';
import { useLocalStorageState } from 'hooks';

export const caretStyles = ['line', 'underline', 'block', 'off'] as const;
export type CaretStyleType = (typeof caretStyles)[number];

interface ContextState {
  liveWpm: boolean;
  liveAccuracy: boolean;
  inputWidth: number;
  caretStyle: CaretStyleType;
  smoothCaret: boolean;
  soundOnClick: boolean;
}

interface ContextFunctions {
  onToggleLiveWpm: () => void;
  onToggleLiveAccuracy: () => void;
  onUpdateInputWidth: (width: number) => void;
  onUpdateCaretStyle: (style: CaretStyleType) => void;
  onToggleSmoothCaret: () => void;
  onToggleSoundOnClick: () => void;
  onResetToDefault: () => void;
}

const defaultState: ContextState = {
  liveWpm: false,
  liveAccuracy: false,
  inputWidth: 100,
  caretStyle: 'line',
  smoothCaret: true,
  soundOnClick: false,
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
      }}
    >
      {children}
    </CustomizeContext.Provider>
  );
};
