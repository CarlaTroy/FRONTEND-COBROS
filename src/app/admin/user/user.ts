export interface UserFullDTO {
    username: string;
    email:    string;
    id:       number;
    is_staff: boolean;
}


export interface UserCreateDTO {
        username:string;
        email: string;
        password: string;
        password2: string;
        is_staff: boolean;
    }