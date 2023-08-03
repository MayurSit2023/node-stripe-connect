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
exports.cancelPaymentIntent = exports.capturePaymentIntent = exports.confirmPaymentIntent = exports.retrievePaymentIntent = exports.createPaymentIntent = void 0;
const stripeConfig_1 = require("../config/stripeConfig");
// Function to create a new Payment Intent on Stripe
function createPaymentIntent({ amount, currency, paymentMethod }) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate input data
        if (!amount || amount <= 0) {
            return { error: 'Invalid amount. The amount must be greater than 0.' };
        }
        if (!currency) {
            return { error: 'Please provide a valid currency code.' };
        }
        if (!(paymentMethod === null || paymentMethod === void 0 ? void 0 : paymentMethod.id) || typeof paymentMethod.id !== 'string') {
            return { error: 'Invalid payment method ID.' };
        }
        const stripeInstance = (0, stripeConfig_1.getStripeInstance)();
        try {
            // Create the Payment Intent using the Stripe API
            const paymentIntent = yield stripeInstance.paymentIntents.create({
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
        }
        catch (error) {
            // If there is an error during the creation, return an error message
            return { error: 'Failed to create Payment Intent.' + error };
        }
    });
}
exports.createPaymentIntent = createPaymentIntent;
// Function to retrieve a Payment Intent from Stripe
function retrievePaymentIntent({ paymentIntentId }) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate input data
        if (!paymentIntentId) {
            return { error: ' Please provide a valid Payment Intent ID.' };
        }
        const stripeInstance = (0, stripeConfig_1.getStripeInstance)();
        try {
            // Retrieve the Payment Intent using the provided Payment Intent ID
            const paymentIntent = yield stripeInstance.paymentIntents.retrieve(paymentIntentId);
            // Return the Payment Intent information along with a success message
            return { message: 'Payment Intent retrieved successfully.', paymentIntent };
        }
        catch (error) {
            // If there is an error during the retrieval, return an error message
            return { error: 'Failed to retrieve Payment Intent.' + error };
        }
    });
}
exports.retrievePaymentIntent = retrievePaymentIntent;
// Function to confirm a Payment Intent on Stripe
function confirmPaymentIntent({ paymentIntentId }) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate input data
        if (!paymentIntentId) {
            return { error: ' Please provide a valid Payment Intent ID.' };
        }
        const stripeInstance = (0, stripeConfig_1.getStripeInstance)();
        try {
            // Confirm the Payment Intent using the provided Payment Intent ID
            const paymentIntent = yield stripeInstance.paymentIntents.confirm(paymentIntentId);
            // Return the Payment Intent information along with a success message
            return { message: 'Payment Intent confirmed successfully.', paymentIntent };
        }
        catch (error) {
            // If there is an error during the confirmation, return an error message
            return { error: 'Failed to confirm Payment Intent.' + error };
        }
    });
}
exports.confirmPaymentIntent = confirmPaymentIntent;
// Function to capture a Payment Intent on Stripe
function capturePaymentIntent({ paymentIntentId }) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate input data
        if (!paymentIntentId) {
            return { error: ' Please provide a valid Payment Intent ID.' };
        }
        const stripeInstance = (0, stripeConfig_1.getStripeInstance)();
        try {
            // Capture the Payment Intent using the provided Payment Intent ID
            const paymentIntent = yield stripeInstance.paymentIntents.capture(paymentIntentId);
            // Return the Payment Intent information along with a success message
            return { message: 'Payment Intent captured successfully.', paymentIntent };
        }
        catch (error) {
            // If there is an error during the capture, return an error message
            return { error: 'Failed to capture Payment Intent.' + error };
        }
    });
}
exports.capturePaymentIntent = capturePaymentIntent;
// Function to cancel a Payment Intent on Stripe
function cancelPaymentIntent({ paymentIntentId }) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate input data
        if (!paymentIntentId) {
            return { error: ' Please provide a valid Payment Intent ID.' };
        }
        const stripeInstance = (0, stripeConfig_1.getStripeInstance)();
        try {
            const paymentIntentdata = yield stripeInstance.paymentIntents.retrieve(paymentIntentId);
            if (paymentIntentdata.status == "succeeded") {
                return { error: 'You can not cancel this payment beacuase your payment is success' };
            }
            // Cancel the Payment Intent using the provided Payment Intent ID
            const paymentIntent = yield stripeInstance.paymentIntents.cancel(paymentIntentId);
            // Return the Payment Intent information along with a success message
            return { message: 'Payment Intent canceled successfully.', paymentIntent };
        }
        catch (error) {
            // If there is an error during the cancellation, return an error message
            return { error: 'Failed to cancel Payment Intent.' + error };
        }
    });
}
exports.cancelPaymentIntent = cancelPaymentIntent;
