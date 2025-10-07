"use client";
import MultiSelect from "../components/MultiSelect";
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";
import { createClient } from "@/prismicio";
import { CardProjectDocument } from "../../../prismicio-types";
import { NotFoundError } from "@prismicio/client";

export default function Projects() {
  const [filter, setFilter] = useState<string[]>();
  const [initialLoading, setInitialLoading] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [projectsList, setProjectsList] = useState<Array<CardProjectDocument>>(
    []
  );
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const client = createClient();
        const allDocs = await client.getAllByType("card_project");
        const results = allDocs.filter((doc) => {
          const matchesSearch =
            doc.uid?.toLowerCase().includes(search.toLowerCase()) ?? false;

          const matchesFilter =
            !filter || filter.length === 0
              ? true
              : (doc.data.techs_project ?? []).some((item) => {
                  return item?.tech
                    ? filter.includes(item.tech.toLowerCase())
                    : false;
                });
          console.log(matchesFilter);
          return matchesSearch && matchesFilter;
        });

        setProjectsList(results);
      } catch (error) {
        if (error instanceof NotFoundError) {
          setProjectsList([]);
        } else {
          throw error;
        }
      } finally {
        setInitialLoading(false);
      }
    };
    fetchProjects();
  }, [search, filter]);

  return (
    <div className="flex flex-col justify-between items-center mt-26 md:mt-32 mb-auto px-6 md:px-30 py-4 pb-8 md:pb-24 max-w-[1400] mx-auto gap-6 md:gap-10 w-full">
      <div className="flex flex-col md:grid sm:grid-cols-[auto_13.5rem] w-full gap-4 md:gap-6">
       <div className="flex flex-1 justify-center items-center w-full pl-3 pr-4 rounded-lg border border-gray-400 dark:text-text-primary dark:border-neutral-700 focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-500">
          {!search && <SearchIcon size={14} className="text-text-primary mr-2" />}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="h-10 md:h-8 w-full rounded-md pt-1 outline-none text-sm placeholder:text-text-primary "
          />
        </div>
        <MultiSelect value={filter} onChange={setFilter} className="md:w-54" />
      </div>

      {initialLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 py-4 w-full">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="min-h-[325px] md:max-w-[384px] rounded-xl bg-gray-200 dark:bg-surface-card animate-pulse relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-gray-500/10 to-transparent animate-[shimmer_1.5s_infinite]" />
            </div>
          ))}
        </div>
      ) : projectsList.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 py-4 w-full">
          {projectsList.map((projects) => (
            <div key={projects.id}>
              <ProjectCard projectName={projects.uid}/>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8">No projects found</div>
      )}
    </div>
  );
}
