import React, { VFC, memo } from 'react';
import { HookState } from 'hooks/pages/onboarding/usePlanPage';
import { OnboardingPlanFormTemplate } from 'components/templates/Onboarding/Plan/form';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { Loading } from 'components/molecules/Loading';

const Component: VFC<HookState> = (props) => {
  return (
    <React.Fragment>
      {props.membershipPlans.state?.type === 'loading' ? (
        <Loading />
      ) : props.membershipPlans.state?.type === 'loaded' ? (
        <OnboardingPlanFormTemplate
          membershipPlans={props.membershipPlans.state.data.membershipPlans}
          selectedPlan={props.selectedPlan}
          isSelectedPlan={props.isSelectedPlan}
          handleSelectedPlan={props.handleSelectedPlan}
          handleSubmit={props.handleSubmit}
        />
      ) : (
        <ErrorFetchFaild
          message="コンテンツが取得できませんでした。"
          includeSubMessage={false}
        />
      )}
    </React.Fragment>
  );
};

export const OnboardingPlanTemplate = memo(Component);
