import { Box, Text, chakra } from '@chakra-ui/react';
import RoundedButton from 'components/atoms/RoundedButton';
import Image from 'next/image';
import Bike from '../../../../static/Bike.png';
import Link from 'next/link';
import { Membership } from 'type/viewModel/common/membership';

type Props = Membership;

const CancelCompletedTemplate: React.VFC<Props> = ({ stripeSubscription }) => {
  return (
    <Box px="8" pt="14" pb="5" maxW="container.sm" mx="auto">
      <Box mb="6" textAlign="center">
        <Image src={Bike} alt="Bike" height={140} width={140} />
      </Box>
      <Text
        fontSize="18px"
        fontWeight="bold"
        lineHeight="22px"
        textAlign="center"
        e
        mb="4"
      >
        解約手続きが完了しました
      </Text>
      <Text fontSize="xm" lineHeight="5" textAlign="center" mb="12">
        Pantriiをご利用いただきありがとうございます。
      </Text>
      <Text fontSize="xm" lineHeight="5" textAlign="center" mb="12">
        ご利用中のプランは今回の請求期間の最終日となる
        <chakra.span fontWeight="bold">
          {stripeSubscription.currentPeriodEndDate}
        </chakra.span>
        までご利用いただけます
      </Text>
      <Link href="/">
        <Box textAlign="center" px="6">
          <RoundedButton w="full" maxWidth="300px">
            閉じる
          </RoundedButton>
        </Box>
      </Link>
    </Box>
  );
};

export default CancelCompletedTemplate;
