import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full bg-blue-600 text-white py-2 rounded-lg 
      hover:bg-blue-700 transition disabled:opacity-50"
    >
      {children}
    </button>
  );
}