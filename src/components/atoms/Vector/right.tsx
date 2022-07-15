import { chakra, ChakraComponent } from '@chakra-ui/react';

const SVG = chakra('svg');
type Props = ChakraComponent<'svg'>;

export const RightVector: Props = (props) => {
  return (
    <SVG
      viewBox="0 0 8 12"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path
        d="M0.59 10.59L2 12L8 6L2 -5.24537e-07L0.590001 1.41L5.17 6L0.59 10.59Z"
        fill="white"
      />
    </SVG>
  );
};
