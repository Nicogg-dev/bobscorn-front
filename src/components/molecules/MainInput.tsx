
interface IProps {
    onActionChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export const MainInput = ({onActionChange, placeholder} : IProps) => {
    return (
      <div className="relative">
        <input
          type="text"
          id="floating_outlined"
          className="peer block w-full rounded-lg border border-gray-300 bg-[#F3F6F4] px-2.5 pb-2.5 pt-2 text-sm text-gray-900 focus:border-yellow-600 focus:outline-none focus:ring-0 dark:border-gray-400 dark:text-white dark:focus:border-yellow-500"
          placeholder=" "
          onChange={onActionChange}
        />
        <label
          htmlFor="floating_outlined"
          className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-[#F3F6F4] px-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-yellow-600 dark:bg-[#0F0F10] dark:text-gray-400 dark:peer-focus:text-yellow-500"
        >
          {placeholder}
        </label>
      </div>
    );
  };
  