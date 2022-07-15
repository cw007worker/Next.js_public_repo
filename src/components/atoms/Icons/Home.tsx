import { chakra, ChakraComponent } from '@chakra-ui/react';

const SVG = chakra('svg');
type Props = {
  fillColor?: string;
} & ChakraComponent<'svg'>;

export const HomeIcon: Props = ({ fillColor, ...rest }) => {
  return (
    <SVG
      viewBox="0 0 20 22"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...rest}
    >
      <path
        d="M9.99739 3.41667L2.9974 8.66667V19.1667H16.9974V8.66667L9.99739 3.41667ZM9.99739 0.5L19.3307 7.5V21.5H0.664062V7.5L9.99739 0.5Z"
        fill={fillColor || '#333333'}
      />
    </SVG>
  );
};
