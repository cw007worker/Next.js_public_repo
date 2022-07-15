import { ErrorResponse } from 'type/response/errorResponse';

export const stripeApiErrorHandler = (code: ErrorResponse['code']) => {
  switch (code) {
    case STRIPE_API_ERROR_CODE_MAP.ACCOUNT_INVALID:
      return 'アカウントが無効になっています。詳細はPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.CARD_DECLINE_RATE_LIMIT_EXCEEDED:
      return 'カードが拒否されました。別の支払い方法を選択するか、ご利用のカード会社にお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.CARD_DECLINED:
      return 'カードが拒否されました。別の支払い方法を選択するか、ご利用のカード会社にお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.CHARGE_ALREADY_CAPTURED:
      return '支払いは既に受け付けられています。詳細はPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.CHARGE_ALREADY_REFUNDED:
      return '払い戻しは既に受け付けられています。詳細はPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.COUPON_EXPIRED:
      return 'サブスクリプションに適用されたクーポンは期限切れになっています。詳細はPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.CUSTOMER_MAX_PAYMENT_METHODS:
      return '保存可能な支払手段が上限に達しました。詳細はPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.CUSTOMER_MAX_SUBSCRIPTIONS:
      return '契約可能なサブスクリプションが上限に達しました。詳細はPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.DEBIT_NOT_AUTHORIZED:
      return 'このお支払いは銀行に承認されませんでした。';
    case STRIPE_API_ERROR_CODE_MAP.EXPIRED_CARD:
      return 'カードの有効期限が切れています。有効期限が正しく入力されているか確認するか、別のお支払い手段をご利用ください。';
    case STRIPE_API_ERROR_CODE_MAP.IDEMPOTENCY_KEY_IN_USE:
      return 'カードのセキュリティコード(CVC番号)に誤りがあります。コードが正しく入力されているか確認するか、別のお支払い手段をご利用ください。';
    case STRIPE_API_ERROR_CODE_MAP.INCORRECT_CVC:
      return 'カード番号に誤りがあります。カード番号が正しく入力されているか確認するか、別のお支払い手段をご利用ください。';
    case STRIPE_API_ERROR_CODE_MAP.INCORRECT_NUMBER:
      return 'カードの有効期限が切れています。有効期限が正しく入力されているか確認するか、別のお支払い手段をご利用ください。';
    case STRIPE_API_ERROR_CODE_MAP.INSUFFICIENT_FUNDS:
      return 'お客様の口座は、この支払をカバーするのに十分な資金を持っていません。';
    case STRIPE_API_ERROR_CODE_MAP.INTENT_INVALID_STATE:
      return 'お支払いを続行することができません。詳細はPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.INTENT_VERIFICATION_METHOD_MISSING:
      return 'お支払いを続行することができません。詳細はPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.INVALID_CARD_TYPE:
      return '外部口座として提供されたカードは、支払いに対応していません。代わりにプリペイド式でないデビットカードをご用意ください。';
    case STRIPE_API_ERROR_CODE_MAP.INVALID_CHARACTERS:
      return '提供された値には、フォームでサポートされていない文字が含まれています。';
    case STRIPE_API_ERROR_CODE_MAP.INVALID_CVC:
      return 'カードのセキュリティコード(CVC番号)が無効です。コードが正しく入力されているか確認するか、別のお支払い手段をご利用ください。';
    case STRIPE_API_ERROR_CODE_MAP.INVALID_EXPIRY_MONTH:
      return 'カードの有効月が無効です。有効月が正しく入力されているか確認するか、別のお支払い手段をご利用ください。';
    case STRIPE_API_ERROR_CODE_MAP.INVALID_EXPIRY_YEAR:
      return 'カードの有効年が無効です。有効年が正しく入力されているか確認するか、別のお支払い手段をご利用ください。';
    case STRIPE_API_ERROR_CODE_MAP.INVALID_NUMBER:
      return 'カード番号が無効です。カード番号が正しく入力されているか確認するか、別のお支払い手段をご利用ください。';
    case STRIPE_API_ERROR_CODE_MAP.NO_ACCOUNT:
      return '銀行口座が見つかりませんでした。';
    case STRIPE_API_ERROR_CODE_MAP.PAYMENT_METHOD_BANK_ACCOUNT_ALREADY_VERIFIED:
      return 'この銀行口座はすでに認証されています。';
    case STRIPE_API_ERROR_CODE_MAP.PAYMENT_METHOD_BANK_ACCOUNT_BLOCKED:
      return 'この銀行口座は過去に認証に失敗しており、使用することができません。この銀行口座の利用を希望される場合は、Pantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.PAYMENT_METHOD_MICRODEPOSIT_VERIFICATION_AMOUNTS_MISMATCH:
      return '認証の試行回数を超えています。';
    case STRIPE_API_ERROR_CODE_MAP.PAYMENT_METHOD_MICRODEPOSIT_VERIFICATION_ATTEMPTS_EXCEEDED:
      return '入力された認証コードが銀行口座に送信されたコードと一致しません。';
    case STRIPE_API_ERROR_CODE_MAP.PAYMENT_METHOD_MICRODEPOSIT_VERIFICATION_DESCRIPTOR_CODE_MISMATCH:
      return '支払い方法は、必要な期間内にマイクロデポジットで検証される必要があります。';
    case STRIPE_API_ERROR_CODE_MAP.PAYMENT_METHOD_MICRODEPOSIT_VERIFICATION_TIMEOUT:
      return 'タイムアウトにより支払いが失敗しました。詳細はPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.PAYMENT_METHOD_PROVIDER_DECLINE:
      return '発行者または顧客によって決済が拒否されました。';
    case STRIPE_API_ERROR_CODE_MAP.PAYMENT_METHOD_PROVIDER_TIMEOUT:
      return '使用されている支払方法が有効化されていないため、操作を実行できません。詳細はPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.PAYMENT_METHOD_UNACTIVATED:
      return '支払いが予期せぬエラーで失敗しました。詳細はPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.PAYMENT_METHOD_UNEXPECTED_STATE:
      return 'ご利用のお支払い手段はサポート外です。詳細はPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.PAYOUTS_NOT_ALLOWED:
      return 'ペイアウトは無効です。';
    case STRIPE_API_ERROR_CODE_MAP.PROCESSING_ERROR:
      return 'カード処理中にエラーが発生しました。時間を空けてから再試行するか、別のお支払い手段をご利用ください。';
    case STRIPE_API_ERROR_CODE_MAP.RATE_LIMIT:
      return 'リクエスト数が増加しているためエラーが発生しました。暫く時間を空けてから再度お試しください。';
    case STRIPE_API_ERROR_CODE_MAP.REFER_TO_CUSTOMER:
      return '銀行への支払いが停止されています。';
    case STRIPE_API_ERROR_CODE_MAP.RESOURCE_ALREADY_EXISTS:
      return '指定されたデータは既に存在しています。詳細はPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.RESOURCE_MISSING:
      return '指定されたデータは無効です。詳細はPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.ROUTING_NUMBER_INVALID:
      return '入力された銀行振り込み番号が無効です。';
    case STRIPE_API_ERROR_CODE_MAP.SENSITIVE_DATA_ACCESS_EXPIRED:
      return 'この情報は、限られた時間しか利用できません。このエラーが表示された場合、期限が切れています。';
    case STRIPE_API_ERROR_CODE_MAP.SEPA_UNSUPPORTED_ACCOUNT:
      return 'お客様の口座はSEPA決済に対応していません。';
    case STRIPE_API_ERROR_CODE_MAP.TAX_ID_INVALID:
      return '税金計算に失敗しました。お手数ですがPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.TAXES_CALCULATION_FAILED:
      return '税金計算に失敗しました。お手数ですがPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.TOKEN_ALREADY_USED:
      return '提供されたトークンはすでに使用されています。心当たりがない場合は、お手数ですがPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.TOKEN_IN_USE:
      return '提供されたトークンは現在別のリクエストで使用されています。心当たりがない場合は、お手数ですがPantriiサポートまでお問い合わせください。';
    case STRIPE_API_ERROR_CODE_MAP.URL_INVALID:
      return '入力されたURLは無効です。';
    default:
      return '予期せぬエラーが発生しました。お手数ですが、詳細はPantriiサポートまでお問い合わせください。';
  }
};

