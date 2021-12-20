import {
  Question,
  OptionProps,
  PromptTypes,
  Notation,
  Option,
  OptionTypes,
  PitchClassOption,
} from './types';

export const parsePrompt = (json: Question) => {
  switch (json.prompt.type) {
    case PromptTypes.Notation:
      return {
        displayText: json.prompt.displayText,
        pitch: (json.prompt as Notation).midiNotation,
      };
    default:
      throw new Error(
        `Unexpected or unsupported type: ${json.prompt.type} while parsing prompt.`,
      );
  }
};

// Parse the optionPool and answer into an array
export const parseOptions = (json: Question): OptionProps[] => {
  const v = [
    ...json.optionPool.map((o, i) => parseOption(o, i)),
    {
      isAnswer: true,
      ...parseOption(json.answer, 4)
    },
  ];

  return v;
};

const parseOption = (option: Option, index: number): OptionProps => {
  switch (option.type) {
    case OptionTypes.PitchClass:
      return {
        displayText: (option as PitchClassOption).letterClass,
        value: index,
      };
    default:
      throw new Error(
        `Unexpected or unsupported type: ${option.type} while parsing prompt.`,
      );
  }
};

/* Randomize array in-place using Durstenfeld shuffle algorithm */
export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
