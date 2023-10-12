export interface IUser {
    id?: string
    _id?:string,
    first_name?: string
    last_name?: string
    password?: string
    confirmpassword?: string
    email?: string
    phone?: string
    address?: string,
    avatar : IImage | any
    role?: string,
    googeId?: string
    facebookId?: string
    authType ?: string
    createdAt?: any
    passwordResetToken?: string
    passwordResetExpires?: string
    passwordChangeAt?: string
    }
export interface IImage {
    url: string;
    publicId: string;
}