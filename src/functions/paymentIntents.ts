import { getStripeInstance } from '../config/stripeConfig';
import { PaymentIntentError, PaymentIntentIDInput, PaymentIntentInput, PaymentIntentResult, RetrievePaymentIntent, SetupPaymentIntent } from '../interfaces/paymentIntents.interface';

// Function to create a new Payment Intent on Stripe
export async function createPaymentIntent({ amount, currency, paymentMethod }: PaymentIntentInput): Promise<PaymentIntentResult | PaymentIntentError> {
    // Validate input data
    if (!amount || amount <= 0) {
        return { error: 'Invalid amount. The amount must be greater than 0.' };
    }

    if (!currency) {
        return { error: 'Please provide a valid currency code.' };
    }
    if (!paymentMethod?.id || typeof paymentMethod.id !== 'string') {
        return { error: 'Invalid payment method ID.' };
    }
    const stripeInstance = getStripeInstance();

    try {
        // Create the Payment Intent using the Stripe API
        const paymentIntent = await stripeInstance.paymentIntents.create({
            amount: amount,
            currency: currency,
            // payment_method: paymentMethod.id,          
            // automatic_payment_methods: { enabled: true },
            payment_method: "pm_card_visa",
            // return_url: 'https://yourwebsite.com/thank-you', // Replace this with your actual return URL
            confirm: true,
            capture_method: 'automatic_async',

        });
        // Return the Payment Intent information along with a success message
        return { message: 'Payment Intent created successfully.', clientSecret: paymentIntent.client_secret };
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
