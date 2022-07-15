import { Box, Center, CenterProps, Text } from '@chakra-ui/layout';
import Image from 'next/image';
import React from 'react';
import NoProductlistImage from '../../../../static/NoProductlist.svg';

type Props = {
  text: string;
} & CenterProps;

export const NoProductlist: React.VFC<Props> = ({ text, ...rest }) => {
  return (
    <Center {...rest}>
      <Box>
        <Center mb="2.5">
          <Image
            src={NoProductlistImage}
            alt="NoProductlistImage"
            height={180}
            width={129}
          />
        </Center>
        <Text textStyle="h6" color="text.300">
          {text}
        </Text>
      </Box>
    </Center>
  );
};
