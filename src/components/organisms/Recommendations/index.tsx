import { Heading, Box, Grid } from '@chakra-ui/react';
import { BoxProps } from '@material-ui/core';
import { FC } from 'react';
import { ProductCard } from 'components/molecules/ProductCard';
import { useRecommendationListPage } from 'hooks/useRecommendationList';
import { MoreButton } from 'components/atoms/MoreButton';
import { Spinner } from 'components/atoms/Spinner';
import { Loading } from 'components/molecules/Loading';

type Props = {
  productId: number;
} & BoxProps;

export const Recommendations: FC<Props> = ({ productId, ...props }) => {
  const {
    isError,
    isLoadingInitialData,
    isLoadingMore,
    list,
    more,
    isMoreDisable,
    isLast,
  } = useRecommendationListPage({ productId });
  return (
    <Box bg="bg.200" {...props} position="relative">
      <Heading
        h="48px"
        fontSize="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        おすすめ商品
      </Heading>
      {list === undefined ? (
        <Loading />
      ) : (
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
          gap={2}
          px="2"
        >
          {list.map((unit, i) => {
            return (
              <ProductCard
                key={unit.unitId}
                unitId={unit.unitId}
                productId={unit.productId}
                price={unit.price}
                name={unit.brandName}
                images={unit.images}
                originalPrice={unit.originalPrice}
                purchaseRoute={unit.purchaseRoute}
              />
            );
          })}
        </Grid>
      )}
      {list !== undefined && (
        <MoreButton
          onClick={more}
          isLoading={isLoadingMore}
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
