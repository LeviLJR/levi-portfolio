import Image from "next/image";
import photo from "../../../public/instc-levi.jpeg";
import boyChair from "../../../public/boy-chair.png";
import boyComputer from "../../../public/boy-computer.png";
import { ArrowDown } from "../../assets/arrow-down";
import { Button } from "../components/Button";
import { ReadCvLogoIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { Sparks } from "@/assets/sparks";
import { Star } from "@/assets/star";
import { IconButton } from "../components/IconButton";
import Link from "next/link";
import { ProjectCard } from "../components/ProjectCard";

import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { ContactForm } from "../components/ContactForm";
import TypingMotion from "../components/TypinMotion";

export default async function Home() {
  const client = createClient();
  const resume = (await client.getAllByUIDs("media", ["resume"])) ?? null;
  return (
    <div id="start" className="sm:scroll-mt-35">
      <section className="flex pt-4 pb-8 md:py-20 mt-20 m-auto items-center justify-center bg-[url('/watercolor-sky.png')] bg-origin-border bg-center bg-cover">
        <div className="flex flex-col-reverse md:flex-row bg-surface-primary backdrop-blur-md rounded-xl shadow-lg w-[90dvw] lg:w-[80dvw] max-w-[1023] px-6 py-8 md:px-12 md:py-15 lg:px-15 lg:py-17.5 bg-contain gap-8 md:gap-16 h-auto justify-between ">
          <div className="flex flex-col gap-8 justify-center md:max-w-[520]">
            <TypingMotion/>
            <h2 className="font-medium text-2xl">
              Full-stack developer and innovation enthusiast
            </h2>
            <p className="text-text-secondary">
              Over 2 years of experience in the tech industry through freelance
              projects, academic work, and junior company activities. I
              specialize in building innovative web applications using
              technologies such as React, TypeScript, and Node.js.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button className="bg-ternary-color">
                <ReadCvLogoIcon size={24} />
                {resume && <PrismicNextLink field={resume[0].data.link} />}
              </Button>

              <Link href="#contact">
                <Button className="group bg-quaternary-color">
                  <span>Get in touch</span>
                  <ArrowRightIcon
                    size={24}
                    className="animate-pulse group-hover:animate-none"
                  />
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-auto relative items-center flex justify-center">
            <Image
              src={photo}
              draggable={false}
              alt="Levi's instant photo shoot"
              className="md:object-cover md:min-w-50 max-w-[200] md:max-w-[250] rounded-2xl shadow-md/30 md:rotate-1"
            />
            <ArrowDown
              width={64}
              height={85}
              className="hidden md:block absolute bottom-[-30] left-[-70] fill-[#2C3259] dark:fill-ternary-color"
            />
          </div>
        </div>
      </section>
      <section
        id="about"
        className="flex justify-center items-center px-6 py-8 pb-12 md:py-18 md:px-20 mx-auto my-15 w-[90dvw] rounded-xl bg-[linear-gradient(139deg,_#EBB67D_-34.48%,_#8EC0FC_88.35%)] sm:scroll-mt-20 md:scroll-mt-35"
      >
        <div className="flex flex-col md:flex-row justify-center items-center md:max-w-[987] lg:gap-10">
          <Image
            src={boyChair}
            draggable={false}
            alt="Boy sitting on a chair"
            className="md:object-contain max-w-[300] lg:max-w-[350]"
          />
          <div className="space-y-8 md:max-w-[580] ">
            <div className="space-x-3 md:space-x-6">
              <i className="devicon-react-original text-primary-color dark:text-secondary text-4xl" />
              <i className="devicon-nextjs-plain text-primary-color dark:text-secondary text-4xl" />
              <i className="devicon-nodejs-plain text-primary-color dark:text-secondary text-4xl" />
              <i className="devicon-typescript-plain text-primary-color dark:text-secondary text-4xl" />
              <i className="devicon-tailwindcss-plain text-primary-color dark:text-secondary text-4xl" />
              <i className="devicon-figma-plain text-primary-color dark:text-secondary text-4xl" />
            </div>
            <div className="flex flex-col space-y-4">
              <h1 className="font-heading text-secondary-color dark:text-quinary-color">
                About me
              </h1>
              <h2 className="font-medium text-2xl dark:text-card">
                I’m a passionate software developer looking for my first
                international opportunity
              </h2>
              <p className="text-text-secondary dark:text-contact">
                Beyond coding, I&apos;m a coffee enthusiast, a dog lover, and a
                self-taught pianist and artist who enjoys spending my free time
                doodling and playing songs. I am currently seeking
                opportunities to bring my skills and enthusiasm to a tech
                company in the United States or Europe and am excited about the
                prospect of relocating to pursue new challenges.
              </p>
            </div>
            <Button className="bg-primary-color dark:bg-secondary-color dark:text-text-primary mr-auto">
              <ReadCvLogoIcon size={24} />
              <PrismicNextLink field={resume[0].data.link} />
            </Button>
          </div>
        </div>
      </section>
      <section className="relative flex flex-col justify-center items-center py-8 mx-auto my-15 lg:w-[95dvw] gap-10">
        <Sparks height={64} className="absolute top-[60] left-[2] md:left-[40]" />
        <Star height={64} className="absolute bottom-[-10] right-[5]" />
        <div>
          <h1 className="font-heading text-primary-color text-center dark:text-ternary-color">
            Projects
          </h1>
          <h2>Take a look at my highlighted projects</h2>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap gap-8 justify-center py-4 px-6 md:p-0">
          <ProjectCard projectName="youbloom" />
          <ProjectCard projectName="fokus" />
          <ProjectCard projectName="utask" />
          <ProjectCard projectName="utask2" />
        </div>
        <Link href="/projects">
          <Button className="bg-primary-color dark:bg-secondary-color dark:text-text-primary mx-auto mt-4 flex items-center border-1 border-transparent hover:border-blue-600 dark:hover:border-blue-800">
            See all
            <ArrowRightIcon size={24} />
          </Button>
        </Link>
      </section>
      <section
        id="contact"
        className="bg-linear-[145deg,#DE6F42_-27.41%,#595E96_90.24%] py-8 md:py-18 justify-center flex scroll-mt-10 md:scroll-mt-20"
      >
        <div className="bg-contact rounded-xl flex flex-col md:flex-row justify-between space-x-10 py-10 w-[90dvw] max-w-[1200] px-6 md:px-12 lg:px-20 xl:px-30 md:gap-0">
          <div className="md:max-w-[440] w-full">
            <h1 className="font-heading text-quaternary-color">Contact</h1>
            <h2 className="text-2xl mt-2">
              Enjoyed my work? Let’s work together
            </h2>
            <p className="text-text-secondary mt-4">
              I’m always up for a chat. Pop me an email at
              leviliberman.dev@gmail.com or give me a shout on social media.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://github.com/leviljr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton className="dark:bg-surface-background bg-ternary-color dark:text-text-primary">
                  <i className="devicon-github-original"></i>
                </IconButton>
              </a>
              <a
                href="https://linkedin.com/in/leviljr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton className="dark:bg-surface-background bg-ternary-color dark:text-text-primary">
                  <i className="devicon-linkedin-plain"></i>
                </IconButton>
              </a>
            </div>
            <div className="justify-center flex pt-8 md:pt-4">
              <Image
                src={boyComputer}
                draggable={false}
                alt="Boy with a computer"
                className="md:object-contain max-w-[280] lg:max-w-[320] scale-x-[-1] md:scale-x-[1] md:mr-[15%]"
              />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
