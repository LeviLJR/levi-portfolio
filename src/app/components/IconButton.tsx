import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function IconButton({className, ...props}: ComponentProps<"button">) {
  return (
    <button
      className={twMerge(
        `flex bg-primary-color text-surface-background dark:bg-ternary-color hover:brightness-110 rounded-md items-center justify-center h-12 w-12 md:h-10 md:w-10 cursor-pointer`,
        className
      )}
      {...props}
    />
  );
}
