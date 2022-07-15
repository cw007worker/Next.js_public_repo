import { Box, BoxProps, Grid } from '@chakra-ui/react';
import React from 'react';
import { ProductCardSkeleton } from './productCard';

export const ProductListLayoutSkeleton: React.VFC<BoxProps> = ({
  ...props
}) => {
  return (
    <Box bg="bg.200" {...props} position="relative">
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
        gap={2}
        px="2"
      >
        {[...Array(10)].map((_, i) => (
          <Box key={i}>
            <ProductCardSkeleton />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
