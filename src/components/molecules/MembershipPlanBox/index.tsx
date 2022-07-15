import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  BoxProps,
  Center,
  Flex,
  Spacer,
  Text,
  chakra,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { MembershipPlan } from 'type/viewModel/common/membershipPlan';
import { periodHumanReadable } from 'utils/calender';

type Props = {
  membershipPlan: MembershipPlan;
  handleClick: () => void;
  selectedPlan: MembershipPlan | undefined;
  isSelectedPlan: (membershipPlanId: string) => boolean;
} & BoxProps;

export const MembershipPlanBox: React.VFC<Props> = ({
  membershipPlan,
  handleClick,
  isSelectedPlan,
  ...rest
}) => {
  return (
    <Box onClick={handleClick} {...rest}>
      {isSelectedPlan(membershipPlan.id) ? (
        <Box
          border="1px solid"
          borderColor="action.assistant"
          borderRadius="4px"
          pt="4"
          pb="4"
        >
          <Flex>
            <Center w="50px">
              <Box w="20px" h="20px">
                <Image
                  src="/SelectedRadioButtonBlue.svg"
                  alt="SelectedRadioButtonBlue"
                  height={18}
                  width={18}
                />
              </Box>
            </Center>
            <Box flex="1">
              <Box>
                <Text fontSize="12px" color="text.400">
                  {membershipPlan.name}
                </Text>
                <Text>
                  <chakra.span fontSize="20px" fontWeight="bold">
                    ￥{membershipPlan.price}
                  </chakra.span>
                  /{periodHumanReadable(membershipPlan.recurring)}
                </Text>
                <Text fontSize="12px" color="text.300">
                  {membershipPlan.description}
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      ) : (
        <Box border="1px solid #BDBDBD" borderRadius="4px" pt="4" pb="4">
          <Flex>
            <Center w="50px">
              <Box
                w="20px"
                h="20px"
                borderRadius="full"
                border="1px solid"
                borderColor="bg.200"
              />
            </Center>
            <Box flex="1">
              <Box>
                <Text fontSize="12px" color="text.400">
                  {membershipPlan.name}
                </Text>
                <Text>
                  <chakra.span fontSize="20px" fontWeight="bold">
                    ￥{membershipPlan.price}
                  </chakra.span>
                  /{periodHumanReadable(membershipPlan.recurring)}
                </Text>
                <Text fontSize="12px" color="text.300">
                  {membershipPlan.description}
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
};
