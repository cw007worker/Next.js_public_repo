import { useCallback, useEffect, useState } from 'react';
import { generateSignInLink } from 'repositories/generateSignInLink';
import { generateSignInLinkRequestSchema } from 'type/request/generateSignInLink';
import { GenerateSignInLinkResponse } from 'type/response/generateSignInLink';
import { sentryLog } from 'libs/setnry';

export const useGenerateSignInLink = () => {
  const request = useCallback(async (email: string) => {
    let parsed;
    try {
      parsed = generateSignInLinkRequestSchema.parse({
        email: email,
      });
    } catch (err) {
      console.error(err);
      sentryLog(err);
      throw new Error('パラメータが不正です');
    }
    try {
      const res = await generateSignInLink({
        email: parsed.email,
      });
      return res;
    } catch (err) {
      sentryLog(err);
      throw new Error('EmailLinkの取得に失敗しました。');
    }
  }, []);

  return {
    request,
  };
};
