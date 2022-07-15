import {
  Box,
  BoxProps,
  Checkbox,
  CheckboxGroup,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Question } from 'type/viewModel/common/question';
import { isOtherChecked, QuestionBody } from 'utils/questionnaire';
import { FieldValues, Control } from 'react-hook-form';
import { Textarea } from 'components/atoms/Textarea';

type Props = {
  question: Question;
  control: Control<FieldValues>;
  questionIndex: number;
  handleChange: (props: { newContent: string; index: number }) => string[];
} & BoxProps;
export const QuestionCardWithFreeText: React.VFC<Props> = ({
  question,
  control,
  questionIndex,
  handleChange,
  ...rest
}) => {
  return (
    <Box bg="bg.100" py="5" px="4" {...rest}>
      <Text textStyle="h4">
        {QuestionBody(question)}
        {question.required && (
          <Text as="span" color="action.notification">
            *
          </Text>
        )}
      </Text>
      <Controller
        control={control}
        name={`questions.${questionIndex}.other`}
        rules={{
          maxLength: { value: 200, message: '200文字以下でご入力ください' },
        }}
        render={({
          field: { onChange: onChangeOther },
          fieldState: { error: errorForOther, invalid },
        }) => (
          <Box>
            <Textarea
              h="20"
              mt="5"
              placeholder="コメントを入力"
              onChange={(e) => onChangeOther(e.target.value)}
              borderColor={invalid ? 'action.notification' : '#E0E0E0'}
            />
            {errorForOther && (
              <Text pt="1" textStyle="h8" color="action.notification">
                {errorForOther.message}
              </Text>
            )}
          </Box>
        )}
      />
    </Box>
  );
};
