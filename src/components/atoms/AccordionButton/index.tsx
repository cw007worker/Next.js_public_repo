import {
  AccordionButton as _AccordionButton,
  AccordionButtonProps,
} from '@chakra-ui/react';
import { FC } from 'react';

type Props = AccordionButtonProps;
export const AccordionButton: FC<Props> = (props) => {
  return (
    <_AccordionButton
      _focus={{
        boxShadow: 'unset',
      }}
      _hover={{
        bg: 'inherit',
      }}
      {...props}
    />
  );
};
