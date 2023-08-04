import { PaymentIntentError, PaymentIntentIDInput, PaymentIntentInput, PaymentIntentResult, RetrievePaymentIntent, SetupPaymentIntent } from '../interfaces/paymentIntents.interface';
export declare function createPaymentIntent({ amount, currency, paymentMethod }: PaymentIntentInput): Promise<PaymentIntentResult | PaymentIntentError>;
export declare function retrievePaymentIntent({ paymentIntentId }: PaymentIntentIDInput): Promise<PaymentIntentResult | PaymentIntentError>;
export declare function confirmPaymentIntent({ paymentIntentId }: PaymentIntentIDInput): Promise<PaymentIntentResult | PaymentIntentError>;
export declare function capturePaymentIntent({ paymentIntentId }: PaymentIntentIDInput): Promise<PaymentIntentResult | PaymentIntentError>;
export declare function cancelPaymentIntent({ paymentIntentId }: PaymentIntentIDInput): Promise<PaymentIntentResult | PaymentIntentError>;
export declare function setupPaymentIntent({ usage, customerId }: SetupPaymentIntent): Promise<PaymentIntentResult | PaymentIntentError>;
export declare function retrieveSetupPaymentIntent({ SetupInentId }: RetrievePaymentIntent): Promise<PaymentIntentResult | PaymentIntentError>;
