import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Text, SimpleGrid, chakra, Flex } from '@chakra-ui/react';
import { BoxProps } from '@material-ui/core';
import {
  OnboardingStepBox,
  Status,
} from 'components/molecules/OnboardingStepBox';

type Props = {
  stepName: 'email' | 'phone' | 'plan' | 'payment';
};

export const OnboardingStep: React.FC<Props> = ({ stepName }) => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <OnboardingStepBox status={setStatuses(stepName).contactAddress}>
        <Text textStyle="h9">連絡先登録</Text>
      </OnboardingStepBox>
      <ChevronRightIcon color="text.300" />
      <OnboardingStepBox status={setStatuses(stepName).plan}>
        <Text textStyle="h9">会員プラン選択</Text>
      </OnboardingStepBox>
      <ChevronRightIcon color="text.300" />
      <OnboardingStepBox status={setStatuses(stepName).payment}>
        <Text textStyle="h9">カード登録</Text>
      </OnboardingStepBox>
    </Flex>
  );
};

type OnboardingStatus = {
  contactAddress: Status;
  plan: Status;
  payment: Status;
};

const setStatuses = (
  stepName: 'email' | 'phone' | 'plan' | 'payment'
): OnboardingStatus => {
  {
    switch (stepName) {
      case 'email':
        return {
          contactAddress: 'processed',
          plan: 'unprocessed',
          payment: 'unprocessed',
        };
      case 'phone':
        return {
          contactAddress: 'processed',
          plan: 'unprocessed',
          payment: 'unprocessed',
        };
      case 'plan':
        return {
          contactAddress: 'complete',
          plan: 'processed',
          payment: 'unprocessed',
        };
      case 'payment':
        return {
          contactAddress: 'complete',
          plan: 'complete',
          payment: 'processed',
        };
    }
  }
};
