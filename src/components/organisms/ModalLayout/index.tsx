import { FC, Fragment } from 'react';
import { Container } from '@chakra-ui/react';
import { HeaderWithBack } from '../HeaderWithBack';

type Props = {
  handleBack?: () => void;
};
export const ModalLayout: FC<Props> = ({ handleBack, children }) => {
  return (
    <Fragment>
      <HeaderWithBack
        bg="bg.100"
        handleBack={handleBack}
        position="sticky"
        top="0"
        zIndex="sticky"
      />
      <Container maxW="container.lg" bg="bg.100" p="0" h="full">
        {children}
      </Container>
    </Fragment>
  );
};
