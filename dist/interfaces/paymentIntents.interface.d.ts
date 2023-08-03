import Stripe from 'stripe';
export interface PaymentIntentInput {
    amount: number;
    currency: string;
    payment_method_types?: Array<TemplateStringsArray>;
    paymentMethod: PaymentMethod;
}
export interface PaymentIntentIDInput {
    paymentIntentId: string;
}
export interface PaymentIntentResult {
    message: string;
    clientSecret?: string | null;
    paymentIntent?: Stripe.PaymentIntent;
}
export interface PaymentIntentError {
    error: string;
}
export interface PaymentMethod {
    id?: string | null;
    type?: string;
    cardBrand?: string;
    cardLast4?: string;
    bankName?: string;
    bankLast4?: string;
}
