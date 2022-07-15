import { Box, BoxProps, Center, Flex, Text } from '@chakra-ui/layout';
import { RoundedBox } from 'components/atoms/RoundedBox';
import Image from 'next/image';
import React from 'react';
import RightVector from '../../../../static/RightVector.svg';

type Props = {
  handleClick: () => void;
  info: string | undefined;
  placeholder: string;
} & BoxProps;
export const RoundedChangeableBox: React.VFC<Props> = ({
  handleClick,
  info,
  placeholder,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <RoundedBox pl="5" py="2.5" onClick={handleClick}>
        <Flex justifyContent="center">
          <Text
            textStyle="h7"
            noOfLines={1}
            color={info ? 'text.400' : 'text.200'}
            flex="1"
          >
            {info || placeholder}
          </Text>
          <Center w="12">
            <Image
              src={RightVector}
              alt="RightVector"
              width={7.41}
              height={12}
            />
          </Center>
        </Flex>
      </RoundedBox>
    </Box>
  );
};
