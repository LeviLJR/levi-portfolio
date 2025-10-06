"use client";
import { createClient } from "@/prismicio";
import { NotFoundError } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useState } from "react";
import { CardProjectDocument } from "../../../prismicio-types";
import Link from "next/link";
import { formatProjectDates } from "@/lib/utils";
import { IconButton } from "./IconButton";
import { ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react";

export function ProjectCard({ projectName, className }: { projectName: string, className?: string }) {
  const [project, setProject] = useState<CardProjectDocument | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = createClient();
        const res = await client.getByUID("card_project", projectName);
        setProject(res);
      } catch (error) {
        if (error instanceof NotFoundError) {
          setProject(null);
        } else {
          throw error;
        }
      }
    };
    fetchData();
  }, [projectName]);

  if (!project) {
    return null;
  }

  const uid = project?.uid ?? null;
  const imageField = project?.data?.project_image ?? null;
  const startDate = project?.data?.start_date ?? null;
  const endDate = project?.data?.end_date ?? null;
  const title = project?.data?.project_title ?? "Untitled";
  const techs = project?.data?.techs_project ?? [];
  const descriptionBlock = project?.data?.project_description ?? [];
  const codeLink = project?.data?.links[0]?.code ?? "";
  const demoLink = project?.data?.links[0]?.demo ?? "";

  return (
    <Link href={`/projects/${uid}`}>
      <div className={`relative bg-surface-card cursor-pointer rounded-xl p-6 max-w-[384px] hover:border hover:border-primary-color hover:shadow-[0_0_48px_0_rgba(40,138,255,0.4)] h-full group ${className}`}>
        <PrismicNextImage
          field={imageField}
          imgixParams={{ auto: ["format", "compress"], fit: "max", q: 75 }}
          priority
          className="rounded-t-xl bg-gradient-to-r from-[#6690EC] to-[#9CEEDE]"
        />
        <div className="absolute top-0 right-0 mt-4 mr-4 space-y-4">
          <IconButton
            className="invisible group-hover:visible dark:bg-surface-background dark:text-white"
            onClick={() => {
              if (codeLink) {
                window.open(codeLink, "_blank");
              }
            }}
          >
            <GithubLogoIcon size={24} />
          </IconButton>
          <IconButton
            className="invisible group-hover:visible dark:bg-surface-background dark:text-white"
            onClick={() => {
              if (demoLink) {
                window.open(demoLink, "_blank");
              }
            }}
          >
            <ArrowUpRightIcon size={24}/>
          </IconButton>
        </div>
        <div className="flex justify-between py-4 space-x-2">
          <div className="text-sm text-text-secondary whitespace-nowrap">
            {formatProjectDates(startDate, endDate)}
          </div>
          <div className="flex space-x-2 flex-wrap justify-end">
            {techs.map((item, index) => (
              <i
                key={index}
                className={`devicon-${item.tech?.toLowerCase()}-plain text-primary-color text-xl`}
              />
            ))}
          </div>
        </div>
        <h3 className="text-medium text-xl font-[500] pb-2">{title}</h3>
        {descriptionBlock.map((item, index: number) => (
          <span key={index} className="line-clamp-3">
            {item.details || "Not available"}
          </span>
        ))}
      </div>
    </Link>
  );
}
