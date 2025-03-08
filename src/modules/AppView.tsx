import { useEffect, useRef, useState } from "react";
import { CustomButton } from "@/components/atoms/CustomButton";
import { Card3D } from "@/components/organisms/Card3D";
import { MainInput } from "@/components/molecules/MainInput";
import { useAppDispatch } from "@/redux/hooks";
import { insertClients } from "@/redux/features/clients/clients.thunks";
import { useTableListClients } from "@/@core/hooks/useTableClients";
import toast from "react-hot-toast";

export const AppView = () => {
    const dispatch = useAppDispatch();
    const { listClients, isLoadingGetClients, isLoadingInsertClients, onMounted } = useTableListClients();

    const [userIdentity, setUserIdentity] = useState("");
    const [clientTime, setClientTime] = useState<Record<string, number>>({});
    const intervalsRef = useRef<Record<string, NodeJS.Timeout>>({});

    useEffect(() => {
        const savedTimes = localStorage.getItem("clientTime");
        if (savedTimes) {
            const parsedTimes = JSON.parse(savedTimes);
            const now = Math.floor(Date.now() / 1000);

            const adjustedTimes = Object.keys(parsedTimes).reduce((acc, user) => {
                const remaining = parsedTimes[user] - (now - parsedTimes[user + "_start"]);
                if (remaining > 0) acc[user] = remaining;
                return acc;
            }, {} as Record<string, number>);

            setClientTime(adjustedTimes);

            Object.keys(adjustedTimes).forEach(user => startCountdown(user));
        }
    }, []);

    const startCountdown = (user: string) => {
        if (intervalsRef.current[user]) return;

        intervalsRef.current[user] = setInterval(() => {
            setClientTime(prev => {
                if (!prev[user] || prev[user] <= 0) {
                    clearInterval(intervalsRef.current[user]);
                    delete intervalsRef.current[user];
                    return prev;
                }

                const updatedTime = prev[user] - 1;
                const newTimes = { ...prev, [user]: updatedTime };

                localStorage.setItem("clientTime", JSON.stringify({
                    ...newTimes,
                    [user + "_start"]: Math.floor(Date.now() / 1000)
                }));

                return newTimes;
            });
        }, 1000);
    };

    const onSubmit = async () => {
        if (userIdentity.trim() === "") return;

        const respDispatch = await dispatch(
            insertClients({
                params: { name: userIdentity },
                errorCallback: msg => {
                    toast.error(msg);
                },
            })
        );

        if (respDispatch.meta.requestStatus === "fulfilled") {
            toast.success("Palomita comprada con éxito");
            onMounted();

            const newTime = 60;
            setClientTime(prev => {
                const newClientTime = { ...prev, [userIdentity]: newTime };
                localStorage.setItem("clientTime", JSON.stringify({
                    ...newClientTime,
                    [userIdentity + "_start"]: Math.floor(Date.now() / 1000)
                }));
                return newClientTime;
            });

            startCountdown(userIdentity);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 min-h-screen justify-center pt-16 pb-8 px-4">
            <div className="flex flex-col col-span-1 h-full md:h-[100vh] gap-6 items-center justify-center">
                <div>
                    <h1 className="text-4xl md:text-6xl text-center font-bold">
                        Bienvenido a Bob&apos;s Corn
                    </h1>
                    <h2 className="text-xl md:text-2xl text-center text-yellow-600 dark:text-yellow-400 font-semibold">
                        Tu tienda favorita de productos de maíz
                    </h2>
                </div>

                <div className="flex flex-col gap-6 p-4 w-2/3 lg:w-5/6 items-center border-[1px] border-black dark:border-white rounded-2xl bg-green-900/5 border-b-8">
                    <div className="relative w-2/3 md:w-3/3 text-center justify-center py-2 group overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full mt-2 items-center">
                            <MainInput
                                placeholder="Ingresa tu id"
                                onActionChange={e => setUserIdentity(e.target.value)}
                            />
                            <div className="w-full flex justify-center">
                                <CustomButton name="Comprar" customSubmit={onSubmit} isLoading={isLoadingInsertClients} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Card3D data={listClients} isLoading={isLoadingGetClients} clientTime={clientTime} />
        </div>
    );
};
