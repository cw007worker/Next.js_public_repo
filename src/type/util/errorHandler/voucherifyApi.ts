import { ErrorResponse } from 'type/response/errorResponse';

export const voucherifyApiErrorHandler = (code: ErrorResponse['code']) => {
  switch (code) {
    case VOUCHERIFY_API_ERROR_CODE_MAP.NO_VOUCHER_SUITABLE_FOR_PUBLICATION:
      return '公開に適したクーポンが存在しません。';
    case VOUCHERIFY_API_ERROR_CODE_MAP.NOT_FOUND:
      return '指定したリソースが見つかりません。';
    case VOUCHERIFY_API_ERROR_CODE_MAP.ORDER_RULES_VIOLATED:
      return '注文が検証ルールにマッチしませんでした。';
    case VOUCHERIFY_API_ERROR_CODE_MAP.PROMOTION_INACTIVE:
      return 'プロモーションが有効ではありません。';
    case VOUCHERIFY_API_ERROR_CODE_MAP.PROMOTION_NOT_ACTIVE_NOW:
      return 'プロモーションは現在有効ではありません。';
    case VOUCHERIFY_API_ERROR_CODE_MAP.QUANTITY_EXCEEDED:
      return 'クーポンの利用回数制限が上限に達しています。';
    case VOUCHERIFY_API_ERROR_CODE_MAP.REFERRER_NOT_PERMITTED_TO_REDEEM:
      return '紹介者コードは、紹介者自身が利用することはできません。';
    case VOUCHERIFY_API_ERROR_CODE_MAP.RESOURCE_NOT_FOUND:
      return 'クーポンが存在しません。';
    case VOUCHERIFY_API_ERROR_CODE_MAP.VOUCHER_DISABLED:
      return '指定したクーポンは無効です。';
    case VOUCHERIFY_API_ERROR_CODE_MAP.VOUCHER_EXPIRED:
      return '指定したクーポンは既に無効になっています。';
    case VOUCHERIFY_API_ERROR_CODE_MAP.VOUCHER_NOT_ACTIVE:
      return '指定したクーポンはまだ有効ではありません。';
    case VOUCHERIFY_API_ERROR_CODE_MAP.VOUCHER_NOT_ACTIVE_NOW:
      return '指定したクーポンは現在有効ではありません。';
    default:
      return '予期せぬエラーが発生しました。お手数ですが、詳細はPantriiサポートまでお問い合わせください。';
  }
};

export const VOUCHERIFY_API_ERROR_CODE_MAP = {
  ALREADY_ROLLED_BACK: 'voucherify/already_rolled_back',
  CUSTOMER_RULES_VIOLATED: 'voucherify/customer_rules_violated',
  DUPLICATE_RESOURCE_KEY: 'voucherify/duplicate_resource_key',
  GIFT_AMOUNT_EXCEEDED: 'voucherify/gift_amount_exceeded',
  INVALID_ADD_BALANCE_PARAMS: 'voucherify/invalid_add_balance_params',
  INVALID_AMOUNT: 'voucherify/invalid_amount',
  INVALID_CAMPAIGN_PARAMS: 'voucherify/invalid_campaign_params',
  INVALID_CODE_CONFIG: 'voucherify/invalid_code_config',
  INVALID_CUSTOMER: 'voucherify/invalid_customer',
  INVALID_EXPORT_PARAMS: 'voucherify/invalid_export_params',
  INVALID_GIFT: 'voucherify/invalid_gift',
  INVALID_ORDER: 'voucherify/invalid_order',
  INVALID_PAYLOAD: 'voucherify/invalid_payload',
  INVALID_PRODUCT: 'voucherify/invalid_product',
  INVALID_PUBLISH_PARAMS: 'voucherify/invalid_publish_params',
  INVALID_QUERY_PARAMS: 'voucherify/invalid_query_params',
  INVALID_ROLLBACK_PARAMS: 'voucherify/invalid_rollback_params',
  INVALID_SKU: 'voucherify/invalid_sku',
  INVALID_VALIDATION_RULES: 'voucherify/invalid_validation_rules',
  INVALID_VOUCHER: 'voucherify/invalid_voucher',
  LOYALTY_CARD_POINTS_EXCEEDED: 'voucherify/loyalty_card_points_exceeded',
  MISSING_AMOUNT: 'voucherify/missing_amount',
  MISSING_CUSTOMER: 'voucherify/missing_customer',
  MISSING_ORDER: 'voucherify/missing_order',
  MISSING_ORDER_ITEMS: 'voucherify/missing_order_items',
  MISSING_ORDER_ITEMS_AMOUNT: 'voucherify/missing_order_items_amount',
  MISSING_REWARD: 'voucherify/missing_reward',
  NO_VOUCHER_SUITABLE_FOR_PUBLICATION:
    'voucherify/no_voucher_suitable_for_publication',
  NOT_FOUND: 'voucherify/not_found',
  ORDER_RULES_VIOLATED: 'voucherify/order_rules_violated',
  PROMOTION_INACTIVE: 'voucherify/promotion_inactive',
  PROMOTION_NOT_ACTIVE_NOW: 'voucherify/promotion_not_active_now',
  QUANTITY_EXCEEDED: 'voucherify/quantity_exceeded',
  REFERRER_NOT_PERMITTED_TO_REDEEM:
    'voucherify/referrer_not_permitted_to_redeem',
  RESOURCE_NOT_FOUND: 'voucherify/resource_not_found',
  VOUCHER_DISABLED: 'voucherify/voucher_disabled',
  VOUCHER_EXPIRED: 'voucherify/voucher_expired',
  VOUCHER_NOT_ACTIVE: 'voucherify/voucher_not_active',
  VOUCHER_NOT_ACTIVE_NOW: 'voucherify/voucher_not_active_now',
};
