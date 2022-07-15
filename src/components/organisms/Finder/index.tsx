import { Box, Text } from '@chakra-ui/react';
import { DisplayColorButton } from 'components/molecules/DisplayColorButton';
import { FilterButton } from 'components/molecules/FilterButton';
import { SortButton } from 'components/molecules/SortButton';
import { Query, defaultSort } from 'hooks/useQuery';
import { FC } from 'react';

type Props = {
  query: Query;
  handleSortDrawer: (isOpen: boolean) => void;
  handleFilterByCategoriesDrawer: (isOpen: boolean) => void;
  handleToggleDisplayColor: () => void;
  selectedItemName: string;
};

export const Finder: FC<Props> = ({
  query,
  handleSortDrawer,
  handleFilterByCategoriesDrawer,
  handleToggleDisplayColor,
  selectedItemName,
}) => {
  return (
    <Box display="flex" flexWrap="wrap" px="22px" py="11px" bg="#FAFAFA">
      <FilterButton
        width="50%"
        display="inline-block"
        onClick={() => handleFilterByCategoriesDrawer(true)}
      >
        <Text
          fontWeight="bold"
          fontSize="13px"
          color="text.400"
          display="inline-block"
        >
          {selectedItemName}
        </Text>
      </FilterButton>
      <SortButton
        width="50%"
        display="inline-block"
        textAlign="right"
        onClick={() => handleSortDrawer(true)}
      >
        <Text
          fontWeight="bold"
          fontSize="13px"
          color="text.400"
          display="inline-block"
        >
          {query.sort === 'recommended'
            ? 'おすすめ順'
            : query.sort === '-created_at'
            ? '新着順'
            : query.sort === 'price'
            ? '価格が安い順'
            : query.sort === '-price'
            ? '価格が高い順'
            : query.sort === 'created_at'
            ? '古い順'
            : defaultSort.value}
        </Text>
      </SortButton>
      <DisplayColorButton
        marginLeft="auto"
        marginTop="22px"
        enabled={query.displayColor === 'true'}
        onClick={() => {
          handleToggleDisplayColor();
        }}
      >
        <Text
          fontWeight="bold"
          fontSize="13px"
          color="text.400"
          display="inline-block"
        >
          カラーをまとめる
        </Text>
      </DisplayColorButton>
    </Box>
  );
};
