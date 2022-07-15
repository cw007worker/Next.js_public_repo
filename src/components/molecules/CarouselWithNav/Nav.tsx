import Image from 'next/image';
import LeftArrow from '../../../../static/LeftArrow.png';
import RightArrow from '../../../../static/RightArrow.png';
import { Box } from '@chakra-ui/react';
import { IconButton } from 'components/atoms/IconButton';

type Props = {
  prev: () => void;
  next: () => void;
  hidden?: boolean;
};

export const Nav: React.FC<Props> = (props) => {
  return (
    <Box position="relative" paddingX="32px" w="100%">
      <Box
        position="absolute"
        top="50%"
        right="0"
        transform="translateY(-50%)"
        hidden={props.hidden}
      >
        <IconButton
          icon={
            <Image
              src={RightArrow}
              alt={'rightVector'}
              onClick={() => props.next()}
              objectFit="contain"
              height="28px"
            />
          }
          _focus={{
            outline: 'none',
          }}
          size="sm"
          aria-label="arrowRight"
        />
      </Box>
      {props.children}
      <Box
        position="absolute"
        top="50%"
        left="0"
        transform="translateY(-50%)"
        hidden={props.hidden}
      >
        <IconButton
          icon={
            <Image
              src={LeftArrow}
              alt={'leftVector'}
              onClick={() => props.prev()}
              objectFit="contain"
              height="28px"
            />
          }
          _focus={{
            outline: 'none',
          }}
          size="sm"
          aria-label="arrow"
        />
      </Box>
    </Box>
  );
};
