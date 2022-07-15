import { FC } from 'react';
import {
  Box,
  BoxProps,
  Heading,
  Text,
  Center,
  AspectRatio,
} from '@chakra-ui/react';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { Price } from 'components/atoms/Price';
import Link from 'next/link';
import { PremiumPrice } from '../PremiumPrice';
import { DiscountPrice } from 'components/atoms/DiscountPrice';
import { RankingLabel } from '../RankingLabel';

type Props = {
  name: string | undefined;
  price: number;
  originalPrice: number;
  productId: number;
  unitId: number;
  images:
    | {
        alt: string;
        url: string;
      }[]
    | undefined;
  ranking: number;
  varietyCount?: number;
  unitsStockCount: number;
} & BoxProps;

export const ProductCardWithRanking: FC<Props> = ({
  unitId,
  productId,
  name,
  price,
  originalPrice,
  images,
  ranking,
  varietyCount,
  unitsStockCount,
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
        <RankingLabel
          ranking={ranking}
          position="absolute"
          top="2.5"
          left="2.5"
          zIndex="banner"
        />
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
          <Box display="flex">
            <Text fontSize="13px" lineHeight="18px" h="5" noOfLines={1} mb="2">
              {name}
            </Text>
            <Text fontSize="10px" fontWeight="bold" marginLeft="auto">
              {unitsStockCount == 0 && '在庫なし'}
            </Text>
          </Box>
          <Text fontSize="12px" color="text.300" fontWeight="bold">
            通常価格<Price as="span">{originalPrice}</Price>
          </Text>
          <Box display="flex" w="100%" alignItems="center" flexWrap="wrap">
            <PremiumPrice fontSize="16px" fontWeight="bold" marginRight="5px">
              {price}
            </PremiumPrice>
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
