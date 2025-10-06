"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TypingMotion() {
  const fullText = "Hi, I’m Levi";
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [index, setIndex] = useState(0);
   const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) return; 
    const interval = setInterval(() => {
      if (!deleting) {
        if (index < fullText.length) {
          setDisplayed((prev) => prev + fullText[index]);
          setIndex((prev) => prev + 1);
        } else {
          setPause(true);
          setTimeout(() => {
            setDeleting(true);
            setPause(false);
          }, 3000);
        }
      } else {
        if (index > 0) {
          setDisplayed((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        } else {
          setPause(true);
          setTimeout(() => {
            setDeleting(false);
            setPause(false);
          }, 1000);
        }
      }
    }, 150); 

    return () => clearInterval(interval);
  }, [index, deleting, fullText, pause]);

  return (
    <h1 className="relative flex text-4xl font-heading items-center w-fit">
      <span
        className="max-w-fit overflow-hidden whitespace-nowrap inline-block 
                   bg-linear-to-r from-0% to-[#1C7AE7] dark:to-[#F7AF60] 
                   from-[#DE6F42] dark:from-[#8EC0FC] to-40% xl:to-28% 2xl:to-20% 
                   bg-clip-text text-transparent"
      >
        {displayed}
      </span>
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          ease: "linear",
        }}
        className="mb-1 font-heebo text-text-primary text-[2.5rem] leading-none"
      >
        |
      </motion.span>
    </h1>
  );
}
