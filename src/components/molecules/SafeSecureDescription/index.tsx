import { AspectRatio, Box, BoxProps, Grid, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { EasyCancelIcon } from 'components/atoms/IconsSafeSecure/EasyCancelIcon'
import { FreeShippingIcon } from 'components/atoms/IconsSafeSecure/FreeShippingIcon'
import { GenuinIcon } from 'components/atoms/IconsSafeSecure/GenuinIcon'
import { RefundIcon } from 'components/atoms/IconsSafeSecure/RefundIcon'
import { OptimizedImage } from "components/atoms/OptimizedImage"
import { FC } from "react"


export const SafeSecureDescription = ({ ...rest }) => {
  return (
    <Box
      bg="bg.200"
      borderRadius="5"
      {...rest}
    >
      <Box textAlign="center" textStyle="h3">
        <Text>安心・安全への取り組み</Text>
      </Box>
      <Box textStyle="h7" py="5" px="3">
        <Text>
          Pantriiで取り扱っている商品は、全て正規店や貿易会社による厳重な管理体制下での検品作業を経て、管理基準を通過したもののみとなっているため、安心してご購入・ご利用頂けます。
          万が一お肌に合わない等のトラブルが発生した場合、使用・未使用の如何を問わず全額返金させて頂きます。
        </Text>
      </Box>
      <SimpleGrid columns={2} >
        <Box bg="white" p="2" m="2" borderRadius="5">
          <Box mx="auto" height="70px" width="70px" >
            <OptimizedImage
              src="/Icon/Genuin.png"
              height="70px"
              width="70px"
            />
          </Box>
          {/* <GenuinIcon height="40px" width="40px" mx="auto" /> */}
          <Box textAlign="center" mb="1">
            <Text textStyle="h7" fontWeight="bold">
              本物保証
            </Text>
          </Box>
          <Text textStyle="h9">
            正規品を仕入れ、厳重な検品作業を行っています。
          </Text>
        </Box>
        <Box bg="white" p="2" m="2" borderRadius="5">
          <Box mx="auto" height="70px" width="70px">
            <OptimizedImage
              src="/Icon/KawaiiOnnanoko.png"
              height="70px"
              width="70px"
            />
          </Box>
          {/* <RefundIcon height="40px" width="40px" mx="auto" /> */}
          <Box textAlign="center" mb="1">
            <Text textStyle="h7" fontWeight="bold">
              返品返金保証
            </Text>
          </Box>
          <Text textStyle="h9" >
            合わなければ使用済みでも返品＆全額返金を承ります。
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
