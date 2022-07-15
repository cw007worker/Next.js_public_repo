import { Text, TextProps } from '@chakra-ui/react';
import { VFC } from 'react';

type Props = {
  children: string | number;
} & TextProps;

export const DiscountPriceSimple: VFC<Props> = ({ children, ...rest }) => {
  return (
    <Text color="action.notification" {...rest}>
      -¥{String(children).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
    </Text>
  );
};
