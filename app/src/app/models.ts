export interface Productmodel {
    id: number;
    name: string;
    mark: string;
    model: string;
    year: number;
    info: string;
    photo: string;
    color: string;
    plate: string;
    value: number;
    created_at: Date;
}

export  interface  UserBase {
    email: string;
    username: string;
}

export interface UserSignUp extends UserBase{
    password: string;
}

export interface UserModel extends UserBase{
    is_admin: boolean;
    created_at: Date;
}

export interface UserChangeRole extends UserBase{
    is_admin: boolean;
}

export interface UserLoged{
    is_authenticated: boolean;
}

export const UserColumns = [
    {
        key: 'username',
        type: 'text',
        label: 'User Name',
    },
    {
        key: 'email',
        type: 'text',
        label: 'User Email',
    },
    {
        key: 'is_admin',
        type: 'is_admin',
        label: 'Administrator',
    },
]

export const UserActionsColumns = Array.from(UserColumns)
UserActionsColumns.push(
    {
        key: 'action',
        type: 'text',
        label: 'Actions',
    },
)
