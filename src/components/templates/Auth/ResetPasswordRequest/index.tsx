import { VFC, memo } from 'react';
import { HookState } from 'hooks/useResetPasswordRequest';
import { EMAIL_REGEX } from 'utils/regex';
import { Box, Text } from '@chakra-ui/react';
import { TextFieldWithNoLabel } from 'components/molecules/TextFieldWithNoLabel';
import NormalButton from 'components/atoms/NormalButton';

export const Component: VFC<HookState> = (props) => {
  return (
    <Box px="8" pt="14" pb="5" maxW="container.sm" mx="auto">
      <Box>
        <Text fontSize="32px" fontWeight="bold" lineHeight="10" mb="3">
          パスワードを
          <br />
          再設定
        </Text>
      </Box>
      <Box py="5">
        <Text fontSize="14px" lineHeight="10">
          メールアドレスを入力してください。
          <br />
          ご登録されているメールアドレスにパスワードのリセット手順を送信します。
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
        <Box py="5">
          <NormalButton
            w="full"
            type="submit"
            isLoading={props.isSubmitting}
            disabled={!props.canGo}
          >
            メールを送信する
          </NormalButton>
        </Box>
      </form>
    </Box>
  );
};

export const ResetPasswordRequestTemplate = memo(Component);
