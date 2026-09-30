import { SectionHeading } from "@/components/ui/section-heading";
import { brandsContent } from "@/content/home";
import { fluid } from "@/lib/fluid";

import { BrandMarqueeRow } from "./brand-marquee-row";

export function Brands() {
  const { headingLines, headingHighlight, headingAccent, logos } = brandsContent;

  return (
    <div className="relative isolate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 z-30"
        style={{ top: fluid(160, 357), bottom: fluid(-160, -280) }}
      >
        <div
          className="absolute left-[calc(50%+60px)] top-37.5 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(var(--color-glow-primary-rgb)/0.48)_0%,transparent_70%)] mix-blend-plus-lighter pointer-events-none"
          style={{ transform: "translate(-50%)", height: fluid(90, 160), width: fluid(190, 380), filter: `blur(${fluid(24, 40)})` }}
        />
      </div>

      <section
        className="relative isolate overflow-hidden bg-bg"
        style={{ paddingBottom: fluid(260, 420), paddingTop: fluid(32, 91) }}
      >
        <div className="flex flex-col items-center">
          <SectionHeading
            lines={headingLines}
            accent={headingAccent}
            highlight={headingHighlight}
            accentWidth={fluid(78, 136)}
            accentGap={fluid(7, 12)}
            headingClassName="md:leading-[88px] md:[--hl-bottom:17px] md:[--hl-height:11px] md:[--accent-drop:-34px]"
            align="center"
          />
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0" style={{ top: fluid(160, 357) }}>
          <div
            className="arc-glow absolute left-1/2 top-37.5 -translate-x-1/2 rounded-full"
            style={{
              "--arc-glow-opacity": 0.7,
              "--arc-inset-opacity": 0.4,
              height: fluid(1700, 6155),
              width: fluid(1700, 6155),
            } as React.CSSProperties}
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden"
          style={{ top: fluid(160, 357) }}
        >
          <BrandMarqueeRow
            items={logos}
            direction="left"
            className="left-0 top-37.5 h-62.5 w-full"
          />
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[-5%] w-[23%] bg-gradient-to-r from-bg via-bg to-transparent z-20 blur-[10px]" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-[-5%] w-[23%] bg-gradient-to-l from-bg via-bg to-transparent z-20 blur-[10px]" />
      </section>
    </div>
  );
}
