import { memo, VFC } from 'react';
import Link from 'next/link';
import {
  Box,
  Link as ChakraLink,
  Slide,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { HookState } from 'hooks/useOnboardingModal';
import { OnboadingTemplate } from '../Onboarding';
import { ModalLayout } from 'components/organisms/ModalLayout';
import router from 'next/router';
import { useOnboardingPage } from 'hooks/pages/useOnboardingPage';
import { LayoutForAuth } from 'components/organisms/Layout/forAuth';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';
import { OnboardingFloatingButton } from 'components/organisms/OnboardingFloatingButton';

const Component: VFC<HookState> = ({ isOpenOnboardingDrawer }) => {
  const state = useOnboardingPage();
  return (
    <Slide
      direction="bottom"
      in={isOpenOnboardingDrawer}
      style={{
        zIndex: 5000,
        width: '100%',
        height: '-webkit-fill-available',
      }}
    >
      <Box
        h='full'
        overflow="scroll"
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
      >
        <LayoutWithBack
          handleBack={() => router.back()}
          cartItemCount={undefined}
          pb="140px"
        >
          <OnboadingTemplate {...state} />
        </LayoutWithBack>
        <OnboardingFloatingButton />
      </Box>
    </Slide>
  );
};
export const OnboardingMoalTemplate = memo(Component);
