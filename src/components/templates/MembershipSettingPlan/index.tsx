import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Membership } from 'type/viewModel/common/membership';
import { MembershipPlan } from 'type/viewModel/common/membershipPlan';
import { MembershipPlanList } from 'components/organisms/MembershipPlanList';
import { CheckIcon } from '@chakra-ui/icons';
import NormalButton from 'components/atoms/NormalButton';
import Link from 'next/link';

type Props = {
  membershipPlans: MembershipPlan[];
  membership: Membership;
  selectedPlan: MembershipPlan | undefined;
  isSelectedPlan: (membershipPlanId: string) => boolean;
  handleSelectedPlan: (membershipPlan: MembershipPlan) => void;
  onOpenConfirmModal: () => void;
  canGo: boolean;
};

const MembershipSettingPlanTemplate: React.VFC<Props> = ({
  membershipPlans,
  membership,
  selectedPlan,
  isSelectedPlan,
  handleSelectedPlan,
  onOpenConfirmModal,
  canGo,
}) => {
  return (
    <Box pt="5" pb="11" bg="bg.200" minH="100vh">
      <Text textStyle="h4" mb="5" mx="20px">
        プランを変更
      </Text>
      <Box px="6" py="4" maxW="container.sm" mx="auto" bg="white">
        <MembershipPlanList
          membershipPlans={membershipPlans}
          selectedPlan={selectedPlan}
          handleClick={handleSelectedPlan}
          isSelectedPlan={isSelectedPlan}
        />
        <Box m="3"></Box>
        <Box m="3">
          <Text textStyle="h3" fontSize="18px" pb="5">
            年間メンバーシップがお得！
          </Text>
          <Text fontSize="16px" lineHeight="10">
            <CheckIcon w={5} h={5} color="text.300" pr="2" />
            年額の場合は送料無料に！
          </Text>
          <Text fontSize="16px" lineHeight="10">
            <CheckIcon w={5} h={5} color="text.300" pr="2" />
            使ったものでも返品/返金が可能！
          </Text>
        </Box>
      </Box>
      <Box px="6" py="16" maxW="container.sm" mx="auto">
        <Box pb="5px">
          <NormalButton
            bg="text.400"
            width="100%"
            minHeight="48px"
            type="submit"
            onClick={onOpenConfirmModal}
            isDisabled={!canGo}
          >
            続ける
          </NormalButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MembershipSettingPlanTemplate;
