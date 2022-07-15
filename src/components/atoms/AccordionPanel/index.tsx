import {
  AccordionPanel as _AccordionPanel,
  AccordionPanelProps,
} from '@chakra-ui/react';
import { FC } from 'react';

type Props = AccordionPanelProps;
export const AccordionPanel: FC<Props> = (props) => {
  return <_AccordionPanel padding={'unset'} {...props} />;
};
