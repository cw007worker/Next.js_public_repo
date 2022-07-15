import { Box, AspectRatio, Text, Center, Flex } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/react';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { LineShareButton } from 'components/molecules/ShareButton/line';
import { TwitterShareButton } from 'components/molecules/ShareButton/twitter';
import React from 'react';
import { ReferralInfo } from 'type/viewModel/referralInfo';
import Link from 'next/link';

type Props = {
  referralInfo: ReferralInfo;
  twitterShareLink: string;
  lineShareLink: string;
  handleCopy: () => void;
};
export const ReferralTemplate: React.VFC<Props> = ({
  referralInfo,
  twitterShareLink,
  lineShareLink,
  handleCopy,
}) => {
  return (
    <Box bg="bg.100">
      <AspectRatio ratio={1.1363}>
        <OptimizedImage
          src="/Referral/ReferralTop.jpg"
          alt="ReferralTop"
          fallbackSrc="/Fallback/FallbackRectangle.svg"
          layout="fill"
          objectFit="contain"
        />
      </AspectRatio>
      <Box px="3" mt="-12" position="relative">
        <Box
          bg="bg.100"
          borderRadius="5px"
          px="5"
          py="3"
          mb="4"
          boxShadow="0 1px 8px rgba(0, 0, 0, 0.1)"
        >
          <Text textStyle="h4" textAlign="center" mb="4">
            あなたの招待コード
          </Text>
          <Link href={twitterShareLink} passHref>
            <TwitterShareButton mb="4" as="a">
              Twitterでツイートする
            </TwitterShareButton>
          </Link>
          <Link href={lineShareLink} passHref>
            <LineShareButton mb="6" as="a">
              LINEで送る
            </LineShareButton>
          </Link>
          <Input
            value={referralInfo.referralCode}
            variant="fill"
            id="code"
            type="text"
            readOnly
            bg="bg.200"
            borderRadius="5px"
            h="50px"
            fontSize="20px"
            fontWeight="bold"
            textAlign="center"
            onClick={handleCopy}
          />
        </Box>
        <Flex
          borderRadius="5px"
          alignItems="center"
          justifyContent="space-between"
          boxShadow="0 1px 8px rgba(0, 0, 0, 0.1)"
          h="42px"
          px="5"
          py="2"
          mb="10"
        >
          <Text textStyle="h7">招待した人数</Text>
          <Flex alignItems="center">
            <Text fontSize="20px" fontWeight="bold">
              {referralInfo.referredCustomers.toLocaleString()}
            </Text>
            <Text textStyle="h7" ml="4">
              人
            </Text>
          </Flex>
        </Flex>
        <Box px="1" mb="52">
          <Text textStyle="h4">10%OFFクーポンGETまでの流れ</Text>
          <Text textStyle="h7">
            <br />
            招待した人・された人どちらもクーポンが使える！
            <br />
            <br />
            【招待した人】
            <br />
            友達を何人招待しても、その人数分クーポンをGET！
            <br />
            ①上記の「招待コード」をTwitterやLINEなどで友達にシェア。
            <br />
            ②友達がパントリーに登録して、「マイクーポン」→「保有クーポン・コード入力」からあなたの招待コードを入力。
            <br />
            ③クーポンをGET！「マイクーポン」から確認できます。
            <br />
            <br />
            【招待された人】
            <br />
            ①まずはパントリーに登録する。
            <br />
            ②「マイクーポン」→「保有クーポン・コード入力」から友達の招待コードを入力。
            <br />
            ③クーポンをGET！「保有クーポン・コード入力」から確認できます。
            <br />
            <br />
          </Text>
          <Text textStyle="h4">注意事項</Text>
          <Text textStyle="h7">
            <br />
            ・本キャンペーンは予告なく変更または終了となることがあります。
            <br />
            ・本キャンペーンで取得したクーポンは30日間(発行日含む)が有効期限となります。
            <br />
            ・クーポン利用後に自己都合等で取引キャンセルとなった場合、本クーポンは失効となります。
            <br />
            ・招待コードの入力は1回限りとなります。
            <br />
            ・ご登録情報の不備・同一人物の複数アカウントと判明した場合は、付与対象外となります。
            <br />
            ・クーポンの付与・取得数には上限があります。制限を解除するためには運営事務局にお問い合わせください。
            <br />
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
