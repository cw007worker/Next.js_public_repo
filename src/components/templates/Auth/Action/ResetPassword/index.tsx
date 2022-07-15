import React from 'react';
import { LayoutForAuth } from 'components/organisms/Layout/forAuth';
import { HookState } from 'hooks/useResetPassword';
import { Box, Text } from '@chakra-ui/react';
import { TextFieldWithNoLabel } from 'components/molecules/TextFieldWithNoLabel';
import { PASSWORD_REGEX } from 'utils/regex';
import NormalButton from 'components/atoms/NormalButton';
import Link from 'next/link';

const Component: React.VFC<HookState> = (props) => {
  return (
    <LayoutForAuth>
      <Box px="8" pt="14" pb="5" maxW="container.sm" mx="auto">
        <Box>
          <Text fontSize="32px" fontWeight="bold" lineHeight="10" mb="3">
            パスワードを再設定してください
          </Text>
        </Box>
        <form onSubmit={props.handleSubmit(props.onSubmit)}>
          {/** TODO: FormControlPropsのisInvalidを直す
           * ref: https://github.com/parchiee/pantry_webclient/pull/137#discussion_r730323660 **/}
          <TextFieldWithNoLabel
            name="password"
            errorMessage={
              props.errors.password && props.errors.password.message
            }
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
    </LayoutForAuth>
  );
};

export const ResetPasswordTemplate = React.memo(Component);
