import { Button, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

export const SizeButton: FC<ButtonProps & { variant: 'selected' | 'none' }> = ({
  children,
  ...rest
}) => {
  return (
    <Button
      bg="none"
      h="30px"
      borderRadius="3xl"
      _focus={{
        bg: 'none',
      }}
      _hover={{
        bg: 'none',
      }}
      {...(rest.variant === 'selected'
        ? {
            border: '2px solid #3797EF',
          }
        : { border: 'solid 1px #BDBDBD' })}
      {...rest}
    >
      {children}
    </Button>
  );
};
