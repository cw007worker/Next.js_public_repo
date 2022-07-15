import { Center, Flex, FlexProps, Text } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import { HomeIcon } from 'components/atoms/Icons/Home';
import { Heart } from 'components/atoms/Heart';
import { AccountIcon } from 'components/atoms/Icons/AccountIcon';
import { SearchIcon } from 'components/atoms/Icons/Search';
import { RefferalIcon } from 'components/atoms/Icons/RefferalIcon';

type Props = {
  currentPage: string;
} & FlexProps;
export const BottomTab: React.FC<Props> = ({ currentPage, ...rest }) => {
  return (
    <Flex
      w="full"
      h="60px"
      bg="bg.100"
      border="1px solid"
      borderColor="#E0E0E0"
      zIndex="sticky"
      {...rest}
    >
      <Link href="/" passHref>
        <Center w="full" as="a">
          <Flex direction="column" alignItems="center">
            <Center w="7" h="7">
              <HomeIcon
                w="20px"
                h="22px"
                fillColor={currentPage !== '/' && '#BDBDBD'}
              />
            </Center>
            <Text
              textStyle="h9"
              color={currentPage !== '/' ? '#BDBDBD' : '#333333'}
            >
              ホーム
            </Text>
          </Flex>
        </Center>
      </Link>
      <Link href="/search/menu" passHref>
        <Center w="full" as="a">
          <Flex direction="column" alignItems="center">
            <Center w="7" h="7">
              <SearchIcon
                w="21px"
                h="21px"
                fillColor={currentPage !== '/search/menu' && '#BDBDBD'}
              />
            </Center>
            <Text
              textStyle="h9"
              color={currentPage !== '/search/menu' ? '#BDBDBD' : '#333333'}
            >
              探す
            </Text>
          </Flex>
        </Center>
      </Link>
      <Link href="/referral" passHref>
        <Center w="full" as="a">
          <Flex direction="column" alignItems="center">
            <Center w="7" h="7">
              <RefferalIcon
                w="30px"
                h="30px"
                fillColor={currentPage !== '/referral' && '#BDBDBD'}
              />
            </Center>
            <Text
              textStyle="h9"
              color={currentPage !== '/referral' ? '#BDBDBD' : '#333333'}
            >
              友達招待
            </Text>
          </Flex>
        </Center>
      </Link>
      <Link href="/user/wishlist" passHref>
        <Center w="full" as="a">
          <Flex direction="column" alignItems="center">
            <Center w="7" h="7">
              <Heart
                w="20px"
                h="23px"
                fillColor={currentPage !== '/user/wishlist' && '#BDBDBD'}
              />
            </Center>
            <Text
              textStyle="h9"
              color={currentPage !== '/user/wishlist' ? '#BDBDBD' : '#333333'}
            >
              お気に入り
            </Text>
          </Flex>
        </Center>
      </Link>
      <Link href="/user" passHref>
        <Center w="full" as="a">
          <Flex direction="column" alignItems="center">
            <Center w="7" h="7">
              <AccountIcon
                w="28px"
                h="28px"
                fillColor={currentPage !== '/user' && '#BDBDBD'}
              />
            </Center>
            <Text
              textStyle="h9"
              color={currentPage !== '/user' ? '#BDBDBD' : '#333333'}
            >
              マイページ
            </Text>
          </Flex>
        </Center>
      </Link>
    </Flex>
  );
};
