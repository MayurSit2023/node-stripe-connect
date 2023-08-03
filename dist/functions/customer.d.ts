import { CustomerInput, CustomerResult, CustomerError, CustomerResultForRetrive, CustomerIDInput } from '../interfaces/customer.interface';
export declare function createCustomer({ email, name }: CustomerInput): Promise<CustomerResult | CustomerError>;
export declare function deleteCustomer({ customerId }: CustomerIDInput): Promise<CustomerResult | {
    error: string;
}>;
export declare function retrieveCustomer({ customerId }: CustomerIDInput): Promise<CustomerResultForRetrive | CustomerError>;
export declare function updateCustomer({ customerId }: CustomerIDInput, { email, name }: CustomerInput): Promise<CustomerResultForRetrive | CustomerError>;
