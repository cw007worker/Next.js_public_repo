import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import Image from 'next/image';
import React, { FC } from 'react';
import Link from 'next/link';
import { Button } from 'components/atoms/Button';
import { PantriiLogoIcon } from 'components/atoms/PantriiLogoIcon';
import { Fade, ScaleFade } from '@chakra-ui/react';

type Props = {
  isApp: boolean;
};

export const Component: FC<Props> = ({ isApp }) => {
  return (
    <Fade in={true} transition={{ enter: { duration: 2 } }}>
      <Box
        bg="white"
        bgImage="url('/Onboarding/ToApp.png')"
        bgRepeat="no-repeat"
        bgSize="cover"
        maxW="container.sm"
        mx="auto"
      >
        <Flex
          direction="column"
          minHeight="100vh"
          pt="4"
          bgGradient="linear(rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 7.81%, rgba(255, 255, 255, 0) 29.17%, rgba(255, 255, 255, 0.8) 55.21%, rgba(255, 255, 255, 0.8) 100%)"
        >
          <Center>
            <Link
              href={{
                pathname: '/',
              }}
              passHref
            >
              <Box></Box>
            </Link>
          </Center>
          <Center flex="1">
            <Box>
              <Center>
                <PantriiLogoIcon />
              </Center>
              <Text textStyle="h1" textAlign="center" py="4" color="black">
                pantriiへようこそ！
              </Text>
              <Text textStyle="h4" textAlign="center" py="6" color="black">
                お得なショッピングをお楽しみください！
                <br />
                アプリならもっと快適です。{/* TODO: アプリとWebで文言分岐 */}
              </Text>
              <Link
                href="https://apps.apple.com/jp/app/pantrii/id1600594589"
                passHref
              >
                <Button
                  px="3"
                  py="4"
                  w="full"
                  h="12"
                  fontSize="18px"
                  bgColor="text.400"
                  as="a"
                >
                  ショッピングを始める
                </Button>
              </Link>
            </Box>
          </Center>
        </Flex>
      </Box>
    </Fade>
  );
};

export const ToAppTemplate = React.memo(Component);
