import { Fragment, VFC, memo } from 'react';
import { HookState } from 'hooks/pages/onboarding/usePaymentPage';
import { CardElement } from '@stripe/react-stripe-js';
import { Box, Text, FormLabel } from '@chakra-ui/react';
import { TextFieldWithNoLabel } from 'components/molecules/TextFieldWithNoLabel';
import { PlanBox } from 'components/organisms/PlanBox';
import { ConfirmCheckbox } from 'components/organisms/ConfirmCheckbox';
import NormalButton from 'components/atoms/NormalButton';
import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { OnboardingPaymentForm } from './form';

const Component: VFC<HookState> = (props) => {
  return (
    <Fragment>
      {props.pageState === undefined || props.pageState.type === 'loading' ? (
        <Loading />
      ) : props.pageState.type === 'error' ? (
        <ErrorFetchFaild
          message="エラーが発生しました"
          includeSubMessage={true}
          linkProps={{ path: '/', text: 'ホームへ戻る' }}
        />
      ) : props.pageState.type === 'loaded' ? (
        <OnboardingPaymentForm
          membershipPlan={props.pageState.data.membershipPlan}
          onSubmit={props.onSubmit}
          isSubmitting={props.isSubmitting}
        />
      ) : null}
    </Fragment>
  );
};

export const PaymentTemplate = memo(Component);
