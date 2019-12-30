export interface Iuser {
    id: number,
    user_name: string,
    user_password: string,
    user_role_id: number,
    email: string,
    mobile: string,
    status: string,
    role_name?: string;
}