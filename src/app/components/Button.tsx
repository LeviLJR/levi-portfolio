import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function Button({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      className={twMerge(
        `flex items-center gap-2 justify-center text-text-foreground dark:text-surface-background
        cursor-pointer hover:brightness-110 rounded-md px-4 py-3`,
        className
      )}
      {...props}
    />
  );
}
