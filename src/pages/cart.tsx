import { Heading } from '@chakra-ui/layout';
import { Loading } from 'components/molecules/Loading';
import { ErrorFetchFaild } from 'components/organisms/Error/fetchFailed';
import { FirstDiscountBanner } from 'components/organisms/FirstDiscountBanner';
import router from 'next/router';
import { LayoutWithBack } from 'components/organisms/Layout/withBack';
import { CartTemplate } from 'components/templates/Cart';
import { HookState, useCartPage } from 'hooks/pages/useCartPage';

const Cart = () => {
  const state: HookState = useCartPage();

  return (
    <LayoutWithBack
      handleBack={() => router.back()}
      cartItemCount={state.layoutState.cartItemCount}
    >
      {/* <FirstDiscountBanner /> */}
      {state.pageState === undefined || state.pageState.type === 'loading' ? (
        <Loading />
      ) : state.pageState.type === 'error' ? (
        <ErrorFetchFaild
          message="カート情報が取得できませんでした"
          includeSubMessage={true}
          linkProps={{ path: '/', text: 'ホームへ戻る' }}
        />
      ) : (
        <CartTemplate
          cartItems={state.cartItems}
          handleDelete={state.handleDelete}
          increment={state.increment}
          decrement={state.decrement}
          handleNext={state.handleNext}
          isDisabled={state.isDisabled}
        />
      )}
    </LayoutWithBack>
  );
};

export default Cart;
