import { Text, Box, Flex, Image, Spacer, VStack, StackDivider, AspectRatio, Center} from '@chakra-ui/react';
import Link from 'next/link';
import { BANNERS } from 'constants/banners';
import FixedBottomButton from 'components/organisms/FixedBottomButton';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { Price } from 'components/atoms/Price';
import { Loading } from 'components/molecules/Loading';
import { HookState, useOrderCompletedPage } from 'hooks/pages/useOrderCompletedPage';
import TruckLogo from '../../static/TruckLogo1.svg';

const OrderCompleted = () => {
  const state: HookState = useOrderCompletedPage();
  
  if (state.orderCompletedInfo) {
    const {
      order,
      orderItems,
      totalDeliveryCost
    } = state.orderCompletedInfo;

    return (
      <Box>
        <Box px="3" pt="5" pb="5" maxWidth="xl" mx="auto" bg="bg.200">
          <Box>
            <Flex justifyContent="center" alignItems="center">
              <Image src={TruckLogo.src} alt="TruckLogo" />    
            </Flex>
            <Text textStyle="h3" textAlign="center" color="black" mb="2">
              ご注文ありがとうございます！
            </Text>
            <Text
              fontSize="15px"
              lineHeight="6"
              textAlign="center"
              color="black"
              mb="12"
            >
              商品の発送までもうしばらくお待ちください。
            </Text>
          </Box>
          <Box bg="bg.100" borderRadius="5px" p="2.5">
            <Box mb="5" borderBottom="1px" borderColor="text.100">
              <Flex justifyContent="center" alignItems="center">
                <Text textStyle="h4" mb="4"> 注文情報 </Text>
              </Flex>
              <Flex mb="3">
                <Text textStyle="h7">{`配送先： ${order.zipcode} ${order.prefecture} ${order.address} ${order.buildingName}`}</Text> 
              </Flex>
              {/* <Flex mb="3">
                <Text textStyle="h7">{`支払方法： **** **** **** ${paymentWays.last4}`}</Text>
              </Flex> */}
              <Flex mb="3">
                <Text textStyle="h7">{`受付日： ${order.receptionDate}`}</Text>
              </Flex>
              <Flex mb="3">
                <Text textStyle="h7">{`注文番号： ${order.orderIdForCustomer}`}</Text>
              </Flex>
            </Box>
            <Box mb="5" borderBottom="1px" borderColor="text.100">
              <Flex mb="3">
                <Text textStyle="h7">{`商品の小計： ¥${order.totalUnitOriginalPrice.toLocaleString()}`}</Text>
              </Flex>
              <Flex mb="3">
                <Text textStyle="h7">{`送料： ¥${totalDeliveryCost}`}</Text>
              </Flex>
              <Flex mb="3">
                <Text textStyle="h7" color="action.notification">{`pantrii会員限定価格ポイント： -¥${order.totalUsagedPoints.toLocaleString()}`}</Text>
              </Flex>
              <Flex alignItems="center" mb="5">
                <Text textStyle="h6">{`合計（税込）：　¥${order.paymentAmount.toLocaleString()}`}</Text>
              </Flex>
            </Box>
            <Box>
              <VStack
                  divider={<StackDivider borderColor="text.100" />}
                  spacing={3}
                  align="stretch"
                  py="3"
                >
                  {orderItems.map((orderItem, index) => (
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
                              <Text textStyle="h8">{`数量：${orderItem.quantity}`}</Text>
                            </Box>
                            <Price textStyle="h6">{orderItem.unitPrice}</Price>
                          </Box>
                        </Flex>
                      </Box>
                    </Link>
                  ))}
              </VStack>
            </Box>
          </Box>
        </Box>
        <Box pb="44" maxWidth="xl" mx="auto" bg="bg.200">
          <Flex justifyContent="center" alignItems="center" p="2.5">
            <Image src={BANNERS.bannerGuarantee.ImagePath} alt="BannerGurantee" />
          </Flex>
        </Box>
        <FixedBottomButton w="full">
          <Link href={{ pathname: '/' }} passHref>
            ホームに戻る
          </Link>
        </FixedBottomButton>
      </Box>
    );
  };
  return (
    <Loading />
  );
};

export default OrderCompleted;
