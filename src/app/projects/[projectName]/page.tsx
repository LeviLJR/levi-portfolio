"use client";
import { ArrowLeftIcon, GithubLogoIcon } from "@phosphor-icons/react/ssr";
import { IconButton } from "../../components/IconButton";
import { useRouter } from "next/navigation";
import { Button } from "../../components/Button";
import { ArrowUpRightIcon, GlobeSimpleIcon } from "@phosphor-icons/react";
import { createClient } from "@/prismicio";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CardProjectDocument } from "prismicio-types";
import { formatProjectDates } from "@/lib/utils";
import { PrismicNextImage } from "@prismicio/next";

export default function Project() {
  const [project, setProject] = useState<CardProjectDocument | null>(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const client = createClient();
        const res = await client.getByUID(
          "card_project",
          params.projectName as string
        );
        setProject(res);
      } catch {
        setProject(null);
        router.push("/404");
      }
    };
    if (params?.projectName) {
      fetchProject();
    }
  }, [params, router]);

  const imageField = project?.data?.project_image ?? null;
  const startDate = project?.data?.start_date ?? null;
  const endDate = project?.data?.end_date ?? null;
  const title = project?.data?.project_title ?? "Untitled";
  const techs = project?.data?.techs_project ?? [];
  const codeLink = project?.data?.links[0]?.code ?? "";
  const demoLink = project?.data?.links[0]?.demo ?? "";
  const descriptionBlock = project?.data?.project_description ?? [];

  return (
    <div className="mt-20 flex gap-6 max-w-[1200] mx-auto md:p-8 flex-wrap md:flex-nowrap">
      <div className="relative bg-card rounded-xl flex-2/3 md:pb-8">
        <IconButton
          onClick={() => router.back()}
          className="text-text-primary dark:bg-card bg-surface-background hover:brightness-120 absolute top-6 left-6"
        >
          <ArrowLeftIcon size={24} className="bg-transparent" />
        </IconButton>
         <PrismicNextImage
          field={imageField}
          imgixParams={{ auto: ["format", "compress"], fit: "max", q: 75 }}
          priority
          className="md:rounded-t-xl bg-gradient-to-r from-[#6690EC] to-[#9CEEDE]"
        />
        <div className="p-8 px-10 gap-6 flex flex-col">
          <div className="flex justify-between ">
            <span className="text-text-secondary">
              {formatProjectDates(startDate, endDate)}
            </span>
            <div className="flex gap-4">
              {techs.map((item, index) => (
                <i
                  key={index}
                  className={`devicon-${item.tech?.toLowerCase()}-plain text-primary-color text-2xl`}
                />
              ))}
            </div>
          </div>
          <h1 className="font-medium text-3xl xl:text-4xl mt-2">{title}</h1>

          {descriptionBlock.map(
            (item, index: number) =>
              (item.role || item.team) && (
                <div
                  key={index}
                  className="flex flex-col gap-4 text-text-secondary"
                >
                  <p className="flex flex-col gap-1">
                    {item.role && (
                      <span>
                        <strong className="text-text-primary">My role:</strong> {item.role}
                      </span>
                    )}
                    {item.team && (
                      <span>
                        <strong className="text-text-primary">Team:</strong> {item.team}
                      </span>
                    )}
                  </p>
                  <div className="whitespace-pre-line">{item.details}</div>
                </div>
              )
          )}
        </div>
      </div>
      {(codeLink || demoLink) && (
          <div className="flex flex-1/3 flex-col bg-surface-card md:rounded-xl h-fit p-8 gap-6">
            <span className="text-xl">Take a look at this project</span>
            <div className="flex flex-col gap-4">
              {demoLink && (
                <Button
                  className="bg-primary-color dark:text-text-primary"
                  onClick={() => {
                    if (demoLink) {
                      window.open(demoLink, "_blank");
                    }
                  }}
                >
                  <GlobeSimpleIcon size={20} />
                  <span className="min-w-[100px]">Live demo</span>
                  <ArrowUpRightIcon size={20} />
                </Button>
              )}
              {codeLink && (
                <Button
                  className="dark:bg-ternary-color bg-ternary-color"
                  onClick={() => {
                    if (codeLink) {
                      window.open(codeLink, "_blank");
                    }
                  }}
                >
                  <GithubLogoIcon size={20} />
                  <span className="min-w-[100px]">Code</span>
                  <ArrowUpRightIcon size={20} />
                </Button>
              )}
            </div>
          </div>
        )}
    </div>
  );
}
