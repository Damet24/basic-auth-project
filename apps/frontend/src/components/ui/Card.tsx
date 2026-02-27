type CardProps = {
  children: React.ReactNode;
};

export function Card({ children }: CardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md transition-colors">
      {children}
    </div>
  );
}