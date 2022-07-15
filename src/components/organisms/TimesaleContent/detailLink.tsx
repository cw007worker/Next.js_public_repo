import React from 'react';
import Link from 'next/link';
import { Box } from '@chakra-ui/layout';

type Props = {
  isHeld: boolean;
  productId: number;
  unitId: number;
};

export const TimesaleDetailLink: React.FC<Props> = ({
  isHeld,
  productId,
  unitId,
  children,
}) => {
  return isHeld ? (
    <Link
      href={{
        pathname: '/products',
        query: { productId: productId, unitId: unitId },
      }}
      passHref
    >
      {children}
    </Link>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};
