import { Box, Flex, FlexProps } from '@chakra-ui/layout';
import { IconButton } from 'components/atoms/IconButton';
import React from 'react';
import Image from 'next/image';
import LeftVector from '../../../../static/LeftVector.svg';
import Logo from '../../../../static/Logo.svg';
import router from 'next/router';

type Props = {
  handleBack?: () => void;
} & FlexProps;
export const HeaderWithBack: React.FC<Props> = ({ handleBack, ...rest }) => {
  const initialHandleBack = () => {
    router.back();
  };
  return (
    <Flex justifyContent="space-between" alignItems="center" h="60px" {...rest}>
      <IconButton
        icon={
          <Image
            src={LeftVector}
            alt="LeftVector button"
            objectFit="contain"
            height="28px"
          />
        }
        aria-label="LeftVector"
        onClick={handleBack || initialHandleBack}
      />
      <Image src={Logo.src} alt="Logo" height="28px" width="82px" />
      <Box w="10"></Box>
    </Flex>
  );
};
