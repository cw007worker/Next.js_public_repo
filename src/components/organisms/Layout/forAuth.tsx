import { HeaderWithOnlyIcon } from 'components/organisms/HeaderWithOnlyIcon';
import { FC, Fragment } from 'react';
import { BoxProps, Container, Flex, FlexProps } from '@chakra-ui/react';
import { FooterForOnboarding } from '../Footer/forOnboarding';

type Props = {
  children: React.ReactNode;
} & FlexProps;

export const LayoutForAuth: FC<Props> = ({ children, ...rest}) => {
  return (
    <Flex direction="column" minHeight="100vh" {...rest}>
      <HeaderWithOnlyIcon
        bg="bg.100"
        borderBottom="1px solid"
        borderBottomColor="text.100"
        position="sticky"
        top="0"
        zIndex="sticky"
      />
      <Container maxW="container.lg" bg="bg.100" p="0" flex="1">
        {children}
      </Container>
      <FooterForOnboarding />
    </Flex>
  );
};
