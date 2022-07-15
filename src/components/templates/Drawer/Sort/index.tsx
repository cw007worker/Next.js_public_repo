import React from 'react';
import {
  DrawerContent,
  Props as DrawerContainerProps,
} from 'components/molecules/DrawerContent';
import { DrawerBody } from 'components/molecules/DrawerBody';
import { DrawerHeader } from 'components/molecules/DrawerHeader';
import { Box, chakra, Text } from '@chakra-ui/react';
import { Query, HookState as QueryState, defaultSort } from 'hooks/useQuery';

type Props = {
  queryState: QueryState;
} & DrawerContainerProps;

const SEARCH_BY_ARRAY: { key: Query['sort']; value: string }[] = [
  { key: 'recommended', value: 'おすすめ順' },
  { key: '-created_at', value: '新着順' },
  { key: 'price', value: '価格が安い順' },
];

export const Sort: React.FC<Props> = ({ queryState, ...rest }) => {
  return (
    <DrawerContent {...rest}>
      <DrawerHeader>並び替え</DrawerHeader>
      <DrawerBody>
        {SEARCH_BY_ARRAY.map((item) => {
          return (
            <Box
              onClick={() =>
                queryState.handlePushQuery({
                  sort: item.key,
                })
              }
              key={item.key}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py="16px"
                px="20px"
              >
                <Text textStyle="h7">{item.value}</Text>
                {queryState.query.sort === item.key ||
                (queryState.query.sort === undefined &&
                  item.key === defaultSort.key) ? (
                  <Img src="/CheckedIcon.svg" display="inline-block" />
                ) : (
                  <div />
                )}
              </Box>
            </Box>
          );
        })}
      </DrawerBody>
    </DrawerContent>
  );
};

const Img = chakra('img');
