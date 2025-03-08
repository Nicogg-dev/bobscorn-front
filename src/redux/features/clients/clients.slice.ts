import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IClients } from "@/models/clients/clients.model";
import { getAllClients, insertClients } from "./clients.thunks";
import { IGetClientsResp } from "@/models/clients/get-all/get-all-client.model";

interface IProps {
    listClients: IClients[];
    isLoadingGetClients: boolean;
    isLoadingInsertClients: boolean;
    activeTimers: Record<string, NodeJS.Timeout>;
}

const initialState: IProps = {
    listClients: [],
    isLoadingGetClients: false,
    isLoadingInsertClients: false,
    activeTimers: {},
};

export const clientsSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder
            .addCase(getAllClients.pending, state => {
                state.isLoadingGetClients = true;
            })
            .addCase(
                getAllClients.fulfilled,
                (state, action: PayloadAction<IGetClientsResp>) => {
                    state.listClients = action.payload.data;
                    state.isLoadingGetClients = false;
                }
            )
            .addCase(getAllClients.rejected, state => {
                state.isLoadingGetClients = false;
            })
            .addCase(insertClients.pending, state => {
                state.isLoadingInsertClients = true;
            })
            .addCase(insertClients.fulfilled, state => {
                state.isLoadingInsertClients = false;
            })
            .addCase(insertClients.rejected, state => {
                state.isLoadingInsertClients = false;
            });
    },
});

export default clientsSlice;
