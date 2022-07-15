import { StripeError } from '@stripe/stripe-js';
import { ErrorResponse } from 'type/response/errorResponse';

export const stripeErrorHandler = (code: StripeError['code']) => {
  switch (code) {
    case STRIPE_ERROR_CODE_MAP.CARD_DECLINED:
      return 'カードが拒否されました。別の支払い方法を選択するか、ご利用のカード会社にお問い合わせください。';
    case STRIPE_ERROR_CODE_MAP.CARD_DECLINED_CARD_NOT_SUPPORTED:
      return 'お客様のカードはご利用いただけません。別の支払い方法を選択するか、ご利用のカード会社にお問い合わせください。';
    case STRIPE_ERROR_CODE_MAP.CARD_NUMBER_IN_NAME_FIELD:
      return '名前フィールドにカード番号が含まれていないことを確認してください。';
    case STRIPE_ERROR_CODE_MAP.CARD_NUMBER_IN_POSTAL_CODE_FIELD:
      return '郵便番号フィールドにカード番号が入力されていないことを確認してください。';
    case STRIPE_ERROR_CODE_MAP.CUSTOMER_CANCELED_AUTHENTICATION:
      return 'この取引を完了するには、認証する必要があります。';
    case STRIPE_ERROR_CODE_MAP.CVC_RECOLLECTION_REQUIRED:
      return 'セキュリティー保持のため、お客様のクレジットカードのセキュリティーコードをもう一度入力してください。';
    case STRIPE_ERROR_CODE_MAP.EMAIL_INVALID:
      return 'メールアドレスが無効です。';
    case STRIPE_ERROR_CODE_MAP.EMPTY_PHONE_NUMBER:
      return '携帯電話番号を入力してください。';
    case STRIPE_ERROR_CODE_MAP.EXPIRED_CARD:
      return 'カードの有効期限が切れています。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_ADDRESS:
      return 'フィールドが未入力です。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_AU_BANK_ACCOUNT_BSB:
      return '入力した BSB コードに不備があります。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_AU_BANK_ACCOUNT_NUMBER:
      return '入力した口座番号に不備があります。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_BOLETO_TAX_ID:
      return 'CPF または CNPJ の入力に不備があります。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_BOLETO_TAX_ID_CNPJ_ONLY:
      return 'CNPJ の入力に不備があります。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_CARD:
      return 'カード情報を入力してください。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_CARD_NAME:
      return 'カードに記載された名前を入力してください。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_CVC:
      return 'カードのセキュリティコード(CVC番号)に不備があります。コードが正しく入力されているかご確認ください。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_EMAIL:
      return 'メールアドレスの入力に不備があります。正しく入力されているかご確認ください。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_EXPIRY:
      return 'カードの有効期限の日付に不備があります。有効期限が正しく入力されているかご確認ください。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_IBAN:
      return '入力した IBAN コードに不備があります。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_NAME:
      return '氏名を入力してください。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_NUMBER:
      return 'カード番号に不備があります。番号が正しく入力されているかご確認ください。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_NZ_BANK_ACCOUNT_ACCOUNT_NUMBER:
      return '不備あり。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_NZ_BANK_ACCOUNT_BANK_CODE:
      return '不備あり。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_NZ_BANK_ACCOUNT_BRANCH_CODE:
      return '不備あり。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_NZ_BANK_ACCOUNT_SUFFIX:
      return '不備あり。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_PAYMENT_DETAILS:
      return '支払いの詳細を入力してください。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_PHONE_NUMBER:
      return '携帯電話番号に不備があります。';
    case STRIPE_ERROR_CODE_MAP.INCOMPLETE_ZIP:
      return '郵便番号の入力に不備があります。';
    case STRIPE_ERROR_CODE_MAP.INCORRECT_CVC:
      return 'カードのセキュリティコードが間違っています。';
    case STRIPE_ERROR_CODE_MAP.INCORRECT_NUMBER:
      return 'カード番号が間違っています。';
    case STRIPE_ERROR_CODE_MAP.INCORRECT_ZIP:
      return 'カード番号と郵便番号が一致しません。';
    case STRIPE_ERROR_CODE_MAP.INSTANT_VERIFICATION:
      return '即時確認の使用中に予期しないエラーが発生しました。';
    case STRIPE_ERROR_CODE_MAP.INVALID_AU_BANK_ACCOUNT_BSB:
      return '入力した BSB コードが無効です。';
    case STRIPE_ERROR_CODE_MAP.INVALID_AU_BANK_ACCOUNT_BSB_LIVEMODE:
      return '本番環境では BSB 番号 {number} は無効です。';
    case STRIPE_ERROR_CODE_MAP.INVALID_AU_BANK_ACCOUNT_BSB_TESTMODE:
      return 'テスト環境ではご自身の BSB 番号は無効になります。000-000 を使用してください。';
    case STRIPE_ERROR_CODE_MAP.INVALID_AU_BANK_ACCOUNT_NUMBER_TESTMODE:
      return '入力した口座番号はテスト環境では有効ではありません。';
    case STRIPE_ERROR_CODE_MAP.INVALID_CVC:
      return 'カードのセキュリティコードが無効です。';
    case STRIPE_ERROR_CODE_MAP.INVALID_EXPIRY_MONTH:
      return 'カードの有効期限の日付が無効です。';
    case STRIPE_ERROR_CODE_MAP.INVALID_EXPIRY_MONTH_PAST:
      return 'カードの有効期限の日付が過ぎています。';
    case STRIPE_ERROR_CODE_MAP.INVALID_EXPIRY_YEAR:
      return 'カードの有効期限の日付が無効です。';
    case STRIPE_ERROR_CODE_MAP.INVALID_EXPIRY_YEAR_PAST:
      return 'カードの有効期限が過ぎています。';
    case STRIPE_ERROR_CODE_MAP.INVALID_IBAN:
      return '入力した IBAN コードが無効です。';
    case STRIPE_ERROR_CODE_MAP.INVALID_IBAN_COUNTRY_CODE:
      return '入力した IBAN コードが無効です。「{code}」は有効な国コードではありません。';
    case STRIPE_ERROR_CODE_MAP.INVALID_IBAN_START:
      return 'IBANコードの先頭には2文字の国コードを入力してください。';
    case STRIPE_ERROR_CODE_MAP.INVALID_NUMBER:
      return 'カード番号が無効です。';
    case STRIPE_ERROR_CODE_MAP.INVALID_NZ_BANK_ACCOUNT_NUMBER:
      return '無効';
    case STRIPE_ERROR_CODE_MAP.INVALID_NZ_BANK_ACCOUNT_NUMBER_BANK_CODE:
      return '無効';
    case STRIPE_ERROR_CODE_MAP.INVALID_NZ_BANK_ACCOUNT_NUMBER_BRANCH_CODE:
      return '無効';
    case STRIPE_ERROR_CODE_MAP.NZ_BANK_ACCOUNT_INVALID_ACCOUNT_NUMBER_LENGTH:
      return '銀行口座番号の入力に不備があります。';
    case STRIPE_ERROR_CODE_MAP.PAYMENT_INTENT_AUTHENTICATION_FAILURE:
      return '支払い方法を認証できません。別の支払い方法を選択して、もう一度お試しください。';
    case STRIPE_ERROR_CODE_MAP.PAYMENT_INTENT_UNEXPECTED_STATE:
      return '処理中にエラーが発生しました。';
    case STRIPE_ERROR_CODE_MAP.PAYMENT_METHOD_INVALID_PARAMETER:
      return '入力された支払いの詳細は無効です。';
    case STRIPE_ERROR_CODE_MAP.PAYMENT_METHOD_MICRODEPOSIT_VERIFICATION_AMOUNTS_INVALID:
      return '2 つの異なる少額入金の金額を指定する必要があります。';
    case STRIPE_ERROR_CODE_MAP.PAYMENT_METHOD_MICRODEPOSIT_VERIFICATION_AMOUNTS_MISMATCH:
      return '指定された金額が、銀行口座に送金された金額と一致しません。';
    case STRIPE_ERROR_CODE_MAP.PAYMENT_METHOD_MICRODEPOSIT_VERIFICATION_ATTEMPTS_EXCEEDED:
      return '許可されている確認試行回数を超えました。';
    case STRIPE_ERROR_CODE_MAP.POSTAL_CODE_RECOLLECTION_REQUIRED:
      return 'カード番号と郵便番号が一致しません。';
    case STRIPE_ERROR_CODE_MAP.PROCESS_ERROR_INTRANSIENT:
      return 'カードの処理中にエラーが発生しました。';
    case STRIPE_ERROR_CODE_MAP.PROCESSING_ERROR:
      return 'カードの処理中にエラーが発生しました。しばらくしてからもう一度お試しください。';
    case STRIPE_ERROR_CODE_MAP.PROCESSING_ERROR_INTRANSIENT:
      return 'エラーが発生しました。後でやり直してください。';
    case STRIPE_ERROR_CODE_MAP.SETUP_INTENT_AUTHENTICATION_FAILURE:
      return '支払い方法を認証できません。別の支払い方法を選択して、もう一度お試しください。';
    case STRIPE_ERROR_CODE_MAP.SETUP_INTENT_UNEXPECTED_STATE:
      return '処理中にエラーが発生しました。';
    case STRIPE_ERROR_CODE_MAP.UNEXPECTED:
      return '予期せぬエラーが発生しました。';
    default:
      return '予期せぬエラーが発生しました。お手数ですが、詳細はPantriiサポートまでお問い合わせください。';
  }
};

