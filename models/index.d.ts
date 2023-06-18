export interface ClientDTO {
    id: number;
    firstname: string;
    lastname: string;
    phonenumber: string;
    accounts: null | AccountDTO[];
}

export interface AccountDTO {
    id: number;
    startingBalance: number;
    balance: number;
    client: ClientDTO;
}

export interface UserDTO {
    id: number;
    loginname: string;
    password: string;
}