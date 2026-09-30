import React from "react";
import Image from "next/image";
import { Heart, Sparkles, Laptop, Percent } from "lucide-react";
import { ASSETS } from "@/config/assets";
import { socialMediaIllustrationContent as copy } from "@/content/service-illustrations";
import { MediaFrame } from "@/components/sections/service/media/media-frame";

export function SocialMediaPageMedia() {
  return (
    <MediaFrame width={680} height={520} innerClassName="relative select-none bg-transparent">

      <style>{`
        .orbit-system-drift {
          animation: systemDrift 14s ease-in-out infinite;
        }

        @keyframes systemDrift {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        /* ORBIT 1: CARD 1 (Starts at t=0, inclined 18deg) */
        @keyframes orbit1Card1 {
          0% {
            transform: translate(573px, 336px) translate(-50%, -50%) scale(1.05);
            z-index: 28;
            opacity: 0.95;
            filter: blur(0px);
            box-shadow: 0 8px 25px rgba(168, 85, 247, 0.25);
          }
          12.5% {
            transform: translate(489px, 361px) translate(-50%, -50%) scale(1.15);
            z-index: 30;
            opacity: 1.0;
            filter: blur(0px);
            box-shadow: 0 12px 35px rgba(168, 85, 247, 0.35);
          }
          25% {
            transform: translate(318px, 327px) translate(-50%, -50%) scale(1.05);
            z-index: 28;
            opacity: 0.95;
            filter: blur(0px);
            box-shadow: 0 8px 25px rgba(168, 85, 247, 0.25);
          }
          37.5% {
            transform: translate(175px, 253px) translate(-50%, -50%) scale(0.92);
            z-index: 25;
            opacity: 0.85;
            filter: blur(0px);
          }
          50% {
            transform: translate(107px, 184px) translate(-50%, -50%) scale(0.80);
            z-index: 10;
            opacity: 0.60;
            filter: blur(1px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
          62.5% {
            transform: translate(191px, 159px) translate(-50%, -50%) scale(0.72);
            z-index: 10;
            opacity: 0.45;
            filter: blur(1.5px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
          75% {
            transform: translate(362px, 193px) translate(-50%, -50%) scale(0.80);
            z-index: 10;
            opacity: 0.60;
            filter: blur(1px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
          87.5% {
            transform: translate(505px, 267px) translate(-50%, -50%) scale(0.92);
            z-index: 15;
            opacity: 0.85;
            filter: blur(0px);
          }
          100% {
            transform: translate(573px, 336px) translate(-50%, -50%) scale(1.05);
            z-index: 28;
            opacity: 0.95;
            filter: blur(0px);
            box-shadow: 0 8px 25px rgba(168, 85, 247, 0.25);
          }
        }

        /* ORBIT 1: CARD 2 (Starts at t=pi, inclined 18deg) */
        @keyframes orbit1Card2 {
          0% {
            transform: translate(107px, 184px) translate(-50%, -50%) scale(0.80);
            z-index: 10;
            opacity: 0.60;
            filter: blur(1px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
          12.5% {
            transform: translate(191px, 159px) translate(-50%, -50%) scale(0.72);
            z-index: 10;
            opacity: 0.45;
            filter: blur(1.5px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
          25% {
            transform: translate(362px, 193px) translate(-50%, -50%) scale(0.80);
            z-index: 10;
            opacity: 0.60;
            filter: blur(1px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
          37.5% {
            transform: translate(505px, 267px) translate(-50%, -50%) scale(0.92);
            z-index: 15;
            opacity: 0.85;
            filter: blur(0px);
          }
          50% {
            transform: translate(573px, 336px) translate(-50%, -50%) scale(1.05);
            z-index: 28;
            opacity: 0.95;
            filter: blur(0px);
            box-shadow: 0 8px 25px rgba(168, 85, 247, 0.25);
          }
          62.5% {
            transform: translate(489px, 361px) translate(-50%, -50%) scale(1.15);
            z-index: 30;
            opacity: 1.0;
            filter: blur(0px);
            box-shadow: 0 12px 35px rgba(168, 85, 247, 0.35);
          }
          75% {
            transform: translate(318px, 327px) translate(-50%, -50%) scale(1.05);
            z-index: 28;
            opacity: 0.95;
            filter: blur(0px);
            box-shadow: 0 8px 25px rgba(168, 85, 247, 0.25);
          }
          87.5% {
            transform: translate(175px, 253px) translate(-50%, -50%) scale(0.92);
            z-index: 25;
            opacity: 0.85;
            filter: blur(0px);
          }
          100% {
            transform: translate(107px, 184px) translate(-50%, -50%) scale(0.80);
            z-index: 10;
            opacity: 0.60;
            filter: blur(1px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
        }

        /* ORBIT 2: CARD 3 (Starts at t=0, inclined -18deg) */
        @keyframes orbit2Card1 {
          0% {
            transform: translate(573px, 184px) translate(-50%, -50%) scale(0.80);
            z-index: 10;
            opacity: 0.60;
            filter: blur(1px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
          12.5% {
            transform: translate(520px, 254px) translate(-50%, -50%) scale(0.92);
            z-index: 15;
            opacity: 0.85;
            filter: blur(0px);
          }
          25% {
            transform: translate(362px, 327px) translate(-50%, -50%) scale(1.05);
            z-index: 28;
            opacity: 0.95;
            filter: blur(0px);
            box-shadow: 0 8px 25px rgba(168, 85, 247, 0.25);
          }
          37.5% {
            transform: translate(191px, 361px) translate(-50%, -50%) scale(1.15);
            z-index: 30;
            opacity: 1.0;
            filter: blur(0px);
            box-shadow: 0 12px 35px rgba(168, 85, 247, 0.35);
          }
          50% {
            transform: translate(107px, 336px) translate(-50%, -50%) scale(1.05);
            z-index: 28;
            opacity: 0.95;
            filter: blur(0px);
            box-shadow: 0 8px 25px rgba(168, 85, 247, 0.25);
          }
          62.5% {
            transform: translate(160px, 266px) translate(-50%, -50%) scale(0.92);
            z-index: 25;
            opacity: 0.85;
            filter: blur(0px);
          }
          75% {
            transform: translate(318px, 193px) translate(-50%, -50%) scale(0.80);
            z-index: 10;
            opacity: 0.60;
            filter: blur(1px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
          87.5% {
            transform: translate(489px, 159px) translate(-50%, -50%) scale(0.72);
            z-index: 10;
            opacity: 0.45;
            filter: blur(1.5px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
          100% {
            transform: translate(573px, 184px) translate(-50%, -50%) scale(0.80);
            z-index: 10;
            opacity: 0.60;
            filter: blur(1px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
        }

        /* ORBIT 2: CARD 4 (Starts at t=pi, inclined -18deg) */
        @keyframes orbit2Card2 {
          0% {
            transform: translate(107px, 336px) translate(-50%, -50%) scale(1.05);
            z-index: 28;
            opacity: 0.95;
            filter: blur(0px);
            box-shadow: 0 8px 25px rgba(168, 85, 247, 0.25);
          }
          12.5% {
            transform: translate(160px, 266px) translate(-50%, -50%) scale(0.92);
            z-index: 25;
            opacity: 0.85;
            filter: blur(0px);
          }
          25% {
            transform: translate(318px, 193px) translate(-50%, -50%) scale(0.80);
            z-index: 10;
            opacity: 0.60;
            filter: blur(1px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
          37.5% {
            transform: translate(489px, 159px) translate(-50%, -50%) scale(0.72);
            z-index: 10;
            opacity: 0.45;
            filter: blur(1.5px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
          50% {
            transform: translate(573px, 184px) translate(-50%, -50%) scale(0.80);
            z-index: 10;
            opacity: 0.60;
            filter: blur(1px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
          62.5% {
            transform: translate(520px, 254px) translate(-50%, -50%) scale(0.92);
            z-index: 15;
            opacity: 0.85;
            filter: blur(0px);
          }
          75% {
            transform: translate(362px, 327px) translate(-50%, -50%) scale(1.05);
            z-index: 28;
            opacity: 0.95;
            filter: blur(0px);
            box-shadow: 0 8px 25px rgba(168, 85, 247, 0.25);
          }
          87.5% {
            transform: translate(191px, 361px) translate(-50%, -50%) scale(1.15);
            z-index: 30;
            opacity: 1.0;
            filter: blur(0px);
            box-shadow: 0 12px 35px rgba(168, 85, 247, 0.35);
          }
          100% {
            transform: translate(107px, 336px) translate(-50%, -50%) scale(1.05);
            z-index: 28;
            opacity: 0.95;
            filter: blur(0px);
            box-shadow: 0 8px 25px rgba(168, 85, 247, 0.25);
          }
        }

        .anim-social-orbit1-c1 { animation: orbit1Card1 22s linear infinite; }
        .anim-social-orbit1-c2 { animation: orbit1Card2 22s linear infinite; }
        .anim-social-orbit2-c1 { animation: orbit2Card1 22s linear infinite; }
        .anim-social-orbit2-c2 { animation: orbit2Card2 22s linear infinite; }
      `}</style>

      <div className="orbit-system-drift absolute inset-0 w-full h-full">

        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 680 520">
          <ellipse
            cx="340"
            cy="260"
            rx="245"
            ry="70"
            stroke="rgba(168, 85, 247, 0.12)"
            strokeWidth="1.5"
            fill="none"
            style={{ transform: "rotate(18deg)", transformOrigin: "340px 260px" }}
          />
          <ellipse
            cx="340"
            cy="260"
            rx="245"
            ry="70"
            stroke="rgba(168, 85, 247, 0.12)"
            strokeWidth="1.5"
            fill="none"
            style={{ transform: "rotate(-18deg)", transformOrigin: "340px 260px" }}
          />
        </svg>

        <div className="anim-social-orbit1-c1 absolute left-0 top-0 w-[130px] h-[115px] rounded-xl border border-purple-500/20 bg-black/80 p-2.5 backdrop-blur-md flex flex-col justify-between transition-all select-none">
          <div className="flex items-center justify-between leading-none">
            <span className="truncate font-space text-[9px] font-bold text-white">{copy.audiences[0].title}</span>
            <Heart className="h-2.5 w-2.5 text-purple-400 fill-purple-400/20 shrink-0" />
          </div>
          <div className="flex items-center -space-x-1.5 my-1">
            <div className="relative h-5.5 w-5.5 rounded-full overflow-hidden border border-purple-500/30 bg-purple-950">
              <Image src={ASSETS.services.socialMediaPageMedia.youImage} alt={copy.creatorAlt} fill sizes="22px" className="object-cover" />
            </div>
            <div className="relative h-5.5 w-5.5 rounded-full overflow-hidden border border-purple-500/30 bg-purple-950">
              <Image src={ASSETS.services.socialMediaPageMedia.creatorOne} alt={copy.creatorAlt} fill sizes="22px" className="object-cover" />
            </div>
          </div>
          <span className="text-[6.5px] text-purple-300/50 leading-none truncate">{copy.audiences[0].interests}</span>
          <div className="mt-1 flex items-center justify-center bg-purple-500/10 border border-purple-500/15 py-0.5 rounded text-[8px] font-space font-bold text-purple-300 leading-none gap-0.5">
            <span>▲</span> {copy.audiences[0].growth}
          </div>
        </div>

        <div className="anim-social-orbit1-c2 absolute left-0 top-0 w-[130px] h-[115px] rounded-xl border border-purple-500/20 bg-black/80 p-2.5 backdrop-blur-md flex flex-col justify-between transition-all select-none">
          <div className="flex items-center justify-between leading-none">
            <span className="truncate font-space text-[9px] font-bold text-white">{copy.audiences[1].title}</span>
            <Heart className="h-2.5 w-2.5 text-purple-400 fill-purple-400/20 shrink-0" />
          </div>
          <div className="flex items-center -space-x-1.5 my-1">
            <div className="relative h-5.5 w-5.5 rounded-full overflow-hidden border border-purple-500/30 bg-purple-950">
              <Image src={ASSETS.services.socialMediaPageMedia.youImage} alt={copy.creatorAlt} fill sizes="22px" className="object-cover" />
            </div>
            <div className="relative h-5.5 w-5.5 rounded-full overflow-hidden border border-purple-500/30 bg-purple-950">
              <Image src={ASSETS.services.socialMediaPageMedia.creatorTwo} alt={copy.creatorAlt} fill sizes="22px" className="object-cover" />
            </div>
          </div>
          <span className="text-[6.5px] text-purple-300/50 leading-none truncate">{copy.audiences[1].interests}</span>
          <div className="mt-1 flex items-center justify-center bg-purple-500/10 border border-purple-500/15 py-0.5 rounded text-[8px] font-space font-bold text-purple-300 leading-none gap-0.5">
            <span>▲</span> {copy.audiences[1].growth}
          </div>
        </div>

        <div className="anim-social-orbit2-c1 absolute left-0 top-0 w-[130px] h-[115px] rounded-xl border border-purple-500/20 bg-black/80 p-2.5 backdrop-blur-md flex flex-col justify-between transition-all select-none">
          <div className="flex items-center justify-between leading-none">
            <span className="truncate font-space text-[9px] font-bold text-white">{copy.audiences[2].title}</span>
            <Heart className="h-2.5 w-2.5 text-purple-400 fill-purple-400/20 shrink-0" />
          </div>
          <div className="flex items-center -space-x-1.5 my-1">
            <div className="relative h-5.5 w-5.5 rounded-full overflow-hidden border border-purple-500/30 bg-purple-950">
              <Image src={ASSETS.services.socialMediaPageMedia.creatorOne} alt={copy.creatorAlt} fill sizes="22px" className="object-cover" />
            </div>
            <div className="relative h-5.5 w-5.5 rounded-full overflow-hidden border border-purple-500/30 bg-purple-950">
              <Image src={ASSETS.services.socialMediaPageMedia.creatorTwo} alt={copy.creatorAlt} fill sizes="22px" className="object-cover" />
            </div>
          </div>
          <span className="text-[6.5px] text-purple-300/50 leading-none truncate">{copy.audiences[2].interests}</span>
          <div className="mt-1 flex items-center justify-center bg-purple-500/10 border border-purple-500/15 py-0.5 rounded text-[8px] font-space font-bold text-purple-300 leading-none gap-0.5">
            <span>▲</span> {copy.audiences[2].growth}
          </div>
        </div>

        <div className="anim-social-orbit2-c2 absolute left-0 top-0 w-[130px] h-[115px] rounded-xl border border-purple-500/20 bg-black/80 p-2.5 backdrop-blur-md flex flex-col justify-between transition-all select-none">
          <div className="flex items-center justify-between leading-none">
            <span className="truncate font-space text-[9px] font-bold text-white">{copy.audiences[3].title}</span>
            <Heart className="h-2.5 w-2.5 text-purple-400 fill-purple-400/20 shrink-0" />
          </div>
          <div className="flex items-center -space-x-1.5 my-1">
            <div className="relative h-5.5 w-5.5 rounded-full overflow-hidden border border-purple-500/30 bg-purple-950">
              <Image src={ASSETS.services.socialMediaPageMedia.creatorThree} alt={copy.creatorAlt} fill sizes="22px" className="object-cover" />
            </div>
            <div className="relative h-5.5 w-5.5 rounded-full overflow-hidden border border-purple-500/30 bg-purple-950">
              <Image src={ASSETS.services.socialMediaPageMedia.youImage} alt={copy.creatorAlt} fill sizes="22px" className="object-cover" />
            </div>
          </div>
          <span className="text-[6.5px] text-purple-300/50 leading-none truncate">{copy.audiences[3].interests}</span>
          <div className="mt-1 flex items-center justify-center bg-purple-500/10 border border-purple-500/15 py-0.5 rounded text-[8px] font-space font-bold text-purple-300 leading-none gap-0.5">
            <span>▲</span> {copy.audiences[3].growth}
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[330px] rounded-2xl border border-purple-500/40 bg-gradient-to-b from-purple-950/70 to-black/95 p-4 text-left shadow-[0_0_45px_10px_rgba(168,85,247,0.35)] backdrop-blur-xl z-20 flex flex-col justify-between select-none">

          <div className="flex items-center gap-1.5 border-b border-purple-500/20 pb-2">
            <Sparkles className="h-4.5 w-4.5 text-purple-400" />
            <span className="font-space text-xs font-bold tracking-wide text-white">{copy.audienceInsights}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 my-2 items-center">
            <div className="flex flex-col items-center">
              <span className="text-[6px] text-purple-300/60 uppercase tracking-wider mb-1">{copy.ageShare}</span>
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg width="56" height="56" viewBox="-1 -1 2 2" className="rotate-[-90deg] w-full h-full">
                  <path d="M 0 0 L 1 0 A 1 1 0 0 1 -0.5 0.866 Z" fill="#8e55ff" />
                  <path d="M 0 0 L -0.5 0.866 A 1 1 0 0 1 -1 0 Z" fill="var(--color-primary-light)" />
                  <path d="M 0 0 L -1 0 A 1 1 0 0 1 -0.5 -0.866 Z" fill="#d8b4fe" />
                  <path d="M 0 0 L -0.5 -0.866 A 1 1 0 0 1 1 0 Z" fill="var(--color-primary-light)" />
                  <circle r="0.45" fill="#080310" />
                </svg>
                <div className="absolute text-[8px] font-space font-bold text-white">{copy.audienceAgeShare}</div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[6px] text-purple-300/60 uppercase tracking-wider mb-0.5">{copy.topInterests}</span>
              {copy.interests.map((interest) => (
                <div key={interest.name} className="flex flex-col">
                  <div className="flex items-center justify-between text-[6.5px] text-white">
                    <span>{interest.name}</span>
                    <span className="text-purple-300 font-bold">{interest.value}</span>
                  </div>
                  <div className="h-0.75 bg-purple-950/80 rounded-full overflow-hidden mt-0.5">
                    <div className={`h-full bg-purple-500 ${interest.width}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-purple-500/20 pt-2 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[6.5px] text-purple-300/60 uppercase tracking-wider">{copy.totalAudience}</span>
              <span className="font-space text-sm font-bold text-white mt-0.5">{copy.totalAudienceValue}</span>
            </div>
            <div className="flex items-center gap-1.5 text-right">
              <div className="flex flex-col">
                <span className="text-[6.5px] text-purple-300/60 uppercase tracking-wider">{copy.growth}</span>
                <span className="font-space text-[8.5px] font-bold text-emerald-400 mt-0.5 flex items-center gap-0.5">
                  ▲ {copy.growthValue}
                </span>
              </div>
              <svg width="35" height="15" className="stroke-emerald-400 stroke-[1.5] fill-none overflow-visible">
                <path d="M 0 10 Q 8 2 15 8 T 30 4" />
              </svg>
            </div>
          </div>

          <div className="border-t border-purple-500/20 pt-2 grid grid-cols-3 gap-1 items-center text-center">
            <div className="flex flex-col items-center">
              <span className="font-space text-[8.5px] font-bold text-white flex items-center gap-0.5 justify-center">
                <Percent className="h-2 w-2 text-purple-400" /> {copy.engagementValue}
              </span>
              <span className="text-[5.5px] text-purple-300/40 uppercase tracking-wide mt-0.5">{copy.engagementRate}</span>
            </div>
            <div className="flex flex-col items-center border-x border-purple-500/10">
              <span className="font-space text-[8.5px] font-bold text-white flex items-center gap-0.5 justify-center">
                <Laptop className="h-2 w-2 text-purple-400" /> {copy.topDevicesValue}
              </span>
              <span className="text-[5.5px] text-purple-300/40 uppercase tracking-wide mt-0.5">{copy.topDevices}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-space text-[7.5px] font-bold text-purple-300 flex items-center gap-0.5 justify-center bg-purple-500/10 border border-purple-500/20 px-1 py-0.5 rounded leading-none">
                {copy.primaryPlatform}
              </span>
              <span className="text-[5.5px] text-purple-300/40 uppercase tracking-wide mt-0.5">{copy.primary}</span>
            </div>
          </div>

        </div>

      </div>

    </MediaFrame>
  );
}
