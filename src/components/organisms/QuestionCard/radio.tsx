import {
  Box,
  BoxProps,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Question } from 'type/viewModel/common/question';
import { QuestionBody } from 'utils/questionnaire';
import { FieldValues, Control } from 'react-hook-form';

type Props = {
  question: Question;
  control: Control<FieldValues>;
  questionIndex: number;
  handleChange: (props: { newContent: string; index: number }) => string[];
} & BoxProps;
export const QuestionCardWithRadio: React.VFC<Props> = ({
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
        name={`questions.${questionIndex}.contents`}
        defaultValue={[]}
        rules={{
          required: {
            value: question.required,
            message: '１つ選択してください',
          },
        }}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <Box>
            {error && (
              <Text pt="1" textStyle="h8" color="action.notification">
                {error.message}
              </Text>
            )}
            <RadioGroup colorScheme="blackAlpha">
              <VStack pt="5" spacing="5" align="stretch">
                {question.choices.map((choice, choiceIndex) => (
                  <Radio
                    key={choiceIndex}
                    value={choice.content}
                    onChange={(e) =>
                      onChange(
                        handleChange({
                          newContent: e.target.value,
                          index: questionIndex,
                        })
                      )
                    }
                  >
                    <Text textStyle="h6">{choice.content}</Text>
                  </Radio>
                ))}
              </VStack>
            </RadioGroup>
          </Box>
        )}
      />
    </Box>
  );
};
