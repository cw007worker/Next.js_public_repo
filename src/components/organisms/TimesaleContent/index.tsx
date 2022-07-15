import React from 'react';
import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Grid,
  SimpleGrid,
  Spacer,
  Text,
  BoxProps,
} from '@chakra-ui/layout';
import { TimesaleTag } from 'type/viewModel/common/timesaleTag';
import Link from 'next/link';
import NextImage from 'next/image';
import RightVectorBaseTwo from '../../../../static/RightVectorBaseTwo.svg';
import LockGray from '../../../../static/LockGray.svg';
import { useTimeLeft } from 'hooks/useTimeLeft';
import { Image } from '@chakra-ui/react';
import { Price } from 'components/atoms/Price';
import { dateFormat } from 'utils/dateFormat';
import { PremiumPrice } from 'components/molecules/PremiumPrice';
import { TimeLeftCounter } from 'components/molecules/TimeLeftCounter';
import { TimesaleDetailLink } from './detailLink';

// NOTE: タイムセール一旦無くなったけど、再利用できそうなところありそうなので一応残しておく。
type Props = {
  timesaleTag: TimesaleTag;
} & BoxProps;
export const TimesaleContent: React.VFC<Props> = ({ timesaleTag, ...rest }) => {
  const { isHeld } = timesaleTag.campaign;

  return (
    <Box
      borderRadius="10px"
      bgGradient="linear(#4A769E 0%, #714CA0 25%)"
      {...rest}
    >
      <Box borderRadius="10px" p="2.5" bg="white">
        <Flex mb="2.5">
          {isHeld ? (
            <React.Fragment>
              <TimeLeftCounter endAt={timesaleTag.campaign.endAt} />
              <Spacer />
              <Link
                href={{
                  pathname: '/categories',
                  query: {
                    categoryId: timesaleTag.id,
                  },
                }}
                passHref
              >
                <Center flexShrink={0} pr={['0', '4']}>
                  <Text
                    textStyle="h8"
                    fontSize={['10px', '12px']}
                    fontWeight="bold"
                    mr="2"
                    color="text.300"
                  >
                    すべて見る
                  </Text>
                  <NextImage
                    src={RightVectorBaseTwo}
                    alt="RightVector"
                    width={6.25}
                    height={10}
                  />
                </Center>
              </Link>
            </React.Fragment>
          ) : (
            <Text textStyle="h5" color="action.notification" pl="1.5" mb="2.5">
              次回のタイムセール：
              {dateFormat(new Date(timesaleTag.campaign.startAt))}
            </Text>
          )}
        </Flex>
        <SimpleGrid columns={3} spacing={3.5}>
          {timesaleTag.units.slice(0, 3).map((unit, i) => (
            <TimesaleDetailLink
              key={i}
              isHeld={isHeld}
              productId={unit.productId}
              unitId={unit.unitId}
            >
              <Box>
                <AspectRatio ratio={1} mb="2.5" pos="relative">
                  <Center borderTopRadius="5px">
                    <Image
                      src={unit.images && unit.images[0].url}
                      alt={unit.images && unit.images[0].alt}
                      objectFit="contain"
                      w="100%"
                      maxH="100%"
                      htmlHeight="100%"
                      htmlWidth="100%"
                      fallbackSrc="static/Fallback/FallbackMedium.svg"
                    />
                    {!isHeld && (
                      <Center
                        pos="absolute"
                        top="0"
                        left="0"
                        w="full"
                        h="full"
                        bg="rgb(255, 255, 255, 0.8)"
                      >
                        <NextImage
                          src={LockGray}
                          alt="LockGray"
                          width={25.33}
                          height={33.25}
                        />
                      </Center>
                    )}
                  </Center>
                </AspectRatio>
                {isHeld ? (
                  <React.Fragment>
                    <Text
                      textStyle="h8"
                      color="text.300"
                      textDecoration={'line-through'}
                      mb="1"
                    >
                      通常価格<Price as="span">{unit.originalPrice}</Price>
                    </Text>
                    <PremiumPrice textStyle="h4">{unit.price}</PremiumPrice>
                  </React.Fragment>
                ) : (
                  <Text textStyle="h5" color="text.300" mb="6" opacity={0.2}>
                    通常価格<Price as="span">{unit.originalPrice}</Price>
                  </Text>
                )}
              </Box>
            </TimesaleDetailLink>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