export const STRIPE_API_ERROR_CODE_MAP = {
  ACCOUNT_COUNTRY_INVALID_ADDRESS: 'stripe/account_country_invalid_address',
  ACCOUNT_ERROR_COUNTRY_CHANGE_REQUIRES_ADDITIONAL_STEPS:
    'stripe/account_error_country_change_requires_additional_steps',
  ACCOUNT_INVALID: 'stripe/account_invalid',
  ACCOUNT_NUMBER_INVALID: 'stripe/account_number_invalid',
  ACSS_DEBIT_SESSION_INCOMPLETE: 'stripe/acss_debit_session_incomplete',
  ALIPAY_UPGRADE_REQUIRED: 'stripe/alipay_upgrade_required',
  AMOUNT_TOO_LARGE: 'stripe/amount_too_large',
  AMOUNT_TOO_SMALL: 'stripe/amount_too_small',
  API_KEY_EXPIRED: 'stripe/api_key_expired',
  AUTHENTICATION_REQUIRED: 'stripe/authentication_required',
  BALANCE_INSUFFICIENT: 'stripe/balance_insufficient',
  BANK_ACCOUNT_DECLINED: 'stripe/bank_account_declined',
  BANK_ACCOUNT_EXISTS: 'stripe/bank_account_exists',
  BANK_ACCOUNT_UNUSABLE: 'stripe/bank_account_unusable',
  BANK_ACCOUNT_UNVERIFIED: 'stripe/bank_account_unverified',
  BANK_ACCOUNT_VERIFICATION_FAILED: 'stripe/bank_account_verification_failed',
  BILLING_INVALID_MANDATE: 'stripe/billing_invalid_mandate',
  BITCOIN_UPGRADE_REQUIRED: 'stripe/bitcoin_upgrade_required',
  CARD_DECLINE_RATE_LIMIT_EXCEEDED: 'stripe/card_decline_rate_limit_exceeded',
  CARD_DECLINED: 'stripe/card_declined',
  CARDHOLDER_PHONE_NUMBER_REQUIRED: 'stripe/cardholder_phone_number_required',
  CHARGE_ALREADY_CAPTURED: 'stripe/charge_already_captured',
  CHARGE_ALREADY_REFUNDED: 'stripe/charge_already_refunded',
  CHARGE_DISPUTED: 'stripe/charge_disputed',
  CHARGE_EXCEEDS_SOURCE_LIMIT: 'stripe/charge_exceeds_source_limit',
  CHARGE_EXPIRED_FOR_CAPTURE: 'stripe/charge_expired_for_capture',
  CHARGE_INVALID_PARAMETER: 'stripe/charge_invalid_parameter',
  CLEARING_CODE_UNSUPPORTED: 'stripe/clearing_code_unsupported',
  COUNTRY_CODE_INVALID: 'stripe/country_code_invalid',
  COUNTRY_UNSUPPORTED: 'stripe/country_unsupported',
  COUPON_EXPIRED: 'stripe/coupon_expired',
  CUSTOMER_MAX_PAYMENT_METHODS: 'stripe/customer_max_payment_methods',
  CUSTOMER_MAX_SUBSCRIPTIONS: 'stripe/customer_max_subscriptions',
  DEBIT_NOT_AUTHORIZED: 'stripe/debit_not_authorized',
  EMAIL_INVALID: 'stripe/email_invalid',
  EXPIRED_CARD: 'stripe/expired_card',
  IDEMPOTENCY_KEY_IN_USE: 'stripe/idempotency_key_in_use',
  INCORRECT_ADDRESS: 'stripe/incorrect_address',
  INCORRECT_CVC: 'stripe/incorrect_cvc',
  INCORRECT_NUMBER: 'stripe/incorrect_number',
  INCORRECT_ZIP: 'stripe/incorrect_zip',
  INSTANT_PAYOUTS_UNSUPPORTED: 'stripe/instant_payouts_unsupported',
  INSUFFICIENT_FUNDS: 'stripe/insufficient_funds',
  INTENT_INVALID_STATE: 'stripe/intent_invalid_state',
  INTENT_VERIFICATION_METHOD_MISSING:
    'stripe/intent_verification_method_missing',
  INVALID_CARD_TYPE: 'stripe/invalid_card_type',
  INVALID_CHARACTERS: 'stripe/invalid_characters',
  INVALID_CHARGE_AMOUNT: 'stripe/invalid_charge_amount',
  INVALID_CVC: 'stripe/invalid_cvc',
  INVALID_EXPIRY_MONTH: 'stripe/invalid_expiry_month',
  INVALID_EXPIRY_YEAR: 'stripe/invalid_expiry_year',
  INVALID_NUMBER: 'stripe/invalid_number',
  INVALID_SOURCE_USAGE: 'stripe/invalid_source_usage',
  INVOICE_NO_CUSTOMER_LINE_ITEMS: 'stripe/invoice_no_customer_line_items',
  INVOICE_NO_PAYMENT_METHOD_TYPES: 'stripe/invoice_no_payment_method_types',
  INVOICE_NO_SUBSCRIPTION_LINE_ITEMS:
    'stripe/invoice_no_subscription_line_items',
  INVOICE_NOT_EDITABLE: 'stripe/invoice_not_editable',
  INVOICE_ON_BEHALF_OF_NOT_EDITABLE: 'stripe/invoice_on_behalf_of_not_editable',
  INVOICE_PAYMENT_INTENT_REQUIRES_ACTION:
    'stripe/invoice_payment_intent_requires_action',
  INVOICE_UPCOMING_NONE: 'stripe/invoice_upcoming_none',
  LIVEMODE_MISMATCH: 'stripe/livemode_mismatch',
  LOCK_TIMEOUT: 'stripe/lock_timeout',
  MISSING: 'stripe/missing',
  NO_ACCOUNT: 'stripe/no_account',
  NOT_ALLOWED_ON_STANDARD_ACCOUNT: 'stripe/not_allowed_on_standard_account',
  ORDER_CREATION_FAILED: 'stripe/order_creation_failed',
  ORDER_REQUIRED_SETTINGS: 'stripe/order_required_settings',
  ORDER_STATUS_INVALID: 'stripe/order_status_invalid',
  ORDER_UPSTREAM_TIMEOUT: 'stripe/order_upstream_timeout',
  OUT_OF_INVENTORY: 'stripe/out_of_inventory',
  PARAMETER_INVALID_EMPTY: 'stripe/parameter_invalid_empty',
  PARAMETER_INVALID_INTEGER: 'stripe/parameter_invalid_integer',
  PARAMETER_INVALID_STRING_BLANK: 'stripe/parameter_invalid_string_blank',
  PARAMETER_INVALID_STRING_EMPTY: 'stripe/parameter_invalid_string_empty',
  PARAMETER_MISSING: 'stripe/parameter_missing',
  PARAMETER_UNKNOWN: 'stripe/parameter_unknown',
  PARAMETERS_EXCLUSIVE: 'stripe/parameters_exclusive',
  PAYMENT_INTENT_ACTION_REQUIRED: 'stripe/payment_intent_action_required',
  PAYMENT_INTENT_AUTHENTICATION_FAILURE:
    'stripe/payment_intent_authentication_failure',
  PAYMENT_INTENT_INCOMPATIBLE_PAYMENT_METHOD:
    'stripe/payment_intent_incompatible_payment_method',
  PAYMENT_INTENT_INVALID_PARAMETER: 'stripe/payment_intent_invalid_parameter',
  PAYMENT_INTENT_MANDATE_INVALID: 'stripe/payment_intent_mandate_invalid',
  PAYMENT_INTENT_PAYMENT_ATTEMPT_EXPIRED:
    'stripe/payment_intent_payment_attempt_expired',
  PAYMENT_INTENT_PAYMENT_ATTEMPT_FAILED:
    'stripe/payment_intent_payment_attempt_failed',
  PAYMENT_INTENT_UNEXPECTED_STATE: 'stripe/payment_intent_unexpected_state',
  PAYMENT_METHOD_BANK_ACCOUNT_ALREADY_VERIFIED:
    'stripe/payment_method_bank_account_already_verified',
  PAYMENT_METHOD_BANK_ACCOUNT_BLOCKED:
    'stripe/payment_method_bank_account_blocked',
  PAYMENT_METHOD_BILLING_DETAILS_ADDRESS_MISSING:
    'stripe/payment_method_billing_details_address_missing',
  PAYMENT_METHOD_CURRENCY_MISMATCH: 'stripe/payment_method_currency_mismatch',
  PAYMENT_METHOD_INVALID_PARAMETER: 'stripe/payment_method_invalid_parameter',
  PAYMENT_METHOD_MICRODEPOSIT_FAILED:
    'stripe/payment_method_microdeposit_failed',
  PAYMENT_METHOD_MICRODEPOSIT_VERIFICATION_AMOUNTS_INVALID:
    'stripe/payment_method_microdeposit_verification_amounts_invalid',
  PAYMENT_METHOD_MICRODEPOSIT_VERIFICATION_AMOUNTS_MISMATCH:
    'stripe/payment_method_microdeposit_verification_amounts_mismatch',
  PAYMENT_METHOD_MICRODEPOSIT_VERIFICATION_ATTEMPTS_EXCEEDED:
    'stripe/payment_method_microdeposit_verification_attempts_exceeded',
  PAYMENT_METHOD_MICRODEPOSIT_VERIFICATION_DESCRIPTOR_CODE_MISMATCH:
    'stripe/payment_method_microdeposit_verification_descriptor_code_mismatch',
  PAYMENT_METHOD_MICRODEPOSIT_VERIFICATION_TIMEOUT:
    'stripe/payment_method_microdeposit_verification_timeout',
  PAYMENT_METHOD_PROVIDER_DECLINE: 'stripe/payment_method_provider_decline',
  PAYMENT_METHOD_PROVIDER_TIMEOUT: 'stripe/payment_method_provider_timeout',
  PAYMENT_METHOD_UNACTIVATED: 'stripe/payment_method_unactivated',
  PAYMENT_METHOD_UNEXPECTED_STATE: 'stripe/payment_method_unexpected_state',
  PAYMENT_METHOD_UNSUPPORTED_TYPE: 'stripe/payment_method_unsupported_type',
  PAYOUTS_NOT_ALLOWED: 'stripe/payouts_not_allowed',
  PLATFORM_ACCOUNT_REQUIRED: 'stripe/platform_account_required',
  PLATFORM_API_KEY_EXPIRED: 'stripe/platform_api_key_expired',
  POSTAL_CODE_INVALID: 'stripe/postal_code_invalid',
  PROCESSING_ERROR: 'stripe/processing_error',
  PRODUCT_INACTIVE: 'stripe/product_inactive',
  RATE_LIMIT: 'stripe/rate_limit',
  REFER_TO_CUSTOMER: 'stripe/refer_to_customer',
  RESOURCE_ALREADY_EXISTS: 'stripe/resource_already_exists',
  RESOURCE_MISSING: 'stripe/resource_missing',
  ROUTING_NUMBER_INVALID: 'stripe/routing_number_invalid',
  SECRET_KEY_REQUIRED: 'stripe/secret_key_required',
  SENSITIVE_DATA_ACCESS_EXPIRED: 'stripe/sensitive_data_access_expired',
  SEPA_UNSUPPORTED_ACCOUNT: 'stripe/sepa_unsupported_account',
  SETUP_ATTEMPT_FAILED: 'stripe/setup_attempt_failed',
  SETUP_INTENT_AUTHENTICATION_FAILURE:
    'stripe/setup_intent_authentication_failure',
  SETUP_INTENT_INVALID_PARAMETER: 'stripe/setup_intent_invalid_parameter',
  SETUP_INTENT_UNEXPECTED_STATE: 'stripe/setup_intent_unexpected_state',
  SHIPPING_CALCULATION_FAILED: 'stripe/shipping_calculation_failed',
  SKU_INACTIVE: 'stripe/sku_inactive',
  STATE_UNSUPPORTED: 'stripe/state_unsupported',
  TAX_ID_INVALID: 'stripe/tax_id_invalid',
  TAXES_CALCULATION_FAILED: 'stripe/taxes_calculation_failed',
  TERMINAL_LOCATION_COUNTRY_UNSUPPORTED:
    'stripe/terminal_location_country_unsupported',
  TESTMODE_CHARGES_ONLY: 'stripe/testmode_charges_only',
  TLS_VERSION_UNSUPPORTED: 'stripe/tls_version_unsupported',
  TOKEN_ALREADY_USED: 'stripe/token_already_used',
  TOKEN_IN_USE: 'stripe/token_in_use',
  TRANSFERS_NOT_ALLOWED: 'stripe/transfers_not_allowed',
  UPSTREAM_ORDER_CREATION_FAILED: 'stripe/upstream_order_creation_failed',
  URL_INVALID: 'stripe/url_invalid',
};
