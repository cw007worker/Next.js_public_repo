import { FC } from 'react';
import { Box, BoxProps, chakra } from '@chakra-ui/react';

type Props = { required?: boolean } & BoxProps;
export const Label: FC<Props> = ({ children, required, ...rest }) => {
  return (
    <Box display="flex" alignItems="center" {...rest}>
      <_Label
        css={
          required && {
            '& > *:after': {
              fontSize: 'xl',
              lineHeight: '18px',
              color: '#FF4C6C',
              content: '"*"',
              display: 'inline-block',
            },
            '& > *': {
              display: 'inline-block !important',
            },
          }
        }
      >
        {children}
      </_Label>
    </Box>
  );
};

const _Label = chakra('label');
