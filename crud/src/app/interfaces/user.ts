export interface User {
    username: string;
    password: string;
    confirmPass: string;
    email: string;
    subscribed: boolean;
    country: string;
    city: string;
    id?: number;
}