import { createContext, useEffect } from 'react';
import { CaretStyleType, ThemeType } from '@/data/types';
import { useLocalStorageState } from '@/hooks';
import { getQuoteTagList } from '@/services/quotable';

type QuoteTagsType = { name: string; isSelected: boolean }[];

interface ContextState {
  liveWpm: boolean;
  liveAccuracy: boolean;
  inputWidth: number;
  caretStyle: CaretStyleType;
  smoothCaret: boolean;
  soundOnClick: boolean;
  theme: ThemeType;
  quoteType: 'all' | 'only selected';
  quoteTags: QuoteTagsType;
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
  onToggleQuoteTag: (index: number) => void;
}

const defaultState: ContextState = {
  liveWpm: false,
  liveAccuracy: false,
  inputWidth: 100,
  caretStyle: 'line',
  smoothCaret: true,
  soundOnClick: false,
  theme: 'default',
  quoteType: 'all',
  quoteTags: [],
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
  onToggleQuoteTag: () => {},
};

export const CustomizeContext = createContext(contextInitial);

interface Props {
  children: React.ReactNode;
}

export const CustomizeContextProvider = ({ children }: Props) => {
  const [state, setState] = useLocalStorageState('customize', defaultState);

  useEffect(() => {
    getQuoteTagList().then((data) => {
      const quoteTags: QuoteTagsType = data.map((tag: any) => ({
        name: tag.name,
        isSelected: true,
      }));

      setState((state) => ({ ...state, quoteTags }));
    });
  }, []);

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
    setState({
      ...defaultState,
      quoteTags: state.quoteTags.map((tag) => ({ ...tag, isSelected: true })),
    });
  };

  const onUpdateTheme: ContextFunctions['onUpdateTheme'] = (theme) => {
    setState((state) => ({ ...state, theme }));
  };

  const onToggleQuoteTag: ContextFunctions['onToggleQuoteTag'] = (tagIndex) => {
    setState((state) => ({
      ...state,
      quoteTags: [
        ...state.quoteTags.slice(0, tagIndex),
        {
          name: state.quoteTags[tagIndex].name,
          isSelected: !state.quoteTags[tagIndex].isSelected,
        },
        ...state.quoteTags.slice(tagIndex + 1),
      ],
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
        onToggleQuoteTag,
      }}
    >
      {children}
    </CustomizeContext.Provider>
  );
};
