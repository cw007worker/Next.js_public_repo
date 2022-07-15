import { Image } from '@chakra-ui/image';
import { Box, Flex, Text } from '@chakra-ui/layout';
import TruckLogo from '../../../../static/TruckLogo.svg';

export const FirstDiscountBanner = () => {
  // NOTE:初回¥1000 OFF今やってないから使ってないけど、とりあえず残しておく
  return (
    <Flex justifyContent="center" alignItems="center" h="8">
      <Image src={TruckLogo.src} alt="TruckLogo" />
      <Text textStyle="h4" pl="3">
        初回購入割引
        <Text as="span" color="action.notification" px="0.5">
          ¥1000
        </Text>
        OFF!!
      </Text>
    </Flex>
  );
};
