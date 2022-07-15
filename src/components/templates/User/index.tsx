import { Box, Text } from '@chakra-ui/react';
import { MembershipCard } from 'components/organisms/MembershipCard';
import { MembershipCardGold } from 'components/organisms/MembershipCard/gold';
import React from 'react';
import { UserInfo } from 'type/viewModel/userInfo';
import { LinkBoxWithIcon } from 'components/molecules/LinkBox/withIcon';
import { LinkBox } from 'components/molecules/LinkBox';
import { MailIcon } from 'components/molecules/Humberger/MailIcon';
import { FaqIcon } from 'components/molecules/Humberger/FaqIcon';
import { DeliveriesSummaryCard } from 'components/organisms/DeliveriesSummaryCard';
import { AccountSettingIcon } from 'components/atoms/Icons/AccountSettingIcon';
import Link from 'next/link';
import { showChannelTalk } from 'utils/channelTalk';
import { GridBannerContents } from 'components/organisms/BannerContents/grid';
import { HookState } from 'hooks/pages/useUserPage';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { Loading } from 'components/molecules/Loading';
import { MembershipBenefitList } from 'components/organisms/MembershipBenefitList';
import { Coupon } from 'components/atoms/Coupon';
import { CartIcon } from 'components/organisms/Header/CartIcon';

const Component: React.VFC<HookState> = (props) => {
  const {
    pageState,
    membershipGrade,
    bannerContentsForGrid,
    membershipBenefitList,
  } = props;
  return (
    <>
      {pageState === undefined || pageState.type === 'loading' ? (
        <Loading />
      ) : pageState.type === 'error' ? (
        <ErrorFetchFaild
          message="アカウント情報の取得に失敗しました"
          includeSubMessage={true}
          linkProps={{ path: '/', text: 'ホームへ戻る' }}
        />
      ) : (
        <Box bg="bg.200" minHeight="100vh" pt="5">
          {membershipGrade == 'year' ? (
            <MembershipCardGold
              name={`${pageState.data.firstName} ${pageState.data.lastName}`}
              planName="年額メンバーシップ"
              width="full"
              height="auto"
              px="6"
            />
          ) : (
            <MembershipCard
              name={`${pageState.data.firstName} ${pageState.data.lastName}`}
              planName="月額メンバーシップ"
              width="full"
              height="auto"
              px="6"
            />
          )}

          {membershipBenefitList !== undefined && (
            <MembershipBenefitList
              membershipBenefitList={membershipBenefitList}
              membershipGrade={membershipGrade}
              mx="18px"
              mb="4"
            />
          )}
          <Box my="10">
            <LinkBoxWithIcon
              href={{ pathname: '/user/coupon' }}
              icon={<Coupon w="28px" h="28" />}
              h="16"
              bg="bg.100"
              borderTop="1px"
              borderBottom="1px"
              borderColor="text.100"
            >
              クーポン
            </LinkBoxWithIcon>
            <LinkBoxWithIcon
              href={{ pathname: '/user/orders' }}
              icon={<CartIcon w="28px" />}
              h="16"
              bg="bg.100"
              borderBottom="1px"
              borderColor="text.100"
            >
              購入履歴
            </LinkBoxWithIcon>
          </Box>
          <Link href="/user/orders" passHref>
            <DeliveriesSummaryCard
              deliveriesSummary={pageState.data.deliveriesSummary}
              mb="4"
            />
          </Link>
          <Box>
            <Text textStyle="h8" py="2" mt="5" mx="20px" color="text.400">
              会員登録情報
            </Text>
          </Box>
          <Box>
            <LinkBoxWithIcon
              href={{ pathname: '/user/membership/setting' }}
              icon={<AccountSettingIcon />}
              h="16"
              bg="bg.100"
            >
              メンバーシップ支払いと設定
            </LinkBoxWithIcon>
          </Box>
          <Box>
            <Text textStyle="h8" py="2" mt="5" mx="20px" color="text.400">
              サポート
            </Text>
          </Box>
          <Box>
            <LinkBox
              href={{ pathname: '' }}
              h="16"
              bg="bg.100"
              borderTop="1px"
              borderBottom="1px"
              borderColor="text.100"
              onClick={showChannelTalk}
            >
              お問い合わせ
            </LinkBox>
            <LinkBox
              href="https://www.notion.so/parchie/121784310ad54da5b213df3e5db9e9ea"
              h="16"
              bg="bg.100"
              borderBottom="1px"
              borderColor="text.100"
            >
              ヘルプセンター
            </LinkBox>
            <LinkBox
              href="https://www.notion.so/parchie/87f54db8dc3c434c94fdd649ffd20179"
              h="16"
              bg="bg.100"
              borderBottom="1px"
              borderColor="text.100"
              onClick={showChannelTalk}
            >
              特定商取引法
            </LinkBox>
            <LinkBox
              href="https://www.notion.so/parchie/2f4eae21c4a044ae87653e599f2395f5"
              h="16"
              bg="bg.100"
              borderBottom="1px"
              borderColor="text.100"
              onClick={showChannelTalk}
            >
              プライバシーポリシー
            </LinkBox>
            <LinkBox
              href="https://www.notion.so/parchie/89ab836bf6a04f3899321ba5272a7c83"
              h="16"
              bg="bg.100"
              borderBottom="1px"
              borderColor="text.100"
              onClick={showChannelTalk}
            >
              利用規約
            </LinkBox>
            <GridBannerContents
              contents={bannerContentsForGrid}
              px="2.5"
              py="2"
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export const UserTemplate = React.memo(Component);
