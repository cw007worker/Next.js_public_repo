import { Center, BoxProps } from '@chakra-ui/react';
import ReactLoading from 'react-loading';

export const Loading: React.VFC<BoxProps> = ({ ...props }) => {
  return (
    <Center py="5" w="full" {...props}>
      <ReactLoading type="bubbles" color="#333333" />
    </Center>
  );
};
