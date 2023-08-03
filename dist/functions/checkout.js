"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerCheckoutSession = exports.createCheckoutSession = void 0;
const stripeConfig_1 = require("../config/stripeConfig");
// Function to create a checkout session with Stripe
function createCheckoutSession(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { successUrl, cancelUrl, priceId } = params;
        const stripeInstance = (0, stripeConfig_1.getStripeInstance)();
        // Validate required parameters
        if (!successUrl || !cancelUrl || !priceId) {
            return { error: 'Invalid input. Missing required parameters.' };
        }
        try {
            // Use the Stripe instance to create a checkout session
            const session = yield stripeInstance.checkout.sessions.create({
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
            }
            else {
                return { error: 'Failed to retrieve the checkout session URL.' };
            }
        }
        catch (error) {
            // If an error occurs during the process, return an error object
            return { error: 'Failed to create checkout session.' };
        }
    });
}
exports.createCheckoutSession = createCheckoutSession;
// Function to create a customer and then a checkout session with Stripe
function createCustomerCheckoutSession(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { successUrl, cancelUrl, priceId, customerId } = params;
        const stripeInstance = (0, stripeConfig_1.getStripeInstance)();
        // Validate required parameters
        if (!successUrl || !cancelUrl || !priceId || !customerId) {
            return { error: 'Invalid input. Missing required parameters.' };
        }
        try {
            let customer;
            if (customerId) {
                // If customerId is provided, retrieve the customer from Stripe
                customer = yield stripeInstance.customers.retrieve(customerId);
            }
            // If the customer does not exist or customerId is not provided, create a new customer
            if (!customer) {
                customer = yield stripeInstance.customers.create();
            }
            // Use the Stripe instance to create a checkout session with the customer's ID
            const session = yield stripeInstance.checkout.sessions.create({
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
            }
            else {
                return { error: 'Failed to retrieve the checkout session URL.' };
            }
        }
        catch (error) {
            // If an error occurs during the process, return an error object
            return { error: 'Failed to create checkout session.' };
        }
    });
}
exports.createCustomerCheckoutSession = createCustomerCheckoutSession;
