import { IInsertClientsReq } from "@/models/clients/insert/insert-client.model";
import ClientsService from "@/services/clients/clients.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface IPayloadInsertClients {
    params: IInsertClientsReq;
    errorCallback: (msg: string) => void;
}

export const getAllClients = createAsyncThunk(
    "clients/get-all",
    async (_, thunkAPI) => {
        try {
            const resp = await ClientsService.getAll();

            return resp;
        } catch {
            return thunkAPI.rejectWithValue(null);
        }
    }
);

export const insertClients = createAsyncThunk(
    "clients/insert",
    async (payload: IPayloadInsertClients, thunkAPI) => {
        try {
            const resp = await ClientsService.insert(
                payload.params,
                payload.errorCallback
            );

            return resp;
        } catch {
            return thunkAPI.rejectWithValue(null);
        }
    }
);
