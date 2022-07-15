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
export const QuestionCardWithCheckbox: React.VFC<Props> = ({
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
            message: '１つ以上選択してください',
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Box>
            {error && (
              <Text pt="1" textStyle="h8" color="action.notification">
                {error.message}
              </Text>
            )}
            <VStack pt="5" spacing="5" align="stretch">
              <CheckboxGroup>
                {question.choices.map((choice, choiceIndex) => (
                  <Box key={choiceIndex}>
                    <Checkbox
                      size="lg"
                      colorScheme="blackAlpha"
                      value={choice.content}
                      name={`${choiceIndex}`}
                      isChecked={value}
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
                    </Checkbox>
                    {choice.isOther && (
                      <Controller
                        control={control}
                        name={`questions.${questionIndex}.other`}
                        rules={{
                          required: {
                            value: isOtherChecked(value),
                            message: '理由を記入してください',
                          },
                        }}
                        render={({
                          field: { onChange: onChangeOther },
                          fieldState: { error: errorForOther, invalid },
                        }) => (
                          <Box>
                            <Textarea
                              h="20"
                              mt="5"
                              placeholder="詳しくご説明ください"
                              onChange={(e) => onChangeOther(e.target.value)}
                              borderColor={
                                invalid ? 'action.notification' : '#E0E0E0'
                              }
                            />
                            {errorForOther && (
                              <Text
                                pt="1"
                                textStyle="h8"
                                color="action.notification"
                              >
                                {errorForOther.message}
                              </Text>
                            )}
                          </Box>
                        )}
                      />
                    )}
                  </Box>
                ))}
              </CheckboxGroup>
            </VStack>
          </Box>
        )}
      />
    </Box>
  );
};
