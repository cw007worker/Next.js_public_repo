import { Text, TextProps } from '@chakra-ui/react';
import { VFC } from 'react';

type Props = {
  children: string | number;
} & TextProps;

export const DiscountPrice: VFC<Props> = ({ children, ...rest }) => {
  return (
    <Text
      backgroundColor="rgba(255, 76, 108, 1)"
      color="white"
      borderRadius="2px"
      px="6px"
      textStyle="h9"
      {...rest}
    >
      ¥{String(children)}お得
    </Text>
  );
};
