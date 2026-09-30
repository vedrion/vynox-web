import Image from "next/image";
import { ASSETS } from "@/config/assets";
import { MediaFrame } from "@/components/sections/service/media/media-frame";
import { talentIllustrationContent } from "@/content/service-illustrations";

export function TalentMedia() {
  return (
    <MediaFrame width={580} height={420} innerClassName="relative select-none flex items-center justify-center">
      <div className="relative w-full h-full overflow-hidden bg-transparent">
        <Image
          src={ASSETS.services.talentMedia.hero}
          alt={talentIllustrationContent.talentAlt}
          fill
          sizes="(max-width: 768px) 100vw, 580px"
          className="object-contain p-1"
        />
      </div>
    </MediaFrame>
  );
}
