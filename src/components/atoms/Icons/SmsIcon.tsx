import { chakra, ChakraComponent } from '@chakra-ui/react';

const SVG = chakra('svg');
type Props = {
  fillColor?: string;
} & ChakraComponent<'svg'>;

export const SmsIcon: Props = ({ fillColor, ...rest }) => (
  <SVG  
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <rect width="24" height="24" fill="white"/>
    <circle cx="8.5" cy="11" r="0.5" stroke={fillColor || "black"}/>
    <circle cx="12" cy="11" r="0.5" stroke={fillColor || "black"}/>
    <circle cx="15.5" cy="11" r="0.5" stroke={fillColor || "black"}/>
    <path
      d="M9.28468 16.5911L5.82184 19.2556C5.69032 19.3568 5.49988 19.263 5.49988 19.0971V17.2211C5.49988 16.781 5.14443 16.4236 4.70436 16.4211L3.35118 16.4135C2.91111 16.411 2.55566 16.0536 2.55566 15.6135V14.6076V5.8C2.55566 5.35817 2.91384 5 3.35566 5H20.3704C20.8123 5 21.1704 5.35817 21.1704 5.8V15.6102C21.1704 16.0516 20.8129 16.4096 20.3716 16.4102L9.7714 16.4252C9.59532 16.4254 9.42424 16.4837 9.28468 16.5911Z" 
      stroke={fillColor || "black"}
    />
  </SVG>
);
