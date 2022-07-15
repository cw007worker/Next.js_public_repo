import {
  DrawerContent as _DrawerContent,
  DrawerContentProps,
} from '@chakra-ui/react';
import { FC } from 'react';

export type Props = DrawerContentProps;

export const DrawerContent: FC<Props> = ({ children, ...rest }) => {
  return (
    <_DrawerContent
      bg="#FFFFFF"
      borderRadius="10px 10px 0px 0px"
      position="relative"
      overflow="scroll"
      maxHeight="calc(100vh * 0.823)"
      fontFamily="body"
      {...rest}
    >
      {children}
    </_DrawerContent>
  );
};
