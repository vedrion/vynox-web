import Image from "next/image";

import { ASSETS } from "@/config/assets";
import { influencerMediaContent } from "@/content/service-illustrations";
import { MediaFrame } from "@/components/sections/service/media/media-frame";

export function InfluencerMedia() {
  return (
    <MediaFrame
      width={580}
      height={420}
      innerClassName="relative select-none flex items-center justify-center"
    >
      <div className="relative h-full w-full overflow-hidden bg-transparent">
        <Image
          src={ASSETS.services.influencerMedia.solution}
          alt={influencerMediaContent.solutionAlt}
          fill
          sizes="(max-width: 768px) 100vw, 580px"
          className="object-contain p-1"
        />
      </div>
    </MediaFrame>
  );
}
