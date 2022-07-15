import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';
import Axios, { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { isFirebaseAuthError } from 'type/util/firebaseAuth';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

const isEnabled = SENTRY_DSN !== undefined;

const ERROR_TYPE_MAP = {
  VALIDATION: 'validation',
  API: 'api',
  FIREBASE_AUTH: 'firebase-auth',
  UNKNOWN: 'unknown',
} as const;

export const init = () => {
  return (
    isEnabled &&
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      // パフォーマンスを計測してくれる
      integrations: [new Integrations.BrowserTracing()],
      environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
      // オブジェクトやアレイを展開してくれる深さを指定。
      //@see https://docs.sentry.io/platforms/javascript/configuration/options/#normalize-depth
      normalizeDepth: 10,
      // パフォーマンス計測の際のサンプルをとる割合
      tracesSampleRate: 0.5,
    })
  );
};

export const sentrySetUser = (data: Sentry.User) => {
  if (!isEnabled) return;
  return Sentry.configureScope((scope) => scope.setUser({ ...data }));
};

export const sentryLog = (err: Error | AxiosError | ZodError | unknown) => {
  if (!isEnabled) return;

  if (!(err instanceof Error)) return;
  //無視したい (Sentry に通知しない) エラーを設定しています。
  //メンテナンスモード時の通信エラーや、利用しているモジュール側で発生するエラーなど、開発側で想定済みのエラーを ignore の対象にする
  const skipErrorTypes: string[] = [
    'Network Error',
    'Request failed with status code 500',
    'Request failed with status code 401',
    'Request failed with status code 404',
  ];
  if (skipErrorTypes.includes(err.message)) {
    return;
  }

  if (Axios.isCancel(err)) return;

  if (Axios.isAxiosError(err)) {
    let contexts = {};
    const response = err.response;
    const endpoint = response?.config.url || '';
    const status = response?.status;
    const method = response?.config.method || '';
    const fingerprint = ['{{ default }}', endpoint, String(status), method];
    contexts = { response };

    Sentry.captureException(err, {
      level: Sentry.Severity.Error,
      contexts,
      fingerprint,
      tags: {
        errorType: ERROR_TYPE_MAP.API,
      },
    });
  } else if (err instanceof ZodError) {
    let contexts = {};
    const exeption = err;
    contexts = { err };

    Sentry.captureException(exeption, {
      level: Sentry.Severity.Error,
      contexts,
      tags: {
        errorType: ERROR_TYPE_MAP.VALIDATION,
      },
    });
  } else if (isFirebaseAuthError(err)) {
    let contexts = {};
    const exeption = err;
    contexts = { err };
    Sentry.captureException(exeption, {
      level: Sentry.Severity.Error,
      contexts,
      tags: {
        errorType: ERROR_TYPE_MAP.FIREBASE_AUTH,
      },
    });
  } else {
    Sentry.captureException(err, {
      level: Sentry.Severity.Error,
      tags: {
        errorType: ERROR_TYPE_MAP.UNKNOWN,
      },
    });
  }
};
