import { TypingResult, TypingState } from 'context/state-types';

const addResult = (state: TypingState, result: TypingResult): TypingState => {
  const recent = state.results.recent.slice();
  let best: TypingResult | null = { ...state.results.best! };

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

  const results = {
    best,
    recent,
  };

  window.localStorage.setItem('results', JSON.stringify(results));

  return {
    ...state,
    results,
  };
};

export default addResult;
