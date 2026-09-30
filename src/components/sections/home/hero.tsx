import Image from "next/image";

import { Button } from "@/components/ui/button";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { GlowLayer, type GlowConfig } from "@/components/ui/glow";
import { GrainTexture } from "@/components/ui/grain-texture";
import { heroContent } from "@/content/home";
import { ASSETS } from "@/config/assets";
import { FEATURES } from "@/config/features";
import { fluid } from "@/lib/fluid";

import { HeroReelMarquee } from "./hero-reel-marquee";
import DotGrid from "./dot-grid";

export const HERO_EDGE_GLOWS: GlowConfig[] = [
  { left: [-110, -285], top: [45, 116], width: [160, 402], height: [165, 413], blur: [45, 70], intensity: 0.28, secondary: true, blend: "plus-lighter" },
  { right: [-110, -285], top: [45, 116], width: [160, 402], height: [165, 413], blur: [45, 70], intensity: 0.28, secondary: true, blend: "plus-lighter" },
  { left: [-70, -172], top: [-25, -67], width: [260, 657], height: [135, 340], blur: [50, 80], intensity: 0.5, blend: "lighten", rotate: "-rotate-13.57" },
  { right: [0, -1], top: [110, 268], width: [260, 657], height: [135, 340], blur: [50, 80], intensity: 0.42, blend: "lighten", rotate: "-rotate-13.57" },
];


export function Hero() {
  const { eyebrow, line1, line2, subtext, primaryCta, secondaryCta, reels } = heroContent;

  return (
    <section className="relative isolate min-h-170 h-auto md:h-196.75 overflow-clip bg-bg max-[640px]:pt-25">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <GlowLayer glows={HERO_EDGE_GLOWS} />

        <div className="absolute inset-0 w-full h-full opacity-80">
          <DotGrid
            dotSize={5}
            gap={16}
            baseColor="#2F293A"
            activeColor="var(--color-primary-light)"
            proximity={35}
            shockRadius={50}
            shockStrength={1.6}
            resistance={750}
            returnDuration={0.5}
          />
        </div>
      </div>

      <GrainTexture opacity={0.1} blend="soft-light" />

      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-clip md:block">
        <HeroReelMarquee
          items={reels.left}
          direction="up"
          className="left-[21.13px] top-[-101.61px] h-[934.24px] w-[237.338px] -rotate-[10deg]"
        />
        <HeroReelMarquee
          items={reels.right}
          direction="down"
          className="right-[21.25px] top-[-60.73px] h-[934.24px] w-[237.338px] rotate-[10deg]"
        />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hidden md:block">
          <div className="absolute -inset-x-2.5 top-[-22.97px] h-[407.078px] bg-[linear-gradient(to_bottom,var(--color-bg),rgba(11,10,11,0))]" />
          <div className="absolute -inset-x-2 top-[347.73px] h-[439.27px] bg-[linear-gradient(to_bottom,rgba(11,10,11,0),var(--color-bg))]" />
        </div>
        <div className="absolute inset-0 bg-[rgba(11,10,11,0.15)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center pb-16 md:absolute md:inset-x-0 md:pb-0">
        <div style={{ marginTop: fluid(100, 198) }}>
          <EyebrowBadge>{eyebrow}</EyebrowBadge>
        </div>

        <h1
          className="px-4 text-center font-space font-bold leading-normal text-white"
          style={{ fontSize: fluid(32, 56), marginTop: fluid(14, 26) }}
        >
          <span className="relative block">
            {line1.prefix}
            <span className="text-primary">{line1.accent}</span>
            <Image
              aria-hidden
              src={ASSETS.home.hero.scriptUnderline}
              alt=""
              width={199}
              height={35}
              className="pointer-events-none absolute left-[calc(50%+22px)] top-13 hidden h-8.75 w-49.75 rotate-[180.65deg] md:block"
            />
          </span>
          <span className="mt-2 block font-vastago">
            {line2.prefix}{" "}
            <span
              className="font-mary font-normal leading-0 text-primary"
              style={{ fontSize: fluid(56, 122.778) }}
            >
              {line2.script}
            </span>
          </span>
        </h1>

        <p
          className="w-full max-w-lg px-4 text-center font-inter font-normal leading-normal text-white"
          style={{ fontSize: fluid(17, 24), marginTop: fluid(22, 42) }}
        >
          {subtext}
        </p>

        <div
          className="flex flex-col items-center gap-3 md:flex-row md:gap-5.5"
          style={{ marginTop: fluid(28, 54) }}
        >
          <Button href={primaryCta.href}>{primaryCta.label}</Button>
          {FEATURES.caseStudies && (
            <Button variant="secondary" href={secondaryCta.href}>
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
