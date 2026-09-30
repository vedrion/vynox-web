import { ASSETS } from "@/config/assets";

export const heroContent = {
  eyebrow: "Creative Growth Agency",
  line1: { prefix: "Brands Have ", accent: "Stories" },
  line2: { prefix: "We Make Them ", script: "Matter" },
  subtext: "We create campaigns that earn attention, not just impressions.",
  primaryCta: { label: "Get Started", href: "/contact" },
  secondaryCta: { label: "See the Results", href: "/case-studies" },
  reels: {
    left: [
      { clientName: "Novio", video: "/videos/home/reel1.mp4", image: ASSETS.home.hero.novioReel },
      { clientName: "Zoviz", video: "/videos/home/reel2.mp4", image: ASSETS.home.hero.zovizReel },
      { clientName: "Akool", video: "/videos/home/reel3.mp4", image: ASSETS.home.hero.akoolReel },
      { clientName: "Filmora", video: "/videos/home/reel4.mp4", image: ASSETS.home.hero.filmoraReel },
      { clientName: "Syntx AI", video: "/videos/home/reel5.mp4", image: ASSETS.home.hero.syntxAiReel },
      { clientName: "Music GPT", video: "/videos/home/reel6.mp4", image: ASSETS.home.hero.musicGptReel },
    ],
    right: [
      { clientName: "Foto OWL", video: "/videos/home/reel7.mp4", image: ASSETS.home.hero.fotoOwlReel },
      { clientName: "Mini-Max", video: "/videos/home/reel8.mp4", image: ASSETS.home.hero.miniMaxReel },
      { clientName: "Tripo AI", video: "/videos/home/reel9.mp4", image: ASSETS.home.hero.tripoAiReel },
      { clientName: "Syntx AI", video: "/videos/home/reel10.mp4", image: ASSETS.home.hero.syntxAiReel },
      { clientName: "Solara", video: "/videos/home/reel11.mp4", image: ASSETS.home.hero.solaraReel },
      { clientName: "Karban", video: "/videos/home/reel12.mp4", image: ASSETS.home.hero.karbanReel },
    ],
  },
};

export const brandsContent = {
  headingLines: ["Trusted by", "Ambitious"],
  headingHighlight: { word: "Trusted", line: 0, kind: "bar" as const },
  headingAccent: "Brands",
  logos: ASSETS.home.brands.map((logo, index) => ({
    name: `Brand ${index + 1}`,
    logo,
  })),
};

export const videoContent = {
  headingLines: ["More Than"],
  headingHighlight: { word: "More", line: 0, kind: "bar" as const },
  headingAccent: "Marketing",
  playAriaLabel: "Play video in windowed player with audio",
  closeAriaLabel: "Close video player",
};

export const servicesContent = {
  showTabAriaLabel: (title: string) => `Show ${title}`,
  headingLines: ["Everything you need", "to stand"],
  headingHighlight: [
    { word: "need", line: 0, kind: "bar" as const },
    { word: "stand", line: 1, kind: "colored" as const },
  ],
  headingAccent: "out",
  tabs: [
    {
      key: "influencer",
      serviceSlug: "influencer-marketing",
      title: "Influencer Marketing",
      image: ASSETS.home.services.influencerMarketing,
      imageAlt: "Creator filming a social video beside creator analytics",
      paragraph:
        "We connect ambitious brands with creators who have the right audience, the right voice, and the right influence. From finding the perfect creators to managing campaigns, we make every collaboration count.",
      stats: [
        { value: "150+", label: "Creators" },
        { value: "90M+", label: "Impressions" },
      ],
    },
    {
      key: "social",
      serviceSlug: "social-media-management",
      title: "Social Media Management",
      image: ASSETS.home.services.socialMediaManagement,
      imageAlt: "Social media analytics and content scheduling on a phone",
      paragraph:
        "We shape your social media into something people stop for, connect with, and remember. With sharp content, creative direction, and a strategy built around your audience, we help your brand own its space online.",
      stats: [
        { value: "20+", label: "Social Channels" },
        { value: "14.2x", label: "Average ROI" },
      ],
    },
    {
      key: "campaign",
      serviceSlug: "campaign-management",
      title: "Campaign Management",
      image: ASSETS.home.services.campaignManagement,
      imageAlt: "Campaign performance charts and a creator reviewing results",
      paragraph:
        "We make campaigns feel bigger than a brief. From the first concept to the final post, we bring together the right creators, content, and strategy to turn your campaign into something people notice, remember, and share.",
      stats: [
        { value: "85+", label: "Campaigns Delivered" },
        { value: "4.5x", label: "Average ROAS" },
      ],
    },
    {
      key: "talent",
      serviceSlug: "talent-management",
      title: "Talent Management",
      image: ASSETS.home.services.talentManagement,
      imageAlt: "Creator with a talent management dashboard and social videos",
      paragraph:
        "We help creators turn influence into a lasting career. From brand partnerships and negotiations to strategy and opportunities, we handle the business while creators stay focused on what they do best.",
      stats: [
        { value: "75+", label: "Creators Managed" },
        { value: "50M+", label: "Combined Reach" },
      ],
    },
  ],
  exploreCta: { label: "Explore More" },
  viewAll: { label: "See All", href: "/services" },
};

export const statsContent = {
  headingLines: ["Numbers that"],
  headingHighlight: { word: "Numbers", line: 0, kind: "bar" as const },
  headingAccent: "speak",
  subtext: "From creator reach to campaign performance, our work is measured by results that matter.",
  cta: { label: "See Our Results", href: "/case-studies" },
  stats: [
    { value: "14.2x", label: "Average ROI" },
    { value: "150+", label: "Creators" },
    { value: "90M+", label: "Impressions" },
    { value: "85+", label: "Campaigns" },
  ],
};

export const setsApartContent = {
  headingLines: ["Behind Better"],
  headingHighlight: { word: "Behind", line: 0, kind: "bar" as const },
  headingAccent: "Campaigns",
  cards: [
    { title: "Smart Creator Matching", description: "Right creators, matched by audience, content, and fit.", graphic: "dataDriven" as const },
    { title: "Content That Feels Real", description: "Stories that feel natural, authentic, and worth watching.", graphic: "authenticCreator" as const },
    { title: "From Brief To Buzz", description: "From creator selection to execution, we handle it all.", graphic: "endToEnd" as const },
  ],
};

export const caseStudiesSectionContent = {
  headingLines: ["The Work Behind", "The"],
  headingAccent: "Wins.",
  cta: { label: "Explore Our Work", href: "/case-studies" },
};

export const testimonialsContent = {
  headingPrefix: "The work",
  headingAccent: "speaks,",
  headingHighlightWord: "clients",
  headingSuffix: "speak louder.",
  subtext:
    "We could tell you what we do well, but the people we work with can tell you better. Here's their side of the story.",
};
