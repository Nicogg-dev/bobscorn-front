import { CustomButton } from "@/components/atoms/CustomButton";
import { Card3D } from "@/components/organisms/Card3D";
import { MainInput } from "@/components/molecules/MainInput"
import { useState } from "react"
import { useAppDispatch } from "@/redux/hooks";
import { insertClients } from "@/redux/features/clients/clients.thunks";
import { useTableListClients } from "@/@core/hooks/useTableClients";
import toast from "react-hot-toast";

export const AppView = () => {

    const dispatch = useAppDispatch()

    const {listClients, isLoadingGetClients,isLoadingInsertClients, onMounted} = useTableListClients()

    const [userIdentity, setUserIdentity] = useState('')

    const onSubmit = async() => {
        if(userIdentity.trim() === '') return

        const respDispatch = await dispatch(insertClients({params: {name: userIdentity}, errorCallback: (msg) => {
            toast.error(msg);
        }}))

        if(respDispatch.meta.requestStatus === 'fulfilled') {
            toast.success('Palomita comprada con exito')
            onMounted()
        }
    }

    return (
        <div className="flex flex-col gap-7 min-h-screen items-center justify-center pt-16 pb-8 px-4 ">
            <div className="space-y-3">
                <h1 className="text-4xl md:text-6xl text-center font-bold">
                    Bienvenido a Bob&apos;s Corn
                </h1>
                <h2 className="text-xl md:text-2xl text-center text-yellow-600 dark:text-yellow-400 font-semibold">
                    Tu tienda favorita de productos de maiz
                </h2>
            </div>

            <div className="flex flex-col gap-6 p-4 w-full xl:w-2/3 items-center">
                <div className="relative w-1/2 text-center justify-center py-2 group overflow-hidden">
                    <div className="flex  items-end gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-2 items-center">
                            <MainInput
                                placeholder="Ingresa tu id"
                                onActionChange={(e) => setUserIdentity(e.target.value)}
                            />
                            <CustomButton name="Comprar" customSubmit={onSubmit} isLoading={isLoadingInsertClients} />
                        </div>
                    </div>
                </div>
            </div>
            <Card3D data={listClients} isLoading={isLoadingGetClients} />
        </div>
    )
}
