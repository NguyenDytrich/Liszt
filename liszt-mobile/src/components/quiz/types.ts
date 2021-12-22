export interface SubmissionData {
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

export interface Notation extends Prompt {
  midiNotation: string;
}

export interface QuestionResponse extends SubmissionData {
  correct: boolean;
  question: Question;
  dwellTimeSeconds: number;
}

export type QuizData = {
  quizId: string;
  userId: string;
  submissionDate: Date;
  responses: QuestionResponse[];
  metadata: QuizMetadata;
}

export type QuizMetadata = {
  totalCorrect:  number;
  totalQuestions: number;
  accuracy: number;
  averageDwellTime: number;
}

export enum PromptTypes {
  Notation = "notation",
}

export enum OptionTypes {
  PitchClass = "pitch_class",
}