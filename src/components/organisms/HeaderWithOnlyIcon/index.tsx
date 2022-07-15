import { Flex, FlexProps } from '@chakra-ui/layout';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import Logo from '../../../../static/Logo.svg';

export const HeaderWithOnlyIcon: FC<FlexProps> = (props) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="60px"
      borderBottom="1px"
      borderBottomColor="text.100"
      {...props}
    >
      <Link
        href={{
          pathname: '/',
        }}
        passHref
      >
        <Image src={Logo.src} alt="Logo" height="28px" width="82px" />
      </Link>
    </Flex>
  );
};
