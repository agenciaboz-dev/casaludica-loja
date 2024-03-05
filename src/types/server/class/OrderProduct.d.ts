import { Prisma } from "@prisma/client";
export type OrderProductPrisma = Prisma.OrderProductGetPayload<{}>;
export declare class OrderProduct {
    id: number;
    name: string;
    price: number;
    quantity: number;
    referenceId: number;
    constructor(data: OrderProductPrisma);
}
