import {
  DrawerHeader as _DrawerHeader,
  ModalHeaderProps,
} from '@chakra-ui/react';
import { FC } from 'react';

export type Props = ModalHeaderProps;

export const DrawerHeader: FC<Props> = ({ children, ...rest }) => {
  return (
    <_DrawerHeader
      position="sticky"
      top="0"
      backgroundColor="white"
      textStyle="h4"
      height="64px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="16px"
      {...rest}
    >
      {children}
    </_DrawerHeader>
  );
};
