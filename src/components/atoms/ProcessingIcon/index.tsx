import { VFC } from 'react';
import { keyframes, chakra, ChakraComponent } from '@chakra-ui/react';
import { css } from '@emotion/react';

const spin = keyframes`
 from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SVG = chakra('svg');

// type Props = ChakraComponent<'svg', {}>;

export const ProcessingIcon: ChakraComponent<'svg', {}> = ({ ...props }) => {
  return (
    <SVG
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transformOrigin="center"
      animation={`${spin} infinite 1.5s linear`}
      {...props}
    >
      <circle
        cx="25"
        cy="25"
        r="23"
        stroke="url(#paint0_linear_14568_12585)"
        strokeWidth="4"
      />
      <defs>
        <linearGradient
          id="paint0_linear_14568_12585"
          x1="42.5"
          y1="40.5"
          x2="9.5"
          y2="25"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFCD4F" stopOpacity="0" />
          <stop offset="0.864583" stopColor="#E6B422" />
        </linearGradient>
      </defs>
    </SVG>
  );
};
