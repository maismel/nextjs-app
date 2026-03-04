export const InfoBlock = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <p className="font-semibold">{title}</p>
    <div>{children}</div>
  </div>
);
