import { VFC, memo } from 'react';
import { HookState } from 'hooks/useRegisterPhoneNumber';
import { useForm } from 'react-hook-form';
import { Box, Text, FormLabel } from '@chakra-ui/react';
import { TextFieldWithNoLabel } from 'components/molecules/TextFieldWithNoLabel';
import { PHONE_NUMBER_REGEX } from 'utils/regex';
import NormalButton from 'components/atoms/NormalButton';
import { OnboardingStep } from 'components/organisms/OnboardingStep';

const Component: VFC<HookState> = (props) => {
  return (
    <Box px="8" pt="14" pb="5" maxW="container.sm" mx="auto">
      <OnboardingStep stepName="phone" />
      <Box py="6">
        <Box bg="primary.300" p="10px" textAlign="center">
          使ったものでも返品返金OK！
          <br />
          全額補償します◎
        </Box>
      </Box>
      <form>
        {/** TODO: FormControlPropsのisInvalidを直す
         * ref: https://github.com/parchiee/pantry_webclient/pull/137#discussion_r730323660 **/}
        <TextFieldWithNoLabel
          name="phoneNumber"
          errorMessage={props.errors.phoneNumber?.message}
          FormControlProps={{
            isInvalid: props.errors.phoneNumber?.message,
          }}
          InputProps={{
            height: '50px',
            placeholder: '080xxxxxxxx',
            ...props.register('phoneNumber', {
              required: 'この項目は必須です',
              pattern: {
                value: PHONE_NUMBER_REGEX,
                message: '有効な日本の電話番号を入力してください。',
              },
            }),
          }}
          mb="5"
        />
        <Box py="5">
          {/**
           * buttonに不可視のreCAPCHAを使用するためのidを設定する
           */}
          <NormalButton
            id="invisible_recapcha"
            w="full"
            // type="submit"
            isLoading={props.isSubmitting}
            isDisabled={!props.canGo}
            onClick={(e) => {
              e.preventDefault();
              props.onSubmit();
            }}
          >
            続ける
          </NormalButton>
        </Box>
      </form>
    </Box>
  );
};

export const PhoneTemplate = memo(Component);
