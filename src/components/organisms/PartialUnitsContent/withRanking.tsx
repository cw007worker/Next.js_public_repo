import {
  AspectRatio,
  Box,
  BoxProps,
  Center,
  SimpleGrid,
  Text,
  Flex,
} from '@chakra-ui/layout';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Price } from 'components/atoms/Price';
import { PremiumPrice } from 'components/molecules/PremiumPrice';
import { Button } from 'components/atoms/Button';
import { RankingTag } from 'type/viewModel/common/rankingTag';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { RankingLabel } from 'components/molecules/RankingLabel';

type Props = {
  rankingTag: RankingTag;
  name?: string;
  handleMore: (tagId: number) => void;
} & BoxProps;

export const PartialUnitsContentWithRanking: React.VFC<Props> = ({
  rankingTag,
  name,
  handleMore,
  ...rest
}) => {
  return (
    <Box px="2.5" py="4" bgColor="bg.100" {...rest}>
      <Flex alignItems="center" px="1" mb="2">
        <Text textStyle="h4" color="text.200">
          {rankingTag.description}
        </Text>
      </Flex>
      <Text textStyle="h3" lineHeight="18px" px="1" mb="5">
        {name || rankingTag.name}
      </Text>
      <SimpleGrid columns={3} spacing={4} mb="4">
        {rankingTag.products.slice(0, 9).map((product, i) => (
          <Link
            key={i}
            href={{
              pathname: '/products',
              query: { productId: product.id, unitId: product.unit.unitId },
            }}
            passHref
          >
            <Box position="relative">
              <RankingLabel
                ranking={product.ranking}
                position="absolute"
                top="0"
                left="0"
                zIndex="docked"
              />
              <AspectRatio ratio={1} mb="1">
                <Center borderTopRadius="5px">
                  <OptimizedImage
                    fallbackSrc="/Fallback/FallbackMedium.svg"
                    src={product.unit.images && product.unit.images[0].url}
                    alt={product.unit.images && product.unit.images[0].alt}
                    objectFit="contain"
                    layout="fill"
                  />
                </Center>
              </AspectRatio>
              <Box px="2">
                <Text textStyle="h9" noOfLines={1} mb="0.5">
                  {product.brandName}
                </Text>
                <Text
                  fontSize="10px"
                  fontWeight="bold"
                  lineHeight="10px"
                  color="text.300"
                  mb="0.5"
                >
                  通常価格<Price as="span">{product.unit.originalPrice}</Price>
                </Text>
                <PremiumPrice textStyle="h5">{product.unit.price}</PremiumPrice>
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
      <Button
        type="button"
        onClick={() => handleMore(rankingTag.id)}
        w="full"
        h="12"
      >
        もっと見る
      </Button>
    </Box>
  );
};
