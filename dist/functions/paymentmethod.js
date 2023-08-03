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
exports.detachPaymentMethodFromCustomer = exports.attachPaymentMethodToCustomer = exports.createPaymentMethod = void 0;
const stripeConfig_1 = require("../config/stripeConfig");
// Function to create a Payment Method
function createPaymentMethod(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const stripeInstance = (0, stripeConfig_1.getStripeInstance)();
        try {
            // Create the Payment Method using the Stripe API
            const paymentMethod = yield stripeInstance.paymentMethods.create(params);
            // Return the Payment Method information along with a success message
            return { message: 'Payment Method created successfully.', paymentMethod: paymentMethod };
        }
        catch (error) {
            // If there is an error during the creation, return an error message
            return { error: 'Failed to create payment method.' + error };
        }
    });
}
exports.createPaymentMethod = createPaymentMethod;
// Function to attach a Payment Method to a Customer
function attachPaymentMethodToCustomer({ paymentMethodId, customerId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const stripeInstance = (0, stripeConfig_1.getStripeInstance)();
        try {
            // Attach the Payment Method to the specified Customer using the Stripe API
            const paymentMethod = yield stripeInstance.paymentMethods.attach(paymentMethodId, {
                customer: customerId,
            });
            // Return the Payment Method information along with a success message
            return { message: 'Payment Method attached successfully.', paymentMethod: paymentMethod };
        }
        catch (error) {
            // If there is an error during the attachment, return an error message
            return { error: 'Failed to attach payment method to customer.' + error };
        }
    });
}
exports.attachPaymentMethodToCustomer = attachPaymentMethodToCustomer;
// Function to detach a Payment Method from a Customer
function detachPaymentMethodFromCustomer({ paymentMethodId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const stripeInstance = (0, stripeConfig_1.getStripeInstance)();
        try {
            // Detach the Payment Method from the Customer using the Stripe API
            const paymentMethod = yield stripeInstance.paymentMethods.detach(paymentMethodId);
            // Return the Payment Method information along with a success message
            return { message: 'Payment Method detached successfully.', paymentMethod: paymentMethod };
        }
        catch (error) {
            // If there is an error during the detachment, return an error message
            return { error: 'Failed to detach payment method from customer.' + error };
        }
    });
}
exports.detachPaymentMethodFromCustomer = detachPaymentMethodFromCustomer;
