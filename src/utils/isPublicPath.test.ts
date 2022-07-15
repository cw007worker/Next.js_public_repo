import { isPublicPathForApp, isPublicPathForWeb } from './isPublicPath';

describe('public route for appの判定', () => {
  test('public path', () => {
    expect(isPublicPathForApp('/')).toEqual(true);
    expect(isPublicPathForApp('/onboarding')).toEqual(true);
    expect(isPublicPathForApp('/onboarding/payment')).toEqual(true);
    expect(isPublicPathForApp('/onboarding/plan')).toEqual(true);
    expect(isPublicPathForApp('/onboarding/personalize')).toEqual(true);
    expect(isPublicPathForApp('/onboarding/phone')).toEqual(true);
    expect(isPublicPathForApp('/onboarding/phone/verify')).toEqual(true);
    expect(isPublicPathForApp('/onboarding/register')).toEqual(true);
    expect(isPublicPathForApp('/firstSale')).toEqual(true);
    expect(isPublicPathForApp('/comingsoon')).toEqual(true);
    expect(isPublicPathForApp('/comingsoon/mypage')).toEqual(true);
    expect(isPublicPathForApp('/404')).toEqual(true);
    expect(isPublicPathForApp('/401')).toEqual(true);
    expect(isPublicPathForApp('/501')).toEqual(true);
    expect(isPublicPathForApp('/lp/invitation')).toEqual(true);
    expect(isPublicPathForApp('/toApp')).toEqual(true);
    expect(isPublicPathForApp('/guide')).toEqual(true);
    expect(isPublicPathForApp('/guide/guarantee')).toEqual(true);
    expect(isPublicPathForApp('/guide/safeSecure')).toEqual(true);
    expect(isPublicPathForApp('/auth/signIn')).toEqual(true);
    expect(isPublicPathForApp('/auth/signIn/onboarding')).toEqual(true);
    expect(isPublicPathForApp('/auth/action')).toEqual(true);
    expect(isPublicPathForApp('/auth/resetPasswordRequest')).toEqual(true);
    expect(isPublicPathForApp('/products')).toEqual(true);
    expect(isPublicPathForApp('/brands')).toEqual(true);
  });
  test('private path', () => {
    expect(isPublicPathForApp('/cancelCompleted')).toEqual(false);
    expect(isPublicPathForApp('/cart')).toEqual(false);
    expect(isPublicPathForApp('/contractCancellation')).toEqual(false);
    expect(isPublicPathForApp('/itemList')).toEqual(false);
    expect(isPublicPathForApp('/categories')).toEqual(false);
    expect(isPublicPathForApp('/orderCompleted')).toEqual(false);
    expect(isPublicPathForApp('/orderConfirm')).toEqual(false);
    expect(isPublicPathForApp('/ranking')).toEqual(false);
    expect(isPublicPathForApp('/search')).toEqual(false);
  });
});

describe('public route for webの判定', () => {
  test('public path', () => {
    expect(isPublicPathForWeb('/')).toEqual(true);
    expect(isPublicPathForWeb('/onboarding')).toEqual(true);
    expect(isPublicPathForWeb('/onboarding/payment')).toEqual(true);
    expect(isPublicPathForWeb('/onboarding/plan')).toEqual(true);
    expect(isPublicPathForWeb('/onboarding/personalize')).toEqual(true);
    expect(isPublicPathForWeb('/onboarding/phone')).toEqual(true);
    expect(isPublicPathForWeb('/onboarding/phone/verify')).toEqual(true);
    expect(isPublicPathForWeb('/onboarding/register')).toEqual(true);
    expect(isPublicPathForApp('/firstSale')).toEqual(true);
    expect(isPublicPathForWeb('/comingsoon')).toEqual(true);
    expect(isPublicPathForWeb('/comingsoon/mypage')).toEqual(true);
    expect(isPublicPathForWeb('/404')).toEqual(true);
    expect(isPublicPathForWeb('/401')).toEqual(true);
    expect(isPublicPathForWeb('/501')).toEqual(true);
    expect(isPublicPathForApp('/lp/invitation')).toEqual(true);
    expect(isPublicPathForWeb('/toApp')).toEqual(true);
    expect(isPublicPathForWeb('/guide')).toEqual(true);
    expect(isPublicPathForWeb('/guide/guarantee')).toEqual(true);
    expect(isPublicPathForWeb('/guide/safeSecure')).toEqual(true);
    expect(isPublicPathForWeb('/auth/signIn')).toEqual(true);
    expect(isPublicPathForWeb('/auth/signIn/onboarding')).toEqual(true);
    expect(isPublicPathForWeb('/auth/action')).toEqual(true);
    expect(isPublicPathForWeb('/auth/resetPasswordRequest')).toEqual(true);
    expect(isPublicPathForApp('/products')).toEqual(true);
    expect(isPublicPathForApp('/brands')).toEqual(true);
  });
  test('private path', () => {
    // expect(isPublicPathForWeb('/')).toEqual(false);
    expect(isPublicPathForWeb('/cancelCompleted')).toEqual(false);
    expect(isPublicPathForWeb('/cart')).toEqual(false);
    expect(isPublicPathForWeb('/contractCancellation')).toEqual(false);
    expect(isPublicPathForWeb('/itemList')).toEqual(false);
    expect(isPublicPathForApp('/categories')).toEqual(false);
    expect(isPublicPathForWeb('/orderCompleted')).toEqual(false);
    expect(isPublicPathForWeb('/orderConfirm')).toEqual(false);
    expect(isPublicPathForApp('/ranking')).toEqual(false);
    expect(isPublicPathForWeb('/search')).toEqual(false);
  });
});
