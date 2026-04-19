import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

type CardWrapperProps = {
  children: ReactNode;
} & { interactive?: boolean; selected?: boolean } & ComponentProps<"div">;

export const CardWrapper = ({
  children,
  interactive,
  selected,
  className,
  ...props
}: CardWrapperProps) => (
  <div
    className={cn(
      "rounded-xl p-4 shadow transition-all duration-200",
      interactive &&
        "hover:scale-[1.02] hover:shadow-lg active:translate-y-0.5 cursor-pointer",
      selected && "bg-secondary ring-2 ring-primary/20",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
