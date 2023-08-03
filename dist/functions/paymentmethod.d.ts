import Stripe from 'stripe';
import { AttachPaymentMethod, DetachPaymentMethod, PaymentMethodError, PaymentMethodResult } from '../interfaces/paymentmethod.interface';
export declare function createPaymentMethod(params: Stripe.PaymentMethodCreateParams): Promise<PaymentMethodResult | PaymentMethodError>;
export declare function attachPaymentMethodToCustomer({ paymentMethodId, customerId }: AttachPaymentMethod): Promise<PaymentMethodResult | PaymentMethodError>;
export declare function detachPaymentMethodFromCustomer({ paymentMethodId }: DetachPaymentMethod): Promise<PaymentMethodResult | PaymentMethodError>;
