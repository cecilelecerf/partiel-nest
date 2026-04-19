import { ReactNode } from "react";

export const CardWrapper = ({
  children,
  enabeldHover,
  active,
}: {
  children: ReactNode;
  enabeldHover?: boolean;
  active?: boolean;
}) => (
  <div
    className={`shadow rounded-xl p-2 px-4 gap-4 ${!enabeldHover && "hover:scale-102 hover:shadow-lg active:translate-y-1"} transition ${active && "bg-gray-100"}`}
  >
    {children}
  </div>
);
