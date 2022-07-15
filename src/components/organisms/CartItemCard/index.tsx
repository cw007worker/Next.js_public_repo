import { Box, Image } from '@chakra-ui/react';
import {
  AspectRatio,
  BoxProps,
  Center,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/layout';
import React from 'react';
import Link from 'next/link';
import { CartItem } from 'type/viewModel/common/cartItem';

type Props = {
  cartItem: CartItem;
  handleDelete: (unitId: number) => void;
  increment: (unitId: number) => void;
  decrement: (unitId: number) => void;
  canIncrement: boolean;
  canDecrement: boolean;
} & BoxProps;
export const CartItemCard: React.VFC<Props> = ({
  cartItem,
  handleDelete,
  increment,
  decrement,
  canIncrement,
  canDecrement,
  ...rest
}) => {
  return (
    <Box p="2.5" bg="bg.100" borderRadius="5px" {...rest}>
      <Flex>
        <AspectRatio ratio={1} flex={1} mr="2.5">
          <Link
            href={{
              pathname: '/products',
              query: {
                productId: cartItem.product.id,
                unitId: cartItem.unitId,
              },
            }}
            passHref
          >
            <Center>
              <Image
                src={cartItem.image?.url}
                alt={cartItem.image?.alt}
                objectFit="contain"
                w="100%"
                maxH="100%"
                htmlHeight="100%"
                htmlWidth="100%"
                borderRadius="5px"
                fallbackSrc="static/Fallback/FallbackMedium.svg"
              />
            </Center>
          </Link>
        </AspectRatio>
        <Box flex={2}>
          <Flex direction="column">
            <Text textStyle="h8" fontWeight="bold" noOfLines={2} mb="1">
              {cartItem.product.name}
            </Text>
            <Text textStyle="h8" fontWeight="bold" noOfLines={1} mb="2">
              {cartItem.unitName}
            </Text>
            <Text textStyle="h5" mb="4">
              ¥{cartItem.price?.toLocaleString()}
            </Text>
            <Flex alignItems="center">
              <Spacer />
              <Text
                as="button"
                color="text.300"
                textStyle="h7"
                textDecoration="underline"
                onClick={() => handleDelete(cartItem.unitId)}
                mr="4"
              >
                削除
              </Text>
              <Flex
                borderRadius="15px"
                h="30px"
                border="1px"
                borderColor="text.100"
                alignItems="center"
              >
                <Box
                  as="button"
                  w="8"
                  color={canDecrement ? 'text.300' : 'text.200'}
                  disabled={!canDecrement}
                  onClick={() => decrement(cartItem.unitId)}
                >
                  ー
                </Box>
                <Text
                  textStyle="h5"
                  lineHeight="30px"
                  px="2.5"
                  borderX="1px"
                  borderColor="text.100"
                >
                  {cartItem.quantity}
                </Text>
                <Box
                  as="button"
                  w="8"
                  color={canIncrement ? 'text.300' : 'text.200'}
                  disabled={!canIncrement}
                  onClick={() => increment(cartItem.unitId)}
                >
                  ＋
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      {cartItem.isOverstock && (
        <Text color="action.notification" mt="4" textStyle="h8">
          申し訳ございません。お客様の希望商品は
          <br />
          他のお客様にタッチの差で購入されてしまいました。
        </Text>
      )}
    </Box>
  );
};
