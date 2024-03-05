import { Prisma } from "@prisma/client";
import { OrderProduct } from "./OrderProduct";
import { Charge } from "../types/bozpay/Charge";
export declare const include: {
    products: true;
};
export type OrderPrisma = Prisma.OrderGetPayload<{
    include: typeof include;
}>;
export declare class Order {
    id: number;
    storeId: number;
    notes: string | null;
    datetime: string;
    total: number;
    paymentType: string | null;
    installments: number | null;
    userId: number;
    products: OrderProduct[];
    constructor(id: number, data?: OrderPrisma);
    init(): Promise<void>;
    static list(store_id?: number): Promise<Order[]>;
    static find(data: {
        id?: number;
        user_id?: number;
    }): Promise<Order[]>;
    static new(data: ClientOrderForm, user_id: number): Promise<{
        bozpayOrder: any;
        order: Order;
        error?: undefined;
    } | {
        error: unknown;
        bozpayOrder?: undefined;
        order?: undefined;
    }>;
    load(data: OrderPrisma): void;
    update(data: Partial<Order>): Promise<void>;
    onPaid(charge: Charge): Promise<void>;
}
