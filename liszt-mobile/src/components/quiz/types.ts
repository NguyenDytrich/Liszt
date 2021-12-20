export type SubmissionData = {
  recievedAt: Date | undefined;
  submittedAt: Date | undefined;
  submittedAnswer: Option | undefined;
};

export type OptionProps = {
  displayText: string;
  isAnswer?: boolean;
  value: number;
};

// Api response types and interfaces
export type Question = {
  type: string;
  id: string;
  prompt: Prompt;
  answer: Option;
  optionPool: Option[];
};
export interface Prompt {
  type: string;
  displayText: string;
}

export interface Option {
  type: string;
  id: string;
}

export interface PitchClassOption extends Option {
  integerClass: number;
  letterClass: string;
}

export interface SingleNoteRecognition extends Prompt {
  midiNotation: string;
}
