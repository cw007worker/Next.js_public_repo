import { renderHook } from '@testing-library/react-hooks';
import {
  PantriiApiError,
  StripeApiError,
  VoucherifyApiError,
} from 'inflastructure/ApiError';
import { PANTRII_API_ERROR_CODE_MAP } from 'type/util/errorHandler/pantriiApi';
import { STRIPE_API_ERROR_CODE_MAP } from 'type/util/errorHandler/stripeApi';
import { VOUCHERIFY_API_ERROR_CODE_MAP } from 'type/util/errorHandler/voucherifyApi';
import { useFetch } from './useFetch';

describe('useFetchのテスト', () => {
  test('正常にデータが取得できた場合', async () => {
    const fetcher = () => Promise.resolve({ data: [] });
    const { result, waitForNextUpdate } = renderHook(() => useFetch(fetcher));

    expect(result.current.data).toStrictEqual({ isLoading: true });

    await waitForNextUpdate();

    expect(result.current.data).toStrictEqual({
      isLoading: false,
      data: { data: [] },
      error: undefined,
    });
  });

  test('フェッチに失敗した場合', async () => {
    const fetcher = () => Promise.reject('エラー');
    const { result, waitForNextUpdate } = renderHook(() => useFetch(fetcher));

    expect(result.current.data).toStrictEqual({ isLoading: true });

    await waitForNextUpdate();

    expect(result.current.data).toStrictEqual({
      isLoading: false,
      data: undefined,
      error:
        'データの取得に失敗しました。詳細はPantriiサポートまでお問い合わせください。',
    });
  });

  test('StripeApiErrorでフェッチに失敗した場合', async () => {
    const fetcher = () =>
      Promise.reject(
        new StripeApiError({
          message: 'stripeエラーだよ',
          response: {
            code: STRIPE_API_ERROR_CODE_MAP.ACCOUNT_INVALID,
            message: 'アカウントが無効だよエラー',
          },
        })
      );
    const { result, waitForNextUpdate } = renderHook(() => useFetch(fetcher));

    expect(result.current.data).toStrictEqual({ isLoading: true });

    await waitForNextUpdate();

    expect(result.current.data).toStrictEqual({
      isLoading: false,
      data: undefined,
      error:
        'アカウントが無効になっています。詳細はPantriiサポートまでお問い合わせください。',
    });
  });

  test('VoucherifyApiErrorでフェッチに失敗した場合', async () => {
    const fetcher = () =>
      Promise.reject(
        new VoucherifyApiError({
          message: 'voucheriryエラーだよ',
          response: {
            code: VOUCHERIFY_API_ERROR_CODE_MAP.RESOURCE_NOT_FOUND,
            message: 'クーポン無いよエラー',
          },
        })
      );
    const { result, waitForNextUpdate } = renderHook(() => useFetch(fetcher));

    expect(result.current.data).toStrictEqual({ isLoading: true });

    await waitForNextUpdate();

    expect(result.current.data).toStrictEqual({
      isLoading: false,
      data: undefined,
      error: 'クーポンが存在しません。',
    });
  });

  test('ApiErrorでフェッチに失敗した場合', async () => {
    const fetcher = () =>
      Promise.reject(
        new PantriiApiError({
          message: 'voucheriryエラーだよ',
          response: {
            code: PANTRII_API_ERROR_CODE_MAP.INTERNAL_SERVER_ERROR,
            message: '内部エラー',
          },
        })
      );
    const { result, waitForNextUpdate } = renderHook(() => useFetch(fetcher));

    expect(result.current.data).toStrictEqual({ isLoading: true });

    await waitForNextUpdate();

    expect(result.current.data).toStrictEqual({
      isLoading: false,
      data: undefined,
      error:
        'サーバーエラーが発生しました。お手数ですが、Pantriiサポートまでお問い合わせください。',
    });
  });
});
