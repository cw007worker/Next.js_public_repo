import { MembershipPlanBoxIsHighlighted } from 'components/molecules/MembershipPlanBox/highlighted';
import { MembershipPlanBox } from 'components/molecules/MembershipPlanBox';
import React, { VFC, memo } from 'react';
import { MembershipPlan } from 'type/viewModel/common/membershipPlan';

type Props = {
  membershipPlans: MembershipPlan[];
  selectedPlan: MembershipPlan | undefined;
  isSelectedPlan: (membershipPlanId: string) => boolean;
  handleClick: (membershipPlan: MembershipPlan) => void;
};

export const MembershipPlanList: VFC<Props> = ({
  membershipPlans,
  selectedPlan,
  isSelectedPlan,
  handleClick,
}) => {
  return (
    <React.Fragment>
      {membershipPlans.map((plan, index) => {
        return plan.isHighlighted ? (
          <MembershipPlanBoxIsHighlighted
            key={plan.id}
            membershipPlan={plan}
            handleClick={() => handleClick(plan)}
            isSelectedPlan={isSelectedPlan}
            selectedPlan={selectedPlan}
            py="3"
          />
        ) : (
          <MembershipPlanBox
            key={plan.id}
            membershipPlan={plan}
            handleClick={() => handleClick(plan)}
            isSelectedPlan={isSelectedPlan}
            selectedPlan={selectedPlan}
            py="3"
          />
        );
      })}
    </React.Fragment>
  );
};
