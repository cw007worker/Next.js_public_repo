import {
  AspectRatio,
  Box,
  BoxProps,
  Center,
  Flex,
  Spacer,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { DiscountPriceSimple } from 'components/atoms/DiscountPrice/simple';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { Price } from 'components/atoms/Price';
import { UnconfirmedLabel } from 'components/molecules/DeliveryStatusLabel/unconfirmed';
import React from 'react';
import { Delivery } from 'type/viewModel/delivery';
import Link from 'next/link';
import { DeliveryStatusLabel } from 'components/molecules/DeliveryStatusLabel';
import { ButtonWithBorder } from 'components/atoms/Button/border';
import { LinkText } from 'components/atoms/LinkText';
import { showChannelTalk } from 'utils/channelTalk';

type Props = {
  delivery: Delivery;
} & BoxProps;
export const OrderInfoCard: React.VFC<Props> = ({ delivery, ...rest }) => {
  return (
    <Box bg="bg.100" borderRadius="5px" p="2.5" {...rest}>
      <DeliveryStatusLabel status={delivery.deliveryStatus} px="2" mb="5" />
      <Box px="2" py="2.5" borderBottom="1px solid" borderColor="text.100">
        <Text textStyle="h7">受付日：{delivery.order.receptionDate}</Text>
        <Text textStyle="h7">
          注文番号：{delivery.order.orderIdForCustomer}
        </Text>
        {delivery.deliveryStatus === 'shipped' && (
          <React.Fragment>
            <Text textStyle="h7">発送日：{delivery.shipmentDate}</Text>
            <Flex align="center">
              <Text textStyle="h7">追跡番号：</Text>
              <LinkText
                href={`https://trackings.post.japanpost.jp/services/srv/search/?requestNo1=${delivery.shippingNumber}&search.x=94&search.y=12&startingUrlPatten=&locale=ja`}
              >
                {delivery.shippingNumber}
              </LinkText>
            </Flex>
          </React.Fragment>
        )}
      </Box>
      <Box py="2.5" px="2" borderBottom="1px solid" borderColor="text.100">
        <Box mb="1.5">
          <Flex alignItems="center">
            <Text textStyle="h7">商品の小計</Text>
            <Spacer />
            <Price textStyle="h7">
              {delivery.order.totalUnitOriginalPrice}
            </Price>
          </Flex>
          <Flex alignItems="center">
            <Text textStyle="h7">送料</Text>
            <Spacer />
            <Price textStyle="h7">{delivery.cost}</Price>
          </Flex>
          <Flex alignItems="center">
            <Text textStyle="h7">割引</Text>
            <Spacer />
            <DiscountPriceSimple textStyle="h7">
              {delivery.order.totalDiscountAmount}
            </DiscountPriceSimple>
          </Flex>
          <Flex alignItems="center">
            <Text textStyle="h7">pantrii会員限定価格ポイント</Text>
            <Spacer />
            <DiscountPriceSimple textStyle="h7">
              {delivery.order.totalUsagedPoints}
            </DiscountPriceSimple>
          </Flex>
        </Box>
        <Flex alignItems="center">
          <Text textStyle="h7">合計（税込）</Text>
          <Spacer />
          <Price textStyle="h7">{delivery.order.paymentAmount}</Price>
        </Flex>
      </Box>
      <VStack
        divider={<StackDivider borderColor="text.100" />}
        spacing={3}
        align="stretch"
        py="3"
      >
        {delivery.orderItems.map((orderItem, index) => (
          <Link
            key={index}
            href={{
              pathname: '/products',
              query: {
                productId: orderItem.productId,
                unitId: orderItem.unitId,
              },
            }}
            passHref
          >
            <Box>
              <Flex>
                <AspectRatio ratio={1} flex={1} borderRadius="5px" mr="2.5">
                  <Center>
                    <OptimizedImage
                      src={orderItem.image?.url}
                      alt={orderItem.image?.alt}
                      fallbackSrc="/Fallback/FallbackMedium.svg"
                      objectFit="contain"
                      layout="fill"
                    />
                  </Center>
                </AspectRatio>
                <Box flex={2}>
                  <Box mb="1.5">
                    <Text textStyle="h8" noOfLines={3}>
                      {orderItem.name}
                    </Text>
                    <Text textStyle="h8">数量：{orderItem.quantity}</Text>
                  </Box>
                  <Price textStyle="h6">{orderItem.unitPrice}</Price>
                </Box>
              </Flex>
            </Box>
          </Link>
        ))}
      </VStack>
      {delivery.deliveryStatus === 'unconfirmed' ||
      delivery.deliveryStatus === 'unshipped' ? (
        <ButtonWithBorder
          w="full"
          h="12"
          my="2"
          type="button"
          onClick={showChannelTalk}
        >
          この注文をキャンセルする
        </ButtonWithBorder>
      ) : delivery.isReturnable ? (
        <ButtonWithBorder
          w="full"
          h="12"
          my="2"
          type="button"
          onClick={showChannelTalk}
        >
          この注文の返品返金申請をする
        </ButtonWithBorder>
      ) : null}
    </Box>
  );
};
