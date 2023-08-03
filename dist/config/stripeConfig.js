"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStripeInstance = exports.setStripeSecretKey = void 0;
const stripe_1 = __importDefault(require("stripe"));
let stripeSecretKey = null; // Variable to store the Stripe secret key
/**
 * Function to set the Stripe secret key.
 * @param secretKey - The Stripe secret key to be set.
 */
function setStripeSecretKey(secretKey) {
    stripeSecretKey = secretKey;
}
exports.setStripeSecretKey = setStripeSecretKey;
/**
 * Function to get the Stripe instance.
 * @throws Error if the Stripe secret key is not set.
 * @returns The Stripe instance.
 */
function getStripeInstance() {
    if (!stripeSecretKey) {
        throw new Error('Stripe secret key not set. Please set the secret key using setStripeSecretKey() before using the Stripe Functions.');
    }
    return new stripe_1.default(stripeSecretKey, { apiVersion: '2022-11-15' });
}
exports.getStripeInstance = getStripeInstance;
