export declare class Franchise {
    id: number;
    active: boolean;
    name: string;
    fantasy_name: string;
    cnpj: string;
    address: {
        street: string;
        number: string;
        complement: string;
        district: string;
        cep: string;
        city: string;
        uf: string;
        ibge: string;
    };
    constructor(data: IgestFranchise);
}
