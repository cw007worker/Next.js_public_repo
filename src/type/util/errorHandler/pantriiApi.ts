import { ErrorResponse } from 'type/response/errorResponse';

export const pantriiApiErrorHandler = (code: ErrorResponse['code']) => {
  switch (code) {
    case PANTRII_API_ERROR_CODE_MAP.INTERNAL_SERVER_ERROR:
      return 'サーバーエラーが発生しました。お手数ですが、Pantriiサポートまでお問い合わせください。';
    case PANTRII_API_ERROR_CODE_MAP.JWT_DECORD_ERROR:
      return '認証状態の期限が切れています。再度ログインをする必要があります';
    case PANTRII_API_ERROR_CODE_MAP.JWT_EXPIRED_SIGNATURE:
      return '認証状態の期限が切れています。再度ログインをする必要があります';
    case PANTRII_API_ERROR_CODE_MAP.UNAUTHORIZED_ACCESS:
      return 'アクセス権限がありません。';
    case PANTRII_API_ERROR_CODE_MAP.REFFERAL_CODE_SHOULD_ONLY_ONE:
      return '既に招待クーポンを獲得しています。';
    case PANTRII_API_ERROR_CODE_MAP.ACQUIRE_REFFARAL_CODE_NOT_AUTHORIZED:
      return '招待クーポンは獲得できません。';
    case PANTRII_API_ERROR_CODE_MAP.REFERRER_NOT_PERMITTED_TO_ACQUIRE:
      return '紹介者コードは、紹介者自身が利用することはできません。';
    default:
      return '予期せぬエラーが発生しました。お手数ですが、Pantriiサポートまでお問い合わせください。';
  }
};

export const PANTRII_API_ERROR_CODE_MAP = {
  INTERNAL_SERVER_ERROR: 'internal_server_error',
  ROUTING_ERROR: 'routing_error',
  UNKNOWN_FORMAT: 'unknown_format',
  BAD_REQUEST: 'bad_request',
  CONFLICT: 'database_conflict',
  RECORD_NOT_FOUND: 'record_not_found',
  RECORD_NOT_DESTROYED: 'record_not_destroyed',
  RECORD_NOT_UNIQUE: 'record_not_unique',
  RECORD_INVALID: 'record_invalid',
  PARAMETER_MISSING: 'parameter_missing',
  JWT_DECORD_ERROR: 'jwt_decode_error',
  JWT_EXPIRED_SIGNATURE: 'jwt_expired_signature',
  NOT_NULL_VIOLATION: 'not_null_violation',
  UNAUTHORIZED_ACCESS: 'unauthorized_access',
  FIREBASE_AUTH_USER_NOT_SYNCHRONIZED: 'firebase_auth_user_not_synchronized',
  CAN_NOT_DECREMENT_UNIT_STOCK: 'can_not_decrement_unit_stock',
  UNAUTHORIZED_OPERATION: 'unauthorized_operation',
  ALREADY_MEMBERSHIP: 'already_membership_user',
  REFFERAL_CODE_SHOULD_ONLY_ONE: 'referral_code_should_only_one',
  REFERRER_NOT_PERMITTED_TO_ACQUIRE: 'referrer_not_permitted_to_acquire',
  ACQUIRE_REFFARAL_CODE_NOT_AUTHORIZED: 'acquire_reffaral_code_not_authorized',
};
