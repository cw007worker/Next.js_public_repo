import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Grid,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/layout';
import React from 'react';
import { TimesaleTag } from 'type/viewModel/common/timesaleTag';
import Link from 'next/link';
import NextImage from 'next/image';
import RightVectorWhite from '../../../../static/RightVectorWhite.svg';
import { Image } from '@chakra-ui/react';
import { Price } from 'components/atoms/Price';
import { TimesaleContent } from '../TimesaleContent';

type Props = {
  timesaleTags: TimesaleTag[];
};
export const TimesaleContents: React.VFC<Props> = ({ timesaleTags }) => {
  return (
    <Box pt="5" pb="2.5" px="3">
      {timesaleTags.map((timesaleTag, i) => (
        <TimesaleContent key={i} timesaleTag={timesaleTag} />
      ))}
    </Box>
  );
};
