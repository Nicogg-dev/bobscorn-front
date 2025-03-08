import { useMotionValue, useTransform, motion } from "framer-motion";
import cornIcon from "@/../public/corn-icon.svg";
// import LogoCorn from "@/../public/corn.png";
import CampoCorn from "@/../public/campo.png";
import { IClients } from "@/models/clients/clients.model";
import { Skeleton } from "../atoms/Skeleton";

interface IProps {
    data: IClients[];
    isLoading: boolean;
}

export const Card3D = ({ data, isLoading }: IProps) => {
    return (
        <div className="flex flex-wrap group w-full justify-center ">
            {
                !isLoading ? data?.map((row, index) => (
                    <CardItem key={index} row={row} />
                ))
                    :
                    <>
                        <Skeleton />
                        <Skeleton />
                    </>
            }
        </div>
    );
};

interface CardItemProps {
    row: IClients;
}

const CardItem = ({ row }: CardItemProps) => {
    // 🔹 Ahora los motionValues están en el nivel superior del componente
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-40, 40], [10, -10]);
    const rotateY = useTransform(x, [-40, 40], [-10, 10]);

    const campoRotateX = useTransform(y, [-40, 40], [10, -10]);
    const campoRotateY = useTransform(x, [-40, 40], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
        x.set(offsetX / 3); // Ajusta la sensibilidad
        y.set(offsetY / 3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div style={{ perspective: "1000px" }} className="flex flex-col items-center p-10 mb-10">
            <motion.div
                style={{
                    x,
                    y,
                    rotateX,
                    rotateY,
                    z: 100,
                    filter: "drop-shadow(0px 3px 2px rgba(255,255,255,0.5))",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-[226px] md:w-[326px] min-h-[200px] bg-amber-50/10 rounded-[15px] px-[40px] py-[24px] cursor-pointer duration-200 flex flex-col items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 group-hover:blur-sm hover:!blur-none before:absolute before:inset-0 before:opacity-70 before:rounded-2xl 
    dark:filter-none dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
            >

                <div className="text-4xl mb-1 font-bold drop-shadow-sm text-yellow-600 dark:text-white">{row.name}</div>
                <p className="text-[10px] md:text-[20px] font-light drop-shadow-md text-black dark:text-slate-100">
                    Maíz Comprado:
                </p>
                <div className="flex items-center gap-x-[20px] mb-28 drop-shadow-md">
                    <div className="text-[30px] font-bold text-[#000000] dark:text-[#FFFFFF]">
                        {row.buyPopcorn?.[0]?.quantity}
                    </div>
                    <img className="w-10 h-10" src={cornIcon} alt="corn" draggable="false" />
                </div>

                {/* <div className="absolute -top-10 -right-15 md:-right-12 w-[100px] md:w-[120px] drop-shadow-md">
                    <img src={LogoCorn} alt="corn" draggable="false" />
                </div> */}

                <motion.div
                    className="absolute bottom-[0px] md:bottom-[-16px] w-full flex justify-center "
                    style={{
                        rotateX: campoRotateX,
                        rotateY: campoRotateY,
                        scale: 1.1, // Hace que el campo parezca más grande al sobresalir
                        translateZ: 100, // Lo empuja hacia afuera en 3D
                        filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.3))", // Da efecto de profundidad
                    }}
                >
                    <img src={CampoCorn} alt="corn" draggable="false" className="w-[206px] md:w-[300px] rounded-[20px]" />
                </motion.div>
            </motion.div>
        </div>
    );
};
