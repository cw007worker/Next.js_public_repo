import { VFC, memo } from 'react';
import { HookState } from 'hooks/useSignInWithPassword';
import { Box, Text } from '@chakra-ui/react';
import { TextFieldWithNoLabel } from 'components/molecules/TextFieldWithNoLabel';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'utils/regex';
import NormalButton from 'components/atoms/NormalButton';
import { ConfirmCheckbox } from 'components/organisms/ConfirmCheckbox';
import Link from 'next/link';

export const Component: VFC<HookState> = (props) => {
  return (
    <Box px="8" pt="14" maxW="container.sm" mx="auto">
      <Box>
        <Text fontSize="32px" fontWeight="bold" lineHeight="10" mb="3">
          ログイン
        </Text>
      </Box>

      <form onSubmit={props.handleSubmit(props.onSubmit)}>
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
          <ConfirmCheckbox
            text="ログイン状態を保持する"
            errorMessage={
              props.errors.holdAuthPersistance &&
              props.errors.holdAuthPersistance.message
            }
            CheckboxProps={{
              ...props.register('holdAuthPersistance'),
              size: 'sm',
              colorScheme: 'blackAlpha',
              borderColor: 'text.400',
            }}
          />
        </Box>
        <Box py="5">
          <NormalButton
            w="full"
            type="submit"
            isLoading={props.isSubmitting}
            disabled={!props.canGo}
          >
            ログインする
          </NormalButton>
        </Box>
      </form>
      <Box>
        <Link href={{ pathname: '/auth/resetPasswordRequest' }} passHref>
          <Text textStyle="h8" mb="3" textAlign="center">
            パスワードをお忘れですか
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export const SignInTemplate = memo(Component);
