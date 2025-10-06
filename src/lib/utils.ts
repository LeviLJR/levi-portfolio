import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatProjectDates(
  startDate: string | null,
  endDate: string | null
): string {
  if (!startDate && !endDate) return "N/A";

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  if (!start && end) {
    return end.toLocaleString("en-US", { month: "short", year: "numeric" });
  }
  if (start && !end) {
    return start.toLocaleString("en-US", { month: "short", year: "numeric" });
  }

  if (start && end) {
    const sameYear = start.getFullYear() === end.getFullYear();
    const sameMonth = sameYear && start.getMonth() === end.getMonth();

    if (sameMonth) {
      return start.toLocaleString("en-US", { month: "short", year: "numeric" });
    }
    if (sameYear) {
      return `${start.toLocaleString("en-US", { month: "short" })} – ${end.toLocaleString("en-US", { month: "short", year: "numeric" })}`;
    }
    return `${start.toLocaleString("en-US", { month: "short", year: "numeric" })} – ${end.toLocaleString("en-US", { month: "short", year: "numeric" })}`;
  }

  return "N/A";
}

export function isValidEmail(email: string) {
  const simpleEmailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  const namedEmailRegex = /^[^<>]+<\s*[^\s@]+@[^\s@]+\.[a-z]{2,}\s*>$/i;

  return simpleEmailRegex.test(email) || namedEmailRegex.test(email);
}
