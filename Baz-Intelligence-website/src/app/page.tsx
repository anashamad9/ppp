'use client'

import ButtonDemo from "@/components/button-demo";
import { ParticleSphere, type ParticleShape } from "@/components/particle-sphere";
import localFont from "next/font/local";
import Image from "next/image";
import { useState } from "react";

const redaction50Regular = localFont({
  src: "../../public/redaction/Redaction_50-Regular.woff2",
  display: "swap",
});

export default function RootPage() {
  const [particleShape, setParticleShape] = useState<ParticleShape>("solid");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-2 text-black [@media(prefers-color-scheme:dark)]:bg-[#181615] [@media(prefers-color-scheme:dark)]:text-white dark:bg-[#181615] sm:px-3">
      <div className="absolute left-0 right-0 top-4 flex justify-center px-3 sm:top-5">
        <div className="flex items-center justify-center gap-1 sm:gap-1.5">
          <div className="group relative h-4 w-4 shrink-0 sm:h-5 sm:w-5">
            <Image
              src="/Atmet%20light%20mode.svg"
              alt="Atmet Technologies logo"
              fill
              priority
              className="object-contain transition-[transform,filter] duration-300 ease-out group-hover:rotate-3 group-hover:scale-110 group-hover:brightness-110 [@media(prefers-color-scheme:dark)]:hidden"
            />
            <Image
              src="/Atmet%20dark%20mode.svg"
              alt="Atmet Technologies logo"
              fill
              priority
              className="hidden object-contain transition-[transform,filter] duration-300 ease-out group-hover:rotate-3 group-hover:scale-110 group-hover:brightness-110 [@media(prefers-color-scheme:dark)]:block"
            />
          </div>
          <p className={`text-lg leading-5 font-normal text-black [@media(prefers-color-scheme:dark)]:text-white dark:text-white sm:text-2xl sm:leading-7 ${redaction50Regular.className}`}>
            Atmet Technologies
          </p>
        </div>
      </div>
      <section className="flex w-full max-w-[min(100vw,62rem)] flex-col items-center text-left" dir="ltr">
        <div className="-mb-5 flex w-full justify-center sm:-mb-10">
          <ParticleSphere className="h-[27rem] w-[27rem] sm:h-[48rem] sm:w-[48rem]" shape={particleShape} />
        </div>
        <p className="mt-0 w-full max-w-lg text-lg leading-6 font-medium tracking-normal text-pretty sm:text-xl sm:leading-7">
          <span className="text-black [@media(prefers-color-scheme:dark)]:text-white dark:text-white">
            Own your AI Agent.
          </span>{' '}
          <span className="text-black/62 [@media(prefers-color-scheme:dark)]:text-white/62 dark:text-white/62">
            Meta-harnesses, persistent memory, and the infrastructure for agents that actually know your business.
          </span>
        </p>
        <div className="mt-7 flex w-full max-w-lg flex-wrap items-center justify-center gap-2">
          <ButtonDemo
            variant="default"
            size="default"
            className="h-7 rounded-md border-0 bg-black px-2 py-0 text-xs text-white ring-0 shadow-none [text-shadow:none] hover:bg-black/85 [@media(prefers-color-scheme:dark)]:bg-white [@media(prefers-color-scheme:dark)]:text-black [@media(prefers-color-scheme:dark)]:hover:bg-white/90 [&_*]:text-inherit [&_*]:[text-shadow:none] dark:bg-white dark:text-black dark:hover:bg-white/90"
            onClick={() => {
              window.open("/home", "_blank", "noopener,noreferrer");
            }}
            label="Visit Atemt"
          />
          <ButtonDemo
            variant="outline"
            size="default"
            className="h-7 rounded-md border-0 px-2 py-0 text-xs ring-0 shadow-none [text-shadow:none] [&_*]:text-inherit [&_*]:[text-shadow:none]"
            style={{
              backgroundColor: "rgb(41 37 36)",
              color: "rgb(245 245 244)",
            }}
            onClick={() => {
              window.location.href = "https://app.atmetai.com";
            }}
            label="See Atmet App"
          />
        </div>
      </section>
      <div className="absolute bottom-4 right-4 flex rounded-lg bg-black/5 p-1 text-xs font-medium [@media(prefers-color-scheme:dark)]:bg-white/10 dark:bg-white/10">
        <button
          type="button"
          className={`rounded-md px-2.5 py-1.5 transition-colors ${
            particleShape === "solid"
              ? "bg-black text-white [@media(prefers-color-scheme:dark)]:bg-white [@media(prefers-color-scheme:dark)]:text-black dark:bg-white dark:text-black"
              : "text-black/55 hover:text-black [@media(prefers-color-scheme:dark)]:text-white/55 [@media(prefers-color-scheme:dark)]:hover:text-white dark:text-white/55 dark:hover:text-white"
          }`}
          onClick={() => setParticleShape("solid")}
        >
          Solid
        </button>
        <button
          type="button"
          className={`rounded-md px-2.5 py-1.5 transition-colors ${
            particleShape === "cubelets"
              ? "bg-black text-white [@media(prefers-color-scheme:dark)]:bg-white [@media(prefers-color-scheme:dark)]:text-black dark:bg-white dark:text-black"
              : "text-black/55 hover:text-black [@media(prefers-color-scheme:dark)]:text-white/55 [@media(prefers-color-scheme:dark)]:hover:text-white dark:text-white/55 dark:hover:text-white"
          }`}
          onClick={() => setParticleShape("cubelets")}
        >
          3x3x3
        </button>
      </div>
    </main>
  );
}
