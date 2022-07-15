import { VFC, memo } from 'react';
import { Box, Text, FormLabel, Grid } from '@chakra-ui/react';
import { MembershipPlanList } from 'components/organisms/MembershipPlanList';
import {
  MembershipPlan,
  MembershipPlanRecurring,
} from 'type/viewModel/common/membershipPlan';
import { CheckIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import NormalButton from 'components/atoms/NormalButton';
import { OnboardingStep } from 'components/organisms/OnboardingStep';

type Props = {
  membershipPlans: MembershipPlan[];
  handleSubmit: () => void;
  selectedPlan: MembershipPlan | undefined;
  handleSelectedPlan: (membershipPlan: MembershipPlan) => void;
  isSelectedPlan: (membershipPlanId: string) => boolean;
};

const Component: VFC<Props> = ({
  membershipPlans,
  handleSubmit,
  selectedPlan,
  handleSelectedPlan,
  isSelectedPlan,
}) => {
  return (
    <Box px="8" pt="14" pb="5" maxW="container.sm" mx="auto">
      <OnboardingStep stepName="plan" />
      <Box py="6">
        <Box bg="primary.300" p="10px" textAlign="center">
          年額メンバーシッププランがお得です。
          <br />
          いつでも変更できます。
        </Box>
      </Box>
      <MembershipPlanList
        membershipPlans={membershipPlans}
        selectedPlan={selectedPlan}
        handleClick={handleSelectedPlan}
        isSelectedPlan={isSelectedPlan}
      />
      <Box m="3">
        <Text fontSize="16px" lineHeight="10">
          <CheckIcon w={5} h={5} color="text.300" pr="2" />
          年額の場合は送料無料に！
        </Text>
        <Text fontSize="16px" lineHeight="10">
          <CheckIcon w={5} h={5} color="text.300" pr="2" />
          使ったものでも返品/返金が可能！
        </Text>
      </Box>
      <Box py="5">
        <NormalButton
          w="full"
          type="submit"
          onClick={handleSubmit}
          isDisabled={!selectedPlan}
        >
          続ける
        </NormalButton>
      </Box>
    </Box>
  );
};

export const OnboardingPlanFormTemplate = memo(Component);
