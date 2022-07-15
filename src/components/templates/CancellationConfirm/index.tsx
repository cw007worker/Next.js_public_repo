import React from 'react';
import { CancelMembershipInfo } from 'type/viewModel/cancelMembershipInfo';
import { Box, Text } from '@chakra-ui/react';
import NormalButton from 'components/atoms/NormalButton';
import { subscribeMembership } from 'repositories/subscribeMembership';
import { MembershipInfo } from 'type/viewModel/membershipInfo';

type Props = {
  membership: CancelMembershipInfo;
  cancelComplete: () => void;
  back: () => void;
};

export const CancellationConfirmTemplate = (props: Props) => {
  const { membership, cancelComplete, back } = props;
  return (
    <Box pt="4" pb="20" px="6" maxW="container.sm" mx="auto">
      <Text textStyle="h3" mb="3">
        メンバーシップをキャンセルしますか？
      </Text>
      <Text textStyle="h7" color="text.300" mb="4">
        メンバーシップをキャンセルする場合は、下記のボタンを選択してください。
      </Text>
      <Text textStyle="h7" mb="6">
        ＜解約時の注意事項＞
      </Text>
      <Text textStyle="h7" mb="6">
        ・今解約されても、ご利用中のプランは今回の請求期間の最終日となる
        {membership.stripeSubscription.currentPeriodEndDate}
        にキャンセルされます。
      </Text>
      <Text textStyle="h7" mb="6">
        ・なお、1年以内に再登録していただいたくと、プロフィールやお気に入り情報、パーソナライズされた各種設定やアカウントの詳細をそのままお使いいただけます。
      </Text>
      <Text textStyle="h7" mb="6">
        ・再入会はいつでも可能ですが、2度目以降の登録は無料期間が適用されません。
      </Text>
      <Text textStyle="h7" mb="6">
        ・現在お持ちのポイントやクーポンは全て破棄されます。
      </Text>
      <Box px="2" mb="3">
        <NormalButton w="full" onClick={cancelComplete}>
          解約の手続き完了
        </NormalButton>
      </Box>
      <Box px="2">
        <NormalButton w="full" bg="text.100" color="text.400" onClick={back}>
          戻る
        </NormalButton>
      </Box>
    </Box>
  );
};
