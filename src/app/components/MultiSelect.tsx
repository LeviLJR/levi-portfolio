"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronsUpDown, SearchIcon, X } from "lucide-react";

type Option = {label:string,  value: string };

const OPTIONS: Option[] = [
  { label:"Javascript", value: "javascript"},
  { label:"TypeScript", value: "typescript" },
  { label:"React", value: "react" },
  { label:"Next.js", value: "nextjs" },
  { label:"Tailwind CSS", value: "tailwindcss" },
  { label:"Shadcn UI", value: "shadcui" },
  { label:"Figma", value: "figma" },
];

export default function MultiSelect({
  options = OPTIONS,
  value = [],
  onChange,
  placeholder = "Filter by techs…",
  className = "",
}: {
  options?: Option[];
  value?: string[];
  onChange?: (v: string[]) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [hoverIndex, setHoverIndex] = useState(0);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const selectedOptions = useMemo(
    () => options.filter((o) => value?.includes(o.value)),
    [options, value]
  );

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return options;
    return options.filter((o) => o.value.toLowerCase().includes(s));
  }, [options, search]);

  const toggleOption = useCallback(
    (opt: Option) => {
      if (value?.includes(opt.value)) {
        onChange?.(value.filter((v) => v !== opt.value));
      } else {
        onChange?.([...(value ?? []), opt.value]);
      }
    },
    [value, onChange]
  );

  useEffect(() => {
    setHoverIndex(0);
  }, [search, open]);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onKeysDown(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHoverIndex((i) => (i + 1) % filtered.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHoverIndex((i) => (i - 1 + filtered.length) % filtered.length);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const opt = filtered[hoverIndex];
        if (opt) toggleOption(opt);
      }
      if (e.key === "Tab") {
        e.preventDefault();
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    document.addEventListener("keydown", onKeysDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
      document.removeEventListener("keydown", onKeysDown);
    };
  }, [open, filtered, hoverIndex, toggleOption]);

  return (
    <>
      <div className={`relative inline-block text-sm ${className}`}>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full pt-1 px-4 h-10 rounded-lg border dark:text-text-primary hover:bg-card dark:hover:bg-neutral-900 flex justify-between items-center border-gray-400 dark:border-neutral-700"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="py-0.5">
            {selectedOptions.length > 0
              ? `${selectedOptions.length} ${selectedOptions.length === 1 ? "tech" : "tech's"} selected`
              : placeholder}
          </span>
          <ChevronsUpDown size={16} className="opacity-70" />
        </button>
        {open && (
          <div
            ref={panelRef}
            className="absolute z-2 mt-2 w-full rounded-lg border bg-gray-200 border-gray-400 shadow-lg dark:bg-neutral-900 dark:border-neutral-700"
            role="listbox"
            tabIndex={-1}
          >
            <div className="flex justify-center items-center p-2 border-b border-gray-400 dark:border-neutral-700">
              <SearchIcon size={16} className="ml-2" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-md px-3 pt-2 pb-1 outline-none "
                tabIndex={-1}
              />
            </div>

            <ul className="max-h-60 overflow-auto py-1 text-center">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-text-secondary">
                  Tech not found
                </li>
              )}
              {filtered.map((opt, idx) => {
                const isSelected = value?.includes(opt.value);
                const isHovered = idx === hoverIndex;
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => toggleOption(opt)}
                      onMouseEnter={() => setHoverIndex(idx)}
                      className={`flex w-full items-center gap-2 pl-2 py-2 text-left hover:bg-gray-100 dark:hover:bg-neutral-800 ${
                        isHovered
                          ? "bg-gray-100 dark:bg-neutral-800"
                          : "hover:bg-gray-100 dark:hover:bg-neutral-800"
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <Check
                        size={16}
                        className={`text-primary ${isSelected ? "opacity-100" : "opacity-0"}`}
                      />
                      {opt.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      {selectedOptions.length > 0 && (
        <div className="flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden text-background dark:text-text-primary col-span-2">
          {selectedOptions.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => toggleOption(option)} 
              className="opacity-100 px-4 pb-1.5 bg-primary-color rounded-4xl transform-none origin-center flex gap-2 pt-2 items-center hover:brightness-110"
            >
              <i
                className={`devicon-${option.value.toLowerCase()}-plain text-lg`}
              />
              <span className="whitespace-nowrap text-sm">{option.label}</span>
              <X size={16} />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
