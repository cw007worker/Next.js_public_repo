import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import NormalButton from 'components/atoms/NormalButton';
import { HookState } from 'hooks/usePostQuestionnaireResult';
import { Questionnaire } from 'type/viewModel/common/questionnaire';
import { QuestionCardWithCheckbox } from 'components/organisms/QuestionCard/checkbox';
import { QuestionCardWithFreeText } from 'components/organisms/QuestionCard/freeText';
import { QuestionCardWithRadio } from 'components/organisms/QuestionCard/radio';

type Props = {
  questionnaire: Questionnaire;
  back: () => void;
} & HookState;

export const Component: React.VFC<Props> = ({
  control,
  questionnaire,
  back,
  onSubmit,
  isSubmitting,
  handleSubmit,
  handleChange,
}) => {
  return (
    <Box pt="4" pb="20" px="4" maxW="container.sm" mx="auto" bg="bg.300">
      <Text textStyle="h3" my="3">
        解約の理由について
        <br />
        お聞かせください。
      </Text>
      <Text textStyle="h6" mb="5">
        アンケートは{questionnaire.questions.length}問で終了します。
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        {questionnaire.questions.map((question, index) => {
          if (question.allowMultipleChoice) {
            return (
              <QuestionCardWithCheckbox
                key={index}
                question={question}
                control={control}
                questionIndex={index}
                handleChange={handleChange}
                mb="5"
              />
            );
          } else if (question.isFreeAnswer) {
            return (
              <QuestionCardWithFreeText
                key={index}
                question={question}
                control={control}
                questionIndex={index}
                handleChange={handleChange}
                mb="5"
              />
            );
          } else {
            return (
              <QuestionCardWithRadio
                key={index}
                question={question}
                control={control}
                questionIndex={index}
                handleChange={handleChange}
                mb="5"
              />
            );
          }
        })}
        <Box py="5" px="4">
          <NormalButton
            w="full"
            type="submit"
            isLoading={isSubmitting}
            mb="2.5"
          >
            解約の手続きに進む
          </NormalButton>
          <NormalButton w="full" bg="text.100" color="text.400" onClick={back}>
            戻る
          </NormalButton>
        </Box>
      </form>
    </Box>
  );
};

export const CancellationQuestionnaireTemplate = React.memo(Component);
