import { Question } from './question';

export type Questionnaire = {
  id: Number;
  name: string;
  questions: Question[];
};
