/**
 * アンケートの関数群
 */
import { Question } from 'type/viewModel/common/question';

export const QuestionBody = (question: Question) => {
  let sufixText;
  if (question.allowMultipleChoice) {
    sufixText = '複数選択可能';
  }

  return question.body + (sufixText ? `（${sufixText}）` : '');
};

export const formRule = (question: Question) => {
  if (!question.required) {
    return { required: false };
  }
  if (question.allowMultipleChoice) {
    return { required: '1つ以上選択してください' };
  } else {
    return { required: '1つ選択してください' };
  }
};

export const formRuleRequired = (question: Question) => {
  if (!question.required) {
    return false;
  }
  if (question.allowMultipleChoice) {
    return '1つ以上選択してください';
  } else {
    return '1つ選択してください';
  }
};

export const isOtherChecked = (value: any): boolean => {
  if (Array.isArray(value)) {
    return value.includes('その他');
  } else {
    return false;
  }
};
