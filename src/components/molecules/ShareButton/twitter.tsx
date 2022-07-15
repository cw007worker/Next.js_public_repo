import { ButtonProps, Center, Flex, Text } from '@chakra-ui/react';
import { Button } from 'components/atoms/Button';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import React from 'react';

export const TwitterShareButton: React.FC<ButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <Button bg="#3797EF" w="full" h="12" textStyle="h5" {...rest}>
      <Flex alignItems="center">
        <Center mr="2.5">
          <OptimizedImage src="/Icon/Twitter.svg" height={17} width={21} />
        </Center>
        <Text>{children}</Text>
      </Flex>
    </Button>
  );
};
