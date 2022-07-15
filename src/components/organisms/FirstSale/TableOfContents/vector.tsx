import { chakra, ChakraComponent } from '@chakra-ui/react';

const SVG = chakra('svg');
type Props = ChakraComponent<'svg'>;

export const TableOfContentsVector: Props = (props) => {
  return (
    <SVG
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path
        d="M10 20C4.47715 20 -1.95703e-07 15.5228 -4.37114e-07 10C-6.78525e-07 4.47715 4.47715 -1.95703e-07 10 -4.37114e-07C15.5228 -6.78525e-07 20 4.47715 20 10C20 15.5228 15.5228 20 10 20Z"
        fill="#E7C778"
      />
      <path
        d="M6.72144 7.56432L5.71429 8.57146L10 12.8572L14.2857 8.57146L13.2786 7.56432L10 10.8357L6.72144 7.56432Z"
        fill="#631B04"
      />
    </SVG>
  );
};
