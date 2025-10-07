"use client";
import { ArrowUpIcon } from "@phosphor-icons/react/ssr";
import { IconButton } from "./IconButton";
import { NavItem } from "./NavItem";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-between flex-wrap md:px-[5%] py-9 gap-4 md:gap-12 items-center xl:px-0 max-w-[1200px] mx-auto">
      <p className="my-auto mx-auto md:mx-0 text-sm">
        Levi Liberman Junior 2025. Layout created in Figma.
      </p>
      <div className="flex gap-4 md:gap-12 items-center mx-auto md:mx-0">
        <NavItem href="https://github.com/leviljr" label="GitHub" className="text-sm"/>
        <NavItem href="https://linkedin.com/in/leviljr" label="LinkedIn" className="text-sm"/>
        <IconButton onClick={scrollToTop} className="h-8 w-8 text-sm" >
          <ArrowUpIcon size={18} className="animate-accordion-up" />
        </IconButton>
      </div>
    </div>
  );
}
