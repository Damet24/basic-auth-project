import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        {...props}
        className="w-full border rounded-lg px-3 py-2 
        bg-white dark:bg-gray-700 
        text-black dark:text-white
        border-gray-300 dark:border-gray-600
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}