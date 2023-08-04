import Stripe from 'stripe';
// Interface for Payment Intent Input

export interface PaymentIntentInput {
    amount: number;
    currency: string;
    payment_method_types?: Array<TemplateStringsArray>;
    paymentMethod: PaymentMethod
}
export interface PaymentIntentIDInput {
    paymentIntentId: string;
}

// Interface for Payment Intent Result
export interface PaymentIntentResult {
    message: string;
    clientSecret?: string | null;
    paymentIntent?: Stripe.PaymentIntent;
}

// Interface for Payment Intent Error
export interface PaymentIntentError {
    error: string;
}

export interface PaymentMethod {
    id?: string | null;
    type?: string; // The type of the payment method (e.g., 'card', 'bank_account', etc.)
    cardBrand?: string; // Only applicable if type is 'card'. The brand of the card (e.g., 'Visa', 'MasterCard', etc.)
    cardLast4?: string; // Only applicable if type is 'card'. The last 4 digits of the card number.
    bankName?: string; // Only applicable if type is 'bank_account'. The name of the bank.
    bankLast4?: string; // Only applicable if type is 'bank_account'. The last 4 digits of the bank account number.
    // Add more properties as needed for other payment methods.
}
