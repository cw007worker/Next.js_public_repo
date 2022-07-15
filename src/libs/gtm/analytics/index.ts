import { Me } from 'type/viewModel/me';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export const pushUserProperty = (meData: Me) => {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      user_id: meData.id,
      is_membership: meData.isMembership,
      canceled_membership: meData.canceledMembership,
      will_cancel_membership: meData.willCancelMembership,
    });
  }
};

type PageViewEvent = {
  event: 'page_view';
  page_location: string;
  user_id?: number;
  is_membership?: boolean;
  canceled_membership?: boolean;
  will_cancel_membership?: boolean;
};

type InViewEvent = {
  event: 'inView';
  label: string;
};

type ClickEvent = {
  event: 'click';
  label: string;
};

export type DataLayerType = PageViewEvent | InViewEvent | ClickEvent;

export const pushDataLayer = (data: DataLayerType): void => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
};
