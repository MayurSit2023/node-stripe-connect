import { getStripeInstance } from '../config/stripeConfig';

// Function to create a checkout session with Stripe

export async function createCheckoutSession(params: CheckoutSessionParams): Promise<CheckoutSessionSuccessResponse | CheckoutSessionErrorResponse> {
    const { successUrl, cancelUrl, priceId } = params;
    const stripeInstance = getStripeInstance();

    // Validate required parameters
    if (!successUrl || !cancelUrl || !priceId) {
        return { error: 'Invalid input. Missing required parameters.' };
    }

    try {
        // Use the Stripe instance to create a checkout session
        const session = await stripeInstance.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
        });

        // Return the URL of the created checkout session
        if (session && session.url) {
            return { message: 'Checkout session created successfully.', url: session.url };
        } else {
            return { error: 'Failed to retrieve the checkout session URL.' };
        }
    } catch (error) {
        // If an error occurs during the process, return an error object
        return { error: 'Failed to create checkout session.' };
    }
}

// Function to create a customer and then a checkout session with Stripe
export async function createCustomerCheckoutSession(params: CheckoutSessionParams): Promise<CheckoutSessionSuccessResponse | CheckoutSessionErrorResponse> {
    const { successUrl, cancelUrl, priceId, customerId } = params;
    const stripeInstance = getStripeInstance();

    // Validate required parameters
    if (!successUrl || !cancelUrl || !priceId || !customerId) {
        return { error: 'Invalid input. Missing required parameters.' };
    }

    try {
        let customer;
        if (customerId) {
            // If customerId is provided, retrieve the customer from Stripe
            customer = await stripeInstance.customers.retrieve(customerId);
        }

        // If the customer does not exist or customerId is not provided, create a new customer
        if (!customer) {
            customer = await stripeInstance.customers.create();
        }

        // Use the Stripe instance to create a checkout session with the customer's ID
        const session = await stripeInstance.checkout.sessions.create({
            customer: customer.id,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
        });

        // Return the URL of the created checkout session
        if (session && session.url) {
            return { message: 'Checkout session created successfully.', url: session.url };
        } else {
            return { error: 'Failed to retrieve the checkout session URL.' };
        }
    } catch (error) {
        // If an error occurs during the process, return an error object
        return { error: 'Failed to create checkout session.' };
    }
}
