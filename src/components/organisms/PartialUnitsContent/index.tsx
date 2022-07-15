import {
  AspectRatio,
  Box,
  BoxProps,
  Center,
  SimpleGrid,
  Text,
  Flex,
} from '@chakra-ui/layout';
import React from 'react';
import { PartialUnits } from 'type/viewModel/partialUnits';
import Link from 'next/link';
import Image from 'next/image';
import { Price } from 'components/atoms/Price';
import { PremiumPrice } from 'components/molecules/PremiumPrice';
import { Button } from 'components/atoms/Button';
import { New } from 'components/atoms/New';

type Props = {
  partialUnits: PartialUnits;
  name?: string;
  handleMore: () => void;
  isNew: boolean;
} & BoxProps;

export const PartialUnitsContent: React.VFC<Props> = ({
  partialUnits,
  name,
  handleMore,
  isNew,
  ...rest
}) => {
  return (
    <Box px="2.5" py="4" bg="bg.100" {...rest}>
      <Flex alignItems="center" px="1" mb="2">
        <Text textStyle="h4" color="text.200">
          {partialUnits.description}
        </Text>
      </Flex>
      <Flex alignItems="center" px="1" mb="5">
        {isNew && <New w="8" h="8" mr="1" />}
        <Text textStyle="h3">{name || partialUnits.name}</Text>
      </Flex>
      <SimpleGrid columns={3} spacing={4} px="1" mb="6">
        {partialUnits.units.slice(0, 6).map((unit, i) => (
          <Link
            key={i}
            href={{
              pathname: '/products',
              query: { productId: unit.productId, unitId: unit.unitId },
            }}
            passHref
          >
            <Box>
              <AspectRatio ratio={1} mb="1">
                <Center borderTopRadius="5px">
                  <Image
                    src={
                      unit.images
                        ? unit.images[0].url
                        : '/Fallback/FallbackMedium.svg'
                    }
                    alt={unit.images && unit.images[0].alt}
                    objectFit="contain"
                    layout="fill"
                  />
                </Center>
              </AspectRatio>
              <Text textStyle="h9" noOfLines={1} mb="0.5">
                {unit.brandName}
              </Text>
              <Text textStyle="h9" fontWeight="bold" color="text.300" mb="0.5">
                通常価格<Price as="span">{unit.originalPrice}</Price>
              </Text>
              <PremiumPrice textStyle="h5">{unit.price}</PremiumPrice>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
      <Button type="button" onClick={handleMore} w="full" h="12">
        もっと見る
      </Button>
    </Box>
  );
};
