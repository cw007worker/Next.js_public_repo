import { Button } from 'components/atoms/Button';
import { FixedButtonWrapper } from 'components/atoms/FixedButtonWrapper';
import { FavoriteButton } from 'components/molecules/FavoriteButton';
import router from 'next/router';
import React from 'react';

export const OnboardingLinkFixedButton: React.VFC = ({

}) => {
  return (
    <FixedButtonWrapper>
      <Button
        onClick={() => router.push('/onboarding')}
        width="100%"
        maxWidth="325px"
        minHeight="48px"
        bg="action.assistant"
        color="white"
      >
        会員登録をして購入する
      </Button>
    </FixedButtonWrapper>
  );
};
