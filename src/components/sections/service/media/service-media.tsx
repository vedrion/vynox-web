import { InfluencerMedia } from "./influencer-media";
import { SocialMediaPageMedia } from "./social-media-page-media";
import { TalentMedia } from "./talent-media";
import { CampaignMedia } from "./campaign-media";

export function ServiceMedia({ slug }: { slug?: string }) {
  switch (slug) {
    case "influencer-marketing":
      return <InfluencerMedia />;
    case "social-media-management":
      return <SocialMediaPageMedia />;
    case "talent-management":
      return <TalentMedia />;
    case "campaign-management":
      return <CampaignMedia />;
    default:
      return <InfluencerMedia />;
  }
}
