import { chakra, ChakraComponent } from '@chakra-ui/react';

const SVG = chakra('svg');
type Props = ChakraComponent<'svg'>;

export const LeftVectorWithShadow: Props = (props) => {
  return (
    <SVG
      viewBox="0 0 16 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <g filter="url(#filter0_d_18844_6000)">
        <path
          d="M11.41 5.41L10 4L4 10L10 16L11.41 14.59L6.83 10L11.41 5.41Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_18844_6000"
          x="0"
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
            result="effect1_dropShadow_18844_6000"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_18844_6000"
            result="shape"
          />
        </filter>
      </defs>
    </SVG>
  );
};
