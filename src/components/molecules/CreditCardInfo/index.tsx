import { FlexProps, Flex, Text, Grid, Box } from '@chakra-ui/react';
import { CardBrandIcon } from 'components/atoms/CardBrandIcon';
import React from 'react';

type Props = {
  brand: string;
  last4: string;
} & FlexProps;

export const CreditCardInfo: React.VFC<Props> = ({ brand, last4, ...rest }) => {
  return (
    <Flex {...rest}>
      <Box>
        <CardBrandIcon brandName={brand} />
      </Box>
      <Box pl="10px" pt="15px">
        <Text fontSize="15px" fontWeight="bold" lineHeight="30px">
          ●●●● ●●●● ●●●● {last4}
        </Text>
      </Box>
    </Flex>
  );
};
