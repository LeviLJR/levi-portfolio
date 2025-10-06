"use client";
import { useRouter } from "next/navigation";
import { Button } from "./components/Button";
import { ArrowLeft, HomeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <div className="flex-1 flex mx-auto justify-center items-center">
      <div className="flex flex-col-reverse md:flex-row items-center gap-2 md:gap-20 px-12">
        <div className="space-y-2 max-w-[350px]">
          <h2 className="pb-4 text-2xl">Ops, this page was not found</h2>
          <p>
            Looks like you got lost... Try going back to the last page or
            accessing home.
          </p>
          <div className="flex gap-4 pt-4">
            <Button
              onClick={() => router.back()}
              className="bg-primary-color text-surface-background dark:text-text-primary"
            >
              <ArrowLeft size={18} className="bg-transparent" />
              Go back
            </Button>
            <Button
              onClick={() => router.push('/')}
              className="bg-primary-color text-surface-background dark:text-text-primary"
            >
              <HomeIcon size={18} className="bg-transparent" />
              Return Home
            </Button>
          </div>
        </div>
        <h1 className="text-8xl flex items-center font-bold text-primary-color">
          4
          <Image src="/planet.svg" alt="planet" width={150} height={60} />4
        </h1>
      </div>
    </div>
  );
}
