import { DrawerBody as _DrawerBody, ModalBodyProps } from '@chakra-ui/react';
import { FC } from 'react';

export type Props = ModalBodyProps;

export const DrawerBody: FC<Props> = ({ children, ...rest }) => {
  return (
    <_DrawerBody padding="0" {...rest}>
      {children}
    </_DrawerBody>
  );
};
