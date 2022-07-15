import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Center, Box, Text, SimpleGrid, Button } from '@chakra-ui/react';
import backgroundImage from '../../../static/mypageConductorOnboardingBackground.svg';
import CrownIcon from '../../../static/CrownIcon.svg';

type Props = {
  invite_rank: number;
};

const OnboardingConductor: FC<Props> = ({ invite_rank }) => {
  return (
    <Box h="100vh">
      <Box maxW="container.sm" mx="auto" pt="40px">
        <Center
          bgImage={backgroundImage.src}
          bgPosition="center"
          bgRepeat="no-repeat"
          w="full"
          h="full"
        >
          <Box height="750px" width="100%">
            <Box pt="150px" pb="50px">
              <Text textStyle="h3" textAlign="center" color="white">
                ようこそ、Pantriiへ🎉
              </Text>
              <Text textStyle="h2" textAlign="center" color="white" pt="10px">
                本日よりサービスを
                <br />
                ご利用いただけます
              </Text>
            </Box>
            <Box>
              <Text textStyle="h3" textAlign="center" color="white">
                順番
              </Text>
              <SimpleGrid
                columns={3}
                bg="white"
                mx="25px"
                height="83px"
                borderRadius="10"
              >
                <Center textAlign="center">
                  <Image
                    src={CrownIcon.src}
                    alt="CrownIcon"
                    width="50%"
                    height="50%"
                  />
                </Center>
                <Center
                  textAlign="center"
                  fontSize="46px"
                  lineHeight="28px"
                  fontWeight="bold"
                >
                  <Text textStyle="h1" color="black">
                    {invite_rank}
                  </Text>
                </Center>
                <Center
                  textAlign="center"
                  fontSize="18px"
                  lineHeight="28px"
                  fontWeight="bold"
                >
                  <Text>番目</Text>
                </Center>
              </SimpleGrid>
            </Box>
            <Box px="30px" pt="30px">
              <Text textStyle="h4" color="white">
                事前登録、友達紹介をしていただき、誠にありがとうございます。画面下の赤色のボタンから会員登録を行ってください。
              </Text>
            </Box>
          </Box>
        </Center>
        <Box
          position="fixed"
          bottom="0"
          w="full"
          px="6"
          py="3"
          bg="white"
          maxW="container.sm"
        >
          <Box textAlign="center">
            <Link href={{ pathname: '/onboarding' }}>
              <Button
                color="white"
                bg="linear-gradient(180deg, #FB5D36 0%, #D71220 100%), #FF8080;"
                borderRadius="30"
                h="14"
                fontSize="md"
                fontWeight="bold"
                _hover={{ opacity: 0.7 }}
                w="full"
              >
                pantriiの入場手続きに移る
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OnboardingConductor;
