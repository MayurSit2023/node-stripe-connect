import Stripe from 'stripe';

let stripeSecretKey: string | null = null; // Variable to store the Stripe secret key

/**
 * Function to set the Stripe secret key.
 * @param secretKey - The Stripe secret key to be set.
 */
export function setStripeSecretKey(secretKey: string) {
    stripeSecretKey = secretKey;
}

/**
 * Function to get the Stripe instance.
 * @throws Error if the Stripe secret key is not set.
 * @returns The Stripe instance.
 */
export function getStripeInstance() {
    if (!stripeSecretKey) {
        throw new Error('Stripe secret key not set. Please set the secret key using setStripeSecretKey() before using the Stripe Functions.');
    }
    return new Stripe(stripeSecretKey, { apiVersion: '2022-11-15' });
}
