"use client";
import { Logo } from "../../assets/logo";
import Link from "next/link";
import { MoonStarsIcon, SunDimIcon } from "@phosphor-icons/react";
import { NavItem } from "./NavItem";
import { IconButton } from "./IconButton";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const navItems = [
    { href: "/#start", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/#contact", label: "Contact" },
  ];

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="flex bg-surface-background justify-between items-center md:px-20 py-4 shadow-lg shadow-sidebar-ring fixed top-0 w-full h-20 z-[3]">
      <div className="flex bg-surface-background justify-between items-center px-4 md:px-0  shadow-lg shadow-sidebar-ring md:shadow-none top-0 w-full h-20 z-[3]">
        <Link href="/" className="shrink-0">
          <Logo
            width={102}
            height={20.4}
            className="fill-foreground dark:fill-zinc-50"
          />
        </Link>
        <IconButton
          ref={buttonRef}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          className="bg-transparent dark:bg-transparent md:hidden"
        >
          <div
            className="whitespace-nowrap rounded-md text-sm font-medium 
          ring-offset-background transition-colors 
          focus-visible:outline-none focus-visible:ring-2 
          focus-visible:ring-ring focus-visible:ring-offset-2 
          disabled:pointer-events-none disabled:opacity-50 
          hover:bg-accent hover:text-accent-foreground 
          h-12 w-12 md:h-10 md:w-10 flex flex-col items-center justify-center"
          >
            <motion.div
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.68, -0.55, 0.27, 1.55] }}
              className="w-6 h-[0.1875rem] rounded-sm bg-foreground origin-center"
            />

            <motion.div
              animate={
                menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2, ease: [0.68, -0.55, 0.27, 1.55] }}
              className="w-6 h-[0.1875rem] my-1 rounded-sm bg-foreground origin-center"
            />

            <motion.div
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.68, -0.55, 0.27, 1.55] }}
              className="w-6 h-[0.1875rem] rounded-sm bg-foreground origin-center"
            />
          </div>
        </IconButton>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 h-screen backdrop-blur-sm bg-[rgba(0,0,0,0.2)] transition-opacity duration-300 ease-in-out z-[-1] md:invisible md:opacity-0"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              key="panel"
              ref={panelRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-20 right-0 p-6 pt-12 flex flex-col items-end w-[70%] h-screen bg-surface-card shadow-md gap-10 md:hidden z-[45]"
            >
              <nav className="flex flex-col md:flex-row gap-3 md:gap-6 text-text-primary text-right">
                {navItems.map(({ href, label }) => (
                  <NavItem
                    key={href}
                    href={href}
                    label={label}
                    className="ml-auto md:mx-auto"
                    onClick={() => setMenuOpen(false)}
                  />
                ))}
              </nav>
              <div className="border-b border-text-secondary opacity-35 w-full md:hidden"></div>
              <div className="flex gap-3 md:gap-6 ">
                <IconButton
                  onClick={() => {
                    setMenuOpen(false);
                    setTheme(theme === "light" ? "dark" : "light");
                  }}
                  aria-label="Toggle theme"
                >
                  <MoonStarsIcon className="size-6 absolute scale-100 dark:scale-0" />
                  <SunDimIcon className="size-6 scale-0 dark:scale-100" />
                </IconButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="hidden md:flex items-center gap-6">
        <nav className="flex gap-6 text-text-primary">
          {navItems.map(({ href, label }) => (
            <NavItem key={href} href={href} label={label} />
          ))}
        </nav>
        <IconButton
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Toggle theme"
          className="relative"
        >
          <motion.div
            key="moon"
            initial={{ rotate: 0, scale: 1, opacity: 1 }}
            animate={
              theme === "dark"
                ? { rotate: 0, scale: 1, opacity: 1 }
                : { rotate: 90, scale: 0, opacity: 0 }
            }
            transition={{
              duration: 0.4,
              ease: [0.68, -0.55, 0.27, 1.55],
            }}
            className="absolute"
          >
            <MoonStarsIcon className="size-6" />
          </motion.div>
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={
              theme === "light"
                ? { rotate: 0, scale: 1, opacity: 1 }
                : { rotate: -90, scale: 0, opacity: 0 }
            }
            transition={{
              duration: 0.4,
              ease: [0.68, -0.55, 0.27, 1.55],
            }}
          >
            <SunDimIcon className="size-6 text-text-foreground" />
          </motion.div>
        </IconButton>
      </div>
    </header>
  );
}
