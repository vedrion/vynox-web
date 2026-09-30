export type ServiceHeroImageKey =
  | "campaignManagementPage"
  | "influencerMarketingPage"
  | "socialMediaManagementPage"
  | "talentManagementPage";

export type ServiceVariantSection = "problems" | "momentum" | "solutions" | "what-creators-hold-back";

export type ServiceShowcase =
  | {
    kind: "creators";
    headingLines: string[];
    accent: string;
    accentWidth: number;
    highlightWord: string;
  }
  | {
    kind: "case-studies";
    headingLines: string[];
    headingAccent: string;
    align?: "left" | "center";
    showCta?: boolean;
  };

export interface ServiceContent {
  slug: string;
  hero: {
    titleLine: string;
    accentWord: string;
    paragraph: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    imageKey: ServiceHeroImageKey;
    imageClassName?: string;
  };
  variantSection: ServiceVariantSection;
  problems: { title: string; description: string }[];
  solves: { title: string; description: string };
  solvesHeading: { lines: string[]; accent: string; accentWidth: number };
  stats: { value: string; label: string }[];
  statsHeading?: {
    headingLines?: string[];
    mobileHeadingLines?: string[];
    headingAccent?: string;
    accentWidth?: number;
  };
  showcase: ServiceShowcase;
  cta: {
    titleLine: string;
    underlineWord: string;
    scriptWord: string;
    subtext: string;
    buttonLabel: string;
  };
}

export const SERVICES: Record<string, ServiceContent> = {
  "influencer-marketing": {
    slug: "influencer-marketing",
    hero: {
      titleLine: "Influencer",
      accentWord: "Marketing",
      paragraph:
        "Strategic creator collaborations that help brands increase visibility, engage the right audience, build trust, and achieve measurable marketing results across digital platforms.",
      primaryCta: { label: "Explore Process", href: "#how-vynox-solves" },
      secondaryCta: { label: "Case Studies", href: "/case-studies" },
      imageKey: "influencerMarketingPage",
      imageClassName: "h-[280px] sm:h-[370px] md:h-[440px] lg:h-[500px] translate-x-4 lg:translate-x-10",
    },
    variantSection: "problems",
    problems: [
      {
        title: "The Wrong Creators",
        description: "We find creators with real audiences, strong engagement, and a natural fit for your brand.",
      },
      {
        title: "Content That Fails",
        description: "We create content that captures attention and gives people a reason to engage.",
      },
      {
        title: "Results You Can't See",
        description: "We track campaign results so you know exactly what your investment delivers.",
      },
    ],
    solves: {
      title: "Creator Discovery",
      description: "Identifying creators whose audience, content style, and values align with your brand.",
    },
    solvesHeading: { lines: ["How Vynox Solves"], accent: "this", accentWidth: 90 },
    statsHeading: {
      headingLines: ["Past Campaigns"],
      mobileHeadingLines: ["Campaigns"],
      headingAccent: "performance",
    },
    stats: [
      { value: "150+", label: "Creators" },
      { value: "85+", label: "Campaigns" },
      { value: "50M+", label: "Reach" },
      { value: "4.5x", label: "Avg. ROAS" },
    ],
    showcase: {
      kind: "creators",
      headingLines: ["Creators for Every"],
      accent: "niche",
      accentWidth: 175,
      highlightWord: "Every",
    },
    cta: {
      titleLine: "Start Your Next Influencer",
      underlineWord: "Next",
      scriptWord: "Campaign",
      subtext: "Let's create influence that converts.",
      buttonLabel: "Start Your Campaign",
    },
  },
  "social-media-management": {
    slug: "social-media-management",
    hero: {
      titleLine: "Social Media",
      accentWord: "Management",
      paragraph:
        "Make social media work harder for your brand. From strategy to content, we create campaigns that capture attention, build communities, and keep people coming back.",
      primaryCta: { label: "Explore Process", href: "#how-vynox-solves" },
      secondaryCta: { label: "Case Studies", href: "/case-studies" },
      imageKey: "socialMediaManagementPage",
    },
    variantSection: "solutions",
    problems: [
      {
        title: "Inconsistent Posting",
        description: "Sporadic content schedules that lose momentum and fail to build lasting community habits.",
      },
      {
        title: "Flat Engagement",
        description: "Content that gets impressions but no conversation, shares, or saves worth measuring.",
      },
      {
        title: "Platform Guesswork",
        description: "One-size-fits-all content that ignores what actually works on each platform.",
      },
    ],
    solves: {
      title: "Platform Strategy",
      description: "Creating the right content for the right platform at the right time.",
    },
    solvesHeading: { lines: ["How Vynox Handles"], accent: "this", accentWidth: 90 },
    stats: [
      { value: "20+", label: "Social Channels" },
      { value: "90M+", label: "Impressions" },
      { value: "4.8x", label: "Engagement Growth" },
      { value: "14.2x", label: "Average ROI" },
    ],
    showcase: {
      kind: "case-studies",
      headingLines: ["Past"],
      headingAccent: "campaigns",
      align: "center",
      showCta: false,
    },
    cta: {
      titleLine: "Start Your Next Social",
      underlineWord: "Next",
      scriptWord: "Campaign",
      subtext: "Let's build a presence that converts.",
      buttonLabel: "Start Your Campaign",
    },
  },
  "campaign-management": {
    slug: "campaign-management",
    hero: {
      titleLine: "Campaign",
      accentWord: "Management",
      paragraph:
        "End-to-end campaign support that brings ideas to life, keeps execution on track, and delivers measurable results from start to finish.",
      primaryCta: { label: "Explore Process", href: "#how-vynox-solves" },
      secondaryCta: { label: "Case Studies", href: "/case-studies" },
      imageKey: "campaignManagementPage",
    },
    variantSection: "momentum",
    problems: [
      {
        title: "Scattered Execution",
        description: "Too many moving pieces across creators and platforms with no single source of truth.",
      },
      {
        title: "Missed Timelines",
        description: "Delivery slips that cost campaigns their cultural moment and media window.",
      },
      {
        title: "Unclear Attribution",
        description: "Results that can't be tied back to the creators and channels that drove them.",
      },
    ],
    solves: {
      title: "Campaign Execution",
      description: "Keeping every part of the campaign connected from planning and coordination to execution and optimization.",
    },
    solvesHeading: { lines: ["How Vynox Manages"], accent: "campaigns", accentWidth: 230 },
    statsHeading: { headingLines: ["Managing Campaigns with"], headingAccent: "precision", accentWidth: 230 },
    stats: [
      { value: "85+", label: "Campaigns Managed" },
      { value: "4.5x+", label: "Avg. ROAS" },
      { value: "98%", label: "On-Time Execution" },
      { value: "4.9x", label: "Average Campaign ROI" },
    ],
    showcase: {
      kind: "case-studies",
      headingLines: ["Campaigns That Delivered"],
      headingAccent: "performance",
      align: "center",
      showCta: false,
    },
    cta: {
      titleLine: "Start Your Next Managed",
      underlineWord: "Next",
      scriptWord: "Campaign",
      subtext: "Let's build a campaign that gets noticed and delivers results.",
      buttonLabel: "Start Your Campaign",
    },
  },
  "talent-management": {
    slug: "talent-management",
    hero: {
      titleLine: "Talent",
      accentWord: "Management",
      paragraph:
        "We help creators grow their careers, build stronger audiences, secure better opportunities, and turn their talent into sustainable long term success.",
      primaryCta: { label: "Explore Process", href: "#how-vynox-solves" },
      secondaryCta: { label: "Case Studies", href: "/case-studies" },
      imageKey: "talentManagementPage",
    },
    variantSection: "what-creators-hold-back",
    problems: [
      {
        title: "Undervalued Rates",
        description: "Creators leaving money on the table without market data or negotiation support.",
      },
      {
        title: "Inconsistent Bookings",
        description: "Gaps between brand deals that stall momentum and income for emerging creators.",
      },
      {
        title: "No Growth Plan",
        description: "Talented creators without a strategy to grow reach, revenue, or a sustainable brand.",
      },
    ],
    solves: {
      title: "Talent Development",
      description: "Creating a clear growth plan based on each creator's strengths, audience, and long term goals.",
    },
    solvesHeading: { lines: ["How Vynox Build"], accent: "creators", accentWidth: 200 },
    statsHeading: { headingLines: ["Helping Creators Scale"], headingAccent: "faster", accentWidth: 150 },
    stats: [
      { value: "75+", label: "Creators Managed" },
      { value: "150+", label: "Brand Collaboration" },
      { value: "50M+", label: "Combined Reach" },
      { value: "4.6x", label: "Average Growth Rate" },
    ],
    showcase: {
      kind: "creators",
      headingLines: ["Creators Growing With"],
      accent: "Vynox",
      accentWidth: 150,
      highlightWord: "Creators",
    },
    cta: {
      titleLine: "Start Your Next Talent",
      underlineWord: "Next",
      scriptWord: "Partnership",
      subtext: "Make your creator journey go further.",
      buttonLabel: "Start Your Campaign",
    },
  },
};

