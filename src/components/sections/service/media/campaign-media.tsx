"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sparkles, Heart, Eye, Target, Calendar, Rocket } from "lucide-react";
import { MediaFrame } from "@/components/sections/service/media/media-frame";
import { campaignIllustrationContent as copy } from "@/content/service-illustrations";
import { CREATORS, type Creator } from "@/content/creators";

type CampaignMetrics = {
  top: [string, string, string];
  profile: [string, string, string];
};

type CampaignProfile = {
  creator: Creator;
  metrics: CampaignMetrics;
};

function randomMetrics(): CampaignMetrics {
  const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randomMillions = (min: number, max: number) => `${(min + Math.random() * (max - min)).toFixed(1)}M`;

  return {
    top: [`${randomNumber(120, 950)}K`, randomMillions(1.2, 8.8), `${randomNumber(3, 15)}%`],
    profile: [`${randomNumber(80, 900)}K`, randomMillions(0.5, 7.5), `${randomNumber(12, 90)}`],
  };
}

const INITIAL_METRICS: CampaignMetrics = {
  top: ["200K", "5 M", "15%"],
  profile: ["390K", "4.5M", "700"],
};

export function CampaignMedia() {
  const activeIndexRef = useRef(0);
  const [profile, setProfile] = useState<CampaignProfile>({
    creator: CREATORS[0],
    metrics: INITIAL_METRICS,
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const nextIndex = Math.floor(Math.random() * (CREATORS.length - 1));
      const index = nextIndex >= activeIndexRef.current ? nextIndex + 1 : nextIndex;
      activeIndexRef.current = index;
      setProfile({ creator: CREATORS[index], metrics: randomMetrics() });
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <MediaFrame width={680} height={520} innerClassName="relative select-none bg-transparent flex flex-col items-center justify-between py-6">

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.4)); }
          50% { opacity: 1; filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.8)); }
        }
        .animate-timeline-glow {
          animation: pulse-glow 3s infinite ease-in-out;
        }
        @keyframes flow-particle {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .flow-particle-1 {
          animation: flow-particle 4s infinite linear;
        }
        .flow-particle-2 {
          animation: flow-particle 4s infinite linear 2s;
        }
        @keyframes flow-bottom-particle {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .flow-bottom-1 {
          animation: flow-bottom-particle 4s infinite linear;
        }
        .flow-bottom-2 {
          animation: flow-bottom-particle 4s infinite linear 2s;
        }
        @keyframes pulse-node-glow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(168, 85, 247, 0.6)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 16px rgba(168, 85, 247, 0.95)); }
        }
        .pulse-node-glow {
          animation: pulse-node-glow 2.5s infinite ease-in-out;
        }
      `}</style>

      <div className="w-[330px] h-[80px] rounded-2xl border border-purple-500/30 bg-gradient-to-b from-purple-950/40 to-black/80 px-5 py-3 shadow-[0_0_25px_rgba(168,85,247,0.15)] backdrop-blur-xl flex flex-col justify-between z-10">
        <div className="flex items-center gap-2">
          <Rocket className="h-4.5 w-4.5 text-purple-400 fill-purple-400/10" />
          <span className="font-space text-sm font-bold text-white tracking-wide">{copy.planHeading}</span>
        </div>
        <div className="flex items-center justify-between text-[11px] font-space font-medium text-white border-t border-purple-500/10 pt-1.5 mt-1">
          <div className="flex items-center gap-1 text-purple-300">
            <Eye className="h-3 w-3 text-purple-400" />
            <span>{profile.metrics.top[0]}</span>
          </div>
          <div className="flex items-center gap-1 text-purple-300">
            <Target className="h-3 w-3 text-purple-400" />
            <span>{profile.metrics.top[1]}</span>
          </div>
          <div className="flex items-center gap-1 text-purple-300">
            <Heart className="h-3 w-3 text-purple-400" />
            <span>{profile.metrics.top[2]}</span>
          </div>
          <span className="text-[7.5px] text-purple-300/40 uppercase tracking-widest font-bold">{copy.targetedLabel}</span>
        </div>
      </div>

      <div className="relative w-full flex items-center justify-between px-2 my-auto">

        <div className="absolute left-[130px] right-[130px] top-[108px] h-0.5 bg-purple-500/25 pointer-events-none z-0">
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-[3px] bg-gradient-to-r from-purple-500/0 via-purple-500/80 to-purple-500/0 animate-timeline-glow" />

          <div className="flow-particle-1 absolute top-1/2 -translate-y-1/2 w-4 h-1 bg-white rounded-full blur-[1px]" />
          <div className="flow-particle-2 absolute top-1/2 -translate-y-1/2 w-4 h-1 bg-white rounded-full blur-[1px]" />

          <div className="absolute left-[33%] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border border-purple-400 shadow-[0_0_8px_var(--color-primary-light)]" />
          <div className="absolute right-[33%] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border border-purple-400 shadow-[0_0_8px_var(--color-primary-light)]" />
        </div>

        <div className="flex flex-col items-center gap-3 z-10 w-[180px]">
          <div className="w-full h-[145px] rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-950/30 to-black/85 p-4 flex flex-col justify-between backdrop-blur-md">
            <div className="flex items-center gap-1.5 border-b border-purple-500/10 pb-2">
              <Calendar className="h-4 w-4 text-purple-400" />
              <span className="font-space text-xs font-bold text-white">{copy.strategyHeading}</span>
            </div>
            <div className="flex flex-col gap-1.5 my-2">
              <div className="flex items-center gap-2 text-[9px] text-purple-300 font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>{copy.researchTask}</span>
              </div>
              <div className="flex items-center gap-2 text-[9px] text-purple-300 font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>{copy.calendarTask}</span>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-center bg-purple-500/10 border border-purple-500/15 py-1 rounded text-[8.5px] font-space font-bold text-purple-300 leading-none gap-1">
              <span>🔍</span> {copy.followerLift}
            </div>
          </div>
          <span className="text-[10px] font-space font-bold text-purple-300/40 tracking-wider">{copy.strategyDate}</span>
        </div>

        <div className="w-[220px] h-[280px] rounded-2xl border border-purple-500/40 bg-gradient-to-b from-purple-950/70 to-black/95 p-5 text-center shadow-[0_0_40px_8px_rgba(168,85,247,0.3)] backdrop-blur-xl flex flex-col justify-between items-center z-10">
          <div className="flex flex-col items-center mt-1 w-full">
            <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <Image
                src={profile.creator.photo}
                alt={copy.profileAlt}
                fill
                sizes="80px"
                className="object-cover"
              />
              <div className="absolute bottom-0 right-0 h-5 w-5 bg-sky-500 rounded-full border border-black flex items-center justify-center shadow-lg">
                <span className="text-white text-[10px] font-bold">✓</span>
              </div>
            </div>
            <h4 className="font-space text-sm font-bold text-white mt-2.5">{profile.creator.name}</h4>
          </div>

          <div className="flex items-center justify-between w-full border-t border-b border-purple-500/10 py-2.5 my-1.5 text-[10px] font-space font-bold text-white">
            <div className="flex items-center gap-0.5 text-purple-300">
              <span>❤️</span> {profile.metrics.profile[0]}
            </div>
            <div className="flex items-center gap-0.5 text-purple-300 border-x border-purple-500/10 px-3">
              <span>👁️</span> {profile.metrics.profile[1]}
            </div>
            <div className="flex items-center gap-0.5 text-purple-300">
              <span>🎥</span> {profile.metrics.profile[2]}
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-0.5">
            {profile.creator.tags.map((tag) => (
              <span
                key={tag}
                className="text-[8px] bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 z-10 w-[180px]">
          <div className="w-full h-[145px] rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-950/30 to-black/85 p-4 flex flex-col justify-between backdrop-blur-md">
            <div className="flex items-center gap-1.5 border-b border-purple-500/10 pb-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="font-space text-xs font-bold text-white">{copy.promotionHeading}</span>
            </div>
            <div className="flex flex-col gap-1.5 my-2">
              <div className="flex items-center gap-2 text-[9px] text-purple-300 font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>{copy.launchTask}</span>
              </div>
              <div className="flex items-center gap-2 text-[9px] text-purple-300 font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>{copy.reportingTask}</span>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-center bg-purple-500/10 border border-purple-500/15 py-1 rounded text-[8.5px] font-space font-bold text-purple-300 leading-none gap-1">
              <span>🏆</span> {copy.reportLabel}
            </div>
          </div>
          <span className="text-[10px] font-space font-bold text-purple-300/40 tracking-wider">{copy.promotionDate}</span>
        </div>

      </div>

      <div className="relative w-full px-6 mt-2 flex flex-col items-center">
        <div className="absolute left-[70px] right-[70px] top-[14px] h-0.5 bg-purple-500/20 pointer-events-none z-0">
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-500/80 to-purple-500/0 animate-timeline-glow" />

          <div className="flow-bottom-1 absolute top-1/2 -translate-y-1/2 w-3.5 h-1 bg-white rounded-full blur-[1px]" />
          <div className="flow-bottom-2 absolute top-1/2 -translate-y-1/2 w-3.5 h-1 bg-white rounded-full blur-[1px]" />

          <div className="absolute left-[25%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-500/80 shadow-[0_0_8px_var(--color-primary-light)]" />
          <div className="absolute right-[25%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-500/80 shadow-[0_0_8px_var(--color-primary-light)]" />
        </div>

        <div className="w-full flex items-center justify-between px-10 relative z-10">

          <div className="flex flex-col items-center gap-1.5 w-[80px]">
            <div className="pulse-node-glow w-7 h-7 rounded-full bg-white border border-purple-400 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
            </div>
            <span className="text-[9.5px] font-space font-bold text-purple-300 tracking-wide uppercase mt-1">{copy.startLabel}</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 w-[90px] mt-4">
            <span className="text-[9.5px] font-space font-semibold text-purple-300/40">{copy.firstMonth}</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 w-[90px] mt-4">
            <span className="text-[9.5px] font-space font-semibold text-purple-300/40">{copy.secondMonth}</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 w-[80px]">
            <div className="pulse-node-glow w-7 h-7 rounded-full bg-white border border-purple-400 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
            </div>
            <span className="text-[9.5px] font-space font-bold text-purple-300 tracking-wide uppercase mt-1">{copy.reviewLabel}</span>
          </div>

        </div>
      </div>

    </MediaFrame>
  );
}
