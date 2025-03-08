import { getAllClients } from "@/redux/features/clients/clients.thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useCallback } from "react";

export const useTableListClients = () => {
    const dispatch = useAppDispatch();

    const { listClients, isLoadingGetClients, isLoadingInsertClients } = useAppSelector((state) => state.clients);
    
        const onMounted = useCallback(async () => {
            await dispatch(getAllClients());	
        }, [dispatch]);

    useEffect(() => {
        onMounted();
    }, [onMounted]);

    return {
        onMounted,
        listClients,
        isLoadingGetClients,
        isLoadingInsertClients,
    };
};
