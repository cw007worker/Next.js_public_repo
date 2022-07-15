import { HookState } from 'hooks/useRegisterWithPassword';
import { VFC, memo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { TextFieldWithNoLabel } from 'components/molecules/TextFieldWithNoLabel';
import { PASSWORD_REGEX } from 'utils/regex';
import NormalButton from 'components/atoms/NormalButton';
import Link from 'next/link';

export const Component: VFC<HookState> = (props) => {
  return (
    <Box px="8" pt="14" pb="5" maxW="container.sm" mx="auto">
      <Text fontSize="16px" lineHeight="10" pb="3">
        ステップ2/5
      </Text>
      <Box>
        <Text fontSize="32px" fontWeight="bold" lineHeight="10" mb="3">
          パスワードを作成して
          <br />
          メンバーシップを始めましょう。
        </Text>
      </Box>
      <Box py="5">
        <Text fontSize="14px" lineHeight="10">
          お客様のメールアドレス
        </Text>
        <Text fontSize="16px" lineHeight="10" fontWeight="bold">
          {props.userEmail}
        </Text>
      </Box>
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {/** TODO: FormControlPropsのisInvalidを直す
         * ref: https://github.com/parchiee/pantry_webclient/pull/137#discussion_r730323660 **/}
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
          {/* <Link href={'/onboarding/phone'} passHref> */}
          <NormalButton
            w="full"
            type="submit"
            isLoading={props.isSubmitting}
            disabled={!props.canGo}
          >
            続ける
          </NormalButton>
          {/* </Link> */}
        </Box>
      </form>
    </Box>
  );
};

export const WithPassword = memo(Component);
