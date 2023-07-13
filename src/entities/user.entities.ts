export interface User extends CreateUser {
    id: string;
    password: string;
    registeredAt: Date;
}

export interface CreateUser {
    username: string;
    password: string;
    name: string;
    
}