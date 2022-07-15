import React from 'react';
import { Alert, Box, BoxProps, chakra, Text } from '@chakra-ui/react';
import { Button } from 'components/atoms/Button';
import { MembershipInfo } from 'type/viewModel/membershipInfo';
import Link from 'next/link';

type Props = {} & BoxProps;
const OnboardingLinkButton: React.FC<Props> = ({}) => {
  return (
    <>
      <Box px="6" py="5" maxW="container.sm" bg="white">
        <Box pb="5px">
          <Link
            href={{
              pathname: '/cancellation/onboarding',
            }}
            passHref
          >
            <Button width="100%" minHeight="48px">
              会員登録
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default OnboardingLinkButton;
