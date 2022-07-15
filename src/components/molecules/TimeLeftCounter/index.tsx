import { useTimeLeft } from 'hooks/useTimeLeft';
import { Text, Flex, FlexProps, Center } from '@chakra-ui/react';
import { CountDownBox } from './CountDownBox';
import { BetweenText } from './BetweenText';

type Props = {
  endAt: string;
} & FlexProps;

export const TimeLeftCounter: React.VFC<Props> = ({ endAt, ...rest }) => {
  const { day, hour, minute, second } = useTimeLeft(endAt);
  return (
    <Flex alignItems="center" {...rest}>
      <Text textStyle="h5" fontSize={['12px', '14px']} pl="1.5" pr="2.5">
        タイムセール
      </Text>
      <CountDownBox>{day}</CountDownBox>
      <BetweenText>日</BetweenText>
      <CountDownBox>{hour}</CountDownBox>
      <BetweenText>:</BetweenText>
      <CountDownBox>{minute}</CountDownBox>
      <BetweenText>:</BetweenText>
      <CountDownBox>{second}</CountDownBox>
    </Flex>
  );
};
