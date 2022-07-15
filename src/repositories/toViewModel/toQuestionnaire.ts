import { GetQuestionnaireResponse } from 'type/response/getQuestionnaire';
import { CancelQuestionnaire } from 'type/viewModel/cancelQuestionnaire';
import { Question } from 'type/viewModel/common/question';
import { Choice } from 'type/viewModel/common/choice';

export const toQuestionnaire = (
  res: GetQuestionnaireResponse
): CancelQuestionnaire => {
  const questions: Question[] = [];

  res.questionnaire.questions.map((question, index) => {
    const choices: Choice[] = [];

    question.choices.map((choice, index) => {
      choices.push({
        id: choice.id,
        content: choice.content,
        isOther: choice.is_other,
      });
    });

    questions.push({
      id: question.id,
      body: question.body,
      allowMultipleChoice: question.allow_multiple_choice,
      required: question.required,
      hasOther: question.has_other,
      isFreeAnswer: question.is_free_answer,
      orderIndex: question.order_index,
      choices: choices,
    });
  });

  return {
    cancelQuestionnaire: {
      id: res.questionnaire.id,
      name: res.questionnaire.name,
      questions: questions,
    },
  };
};
