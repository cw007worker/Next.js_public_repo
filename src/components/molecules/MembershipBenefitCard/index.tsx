import { FC } from 'react';
import {
  Box,
  BoxProps,
  Text,
  Center,
  Stack,
  AspectRatio,
} from '@chakra-ui/react';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { Price } from 'components/atoms/Price';
import Link from 'next/link';
import { PremiumPrice } from '../PremiumPrice';
import { DiscountPrice } from 'components/atoms/DiscountPrice';
import { isParallelImport } from 'utils/parallelImport';
import { TagLabel } from 'components/atoms/TagLabel';
import { MembershipBenefit } from 'constants/membershipBenefits';

type Props = MembershipBenefit & BoxProps;

export const MembershipBenefitCard: FC<Props> = ({
  title,
  imagePath,
  type,
  ...rest
}) => {
  return (
    <Box
      bgColor="white"
      borderRadius="5px"
      cursor="pointer"
      position="relative"
      {...rest}
    >
      <Stack>
        <Box pt="4" px="10">
          <AspectRatio ratio={1}>
            <Box borderTopRadius="5px">
              <OptimizedImage
                src={imagePath}
                alt={title}
                objectFit="contain"
                layout="fill"
                fallbackSrc="/Fallback/FallbackLarge.svg"
              />
            </Box>
          </AspectRatio>
        </Box>
        <Center textAlign="center">
          <Text
            fontSize="12px"
            fontWeight="bold"
            pt="1"
            pb="2"
            css={{
              whiteSpace: 'pre-line',
            }}
          >
            {title}
          </Text>
        </Center>
      </Stack>
    </Box>
  );
};
