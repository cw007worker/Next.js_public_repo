import { AspectRatio, Box, SimpleGrid } from '@chakra-ui/layout';
import { Button } from 'components/atoms/Button';
import Brand from 'components/comingsoon/Brand';
import { ProductCardWithSpringSale } from 'components/molecules/ProductCard/wishSpringSale';
import { HookState } from 'hooks/useFirstSaleCampaign';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const FirstSaleSpringSale: React.VFC<HookState> = ({ tagId, state }) => {
  return (
    <Box bgColor="#D34728">
      <Box
        py="5"
        bgImage="/FirstSale/NiceBg.svg"
        bgRepeat="no-repeat"
        bgSize="contain"
        bgPos="top"
      >
        <Box px="10" py="2.5" mb="2.5">
          <AspectRatio ratio={2.7647} maxW="230px" mx="auto">
            <Image
              src="/FirstSale/SpringSaleTitle.svg"
              alt="新春SALE"
              layout="fill"
              objectFit="contain"
            />
          </AspectRatio>
        </Box>
        <Box p="2.5">
          <SimpleGrid columns={2} spacing="1.5">
            {state.partialUnits?.units.slice(0, 6).map((content, i) => (
              <ProductCardWithSpringSale
                key={i}
                unitId={content.unitId}
                productId={content.productId}
                price={content.price}
                name={content.brandName}
                images={content.images}
                originalPrice={content.originalPrice}
              />
            ))}
          </SimpleGrid>
        </Box>
        <Box px="2.5" py="5">
          <Link
            href={{
              pathname:
                state.partialUnits?.type === 'Brand'
                  ? '/brands'
                  : state.partialUnits?.type === 'Category'
                  ? '/categories'
                  : '',
              query: {
                brandId:
                  state.partialUnits?.type === 'Brand' ? tagId : undefined,
                categoryId:
                  state.partialUnits?.type === 'Category' ? tagId : undefined,
              },
            }}
            passHref
          >
            <Button as="a" type="button" w="full" h="12">
              もっと見る
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
