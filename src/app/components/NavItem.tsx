"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface NavItemProps extends ComponentProps<typeof Link> {
  href: string;
  label: string;
  onClick?: () => void;
}

export function NavItem({ href, label, className, onClick, ...props }: NavItemProps) {
  const pathname = usePathname();
  const pathnameStart = pathname === "/" ? "/#start" : pathname;
  const isActive = pathname === href || href === pathnameStart;
  return (
    <Link
      href={href}
      onClick={onClick} 
      aria-current={isActive ? "page" : undefined}
      className={twMerge(`flex items-center hover:bg-surface-primary rounded-md h-12 md:h-10 px-4 py-2 ${isActive ? "font-bold" : ""}`,
        className )}
    >
      {label}
      {props.children}
    </Link>
  );
}
