import { Box, BoxProps, SimpleGrid } from '@chakra-ui/layout';
import { ItemImageWithQuantity } from 'components/molecules/ItemImageWithQuantity';
import React from 'react';
import { CartItem } from 'type/viewModel/common/cartItem';

type Props = {
  cartItems: CartItem[];
} & BoxProps;
export const CartItemsCard: React.VFC<Props> = ({ cartItems, ...rest }) => {
  return (
    <Box bg="white" borderRadius="5" p="2" {...rest}>
      <SimpleGrid columns={3} spacing="2">
        {cartItems.map((cartItem, i) => (
          <ItemImageWithQuantity
            key={i}
            image={cartItem.image}
            quantity={cartItem.quantity}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
