import { Box, Container, Flex } from '@chakra-ui/react';
import { FixedButtonWrapper } from 'components/atoms/FixedButtonWrapper';
import Link from 'next/link';
import NormalButton from 'components/atoms/NormalButton';
import { LoginBox } from '../LoginBox';

export const OnboardingFloatingButton = () => {
  return (
      <FixedButtonWrapper display="flex" flexFlow="column" h="140px">
        <Box w="full" py="5">
          <Link href={'/onboarding/register'} passHref>
            <NormalButton w="full" type="submit">
              会員登録する
            </NormalButton>
          </Link>
        </Box>
        <LoginBox />
    </FixedButtonWrapper>
  );
};
