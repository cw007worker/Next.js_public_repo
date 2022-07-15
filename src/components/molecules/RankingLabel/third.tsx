import { chakra, ChakraComponent } from '@chakra-ui/react';

const SVG = chakra('svg');
type Props = ChakraComponent<'svg'>;

export const ThirdRankingLabel: Props = (props) => {
  return (
    <SVG
      viewBox="0 0 18 19"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 0H0V18.75L9 15.413L18 18.75V0Z"
        fill="#BE5858"
      />
    </SVG>
  );
};
