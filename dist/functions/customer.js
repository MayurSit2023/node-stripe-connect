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
exports.updateCustomer = exports.retrieveCustomer = exports.deleteCustomer = exports.createCustomer = void 0;
const stripeConfig_1 = require("../config/stripeConfig");
// Function to create a customer in Stripe
function createCustomer({ email, name }) {
    return __awaiter(this, void 0, void 0, function* () {
        const stripeInstance = (0, stripeConfig_1.getStripeInstance)();
        try {
            if (!email) {
                return { error: 'Email is required.' };
            }
            const customer = yield stripeInstance.customers.create({
                email: email,
                name: name,
            });
            return { message: 'Customer created successfully.', id: customer.id };
        }
        catch (error) {
            return { error: 'Failed to create customer.' };
        }
    });
}
exports.createCustomer = createCustomer;
// Function to delete a customer in Stripe
function deleteCustomer({ customerId }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!customerId) {
            return { error: 'Customer ID is required.' };
        }
        const stripeInstance = (0, stripeConfig_1.getStripeInstance)();
        try {
            const customer = yield stripeInstance.customers.del(customerId);
            return { message: 'Customer deleted successfully.', id: customer.id };
        }
        catch (error) {
            return { error: 'Failed to delete customer.' };
        }
    });
}
exports.deleteCustomer = deleteCustomer;
// Function to retrieve a customer from Stripe
function retrieveCustomer({ customerId }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!customerId) {
            return { error: 'Customer ID is required.' };
        }
        const stripeInstance = (0, stripeConfig_1.getStripeInstance)();
        try {
            const customer = yield stripeInstance.customers.retrieve(customerId);
            return { message: 'Customer retrieved successfully.', customer: customer };
        }
        catch (error) {
            return { error: 'Failed to retrieve customer.' };
        }
    });
}
exports.retrieveCustomer = retrieveCustomer;
// Function to update a customer in Stripe
function updateCustomer({ customerId }, { email, name }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!customerId) {
            return { error: 'Customer ID is required.' };
        }
        const stripeInstance = (0, stripeConfig_1.getStripeInstance)();
        try {
            const existingCustomer = yield stripeInstance.customers.retrieve(customerId);
            if (!existingCustomer) {
                return { error: 'Customer not found.' };
            }
            const updatedCustomer = yield stripeInstance.customers.update(customerId, {
                email: email,
                name: name,
            });
            return { message: 'Customer updated successfully.', customer: updatedCustomer };
        }
        catch (error) {
            return { error: 'Failed to update customer.' };
        }
    });
}
exports.updateCustomer = updateCustomer;
