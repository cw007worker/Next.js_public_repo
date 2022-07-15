import { useMemo, useCallback, useEffect, useState } from 'react';
import { postQuestionnaireResult } from 'repositories/postQuestionnaireResult';
import { postQuestionnaireResultSchema } from 'type/request/postQuestionnaireResult';
import { sentryLog } from 'libs/setnry';

import {
  createFailState,
  createLoadingState,
  createSuccessState,
  FetchManageState,
  isFailState,
  isInitState,
  isLoadingState,
  isSuccessState,
} from 'type/util/fetchData';
import {
  DeepMap,
  FieldError,
  FieldValues,
  useFieldArray,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  Control,
} from 'react-hook-form';
import { useToast } from '@chakra-ui/react';
import { Question } from 'type/viewModel/common/question';
import { Choice } from 'type/viewModel/common/choice';
import { Questionnaire } from 'type/viewModel/common/questionnaire';
import { useRouter } from 'next/router';

type DataState<T> = FetchManageState<T>;

type INIT = undefined;

type LOADING = { type: 'loading' };

type LOADED = {
  type: 'loaded';
  data: { status: 'success' };
};

type ERROR = { type: 'error'; message: string };

type answerValue = {
  contents: string[];
  other: string | undefined;
};

// 修正してOK（最終的にリクエストのパラメータ形に整形し直せれば、なんでもOK）
export type PostQuestionnaireResultFormValues = {
  questionId: number;
  answeredContents: string[];
};

export type HookState = {
  control: Control<FieldValues>;
  onSubmit: (values: { questions: answerValue[] }) => Promise<void>;
  isSubmitting: boolean;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  handleChange: (props: { newContent: string; index: number }) => string[];
};

export type State = INIT | LOADED | ERROR | LOADING;

type Props = {
  questionnaire: Questionnaire;
  membershipId: string;
};

export const usePostQuestionnaireResult = (props: Props) => {
  const router = useRouter();
  const { questionnaire } = props;
  const [state, setState] = useState<
    DataState<{
      status: number;
      message: null;
    }>
  >(undefined);

  const { handleSubmit, getValues, control } = useForm();

  const request = useCallback(
    async (answerValues: PostQuestionnaireResultFormValues[]) => {
      setState(createLoadingState());
      let parsed;
      try {
        parsed = postQuestionnaireResultSchema.parse({
          id: props.questionnaire?.id,
          answers: answerValues.map((answer, i) => ({
            question_id: answer.questionId,
            contents: answer.answeredContents,
          })),
        });
      } catch (err) {
        console.error(err);
        sentryLog(err);
        return setState(createFailState('パラメーターが不正です。'));
      }
      try {
        const res = await postQuestionnaireResult(parsed);
        setState(createSuccessState(res));
        router.push({
          pathname: '/cancellation/confirm',
          query: { membershipId: props.membershipId },
        });
      } catch (err) {
        sentryLog(err);
        setState(createFailState('回答の送信に失敗しました。'));
      }
    },
    [props.questionnaire]
  );

  const onSubmit = async (values: { questions: answerValue[] }) => {
    const { questions } = values;
    const formattedValue: PostQuestionnaireResultFormValues[] = questions.map(
      (question, index) => {
        if (questionnaire.questions[index].allowMultipleChoice) {
          const otherIndex = question.contents.indexOf('その他');
          question.contents[otherIndex] = question.other ?? '';
        }
        if (questionnaire.questions[index].isFreeAnswer) {
          question.contents = [question.other ?? ''];
        }
        return {
          questionId: questionnaire.questions[index].id,
          answeredContents: question.contents,
        };
      }
    );
    await request(formattedValue);
  };

  const handleChange = (props: {
    newContent: string;
    index: number;
  }): string[] => {
    const { newContent, index } = props;
    const { questions } = getValues();
    const value: answerValue = questions[index];
    if (questionnaire.questions[index].allowMultipleChoice) {
      const newContents = value.contents.includes(newContent)
        ? value.contents.filter((content: string) => content !== newContent)
        : [...value.contents, newContent];
      return newContents;
    } else {
      return [newContent];
    }
  };

  const isSubmitting = useMemo(() => {
    return isLoadingState(state);
  }, [state]);

  return {
    control,
    isSubmitting,
    onSubmit,
    handleSubmit,
    handleChange,
  };
};
