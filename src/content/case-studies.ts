import { ASSETS } from "@/config/assets";

export interface CaseStudy {
  id: string;
  title: string;
  brand: string;
  image: string;
  href: string;
}

export interface DetailedCaseStudy {
  id: string;
  title: string;
  brand: string;
  headline: string;
  industry: string;
  services: string[];
  heroImage: string;
  stats: { value: string; label: string }[];
  challenge: {
    problem: string;
    context: string;
    whatWasntWorking: string;
  };
  goal: {
    description: string;
    objectives: string[];
  };
  strategy: {
    description: string;
    keyDecisions: string[];
  };
  timeline: { phase: string; title: string; description: string }[];
  results: {
    description: string;
    metrics: { before: string; after: string; label: string }[];
    softWins: string[];
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

export const FEATURED_CASES: CaseStudy[] = [
  {
    id: "perplexity",
    title: "Perplexity × Airtel",
    brand: "Perplexity",
    image: ASSETS.caseStudies.thumbnails.perplexityCampaign,
    href: "/case-studies/perplexity",
  },
  {
    id: "unacademy",
    title: "CAT Prep, in Focus",
    brand: "Unacademy",
    image: ASSETS.caseStudies.thumbnails.unacademyCampaign,
    href: "/case-studies/unacademy",
  },
  {
    id: "equal-ai",
    title: "Meet Equal AI",
    brand: "Equal AI",
    image: ASSETS.caseStudies.thumbnails.equalAICampaign,
    href: "/case-studies/equal-ai",
  },
];

export const ALL_CAMPAIGNS: CaseStudy[] = FEATURED_CASES;

export const caseStudiesHeroContent = {
  headline: "Work that speaks for itself.",
  subtext:
    "Explore the work that brought together strategy, creativity, and the right people to create campaigns that people actually noticed.",
  cta: { label: "Start Your Campaign", href: "/contact" },
};

export const caseStudiesCtaContent = {
  titleLine: "Ready to Build Something",
  underlineWord: "Build",
  scriptWord: "Great?",
  subtext: "Let's turn your next idea into work that gets noticed and delivers results.",
  buttonLabel: "Schedule a Meet",
};

export const caseStudyDetailUiContent = {
  campaignLabel: "campaign case study",
  challengeHeading: "The Challenge",
  contextLabel: "Context:",
  problemLabel: "Problem Statement:",
  limitationLabel: "Limitation:",
  goalHeading: "The Goal",
  visionLabel: "Vision:",
  objectivesHeading: "Campaign Objectives:",
  strategyHeading: "The Strategy",
  processHeading: "Execution Process",
  processSubheading: "Our repeatable campaign workflow",
  resultsHeading: { first: "Campaign", accent: "Results" },
  resultsSubheading: "Before & After Performance data",
  beforeLabel: "Before",
  afterLabel: "After",
  additionalImpactHeading: "Additional Brand Impact",
  testimonialHeading: "What they say",
  cta: {
    headingPrefix: "Want",
    accent: "results",
    headingSuffix: "like this?",
    body: "Let's build a custom regional creator campaign mapped to your customer acquisition cost goals.",
    buttonLabel: "Start Your Campaign",
    buttonHref: "/contact",
    backLabel: "Back to cases",
    backHref: "/case-studies",
  },
  relatedHeading: "Read other cases",
};

export const CASE_STUDY_DETAILS: Record<string, DetailedCaseStudy> = {
  "kuku-fm": {
    id: "kuku-fm",
    title: "Lumina Campaign",
    brand: "Kuku FM",
    headline: "240% acquisition growth with Tier 2 & 3 regional influencers",
    industry: "Audio Entertainment",
    services: ["Influencer Marketing", "Regional Content Strategy", "Campaign Management"],
    heroImage: ASSETS.caseStudies.thumbnails.perplexityCampaign,
    stats: [
      { value: "3.4M+", label: "App Downloads" },
      { value: "240%", label: "Acquisition Lift" },
      { value: "45%", label: "Lower acquisition cost (CAC)" },
    ],
    challenge: {
      problem: "Kuku FM wanted to capture regional Hindi, Marathi, and Gujarati-speaking audiences in Tier 2/3 cities but struggled with mainstream advertising channels.",
      context: "Rising CAC on traditional channels and low retention rates from general English/Hindi non-targeted campaigns created commercial pressure.",
      whatWasntWorking: "Standard broad-audience advertising failed to resonate with deep-tier vernacular users who sought storytelling content from people they personally trusted.",
    },
    goal: {
      description: "Establish a scalable regional creator pipeline to acquire high-intent users under target budgets.",
      objectives: [
        "Secure 1M+ regional signups in 3 months",
        "Maintain CAC below $1.50",
        "Improve 30-day user retention by 25%",
      ],
    },
    strategy: {
      description: "Partnered with trusted regional educators, self-help vloggers, and traditional storytellers who integrated audiobook reviews naturally inside local dialect streams.",
      keyDecisions: [
        "Shifted 80% budget from high-cost tier 1 lifestyle creators to hyper-targeted tier 2 and 3 regional storytellers.",
        "Created native audio integration scripts rather than hard-sell display placements.",
        "Built automated attribution coupon systems to track direct downloads per creator.",
      ],
    },
    timeline: [
      { phase: "Phase 1: Research", title: "Vernacular Mapping", description: "Audited regional performance databases and selected 150+ high-affinity local-dialect creators." },
      { phase: "Phase 2: Strategy", title: "Storytelling Framework", description: "Created native audiobook scripts mapped to creator genres (history, finance, folk)." },
      { phase: "Phase 3: Launch", title: "Coordinated Rollout", description: "Activated creators in synchronized cohorts to build massive brand social proof." },
      { phase: "Phase 4: Optimize", title: "Performance Scaling", description: "Allocated additional budgets to the top 20% highest converting regional creators." },
    ],
    results: {
      description: "The Lumina Campaign exceeded targets, proving vernacular influencer strategy is the single most efficient channel for tier 2/3 customer acquisition.",
      metrics: [
        { before: "$2.10", after: "$0.85", label: "Customer Acquisition Cost" },
        { before: "1.2M", after: "3.4M", label: "App Downloads" },
        { before: "12%", after: "28%", label: "30-Day User Retention" },
      ],
      softWins: [
        "Established Kuku FM as the household brand for audio content in Hindi-belt regions.",
        "Created an evergreen pipeline of regional creators generating organic reviews monthly.",
      ],
    },
    testimonial: {
      quote: "Vynox Media transformed our regional customer acquisition. Their focus on dialect-specific creator partnerships unlocked markets we previously couldn't reach efficiently.",
      author: "Sanjay Singh",
      role: "VP of Growth, Kuku FM",
    },
  },
  unacademy: {
    id: "unacademy",
    title: "Student Star",
    brand: "Unacademy",
    headline: "180% demo class registrations surge via academic influencers",
    industry: "EdTech",
    services: ["Creator Collaborations", "Social Marketing", "PPC Retargeting"],
    heroImage: ASSETS.caseStudies.thumbnails.unacademyCampaign,
    stats: [
      { value: "15,000+", label: "Registrations" },
      { value: "180%", label: "Lift in Demo Classes" },
      { value: "3.2x", label: "Return on Ad Spend (ROAS)" },
    ],
    challenge: {
      problem: "Getting serious JEE/NEET aspirants to register for trial interactive classes rather than just watching free YouTube streams.",
      context: "Intense competitive pressure from offline coaching centers and high drop-off rates on sign-up funnels.",
      whatWasntWorking: "Standard banner advertisements and discount-led copywriting failed to build the academic credibility required for registrations.",
    },
    goal: {
      description: "Convert passive social media viewers into active interactive-classroom trial registrants.",
      objectives: [
        "Boost trial class registrations by 100%",
        "Build high-intent prospective student leads",
        "Lower registration cost-per-lead (CPL) by 30%",
      ],
    },
    strategy: {
      description: "Leveraged student study-vloggers and educator-influencers who shared their authentic daily routine and trial class experiences.",
      keyDecisions: [
        "Utilized vlogs highlighting the 'day in the life of an aspirant' showcasing Unacademy's UI.",
        "Secured exclusive promo codes for trial batches distributed strictly through creator descriptions.",
        "Created retargeting funnels mapping custom ad creatives with matching student vloggers.",
      ],
    },
    timeline: [
      { phase: "Phase 1: Sourcing", title: "Aspirant Selection", description: "Selected micro student-vloggers preparing for JEE/NEET exams." },
      { phase: "Phase 2: Placement", title: "Native Integrations", description: "Wove Unacademy class preparation segments naturally into creator revision routines." },
      { phase: "Phase 3: Deployment", title: "Cohort Launch", description: "Released student preparation vlogs ahead of national mock tests." },
      { phase: "Phase 4: Retargeting", title: "Paid Boosts", description: "Ran social ads showcasing clip reels of creators scoring well on Mock Tests." },
    ],
    results: {
      description: "The campaign built student credibility, boosting high-intent batched class registrations.",
      metrics: [
        { before: "$14.50", after: "$8.20", label: "Cost-Per-Lead (CPL)" },
        { before: "5.4K", after: "15.3K", label: "Demo Registrations" },
        { before: "1.4x", after: "3.2x", label: "ROAS" },
      ],
      softWins: [
        "Enhanced community trust among high-school aspirants preparing at home.",
        "Positioned Unacademy platform classes as a daily revision necessity.",
      ],
    },
    testimonial: {
      quote: "The Student Star campaign established Unacademy as the go-to app for JEE/NEET preparation. The results speak volumes about Vynox's creative expertise.",
      author: "Rohan Mehta",
      role: "Brand Marketing Lead, Unacademy",
    },
  },
  seekho: {
    id: "seekho",
    title: "India Seekhega",
    brand: "Seekho",
    headline: "320% subscription growth using short-form creators",
    industry: "Vernacular Upskilling",
    services: ["Short-form Ads", "TikTok/Reels Strategy", "Viral Optimization"],
    heroImage: ASSETS.caseStudies.thumbnails.equalAICampaign,
    stats: [
      { value: "12M+", label: "Impressions" },
      { value: "320%", label: "Paid Subscriptions" },
      { value: "2.1%", label: "CTR on App Store Link" },
    ],
    challenge: {
      problem: "Seekho needed to convince youngsters in tier 2/3 cities to buy premium subscriptions for byte-sized technology courses.",
      context: "Massive abundance of free YouTube video tutorials and a general reluctance to pay for online certificates.",
      whatWasntWorking: "Standard feature-focused product ads failed to trigger emotional conversion loops among young aspirants seeking employment.",
    },
    goal: {
      description: "Position Seekho as the fastest ticket to salary-producing vernacular digital skills.",
      objectives: [
        "Increase monthly subscriptions by 200%",
        "Achieve a viral loop across Reels and YouTube Shorts",
        "Generate 10M+ campaign impressions",
      ],
    },
    strategy: {
      description: "Developed quick upskilling tips hacks reels with tech creators showing 'how to earn using mobile skills,' directing users to Seekho courses for complete guidelines.",
      keyDecisions: [
        "Designed first-3-second hook structures focused strictly on 'Earning Potential' or 'Career Hacks'.",
        "Deployed 80+ tech/career creators simultaneously to simulate a regional trend.",
        "Built customized dynamic landing pages matching creator discount codes.",
      ],
    },
    timeline: [
      { phase: "Phase 1: Concept", title: "Upskilling Hooks", description: "Created 3-second hook scripts mapping high-demand skills (Excel, video editing) to earnings." },
      { phase: "Phase 2: Seeding", title: "Creator Alignment", description: "Coordinated with tech and career tips micro-influencers." },
      { phase: "Phase 3: Rollout", title: "Mass Posting", description: "Instructed creators to post in high-traffic hours with bio code links." },
      { phase: "Phase 4: Scaling", title: "Whitelisting Ads", description: "Amplified top-performing organic videos via creator whitelisted ads." },
    ],
    results: {
      description: "The campaign successfully created a viral wave that drove regional paid subscription signups.",
      metrics: [
        { before: "1,500", after: "6,400", label: "Paid Subscriptions" },
        { before: "0.4%", after: "2.1%", label: "Link Click-Through Rate" },
        { before: "2.1M", after: "12.4M", label: "Total Video Views" },
      ],
      softWins: [
        "Unlocked viral short-form as a repeatable growth driver for the product catalog.",
        "Created high organic sharing on WhatsApp groups among job-seekers.",
      ],
    },
    testimonial: {
      quote: "Vynox Media understands viral hooks better than anyone. They took our vernacular upskilling program to millions of screens and drove real subscriptions.",
      author: "Divya Agrawal",
      role: "Co-founder, Seekho",
    },
  },
};
