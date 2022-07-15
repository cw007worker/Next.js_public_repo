import { chakra, ChakraComponent } from '@chakra-ui/react';

const SVG = chakra('svg');
type Props = ChakraComponent<'svg'>;

export const FilledHeart: Props = (props) => {
  return (
    <SVG
      viewBox="0 0 26 23"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path
        d="M18.625 0C16.45 0 14.3625 1.01526 13 2.61962C11.6375 1.01526 9.55 0 7.375 0C3.525 0 0.5 3.03324 0.5 6.89373C0.5 11.6316 4.75 15.4921 11.1875 21.358L13 23L14.8125 21.3455C21.25 15.4921 25.5 11.6316 25.5 6.89373C25.5 3.03324 22.475 0 18.625 0Z"
        fill="#333333"
      />
    </SVG>
  );
};
