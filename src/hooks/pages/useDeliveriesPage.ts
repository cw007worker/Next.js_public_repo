import React from 'react';
import {
  useGetDeliveries,
  HookState as GetDeliveriesState,
} from 'hooks/useGetDeliveries';
import { useLayout, HookState as LayoutState } from 'hooks/useLayout';
import { DeliveryStatus } from 'type/viewModel/delivery';

export type HookState = {
  layoutState: LayoutState;
  deliveriesState: GetDeliveriesState;
};

export const useDeliveriesPage = (): HookState => {
  const [currentStatus, setCurrentStatus] = React.useState<
    DeliveryStatus | 'all'
  >('all');

  const layoutState = useLayout();
  const deliveriesState = useGetDeliveries({ status: currentStatus });

  return {
    layoutState,
    deliveriesState,
  };
};
