import { Header } from 'components/organisms/Header';
import { FC, Fragment } from 'react';
import { Container, Flex } from '@chakra-ui/react';
import { Footer } from 'components/organisms/Footer';

type Props = {
  isMembership: boolean | undefined;
  name: string | undefined;
  cartItemCount: number | undefined;
  isFooterShow?: boolean;
};

export const Layout: FC<Props> = (props) => {
  return (
    <Flex direction="column" minHeight="100vh">
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
  );
};
