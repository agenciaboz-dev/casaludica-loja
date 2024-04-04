export declare class Product {
    id: number;
    name: string;
    cover: string;
    images?: string;
    date?: Date;
    description?: string;
    resume?: string;
    featured?: Boolean;
    price: number;
    stock?: number;
    category?: number;
    tags?: string;
    weight?: number;
    width?: number;
    height?: number;
    lenght?: number;
    sold: number;
    ageRating: string;
    brand: string;
    rating: number;
    constructor(igest_product: IgestProduct);
    static getImages(id: number, mainOnly?: boolean): Promise<string>;
    getImage(mainOnly?: boolean): Promise<string>;
}
