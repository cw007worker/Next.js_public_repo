import { Header } from 'components/organisms/Header';
import { FC, Fragment } from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import { Footer } from 'components/organisms/Footer';
import { BottomTab } from 'components/molecules/BottomTab';

type Props = {
  isMembership: boolean | undefined;
  name: string | undefined;
  cartItemCount: number | undefined;
  isFooterShow?: boolean;
  currentPage?: string;
};

export const LayoutWithBottomTab: FC<Props> = (props) => {
  return (
    <Box h="100vh" position="relative">
      <Flex direction="column" minHeight="100vh" pb="60px">
        <Header
          bg="bg.100"
          borderBottom="1px solid"
          borderBottomColor="text.100"
          isMembership={props.isMembership}
          name={props.name}
          cartItemCount={props.cartItemCount}
          position="sticky"
          top="0"
          zIndex="sticky"
        />
        <Container maxW="container.lg" bg="bg.100" p="0" flex="1">
          {props.children}
        </Container>
        {props.isFooterShow && <Footer />}
      </Flex>
      <BottomTab
        currentPage={props.currentPage || ''}
        position="fixed"
        bottom="0"
      />
    </Box>
  );
};
