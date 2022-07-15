import { FlexProps, Flex } from '@chakra-ui/react';
import { FC } from 'react';

type Props = FlexProps;

export const FixedButtonWrapper: FC<Props> = ({ children, ...rest }) => {
  return (
    <Flex
      position="fixed"
      bgColor="white"
      h="70px"
      w="100%"
      bottom="0"
      left="0"
      paddingX="20px"
      justifyContent="center"
      alignItems="center"
      {...rest}
    >
      {children}
    </Flex>
  );
};
