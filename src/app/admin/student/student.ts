export interface Student {
    id:             number;
    name:           string;
    last_name:      string;
    identification: string;
    cell_phone:     string;
    address:        string;
    user:           User;
}

export interface User {
    id:       number;
    username: string;
    email:    string;
}
