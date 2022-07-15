import { loadStripe } from '@stripe/stripe-js';

export const getStripe = () => {
  const stripeApiKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
  if (stripeApiKey !== undefined) {
    const stripePromise = loadStripe(stripeApiKey);
    return stripePromise;
  } else {
    throw new Error('stripeApiKeyが取得できませんでした。');
  }
};
