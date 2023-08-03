export interface CustomerInput {
    email?: string;
    name: string;
}
export interface CustomerIDInput {
    customerId: string;
}
export interface CustomerResult {
    customer?: any;
    id: string;
    message?: string;
}
export interface CustomerResultForRetrive {
    customer?: any;
    message?: string;
}
export interface CustomerError {
    error: string;
}
