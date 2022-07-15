import { Fragment, memo, VFC } from 'react';
import Link from 'next/link';
import { Image } from '@chakra-ui/image';
import { Box, Text } from '@chakra-ui/layout';
import { Button } from 'components/atoms/Button';

const Component: VFC = () => {
  return (
    <Fragment>
      <Box maxW="container.sm" mx="auto">
        {/* 読み込み中のalt属性が表示されるのが嫌なので、指定しない */}
        <Box>
          <Image src="/GuidePage/Guarantee/FirstView.jpg" />
        </Box>
        <Box px="20px">
          <Box pt="30px" pb="10px">
            <Box pb="10px">
              <Text textStyle="h4">使用済みでも、全額保証について</Text>
            </Box>
            <Box pb="20px">
              <Text textStyle="h7">
                以下のお悩みを、パントリーの会員限定のサポートで解決！
                <br />
                🤔 コスメをオンラインで買うのは躊躇する
                <br />
                🤔 肌に合わなかった場合どうしよう
                <br />
                🤔 色合いが違うかったらどうしよう
              </Text>
            </Box>
            <Box pb="20px">
              <Text textStyle="h7">
                パントリーでは、皆様に安心してショッピングを行っていただくため、商品ページの色や詳細をできるだけ詳しく記載するようにしています。
                <br />
                ですが万が一、オンラインで購入する以上起こりうる、お手元に届いた商品が思っていたのと違う場合、使用済みでも返金をいたします。
              </Text>
              <Text textStyle="h7">
                以下の「全額補償依頼」をお願いします。
                その後、運営にて悪質な返品ではないとし「全額補償の対象」と判断した場合、商品代金を全額返金いたします。
                お手軽に商品をお試し、お買い物ができるよう勤めてまいります。
              </Text>
            </Box>
            <Box pb="20px">
              <Text textStyle="h4">1. 全額補償依頼の対象</Text>
              <Text textStyle="h7">
                ・商品到着から30日以内であること。
                <br />
                ・使用済みでもOK
                <br />
                ・商品があわなかった、思ってたのと違ったという理由でもOK
                <br />
                ※過去の返品履歴から悪質な返品だと判断された場合、補償対象外となります。
              </Text>
            </Box>
            <Box pb="20px">
              <Text textStyle="h4">2. 全額補償依頼</Text>
              <Text textStyle="h7">
                ・運営事務局(info@pantrii.jp)へ、購入した商品の返品の旨をメールにてご連絡ください。
                <br />
                ・メールにお伝えする住所宛(運営事務局)へ商品をご返送ください。(着払い可)
              </Text>
            </Box>
            <Box pb="20px">
              <Text textStyle="h4">3. 全額補償の方法</Text>
              <Text textStyle="h7">
                ・購入者へ結果をご連絡し、お支払いいただいた全額をクレジットカード返金・売上金の返金、または銀行口座へ返金させていただきます。
              </Text>
            </Box>
          </Box>
        </Box>
        <Box textAlign="center" px="20px" pt="40px" pb="40px">
          <Box pb="30px" px="20px">
            <Text textStyle="h4" textAlign="center">
              お買い物の準備はいいですか？
            </Text>
          </Box>
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

export const GuaranteeTemplate = memo(Component);
