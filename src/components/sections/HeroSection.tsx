import Image from "next/image";
import { siteConfig } from "@/content/site";
import Reveal from "@/components/motion/Reveal";

export default function HeroSection() {
  return (
    <section id="home" className="mt-12 py-8">
      <div className="mx-auto mb-8 w-full max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row items-center gap-4 lg:gap-6">
          <div className="flex-1 space-y-6 text-left">
            <Reveal>
              <h1 className="text-2xl font-normal leading-tight sm:text-3xl lg:text-4xl xl:text-4xl">
                <span className="font-bold tracking-tight text-foreground">
                  {siteConfig.name}
                </span>
              </h1>
              <div className="flex items-center justify-start text-lg sm:text-xl lg:text-2xl xl:text-2xl">
                <span className="text-foreground">{siteConfig.role}</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative group">
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-border shadow-2xl transition-all duration-300 ease-in-out group-hover:scale-105 md:h-36 md:w-36 lg:h-40 lg:w-40">
                <Image
                  src="/assets/pfp.webp"
                  alt="Profile Photo"
                  fill
                  sizes="(max-width: 768px) 112px, 160px"
                  className="object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-muted/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>

              <div className="absolute -top-6 -right-6 h-5 w-5 animate-pulse rounded-full bg-muted shadow-lg"></div>
              <div className="absolute -bottom-6 -left-6 h-5 w-5 animate-bounce rounded-full bg-muted shadow-lg"></div>
              <div className="absolute top-1/2 -left-8 h-4 w-4 animate-ping rounded-full bg-muted shadow-lg"></div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-2 max-w-2xl text-base font-normal leading-relaxed text-black sm:text-lg lg:mx-0 lg:text-xl dark:text-white">
            I Build what I love and love what I Built. I am Good at What I Do.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
