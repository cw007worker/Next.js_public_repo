import { CenterProps, Center, Flex, Spacer, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  contractStartDate: string;
} & CenterProps;

export const PlanInfoCard: React.VFC<Props> = ({
  contractStartDate,
  ...rest
}) => {
  return (
    <Center w="full" h="38px" bg="bg.200" borderRadius="3" px="4" {...rest}>
      <Flex w="full">
        <Text fontSize="10px">pantriiメンバー会員</Text>
        <Spacer />
        <Text fontSize="10px" color="#828282">
          登録年月 {contractStartDate}
        </Text>
      </Flex>
    </Center>
  );
};
