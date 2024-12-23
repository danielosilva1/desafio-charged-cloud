export type userDetails = {
    email: string;
    name: string;
};

export type addressDetails = {
    cep: string;
    street: string;
    neighborhood: string;
    number: number;
    additionalInfo: string;
    city: string;
    state: string;
}

export type CompanyDetails = {
    cnpj: string;
    name: string;
    phoneNumber: string;
    addressId: number;
}

export type JwtPayload = {
    email: string,
    name: string
}