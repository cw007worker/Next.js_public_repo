import { Choice } from './choice';

export type Question = {
  id: number;
  body: string;
  allowMultipleChoice: boolean;
  required: boolean;
  hasOther: boolean;
  isFreeAnswer: boolean;
  orderIndex: number;
  choices: Choice[];
};
