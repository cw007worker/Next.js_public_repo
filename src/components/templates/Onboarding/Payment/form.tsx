import { Fragment, VFC, memo } from 'react';
import {
  HookState,
  PaymentFormValue,
} from 'hooks/pages/onboarding/usePaymentPage';
import { useForm } from 'react-hook-form';
import { CardElement } from '@stripe/react-stripe-js';
import { Box, Text, FormLabel } from '@chakra-ui/react';
import { TextFieldWithNoLabel } from 'components/molecules/TextFieldWithNoLabel';
import { PlanBox } from 'components/organisms/PlanBox';
import { ConfirmCheckbox } from 'components/organisms/ConfirmCheckbox';
import NormalButton from 'components/atoms/NormalButton';
import { MembershipPlanForSubscribe } from 'type/viewModel/membershipPlanForSubscribe';
import { MembershipPlan } from 'type/viewModel/common/membershipPlan';
import { OnboardingStep } from 'components/organisms/OnboardingStep';
import { MembershiipPlanForFirstSubscribe } from 'type/viewModel/common/membershipPlan/forFirstSubscribe';

type Props = {
  membershipPlan: MembershiipPlanForFirstSubscribe;
  onSubmit: (values: PaymentFormValue) => Promise<void>;
  isSubmitting: boolean;
};

const Component: VFC<Props> = ({ membershipPlan, onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const termText = `
    以下のチェックボックスをチェックすることにより、
    利用規約および個人情報保護方針とします。
    キャンセルするまで${membershipPlan.name}料金（現在￥${membershipPlan.price}）
    はご指定のお支払い方法にて自動引き落としされます。
    お好きなときにキャンセルしていただければ、それ以降は料金を請求されることはありません。
  `;
  return (
    <Fragment>
      <Box px="8" pt="14" pb="5" maxW="container.sm" mx="auto">
        <OnboardingStep stepName="payment" />
        <Box py="6">
          <Box bg="primary.300" p="10px" textAlign="center">
            いつでも解約可能◎
            <br />
            安心してお買い物頂けます。
          </Box>
        </Box>
        {/** TODO:支払い手段の画像が入るよ **/}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/** TODO: FormControlPropsのisInvalidを直す
           * ref: https://github.com/parchiee/pantry_webclient/pull/137#discussion_r730323660 **/}
          <TextFieldWithNoLabel
            name="firstName"
            errorMessage={errors.firstName && errors.firstName.message}
            FormControlProps={{
              isInvalid: errors.firstName,
            }}
            InputProps={{
              height: '50px',
              placeholder: '名（TARO）',
              ...register('firstName', {
                required: 'この項目は必須です',
              }),
            }}
            mb="5"
          />
          <TextFieldWithNoLabel
            name="lastName"
            errorMessage={errors.lastName && errors.lastName.message}
            FormControlProps={{
              isInvalid: errors.lastName,
            }}
            InputProps={{
              height: '50px',
              placeholder: '姓（YAMADA）',
              ...register('lastName', {
                required: 'この項目は必須です',
              }),
            }}
            mb="5"
          />
          <FormLabel
            p={4}
            w="100%"
            bg="bg.100"
            border="1px"
            borderColor="gray.200"
          >
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: '17px',
                  },
                },
              }}
            />
          </FormLabel>
          <Box py="5">
            <PlanBox
              planName={membershipPlan.name}
              price={membershipPlan.price}
              discountPrice={membershipPlan.discountPrice}
              recurring={membershipPlan.recurring}
            />
          </Box>
          <Box py="5">
            <Text>{termText}</Text>
          </Box>
          <Box py="5">
            <ConfirmCheckbox
              text="同意する"
              errorMessage={errors.confirmTerms && errors.confirmTerms.message}
              CheckboxProps={{
                ...register('confirmTerms', {
                  required: '開始するには規約に同意する必要があります。',
                }),
                size: 'lg',
                colorScheme: 'blackAlpha',
                borderColor: 'text.400',
              }}
            />
            {/* <Checkbox {...register("confirmTerms")} /> */}
          </Box>
          <Box py="5">
            <NormalButton
              w="full"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!isValid}
            >
              メンバーシップを開始する
            </NormalButton>
          </Box>
        </form>
      </Box>
    </Fragment>
  );
};

export const OnboardingPaymentForm = memo(Component);
