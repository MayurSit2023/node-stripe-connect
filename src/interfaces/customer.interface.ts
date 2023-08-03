// Represents the input data for creating or updating a customer.
export interface CustomerInput {
  email?: string; // Optional field for the customer's email address.
  name: string;   // Required field for the customer's name.
}

// Represents the input data containing the customer ID.
export interface CustomerIDInput {
  customerId: string; // Required field for the customer's unique identifier.
}

// Represents the result of a customer-related operation, such as creation or update.
export interface CustomerResult {
  customer?: any;  // Contains the customer object. It may be present in successful responses.
  id: string;      // The ID of the customer, which uniquely identifies them.
  message?: string; // Optional message to provide additional information about the operation.
}

// Represents the result of a customer retrieval operation.
export interface CustomerResultForRetrive {
  customer?: any;  // Contains the customer object retrieved from the operation.
  message?: string; // Optional message to provide additional information about the retrieval.
}

// Represents an error response related to customer operations.
export interface CustomerError {
  error: string;  // Contains the specific error message describing the issue.
}
