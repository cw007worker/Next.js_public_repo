import React from 'react';
import { useAddShippingAddress } from 'hooks/useAddShippingAddress';
import { useUpdateShippingAddress } from 'hooks/useUpdateShippingAddress';
import { useToast } from 'hooks/useToast';

export const useEnterShippingAddressPage = (
  shippingAddressId: number | undefined,
  reload: () => void
) => {
  const { request: handleAdd, state: addState } = useAddShippingAddress();
  const { request: handleUpdate, state: updateState } =
    useUpdateShippingAddress(shippingAddressId);
  const [isLoading, setIsLoading] = React.useState(false);
  const setToast = useToast();

  React.useEffect(() => {
    if (addState?.type === 'loading' || updateState?.type === 'loading') {
      setIsLoading(true);
    } else if (addState?.type === 'loaded') {
      setIsLoading(false);
      setToast({
        status: 'success',
        title: 'お届け先を追加しました。',
      });
      reload();
    } else if (updateState?.type === 'loaded') {
      setIsLoading(false);
      setToast({
        status: 'success',
        title: 'お届け先を変更しました。',
      });
      reload();
    } else if (addState?.type === 'error') {
      setIsLoading(false);
      setToast({
        status: 'error',
        title: addState?.message,
      });
    } else if (updateState?.type === 'error') {
      setIsLoading(false);
      setToast({
        status: 'error',
        title: updateState?.message,
      });
    }
  }, [addState, updateState, setToast]);

  return { handleAdd, handleUpdate, isLoading };
};
