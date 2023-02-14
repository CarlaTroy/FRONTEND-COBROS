export interface StudentFullDTO {
    id:             number;
    name:           string;
    last_name:      string;
    identification: string;
    cell_phone:     string;
    address:        string;
    email:          string;
    user:           UserFullDTO;
}

export interface StudentCreateDTO {
    name:           string;
    last_name:      string;
    identification: string;
    cell_phone:     string;
    address:        string;
    email:          string;
}

export interface UserFullDTO {
    id:       number;
    username: string;
    email:    string;
}


export interface FormStudentDTO{
    name: string,
    last_name: string,
    identification: string,
    cell_phone: string,
    address: string,
    email: string
}
