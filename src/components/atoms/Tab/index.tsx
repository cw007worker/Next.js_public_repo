import React from 'react';

import { Tab as _Tab, TabProps } from '@chakra-ui/react';

type Props = TabProps;

export const Tab = React.forwardRef<any, Props>(
  ({ children, ...props }, ref) => {
    return (
      <_Tab
        ref={ref}
        borderRadius="initial"
        borderColor="#E0E0E0"
        bgColor="#EEEEEE"
        border="initial"
        color="text.300"
        _selected={{
          bgColor: 'white',
          border: '1px solid #E0E0E0',
          borderBottom: 'none',
          color: 'black',
        }}
        _focus={{
          border: 'none',
        }}
        w="100%"
        {...props}
      >
        {children}
      </_Tab>
    );
  }
);

Tab.displayName = 'Tab';
