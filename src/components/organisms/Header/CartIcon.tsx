import { chakra, ChakraComponent } from '@chakra-ui/react';

const SVG = chakra('svg');
type Props = ChakraComponent<'svg'>;

export const CartIcon: Props = (props) => {
  return (
    <SVG
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path
        d="M22.1668 9.16699H5.8335V23.167H22.1668V9.16699Z"
        stroke="#333333"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M9.3335 9.16667C9.3335 7.92899 9.82516 6.742 10.7003 5.86683C11.5755 4.99167 12.7625 4.5 14.0002 4.5C15.2378 4.5 16.4248 4.99167 17.3 5.86683C18.1752 6.742 18.6668 7.92899 18.6668 9.16667"
        stroke="#333333"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </SVG>
  );
};
