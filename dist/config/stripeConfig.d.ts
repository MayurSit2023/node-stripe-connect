import Stripe from 'stripe';
/**
 * Function to set the Stripe secret key.
 * @param secretKey - The Stripe secret key to be set.
 */
export declare function setStripeSecretKey(secretKey: string): void;
/**
 * Function to get the Stripe instance.
 * @throws Error if the Stripe secret key is not set.
 * @returns The Stripe instance.
 */
export declare function getStripeInstance(): Stripe;
