import { HeaderWithBackWithRightArea } from 'components/organisms/HeaderWithBack/withRightArea';
import { FC, Fragment } from 'react';
import { BoxProps, Container, Flex, FlexProps } from '@chakra-ui/react';
import { Footer } from 'components/organisms/Footer';

type Props = {
  handleBack: () => void;
  cartItemCount: number | undefined;
  isFooterShow?: boolean;
  headerPageTitle?: string;
} & FlexProps;

export const LayoutWithBack: FC<Props> = ({
  handleBack,
  cartItemCount,
  isFooterShow,
  headerPageTitle,
  children,
  ...rest
}) => {
  return (
    <Flex direction="column" minHeight="100vh" {...rest} >
      <HeaderWithBackWithRightArea
        bg="bg.100"
        borderBottom="1px solid"
        borderBottomColor="text.100"
        handleBack={handleBack}
        cartItemCount={cartItemCount}
        headerPageTitle={headerPageTitle}
        position="sticky"
        top="0"
        zIndex="sticky"
      />
      <Container maxW="container.lg" bg="bg.100" p="0" flex="1">
        {children}
      </Container>
      {isFooterShow && <Footer />}
    </Flex>
  );
};
