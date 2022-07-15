import { HeaderWithBackWithRightArea } from 'components/organisms/HeaderWithBack/withRightArea';
import { FC, Fragment } from 'react';
import { Container, Flex } from '@chakra-ui/react';
import { Footer } from 'components/organisms/Footer';

type Props = {
  handleBack: () => void;
  cartItemCount: number | undefined;
};

export const LayoutForGuide: FC<Props> = (props) => {
  return (
    <Flex direction="column" minHeight="100vh">
      <HeaderWithBackWithRightArea
        bg="bg.100"
        borderBottom="1px solid"
        borderBottomColor="text.100"
        handleBack={props.handleBack}
        cartItemCount={props.cartItemCount}
        position="sticky"
        top="0"
        zIndex="sticky"
      />
      <Container maxW="container.lg" bg="bg.100" p="0" flex="1">
        {props.children}
      </Container>
      <Footer />
    </Flex>
  );
};
