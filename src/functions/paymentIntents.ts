import { getStripeInstance } from '../config/stripeConfig';
import { PaymentIntentError, PaymentIntentIDInput, PaymentIntentResult, RetrievePaymentIntent, SetupPaymentIntent, CreatePaymentIntentRequest } from '../interfaces/paymentIntents.interface';
import Stripe from 'stripe';

// Function to create a new Payment Intent on Stripe
export async function createPaymentIntent(param: CreatePaymentIntentRequest): Promise<PaymentIntentResult | PaymentIntentError> {
    const { currency, paymentMethodType, paymentMethodOptions, customerId } = param;

    const params: Stripe.PaymentIntentCreateParams = {
        amount: 5999,
        currency,
        payment_method_types: paymentMethodType === 'link' ? ['link', 'card'] : [paymentMethodType],
    };

    if (paymentMethodType === 'acss_debit') {
        params.payment_method_options = {
            acss_debit: {
                mandate_options: {
                    payment_schedule: 'sporadic',
                    transaction_type: 'personal',
                },
            },
        };
    } else if (paymentMethodType === 'customer_balance') {
        params.payment_method_data = {
            type: 'customer_balance',
        };
        params.confirm = true;

        if (!customerId) {
            return { error: 'customerId is required for paymentMethodType "customer_balance"' }
        }

        params.customer = customerId;
    }

    if (paymentMethodOptions) {
        params.payment_method_options = paymentMethodOptions;
    }

    const stripeInstance = getStripeInstance();

    try {
        const paymentIntent = await stripeInstance.paymentIntents.create(params);
        // Return the Payment Intent information along with a success message
        if (paymentIntent.status == "requires_payment_method") {
            return { message: 'Payment Intent required payment method .', paymentIntent: paymentIntent };
        }
        return { message: 'Payment Intent created successfully.', paymentIntent: paymentIntent };
    } catch (error) {
        // If there is an error during the creation, return an error message
        return { error: 'Failed to create Payment Intent.' + error };
    }
}
// Function to retrieve a Payment Intent from Stripe
export async function retrievePaymentIntent({ paymentIntentId }: PaymentIntentIDInput): Promise<PaymentIntentResult | PaymentIntentError> {
    // Validate input data
    if (!paymentIntentId) {
        return { error: ' Please provide a valid Payment Intent ID.' };
    }

    const stripeInstance = getStripeInstance();

    try {
        // Retrieve the Payment Intent using the provided Payment Intent ID
        const paymentIntent = await stripeInstance.paymentIntents.retrieve(paymentIntentId);

        // Return the Payment Intent information along with a success message
        return { message: 'Payment Intent retrieved successfully.', paymentIntent };
    } catch (error) {
        // If there is an error during the retrieval, return an error message
        return { error: 'Failed to retrieve Payment Intent.' + error };
    }
}
// Function to confirm a Payment Intent on Stripe
export async function confirmPaymentIntent({ paymentIntentId }: PaymentIntentIDInput): Promise<PaymentIntentResult | PaymentIntentError> {
    // Validate input data
    if (!paymentIntentId) {
        return { error: ' Please provide a valid Payment Intent ID.' };
    }

    const stripeInstance = getStripeInstance();

    try {
        // Confirm the Payment Intent using the provided Payment Intent ID
        const paymentIntent = await stripeInstance.paymentIntents.confirm(paymentIntentId);

        // Return the Payment Intent information along with a success message
        return { message: 'Payment Intent confirmed successfully.', paymentIntent };
    } catch (error) {
        // If there is an error during the confirmation, return an error message
        return { error: 'Failed to confirm Payment Intent.' + error };
    }
}

// Function to capture a Payment Intent on Stripe
export async function capturePaymentIntent({ paymentIntentId }: PaymentIntentIDInput): Promise<PaymentIntentResult | PaymentIntentError> {
    // Validate input data
    if (!paymentIntentId) {
        return { error: ' Please provide a valid Payment Intent ID.' };
    }

    const stripeInstance = getStripeInstance();

    try {
        // Capture the Payment Intent using the provided Payment Intent ID
        const paymentIntent = await stripeInstance.paymentIntents.capture(paymentIntentId);

        // Return the Payment Intent information along with a success message
        return { message: 'Payment Intent captured successfully.', paymentIntent };
    } catch (error) {
        // If there is an error during the capture, return an error message
        return { error: 'Failed to capture Payment Intent.' + error };
    }
}

