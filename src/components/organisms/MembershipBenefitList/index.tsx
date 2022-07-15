import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  BoxProps,
  Center,
  Flex,
  Grid,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { MembershipBenefitCard } from 'components/molecules/MembershipBenefitCard';
import { BENEFIT_TYPE, MembershipBenefit } from 'constants/membershipBenefits';
import Link from 'next/link';
import React from 'react';
import { MembershipGrade } from 'type/viewModel/me';

type Props = {
  membershipBenefitList: MembershipBenefit[];
  membershipGrade: MembershipGrade;
} & BoxProps;
export const MembershipBenefitList: React.VFC<Props> = ({
  membershipBenefitList,
  membershipGrade,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Box textAlign="center" pt="2" pb="6" mx="20px">
        <Text textStyle="h4" color="text.400" pb="2">
          会員限定特典
        </Text>
        {membershipGrade !== 'year' && (
          <Box>
            <Text color="text.300">
              年額メンバーシップでより多くの特典が受けられます
            </Text>
            <Link href="/user/membership/setting/plan" passHref>
              <Text color="action.attention2">年額プランへ変更する</Text>
            </Link>
          </Box>
        )}
      </Box>
      <Grid
        templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={2}
        px="2"
      >
        {membershipBenefitList.map((benefit, i) => {
          switch (benefit.type) {
            case BENEFIT_TYPE.enable:
              return (
                <MembershipBenefitCard bg="white" color="black" {...benefit} />
              );
            case BENEFIT_TYPE.disable:
              return (
                <MembershipBenefitCard
                  bg="white"
                  color="text.200"
                  {...benefit}
                />
              );
            case BENEFIT_TYPE.comingsoon:
              return (
                <MembershipBenefitCard
                  bg="text.100"
                  color="text.200"
                  {...benefit}
                />
              );
            default:
              return (
                <MembershipBenefitCard bg="white" color="black" {...benefit} />
              );
          }
        })}
      </Grid>
    </Box>
  );
};
