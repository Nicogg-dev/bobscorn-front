import { ApiResponse } from "@/models/common/http.model";
import { IClients } from "../clients.model";


export type IGetClientsResp = ApiResponse<IClients[]>