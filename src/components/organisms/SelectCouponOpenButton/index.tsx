import { Box, BoxProps, Center, Flex, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import RightVector from '../../../../static/RightVector.svg';

type Props = {
  handleClick: () => void;
  discountPrice?: number;
} & BoxProps;
export const SelectCouponOpenButton: React.VFC<Props> = ({
  handleClick,
  discountPrice,
  ...rest
}) => {
  return (
    <Box
      as="button"
      bg="bg.100"
      w="full"
      borderRadius="5"
      pl="5"
      py="2.5"
      onClick={handleClick}
      {...rest}
    >
      <Flex alignItems="center">
        <Text textStyle="h7">クーポンコード</Text>
        <Spacer />
        {discountPrice && (
          <Text textStyle="h7" color="action.notification">
            -¥{discountPrice}
          </Text>
        )}
        <Center w="12">
          <Image src={RightVector} alt="RightVector" width={7.41} height={12} />
        </Center>
      </Flex>
    </Box>
  );
};