export const STRIPE_ERROR_CODE_MAP = {
  CARD_DECLINED: 'card_declined',
  CARD_DECLINED_CARD_NOT_SUPPORTED: 'card_declined_card_not_supported',
  CARD_NUMBER_IN_NAME_FIELD: 'card_number_in_name_field',
  CARD_NUMBER_IN_POSTAL_CODE_FIELD: 'card_number_in_postal_code_field',
  CUSTOMER_CANCELED_AUTHENTICATION: 'customer_canceled_authentication',
  CVC_RECOLLECTION_REQUIRED: 'cvc_recollection_required',
  EMAIL_INVALID: 'email_invalid',
  EMPTY_PHONE_NUMBER: 'empty_phone_number',
  EXPIRED_CARD: 'expired_card',
  INCOMPLETE_ADDRESS: 'incomplete_address',
  INCOMPLETE_AU_BANK_ACCOUNT_BSB: 'incomplete_au_bank_account_bsb',
  INCOMPLETE_AU_BANK_ACCOUNT_NUMBER: 'incomplete_au_bank_account_number',
  INCOMPLETE_BOLETO_TAX_ID: 'incomplete_boleto_tax_id',
  INCOMPLETE_BOLETO_TAX_ID_CNPJ_ONLY: 'incomplete_boleto_tax_id_cnpj_only',
  INCOMPLETE_CARD: 'incomplete_card',
  INCOMPLETE_CARD_NAME: 'incomplete_card_name',
  INCOMPLETE_CVC: 'incomplete_cvc',
  INCOMPLETE_EMAIL: 'incomplete_email',
  INCOMPLETE_EXPIRY: 'incomplete_expiry',
  INCOMPLETE_IBAN: 'incomplete_iban',
  INCOMPLETE_NAME: 'incomplete_name',
  INCOMPLETE_NUMBER: 'incomplete_number',
  INCOMPLETE_NZ_BANK_ACCOUNT_ACCOUNT_NUMBER:
    'incomplete_nz_bank_account_account_number',
  INCOMPLETE_NZ_BANK_ACCOUNT_BANK_CODE: 'incomplete_nz_bank_account_bank_code',
  INCOMPLETE_NZ_BANK_ACCOUNT_BRANCH_CODE:
    'incomplete_nz_bank_account_branch_code',
  INCOMPLETE_NZ_BANK_ACCOUNT_SUFFIX: 'incomplete_nz_bank_account_suffix',
  INCOMPLETE_PAYMENT_DETAILS: 'incomplete_payment_details',
  INCOMPLETE_PHONE_NUMBER: 'incomplete_phone_number',
  INCOMPLETE_ZIP: 'incomplete_zip',
  INCORRECT_CVC: 'incorrect_cvc',
  INCORRECT_NUMBER: 'incorrect_number',
  INCORRECT_ZIP: 'incorrect_zip',
  INSTANT_VERIFICATION: 'instant_verification',
  INVALID_AU_BANK_ACCOUNT_BSB: 'invalid_au_bank_account_bsb',
  INVALID_AU_BANK_ACCOUNT_BSB_LIVEMODE: 'invalid_au_bank_account_bsb_livemode',
  INVALID_AU_BANK_ACCOUNT_BSB_TESTMODE: 'invalid_au_bank_account_bsb_testmode',
  INVALID_AU_BANK_ACCOUNT_NUMBER_TESTMODE:
    'invalid_au_bank_account_number_testmode',
  INVALID_CVC: 'invalid_cvc',
  INVALID_EXPIRY_MONTH: 'invalid_expiry_month',
  INVALID_EXPIRY_MONTH_PAST: 'invalid_expiry_month_past',
  INVALID_EXPIRY_YEAR: 'invalid_expiry_year',
  INVALID_EXPIRY_YEAR_PAST: 'invalid_expiry_year_past',
  INVALID_IBAN: 'invalid_iban',
  INVALID_IBAN_COUNTRY_CODE: 'invalid_iban_country_code',
  INVALID_IBAN_START: 'invalid_iban_start',
  INVALID_NUMBER: 'invalid_number',
  INVALID_NZ_BANK_ACCOUNT_NUMBER: 'invalid_nz_bank_account_number',
  INVALID_NZ_BANK_ACCOUNT_NUMBER_BANK_CODE:
    'invalid_nz_bank_account_number_bank_code',
  INVALID_NZ_BANK_ACCOUNT_NUMBER_BRANCH_CODE:
    'invalid_nz_bank_account_number_branch_code',
  NZ_BANK_ACCOUNT_INVALID_ACCOUNT_NUMBER_LENGTH:
    'nz_bank_account_invalid_account_number_length',
  PAYMENT_INTENT_AUTHENTICATION_FAILURE:
    'payment_intent_authentication_failure',
  PAYMENT_INTENT_UNEXPECTED_STATE: 'payment_intent_unexpected_state',
  PAYMENT_METHOD_INVALID_PARAMETER: 'payment_method_invalid_parameter',
  PAYMENT_METHOD_MICRODEPOSIT_VERIFICATION_AMOUNTS_INVALID:
    'payment_method_microdeposit_verification_amounts_invalid',
  PAYMENT_METHOD_MICRODEPOSIT_VERIFICATION_AMOUNTS_MISMATCH:
    'payment_method_microdeposit_verification_amounts_mismatch',
  PAYMENT_METHOD_MICRODEPOSIT_VERIFICATION_ATTEMPTS_EXCEEDED:
    'payment_method_microdeposit_verification_attempts_exceeded',
  POSTAL_CODE_RECOLLECTION_REQUIRED: 'postal_code_recollection_required',
  PROCESS_ERROR_INTRANSIENT: 'process_error_intransient',
  PROCESSING_ERROR: 'processing_error',
  PROCESSING_ERROR_INTRANSIENT: 'processing_error_intransient',
  SETUP_INTENT_AUTHENTICATION_FAILURE: 'setup_intent_authentication_failure',
  SETUP_INTENT_UNEXPECTED_STATE: 'setup_intent_unexpected_state',
  UNEXPECTED: 'unexpected',
};
