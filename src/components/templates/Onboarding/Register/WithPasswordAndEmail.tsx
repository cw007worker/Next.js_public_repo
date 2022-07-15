import { VFC, memo } from 'react';
import { HookState } from 'hooks/useRegisterWithPasswordAndEmail';
import { Box, Text } from '@chakra-ui/react';
import { TextFieldWithNoLabel } from 'components/molecules/TextFieldWithNoLabel';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'utils/regex';
import NormalButton from 'components/atoms/NormalButton';
import { LoginBox } from 'components/organisms/LoginBox';
import { OnboardingStep } from 'components/organisms/OnboardingStep';

export const Component: VFC<HookState> = (props) => {
  return (
    <Box px="8" pt="14" pb="5" maxW="container.sm" mx="auto">
      <OnboardingStep stepName="email" />
      <Box py="6">
        <Box bg="primary.300" p="10px" textAlign="center">
          会員費月額300円でコスメやブランドバックが
          <br />
          最大90%OFFで買える！
        </Box>
      </Box>
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {/** TODO: FormControlPropsのisInvalidを直す
         * ref: https://github.com/parchiee/pantry_webclient/pull/137#discussion_r730323660 **/}
        <TextFieldWithNoLabel
          name="email"
          errorMessage={props.errors.email && props.errors.email.message}
          FormControlProps={{
            isInvalid: props.errors.email?.message,
          }}
          InputProps={{
            height: '50px',
            placeholder: 'メールアドレス',
            ...props.register('email', {
              required: 'この項目は必須です',
              pattern: {
                value: EMAIL_REGEX,
                message: '有効なメールアドレスを入力してください。',
              },
            }),
          }}
          mb="5"
        />
        <TextFieldWithNoLabel
          name="password"
          errorMessage={props.errors.password && props.errors.password.message}
          FormControlProps={{
            isInvalid: props.errors.password?.message,
          }}
          InputProps={{
            height: '50px',
            type: 'password',
            placeholder: 'パスワード',
            ...props.register('password', {
              required: 'この項目は必須です',
              pattern: {
                value: PASSWORD_REGEX,
                message: `8文字以上 16文字以内で入力してください（使用可能な文字：アルファベットの大文字・小文字、数字、記号(. / ? -)）`,
              },
            }),
          }}
          mb="5"
        />
        <Box py="5">
          <NormalButton
            w="full"
            type="submit"
            isLoading={props.isSubmitting}
            disabled={!props.canGo}
          >
            続ける
          </NormalButton>
        </Box>
      </form>
      <LoginBox />
    </Box>
  );
};

export const WithPasswordAndEmail = memo(Component);
