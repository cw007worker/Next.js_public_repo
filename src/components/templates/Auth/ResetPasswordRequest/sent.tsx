import { VFC, memo } from 'react';
import { HookState } from 'hooks/useResetPasswordRequest';
import { EMAIL_REGEX } from 'utils/regex';
import { Box, Text } from '@chakra-ui/react';
import { TextFieldWithNoLabel } from 'components/molecules/TextFieldWithNoLabel';
import NormalButton from 'components/atoms/NormalButton';

export const Component: VFC<HookState> = (props) => {
  return (
    <Box px="8" pt="14" maxW="container.sm" mx="auto">
      <Box>
        <Text fontSize="32px" fontWeight="bold" lineHeight="10" mb="3">
          メールを
          <br />
          送信しました
        </Text>
      </Box>
      <Box py="5">
        <Text fontSize="14px" lineHeight="10">
          パスワードのリセット手順をこちらのメールアドレスに送信しました :{' '}
          <strong>{props.email}</strong>
          <br />
          受信箱にメールが届いていない場合は、プロモーションタブや迷惑メールフォルダーを確認してください。
        </Text>
      </Box>
    </Box>
  );
};

export const ResetPasswordRequestSentTemplate = memo(Component);
