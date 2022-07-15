import { MenuItem as _MenuItem, MenuItemProps, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import RightArrow from '../../../../static/RightArrow.png';
import { forwardRef, VFC } from 'react';

type Props = MenuItemProps;

export const MenuItem = forwardRef<any, Props>(({ children, ...rest }, ref) => {
  return (
    <_MenuItem
      _hover={{
        outline: 'none',
      }}
      _focus={{ outline: 'none' }}
      ref={ref}
      {...rest}
    >
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        {children}
        <Image
          src={RightArrow}
          alt="humberger menu"
          objectFit="contain"
          height="9px"
        />
      </Flex>
    </_MenuItem>
  );
});

MenuItem.displayName = 'MenuItem';
