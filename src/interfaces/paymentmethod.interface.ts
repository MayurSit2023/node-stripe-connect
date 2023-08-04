import Stripe from 'stripe';

// Interface for Payment Method Result
export interface PaymentMethodResult {
    message: string; // A message indicating the status of the operation (e.g., success message)
    paymentMethod?: Stripe.PaymentMethod; // The Payment Method object returned by the Stripe API (optional)
    paymentMethodList?: Stripe.PaymentMethod[]; // The Payment Method object returned by the Stripe API (optional)
}

// Interface for attaching a Payment Method to a Customer
export interface AttachPaymentMethod {
    paymentMethodId: string; // The ID of the Payment Method to be attached
    customerId: string; // The ID of the Customer to which the Payment Method should be attached
}

// Interface for detaching a Payment Method from a Customer
export interface DetachPaymentMethod {
    paymentMethodId: string; // The ID of the Payment Method to be detached
}
export interface ListPaymentMethod {
    customerId: string; // The ID of the Payment Method to be detached
}

// Interface for Payment Method Error
export interface PaymentMethodError {
    error: string; // An error message describing the reason for failure
}
