type Props = {
  children: React.ReactNode;
};

export function Container({ children }: Props) {
  return <div className="max-w-6xl mx-auto">{children}</div>;
}