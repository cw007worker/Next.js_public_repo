import { HeaderWithBackWithRightArea } from 'components/organisms/HeaderWithBack/withRightArea';
import { FC, Fragment } from 'react';
import { Container, Flex, Box } from '@chakra-ui/react';
import { Footer } from 'components/organisms/Footer';
import { HeaderWithBackWithSearchBar } from '../HeaderWithBack/withSearchBar';
import { BottomTab } from 'components/molecules/BottomTab';

type Props = {
  handleBack: () => void;
  cartItemCount: number | undefined;
  headerPageTitle?: string;
  keyword?: string;
  currentPage?: string;
  isButtomTabShow?: boolean;
};

export const LayoutWithSearchBar: FC<Props> = (props) => {
  return (
    <Box h="100vh" position="relative">
      <Flex direction="column" minHeight="100vh">
        <HeaderWithBackWithSearchBar
          bg="bg.100"
          borderBottom="1px solid"
          borderBottomColor="text.100"
          handleBack={props.handleBack}
          cartItemCount={props.cartItemCount}
          headerPageTitle={props.headerPageTitle}
          position="sticky"
          top="0"
          zIndex="sticky"
          keyword={props.keyword}
        />
        <Container maxW="container.lg" bg="bg.100" p="0" flex="1">
          {props.children}
        </Container>
      </Flex>
      {props.isButtomTabShow && (
        <BottomTab
          currentPage={props.currentPage || ''}
          position="fixed"
          bottom="0"
        />
      )}
    </Box>
  );
};
