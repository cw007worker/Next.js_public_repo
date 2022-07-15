import { Button, ButtonProps, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { FC } from 'react';
import { ArrowDown } from './ArrowDown';

export const MoreButton: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Button
      w="100%"
      h="100px"
      fontSize="14px"
      fontWeight="bold"
      background="linear-gradient(360deg, #EEEEEE 53.65%, rgba(238, 238, 238, 0) 100%)"
      _disabled={{
        opacity: 1,
      }}
      _hover={{
        bg: 'linear-gradient(360deg, #EEEEEE 53.65%, rgba(238, 238, 238, 0) 100%)',
      }}
      _active={{
        bg: 'linear-gradient(360deg, #EEEEEE 53.65%, rgba(238, 238, 238, 0) 100%)',
      }}
      _focus={{
        outline: 'none',
      }}
      rightIcon={<ArrowDown />}
      css={css`
        & > .chakra-button__icon {
          margin-inline-start: initial;
        }
      `}
      {...rest}
    >
      {children}
    </Button>
  );
};
