import { ReactNode } from "react";

export const CardWrapper = ({ children, enabeldHover }: { children: ReactNode, enabeldHover?: boolean }) => (
    <div className={`shadow rounded-xl p-2 px-4 gap-4 ${!enabeldHover && ("hover:scale-102 hover:shadow-lg active:translate-y-1")} transition `}>
        {children}
    </div>
)