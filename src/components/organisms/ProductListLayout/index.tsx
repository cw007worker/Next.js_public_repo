import { Box, BoxProps, Grid } from '@chakra-ui/layout';
import { MoreButton } from 'components/atoms/MoreButton';
import { Spinner } from 'components/atoms/Spinner';
import { Loading } from 'components/molecules/Loading';
import { ProductCard } from 'components/molecules/ProductCard';
import { ProductCardWithRanking } from 'components/molecules/ProductCard/withRanking';
import React from 'react';
import { Pagenation } from 'type/viewModel/common/pagenation';
import { Unit } from 'type/viewModel/common/unitForProductList';
import { Item } from 'type/viewModel/common/item';

type Props = {
  list: Unit[] | Item[] | undefined;
  more: () => void;
  isLast: boolean;
  isMoreLoading: boolean;
  isRanking?: boolean;
} & BoxProps;
export const ProductListLayout: React.VFC<Props> = ({
  list,
  more,
  isLast,
  isMoreLoading,
  isRanking = false,
  ...rest
}) => {
  return list === undefined ? (
    <Loading />
  ) : (
    // Morebuttonを正しい位置に置くためにposition relativeが必要だ
    <Box bg="bg.200" {...rest} position="relative">
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
        gap={2}
        px="2"
      >
        {isRanking
          ? list.map((unit, i) => {
              return (
                <ProductCardWithRanking
                  key={i}
                  unitId={unit.unitId}
                  productId={unit.productId}
                  price={unit.price}
                  name={unit.brandName}
                  images={unit.images}
                  originalPrice={unit.originalPrice}
                  ranking={i + 1}
                  varietyCount={
                    'varietyCount' in unit ? unit.varietyCount : undefined
                  }
                  unitsStockCount={unit.unitsStockCount}
                />
              );
            })
          : list.map((unit, i) => {
              return (
                <ProductCard
                  key={i}
                  unitId={unit.unitId}
                  productId={unit.productId}
                  price={unit.price}
                  name={unit.brandName}
                  images={unit.images}
                  originalPrice={unit.originalPrice}
                  purchaseRoute={unit.purchaseRoute}
                  varietyCount={
                    'varietyCount' in unit ? unit.varietyCount : undefined
                  }
                  unitsStockCount={unit.unitsStockCount}
                />
              );
            })}
      </Grid>
      {list !== undefined && (
        <MoreButton
          onClick={more}
          isLoading={isMoreLoading}
          loadingText="読み込み中"
          hidden={isLast}
          position="absolute"
          bottom="0"
        >
          もっと見る
        </MoreButton>
      )}
    </Box>
  );
};
