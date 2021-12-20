export const parsePrompt = json => {
  return {
    displayText: json.prompt.displayText,
    pitch: json.prompt.midiNotation,
  };
};

// Parse the optionPool and answer into an array
export const parseOptions = json => {
  const v = [
    ...json.optionPool.map((o, i) => {
      return {displayText: o.letterClass, value: i};
    }),
    {
      isAnswer: true,
      displayText: json.answer.letterClass,
      value: 4,
    },
  ];

  return v;
};

/* Randomize array in-place using Durstenfeld shuffle algorithm */
export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
