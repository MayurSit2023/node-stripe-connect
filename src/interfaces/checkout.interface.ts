// Interface for the success response
interface CheckoutSessionSuccessResponse {
    message?: string,
    url: string;
}

// Interface for the error response
interface CheckoutSessionErrorResponse {
    error: string;
}

// Interface for the function parameters
interface CheckoutSessionParams {
    successUrl: string;
    cancelUrl: string;
    priceId: string;
    customerId?: string;
}