// Function to cancel a Payment Intent on Stripe
export async function cancelPaymentIntent({ paymentIntentId }: PaymentIntentIDInput): Promise<PaymentIntentResult | PaymentIntentError> {
    // Validate input data
    if (!paymentIntentId) {
        return { error: ' Please provide a valid Payment Intent ID.' };
    }

    const stripeInstance = getStripeInstance();

    try {
        const paymentIntentdata = await stripeInstance.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntentdata.status == "succeeded") {
            return { error: 'You can not cancel this payment beacuase your payment is success' };
        }
        // Cancel the Payment Intent using the provided Payment Intent ID
        const paymentIntent = await stripeInstance.paymentIntents.cancel(paymentIntentId);
        // Return the Payment Intent information along with a success message
        return { message: 'Payment Intent canceled successfully.', paymentIntent };
    } catch (error) {
        // If there is an error during the cancellation, return an error message
        return { error: 'Failed to cancel Payment Intent.' + error };
    }
}

// Function to setup a new Payment Intent on Stripe
export async function setupPaymentIntent({ usage, customerId }: SetupPaymentIntent): Promise<PaymentIntentResult | PaymentIntentError> {
    // Validate input data
    type Usage = 'off_session' | 'on_session';
    if (!customerId || !usage) {
        return { error: 'Invalid input data. customerId and usage are required fields.' };
    }

    const validUsages: Usage[] = ['off_session', 'on_session'];
    if (!validUsages.includes(usage as Usage)) {
        return { error: 'Invalid usage. Usage must be either "off_session" or "on_session".' };
    }

    const stripeInstance = getStripeInstance();

    try {
        // Create the Payment Intent using the Stripe API
        const setupIntent = await stripeInstance.setupIntents.create({
            customer: customerId,
            usage: usage as Usage
        });

        // Return the Payment Intent information along with a success message
        return { message: 'Payment Intent created successfully.', setupIntent: setupIntent };
    } catch (error) {
        // If there is an error during the creation, return an error message
        return { error: 'Failed to create Payment Intent: ' + error };
    }
}

// Function to retrieve a Payment Intent from Stripe
export async function retrieveSetupPaymentIntent({ SetupInentId }: RetrievePaymentIntent): Promise<PaymentIntentResult | PaymentIntentError> {
    // Validate input data
    if (!SetupInentId) {
        return { error: 'SetupIntentId is required.' };
    }

    const stripeInstance = getStripeInstance();
    try {
        // Retrieve the Payment Intent using the Stripe API
        const setupIntent = await stripeInstance.setupIntents.retrieve(SetupInentId);

        // Return the Payment Intent information along with a success message
        return { message: 'Payment Intent retrieved successfully.', setupIntent: setupIntent };
    } catch (error) {
        // If there is an error during the retrieval, return an error message
        return { error: 'Failed to retrieve Payment Intent: ' + error };
    }
}

// Function to confirm a Setup Payment Intent on Stripe
export async function confirmSetupPaymentIntent({ SetupInentId }: RetrievePaymentIntent): Promise<PaymentIntentResult | PaymentIntentError> {
    // Validate input data
    if (!SetupInentId) {
        return { error: 'Please provide a valid Setup Payment Intent ID.' };
    }

    const stripeInstance = getStripeInstance();

    try {
        // Confirm the Payment Intent using the provided Setup Payment Intent ID
        const paymentIntent = await stripeInstance.paymentIntents.confirm(SetupInentId);

        // Return the Payment Intent information along with a success message
        return { message: 'Setup Payment Intent confirmed successfully.', paymentIntent };
    } catch (error) {
        // If there is an error during the confirmation, return an error message
        return { error: 'Failed to confirm Setup Payment Intent: ' + error };
    }
}
