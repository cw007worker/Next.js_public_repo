import { ChevronRightIcon } from '@chakra-ui/icons';
import { BoxProps, Box } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { UrlObject } from 'url';

type Props = { href: string | UrlObject } & BoxProps;

export const AccordionLink: FC<Props> = ({ href, children, ...rest }) => {
  return (
    <Link passHref href={href}>
      <Box display="flex" alignItems="center" {...rest}>
        <Box flex="1" textAlign="left">
          {children}
        </Box>
        <ChevronRightIcon color="#BDBDBD" w="20px" h="20px" />
      </Box>
    </Link>
  );
};
