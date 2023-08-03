interface CheckoutSessionSuccessResponse {
    message?: string;
    url: string;
}
interface CheckoutSessionErrorResponse {
    error: string;
}
interface CheckoutSessionParams {
    successUrl: string;
    cancelUrl: string;
    priceId: string;
    customerId?: string;
}
