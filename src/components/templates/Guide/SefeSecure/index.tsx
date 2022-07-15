import { Fragment, memo, VFC } from 'react';
import Link from 'next/link';
import { Image } from '@chakra-ui/image';
import { Box } from '@chakra-ui/layout';
import { Button } from 'components/atoms/Button';

const Component: VFC = () => {
  return (
    <Fragment>
      <Box maxW="container.sm" mx="auto">
        {/* 読み込み中のalt属性が表示されるのが嫌なので、指定しない */}
        <Box>
          <Image src="/GuidePage/SafeSecure/FirstView.jpg" />
        </Box>
        <Box px="20px">
          <Box pt="30px" pb="10px">
            <Image src="/GuidePage/SafeSecure/FirstViewBelowText.jpg" />
          </Box>
          <Box py="30px" px="60px">
            <Image src="/GuidePage/SafeSecure/HeadText.jpg" />
          </Box>
          <Box py="20px">
            <Image src="/GuidePage/SafeSecure/RefundInfo.jpg" />
          </Box>
          <Box py="20px">
            <Image src="/GuidePage/SafeSecure/PaymentInfo.jpg" />
          </Box>
          <Box py="20px">
            <Image src="/GuidePage/SafeSecure/OneOrderInfo.jpg" />
          </Box>
          <Box pt="20px" pb="60px">
            <Image src="/GuidePage/SafeSecure/SupportInfo.jpg" />
          </Box>
          <Box py="20px" px="60px">
            <Image src="/GuidePage/ReadyShopping.jpg" />
          </Box>
        </Box>
        <Box textAlign="center" px="20px" pt="40px" pb="40px">
          <Link href={'/'} passHref>
            <Button width="100%" minHeight="48px">
              ホームへ戻る
            </Button>
          </Link>
        </Box>
      </Box>
    </Fragment>
  );
};

export const SefeSecureTemplate = memo(Component);
