import { HookState } from 'hooks/pages/useSignInOnboardingPage';
import { VFC, memo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { TextFieldWithNoLabel } from 'components/molecules/TextFieldWithNoLabel';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'utils/regex';
import NormalButton from 'components/atoms/NormalButton';
import { ConfirmCheckbox } from 'components/organisms/ConfirmCheckbox';
import Link from 'next/link';

export const Component: VFC<HookState> = (props) => {
  const { onSubmit, isSubmitting, canGo, handleSubmit, errors, register } =
    props.signInWithPasswordState;
  const email = props.userEmail;

  return (
    <Box px="8" pt="14" pb="5" maxW="container.sm" mx="auto">
      <Text fontSize="16px" lineHeight="10" pb="3">
        ステップ2/5
      </Text>
      <Box>
        <Text fontSize="32px" fontWeight="bold" lineHeight="10" mb="3">
          Wellcome back!
          <br />
          パスワードを入力してメンバーシップを始めましょう。
        </Text>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {email ? (
          <Box py="5">
            <Text fontSize="14px" lineHeight="10">
              お客様のメールアドレス
            </Text>
            <Text fontSize="16px" lineHeight="10" fontWeight="bold">
              {email}
            </Text>
          </Box>
        ) : (
          <TextFieldWithNoLabel
            name="email"
            errorMessage={errors.email && errors.email.message}
            FormControlProps={{
              isInvalid: errors.email?.message,
            }}
            InputProps={{
              height: '50px',
              placeholder: 'メールアドレス',
              ...register('email', {
                required: 'この項目は必須です',
                pattern: {
                  value: EMAIL_REGEX,
                  message: '有効なメールアドレスを入力してください。',
                },
              }),
            }}
            mb="5"
          />
        )}
        {/** TODO: FormControlPropsのisInvalidを直す
         * ref: https://github.com/parchiee/pantry_webclient/pull/137#discussion_r730323660 **/}
        <TextFieldWithNoLabel
          name="password"
          errorMessage={errors.password && errors.password.message}
          FormControlProps={{
            isInvalid: errors.password?.message,
          }}
          InputProps={{
            height: '50px',
            type: 'password',
            placeholder: 'パスワード',
            ...register('password', {
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
          <ConfirmCheckbox
            text="ログイン状態を保持する"
            errorMessage={
              errors.holdAuthPersistance && errors.holdAuthPersistance.message
            }
            CheckboxProps={{
              ...register('holdAuthPersistance'),
              size: 'sm',
              colorScheme: 'blackAlpha',
              borderColor: 'text.400',
            }}
          />
        </Box>
        <Box py="5">
          {/* <Link href={'/onboarding/phone'} passHref> */}
          <NormalButton
            w="full"
            type="submit"
            isLoading={isSubmitting}
            disabled={!canGo}
          >
            続ける
          </NormalButton>
          {/* </Link> */}
        </Box>
      </form>
      <Box>
        <Link href={{ pathname: '/auth/resetPasswordRequest' }} passHref>
          <Text textStyle="h8" mb="3" textAlign="center">
            パスワードをお忘れですか？
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export const SignInOnboardingTemplate = memo(Component);
