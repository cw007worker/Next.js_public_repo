import { Box, Center, Stack, Text } from '@chakra-ui/layout';
import { CartItemCard } from 'components/organisms/CartItemCard';
import FixedBottomButton from 'components/organisms/FixedBottomButton';
import { HookState } from 'hooks/pages/useCartPage';
import React from 'react';

const Component: React.VFC<Omit<HookState, 'pageState' | 'layoutState'>> = ({
  cartItems,
  handleDelete,
  increment,
  decrement,
  handleNext,
  isDisabled,
}) => {
  return (
    <Box pt="5" pb="20" bg="bg.200" minH="100vh">
      <Text textStyle="h5" px="5" mb="5">
        買い物カゴ
      </Text>
      {cartItems?.length === 0 ? (
        <Center py="12">
          <Text textStyle="h5" color="text.300">
            カートに商品は入っていません。
          </Text>
        </Center>
      ) : (
        <React.Fragment>
          <Stack spacing={3} px="3">
            {cartItems?.map((cartItem, i) => (
              <CartItemCard
                key={i}
                cartItem={cartItem}
                handleDelete={handleDelete}
                increment={increment}
                decrement={decrement}
                canIncrement={
                  !!cartItem.stock && cartItem.stock > cartItem.quantity
                }
                canDecrement={cartItem.quantity > 1}
              />
            ))}
          </Stack>
          <FixedBottomButton onClick={handleNext} isDisabled={isDisabled}>
            レジに進む
          </FixedBottomButton>
        </React.Fragment>
      )}
    </Box>
  );
};

export const CartTemplate = React.memo(Component);
