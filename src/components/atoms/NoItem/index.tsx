import { chakra, ChakraComponent } from '@chakra-ui/react';

const SVG = chakra('svg');
type Props = ChakraComponent<'svg'>;

export const NoItem: Props = (props) => {
  return (
    <SVG
      viewBox="0 0 91 91"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path
        d="M86.2974 22.0681C85.422 19.5582 82.5892 17.9438 80.2192 16.8153L62.3772 8.34042C60.1403 7.27523 54.1919 4.44914 51.6354 9.65526L46.8521 19.0489L39.8152 5.16481C36.4332 -1.69235 30.1119 1.32347 27.7319 2.45856L8.47525 11.6425C6.16511 12.7443 3.38896 14.3654 2.41364 17.1615C1.81447 18.9058 2.02085 20.8298 3.0461 22.9102L12.0669 40.5824L13.7313 39.7336L15.3957 38.8881L15.369 38.8382L46.2196 21.9349L47.4646 21.3025L47.7375 21.4456L76.4178 36.5647L79.7465 38.269L85.9646 26.1657V26.1391C86.2955 25.5194 86.4958 24.8383 86.5531 24.1381C86.6103 23.4379 86.5233 22.7333 86.2974 22.0681Z"
        fill="white"
      />
      <path
        d="M74.7336 33.5066L52.5177 22.2855C50.5696 21.3029 48.4182 20.791 46.2364 20.791C44.0545 20.791 41.9031 21.3029 39.9551 22.2855L17.7259 33.5066C15.4913 34.6251 13.611 36.342 12.2945 38.466C10.978 40.59 10.277 43.0377 10.2695 45.5366L10.2695 65.7453C10.277 68.2442 10.978 70.692 12.2945 72.816C13.611 74.94 15.4913 76.6568 17.7259 77.7753L39.9418 88.9998C41.8906 89.9798 44.0417 90.4903 46.2231 90.4903C48.4044 90.4903 50.5555 89.9798 52.5044 88.9998L74.7202 77.7753C76.9573 76.6587 78.8403 74.9426 80.1592 72.8185C81.4782 70.6943 82.1812 68.2456 82.1899 65.7453V45.5366C82.1824 43.0377 81.4814 40.59 80.1649 38.466C78.8484 36.342 76.9682 34.6251 74.7336 33.5066V33.5066ZM17.423 36.4492L40.9104 24.2128C42.5884 23.3383 44.4503 22.8756 46.3424 22.8629C48.2345 22.8501 50.1025 23.2878 51.792 24.1396L75.5724 36.123C75.7455 36.2129 75.9053 36.3061 76.0784 36.4026C76.4317 36.6149 76.7213 36.9185 76.9167 37.2815C77.1121 37.6445 77.2061 38.0534 77.1887 38.4652C77.1713 38.8771 77.0433 39.2767 76.818 39.6219C76.5927 39.9671 76.2786 40.2453 75.9086 40.427L51.5224 52.5602C49.8494 53.3912 48.0048 53.8181 46.1369 53.8065C44.269 53.7949 42.4298 53.3453 40.7673 52.4937L17.4363 40.5369C17.0606 40.3445 16.745 40.0524 16.5243 39.6926C16.3035 39.3328 16.186 38.9192 16.1846 38.4971C16.1833 38.075 16.2981 37.6606 16.5165 37.2994C16.7349 36.9382 17.0485 36.6441 17.423 36.4492V36.4492Z"
        fill="white"
      />
    </SVG>
  );
};
