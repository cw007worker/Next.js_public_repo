import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Noto Sans JP, sans-serif',
  },
  colors: {
    primary: {
      100: '#FFD84D',
      200: '#FFE99E',
      300: '#FFF8DF',
    },
    action: {
      notification: '#FF4C6C',
      assistant: '#3797EF',
      attention2: 'rgba(55, 151, 239, 1)',
      link: '#23abdd',
    },
    bg: {
      100: '#FFFFFF',
      200: '#EEEEEE',
      300: '#FAFAFA',
    },
    text: {
      100: '#E0E0E0',
      200: '#BDBDBD',
      300: '#767676',
      400: '#333333',
    },
  },
  styles: {
    global: {
      body: {
        fontFamily: 'body',
        color: 'text.400',
        fontWeight: 'normal',
        fontSize: '14px',
      },
      //iosで16px以下のinputの文字の場合、zoomしてしまうので暫定的に17pxにしている
      input: {
        fontSize: '17px !important',
      },
    },
  },
  textStyles: {
    h1: {
      fontSize: '32px',
      lineHeight: '44px',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '28px',
      lineHeight: '40px',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '22px',
      lineHeight: '32px',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 'bold',
    },
    h5: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 'bold',
    },
    h6: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 'normal',
    },
    h7: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: 'normal',
    },
    h8: {
      fontSize: '12px',
      lineHeight: '18px',
      fontWeight: 'normal',
    },
    h9: {
      fontSize: '10px',
      lineHeight: '16px',
      fontWeight: 'normal',
    },
  },
  breakpoints: {
    sm: '360px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  },
});

export default theme;
