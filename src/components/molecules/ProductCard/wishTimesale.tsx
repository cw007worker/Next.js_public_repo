import { FC } from 'react';
import { Box, BoxProps, Text, Center, AspectRatio } from '@chakra-ui/react';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { Price } from 'components/atoms/Price';
import Link from 'next/link';
import { DiscountPrice } from 'components/atoms/DiscountPrice';
import { PremiumSalePrice } from '../PremiumSalePrice';

type Props = {
  name: string | undefined;
  price: number;
  originalPrice: number;
  productId: number;
  unitId: number;
  purchaseRoute: string;
  images:
    | {
        alt: string;
        url: string;
      }[]
    | undefined;
  varietyCount?: number;
} & BoxProps;

export const ProductCardWithTimesale: FC<Props> = ({
  unitId,
  productId,
  name,
  price,
  originalPrice,
  images,
  varietyCount,
  purchaseRoute,
  ...rest
}) => {
  return (
    <Link
      href={{
        pathname: '/products',
        query: { productId, unitId },
      }}
      passHref
    >
      <Box
        bgColor="white"
        borderRadius="5px"
        cursor="pointer"
        position="relative"
        {...rest}
      >
        <Box position="absolute" top="0" left="0" zIndex="banner">
          <OptimizedImage
            src="/Label/TimeSaleLabel.svg"
            alt="タイムセールラベル"
            width={40}
            height={40}
          />
        </Box>
        <AspectRatio ratio={1}>
          <Center borderTopRadius="5px">
            <OptimizedImage
              src={images && images[0].url}
              alt={images && images[0].alt}
              objectFit="contain"
              layout="fill"
              fallbackSrc="/Fallback/FallbackLarge.svg"
            />
          </Center>
        </AspectRatio>
        <Box p="2">
          <Text fontSize="13px" lineHeight="18px" h="5" noOfLines={1} mb="2">
            {name}
          </Text>
          <Text fontSize="12px" color="text.300" fontWeight="bold">
            通常価格<Price as="span">{originalPrice}</Price>
          </Text>
          <Box display="flex" w="100%" alignItems="center" flexWrap="wrap">
            <PremiumSalePrice
              textStyle="h4"
              color="action.notification"
              marginRight="5px"
            >
              {price}
            </PremiumSalePrice>
            <DiscountPrice fontSize="10px" fontWeight="bold" marginLeft="auto">
              {originalPrice - price}
            </DiscountPrice>
          </Box>
          {varietyCount && (
            <Text fontSize="10px" color="text.400" mt="10px">
              全{varietyCount}色
            </Text>
          )}
        </Box>
      </Box>
    </Link>
  );
};
