import Stripe from 'stripe';
export interface PaymentMethodResult {
    message: string;
    paymentMethod?: Stripe.PaymentMethod;
}
export interface AttachPaymentMethod {
    paymentMethodId: string;
    customerId: string;
}
export interface DetachPaymentMethod {
    paymentMethodId: string;
}
export interface PaymentMethodError {
    error: string;
}
