export interface StudentFullDTO {
    id:             number;
    name:           string;
    last_name:      string;
    identification: string;
    cell_phone:     string;
    address:        string;
    user:           UserFullDTO;
}

export interface StudentCreateDTO {
    name:           string;
    last_name:      string;
    identification: string;
    cell_phone:     string;
    address:        string;
    user_id:        number;
}

export interface UserFullDTO {
    id:       number;
    username: string;
    email:    string;
}
