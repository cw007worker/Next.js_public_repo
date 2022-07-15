import { chakra, ChakraComponent } from '@chakra-ui/react';

const SVG = chakra('svg');
type Props = ChakraComponent<'svg'>;

export const Coupon: Props = (props) => {
  return (
    <SVG
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path
        d="M24.3333 7.33333V11.1537C22.9835 11.5802 22 12.8458 22 14.3333C22 15.8208 22.9835 17.0864 24.3333 17.513V21.3333C24.3333 22.0644 23.7311 22.6667 23 22.6667H4.33333C3.60228 22.6667 3 22.0644 3 21.3333V17.5144C4.35696 17.0889 5.33333 15.8202 5.33333 14.3333C5.33333 12.8506 4.36113 11.5814 3.01167 11.1538V7.33333C3.01167 6.58735 3.60555 6 4.33333 6H23C23.7343 6 24.3333 6.59387 24.3333 7.33333Z"
        stroke="#333333"
        strokeWidth="2"
      />
      <rect x="18" y="9" width="1.1" height="1.1" fill="#333333" />
      <rect x="18" y="12.2998" width="1.1" height="1.1" fill="#333333" />
      <rect x="18" y="15.5996" width="1.1" height="1.1" fill="#333333" />
      <rect x="18" y="18.9004" width="1.1" height="1.1" fill="#333333" />
    </SVG>
  );
};