export const serviceVariantContent = {
  campaignManagement: {
    heading: { highlight: "Where", firstLine: "Campaigns", secondLine: "Lose", accent: "Momentum", question: "?" },
    body: "Disconnected workflows, delayed approvals, and weak coordination often reduce campaign efficiency, delivery speed, and overall performance outcomes.",
    cards: [
      { title: "Poor Coordination", description: "Disconnected teams slow down execution and create unnecessary delays." },
      { title: "Missed Deadlines", description: "Delayed approvals can push schedules back and affect campaign delivery." },
      { title: "Weak Tracking", description: "Limited visibility makes it harder to measure performance and optimize campaigns." },
      { title: "Workflow Gaps", description: "Scattered processes create inconsistencies and slow down execution." },
    ],
  },
  socialMediaManagement: {
    heading: { highlight: "Everything", firstLine: "Your Social", accent: "Needs" },
    cards: [
      { title: "Content Creation", description: "High-quality branded content tailored to your audience and platform." },
      { title: "Reels & Short Videos", description: "Engaging short-form videos designed to increase reach and audience engagement." },
      { title: "Paid Advertising", description: "Targeted advertising campaigns focused on visibility, traffic, and conversions." },
      { title: "Community Management", description: "Consistent audience engagement that strengthens relationships and builds brand loyalty." },
    ],
  },
  talentManagement: {
    heading: { highlight: "What", firstLine: "Holds", secondLine: "Creators", accent: "Back" },
    body: "Many creators struggle with brand outreach, inconsistent opportunities, content positioning, and managing growth without the right support system.",
    nodes: [
      { title: "Unpredictable", detail: "Brand Deals" },
      { title: "Stagnant", detail: "Growth Strategy" },
      { title: "Unclear", detail: "Personal Branding" },
      { title: "Complicated", detail: "Management" },
    ],
  },
} as const;
