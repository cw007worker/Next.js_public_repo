import { Box, Text, Radio, Stack, RadioGroup } from '@chakra-ui/react';
import NormalButton from 'components/atoms/NormalButton';
import { OptimizedImage } from 'components/atoms/OptimizedImage';
import { RoundedChangeableBox } from 'components/molecules/RoundedChangeableBox';
import React from 'react';
import { PaymentWay } from 'type/viewModel/common/paymentWay';

export type Props = {
  toggleAddNewCard: () => void;
  handleUpdateDefaultPaymentWay: () => void;
  isLoading: boolean;
  paymentWays: PaymentWay[] | undefined;
  handleChangeCardId: (nextValue: string) => void;
  cardId: string;
  defaultCardId: string;
};
export const PaymentWayEditerTemplate: React.VFC<Props> = ({
  paymentWays,
  handleUpdateDefaultPaymentWay,
  isLoading,
  toggleAddNewCard,
  handleChangeCardId,
  cardId,
  defaultCardId,
}) => {
  return (
    <Box pt="5" pb="11" px="5" maxWidth="xl" mx="auto" bg="#FAFAFA" h="full">
      <Text textStyle="h5" mb="5">
        クレジットカード情報変更
      </Text>

      <Box width="60%" mb="5">
        <OptimizedImage
          width="192"
          height="29"
          layout="responsive"
          src="/CardBrands.jpg"
        />
      </Box>

      <RadioGroup onChange={handleChangeCardId} defaultValue={defaultCardId}>
        <Stack mb="5">
          {paymentWays &&
            paymentWays.map((payment) => {
              return (
                <Radio
                  size="sm"
                  name={payment.last4}
                  value={payment.stripeCardId}
                  key={payment.stripeCardId}
                >
                  <Box display="flex">
                    <Text marginRight="24px">{`**** **** **** ${payment.last4}`}</Text>
                    <Text>
                      有効期限&nbsp;:&nbsp;
                      {convertMonthsToTwoDigits(payment.expMonth)}/
                      {convert4digitsYearTo2digits(payment.expYear)}
                    </Text>
                  </Box>
                </Radio>
              );
            })}
        </Stack>
      </RadioGroup>

      <RoundedChangeableBox
        handleClick={toggleAddNewCard}
        info={undefined}
        placeholder="クレジットカードを追加"
        mb="5"
      />

      <Box>
        <NormalButton
          w="full"
          type="submit"
          onClick={handleUpdateDefaultPaymentWay}
          isLoading={isLoading}
        >
          変更する
        </NormalButton>
      </Box>
    </Box>
  );
};

// 1 2 3 4 5 6 7 8 9 10 11 12 => 01 02 03 04 05 06 07 08 09 10 11 12
const convertMonthsToTwoDigits = (month: number): string => {
  if (String(month).length < 2) {
    return `0${month}`;
  } else {
    return `${month}`;
  }
};

const convert4digitsYearTo2digits = (year: number): string => {
  return String(year).slice(-2);
};
