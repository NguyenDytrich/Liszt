export type Question = {
  prompt: {
    displayText: string;
    pitch: string;
  };
  options: Option[];
};

export type SubmissionData = {
  recievedAt: Date | undefined;
  submittedAt: Date | undefined;
  submittedAnswer: string | undefined;
};

export type Option = {
  displayText: string;
  isAnswer?: boolean;
  value: number;
};