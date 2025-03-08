
interface IProps {
    users: {
        identification: string | number,
        stock: number,
    }[]
}

export const CardHover = ({ users }: IProps) => {
    return (
        <div className="flex flex-row gap-4 group">
            {users.map((user, index) => (
                <div
                    key={index}
                    className={`relative flex h-32 w-64 flex-col items-center justify-center rounded-2xl border-4 border-yellow-600 p-4 text-yellow-900 shadow-lg transition-transform duration-300 hover:scale-110 group-hover:blur-sm group-hover:scale-90 hover:!blur-none before:absolute before:inset-0 before:bg-[radial-gradient(circle,_#facc15_15%,_#fbbf24_40%,_transparent_60%)] before:opacity-70 before:rounded-2xl`}
                >
                    <p className="text-lg font-bold drop-shadow-md">
                        {user.identification}
                    </p>
                    <p className="text-sm drop-shadow-sm">
                        {user.stock}
                    </p>
                </div>
            ))}
        </div>
    );
};
