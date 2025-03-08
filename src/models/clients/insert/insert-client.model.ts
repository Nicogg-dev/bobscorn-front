import { ApiResponse } from "@/models/common/http.model";
import { IClients } from "../clients.model";


export interface IInsertClientsReq extends Omit<IClients, "id" | "buyPopcorn"> {
    additionalField?: string;
}


export type IInsertClientsResp = ApiResponse<IClients>;
