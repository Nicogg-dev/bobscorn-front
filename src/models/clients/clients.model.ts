export interface IClients {
    id: string;
    name: string;
    buyPopcorn: {
        quantity: number;
        buyDate: Date;
    }[];
    time?: number;
}
