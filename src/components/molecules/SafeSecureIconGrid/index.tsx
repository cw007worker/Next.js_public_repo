import { AspectRatio, Box, BoxProps, Grid, Text } from "@chakra-ui/react"
import { EasyCancelIcon } from 'components/atoms/IconsSafeSecure/EasyCancelIcon'
import { FreeShippingIcon } from 'components/atoms/IconsSafeSecure/FreeShippingIcon'
import { GenuinIcon } from 'components/atoms/IconsSafeSecure/GenuinIcon'
import { RefundIcon } from 'components/atoms/IconsSafeSecure/RefundIcon'
import { FC } from "react"

type Props = {
  fillColor?: string;
} & BoxProps;

export const SafeSecureIconGrid: FC<Props> = ({ fillColor, ...rest }) => {
  return (
    <Grid
      gridTemplateColumns="repeat(4, 1fr)"
      borderColor="inherit"
      gap={5}
      {...rest}
    >
      <Box textAlign="center">
        <GenuinIcon height="40px" width="40px" mx="auto" fillColor={fillColor} />
        <Box>
          <Text textStyle="h9">
            安心の
            <br />
            本物保証
          </Text>
        </Box>
      </Box>
      <Box textAlign="center">
      <EasyCancelIcon height="40px" width="40px" mx="auto" fillColor={fillColor} />
        <Box>
          <Text textStyle="h9">
            いつでも
            <br />
            解約可能
          </Text>
        </Box>
      </Box>
      <Box textAlign="center">
        
        <Box>
        <RefundIcon height="40px" width="40px" mx="auto" fillColor={fillColor} />
          <Text textStyle="h9">
            使ったものでも
            <br />
            返品返金OK
          </Text>
        </Box>
      </Box>
      <Box textAlign="center">
      <FreeShippingIcon height="40px" width="40px" mx="auto" fillColor={fillColor} />
        <Box>
          <Text textStyle="h9">
            年額プランは
            <br />
            送料無料
          </Text>
        </Box>
      </Box>
    </Grid>
  );
};
