import Stripe from 'stripe';
import { getStripeInstance } from '../config/stripeConfig';
import { AttachPaymentMethod, DetachPaymentMethod, PaymentMethodError, PaymentMethodResult } from '../interfaces/paymentmethod.interface';

// Function to create a Payment Method
export async function createPaymentMethod(params: Stripe.PaymentMethodCreateParams): Promise<PaymentMethodResult | PaymentMethodError> {
    const stripeInstance = getStripeInstance();

    try {
        // Create the Payment Method using the Stripe API
        const paymentMethod = await stripeInstance.paymentMethods.create(params);

        // Return the Payment Method information along with a success message
        return { message: 'Payment Method created successfully.', paymentMethod: paymentMethod };
    } catch (error) {
        // If there is an error during the creation, return an error message
        return { error: 'Failed to create payment method.' + error };
    }
}

// Function to attach a Payment Method to a Customer
export async function attachPaymentMethodToCustomer(
    { paymentMethodId,
        customerId }: AttachPaymentMethod
): Promise<PaymentMethodResult | PaymentMethodError> {
    const stripeInstance = getStripeInstance();

    try {
        // Attach the Payment Method to the specified Customer using the Stripe API
        const paymentMethod = await stripeInstance.paymentMethods.attach(paymentMethodId, {
            customer: customerId,
        });

        // Return the Payment Method information along with a success message
        return { message: 'Payment Method attached successfully.', paymentMethod: paymentMethod };
    } catch (error) {
        // If there is an error during the attachment, return an error message
        return { error: 'Failed to attach payment method to customer.' + error };
    }
}

// Function to detach a Payment Method from a Customer
export async function detachPaymentMethodFromCustomer(
    { paymentMethodId }: DetachPaymentMethod
): Promise<PaymentMethodResult | PaymentMethodError> {
    const stripeInstance = getStripeInstance();

    try {
        // Detach the Payment Method from the Customer using the Stripe API
        const paymentMethod = await stripeInstance.paymentMethods.detach(paymentMethodId);

        // Return the Payment Method information along with a success message
        return { message: 'Payment Method detached successfully.', paymentMethod: paymentMethod };
    } catch (error) {
        // If there is an error during the detachment, return an error message
        return { error: 'Failed to detach payment method from customer.' + error };
    }
}
