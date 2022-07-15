import {
  ComponentWithAs,
  MenuButton as _MenuButton,
  MenuButtonProps,
} from '@chakra-ui/react';

export const MenuButton: ComponentWithAs<'button', MenuButtonProps> = (
  props
) => {
  return (
    <_MenuButton
      bg="none"
      _hover={{ bg: 'none' }}
      _active={{ bg: 'none' }}
      _focus={{ bg: 'none' }}
      {...props}
    />
  );
};
