import { TypingResult, TypingState } from 'shared/types';

const addResult = (state: TypingState, result: TypingResult): TypingState => {
  const recent = state.previousResults.recent.slice();
  let best: TypingResult | null = { ...state.previousResults.best! };

  if (recent.length === 3) {
    recent.pop();
  }
  recent.unshift(result);

  if (
    !best ||
    Object.keys(best).length === 0 ||
    best.wpm < result.wpm ||
    (best.wpm === result.wpm && best.accuracy < result.accuracy)
  ) {
    best = result;
  }

  const previousResults = {
    best,
    recent,
  };

  window.localStorage.setItem('results', JSON.stringify(previousResults));

  return {
    ...state,
    previousResults,
  };
};

export default addResult;
