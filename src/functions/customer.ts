import { getStripeInstance } from '../config/stripeConfig';
import { CustomerInput, CustomerResult, CustomerError, CustomerResultForRetrive, CustomerIDInput } from '../interfaces/customer.interface';

// Function to create a customer in Stripe
export async function createCustomer({ email, name }: CustomerInput): Promise<CustomerResult | CustomerError> {
    const stripeInstance = getStripeInstance();
    try {
        if (!email) {
            return { error: 'Email is required.' };
        }

        const customer = await stripeInstance.customers.create({
            email: email,
            name: name,
        });

        return { message: 'Customer created successfully.', id: customer.id };
    } catch (error) {
        return { error: 'Failed to create customer.' };
    }
}
// Function to delete a customer in Stripe
export async function deleteCustomer({ customerId }: CustomerIDInput): Promise<CustomerResult | { error: string }> {
    if (!customerId) {
        return { error: 'Customer ID is required.' };
    }

    const stripeInstance = getStripeInstance();

    try {
        const customer = await stripeInstance.customers.del(customerId);
        return { message: 'Customer deleted successfully.', id: customer.id };
    } catch (error) {
        return { error: 'Failed to delete customer.' };
    }
}
// Function to retrieve a customer from Stripe
export async function retrieveCustomer({ customerId }: CustomerIDInput): Promise<CustomerResultForRetrive | CustomerError> {
    if (!customerId) {
        return { error: 'Customer ID is required.' };
    }

    const stripeInstance = getStripeInstance();

    try {
        const customer = await stripeInstance.customers.retrieve(customerId);
        return { message: 'Customer retrieved successfully.', customer: customer };
    } catch (error) {
        return { error: 'Failed to retrieve customer.' };
    }
}
// Function to update a customer in Stripe
export async function updateCustomer(
    { customerId }: CustomerIDInput,
    { email, name }: CustomerInput
): Promise<CustomerResultForRetrive | CustomerError> {
    if (!customerId) {
        return { error: 'Customer ID is required.' };
    }

    const stripeInstance = getStripeInstance();

    try {
        const existingCustomer = await stripeInstance.customers.retrieve(customerId);
        if (!existingCustomer) {
            return { error: 'Customer not found.' };
        }

        const updatedCustomer = await stripeInstance.customers.update(customerId, {
            email: email,
            name: name,
        });

        return { message: 'Customer updated successfully.', customer: updatedCustomer };
    } catch (error) {
        return { error: 'Failed to update customer.' };
    }
}

