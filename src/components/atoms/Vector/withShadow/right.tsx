import { chakra, ChakraComponent } from '@chakra-ui/react';

const SVG = chakra('svg');
type Props = ChakraComponent<'svg'>;

export const RightVectorWithShadow: Props = (props) => {
  return (
    <SVG
      viewBox="0 0 16 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <g filter="url(#filter0_d_18844_8021)">
        <path
          d="M4.59 14.59L6 16L12 10L6 4L4.59 5.41L9.17 10L4.59 14.59Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_18844_8021"
          x="0.590027"
          y="0"
          width="15.41"
          height="20"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_18844_8021"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_18844_8021"
            result="shape"
          />
        </filter>
      </defs>
    </SVG>
  );
};
