const sharedLabels = {
  home: "Vynox home",
  services: "Services",
  contact: "Contact Us",
  contactHref: "/contact",
} as const;

const brandContent = {
  name: "Vynox Media",
  description:
    "Creator partnerships, campaigns, social media strategy, and talent management for brands and creators.",
  socialProfiles: {
    instagram: { label: "Instagram", href: "https://www.instagram.com/vynoxmedia" },
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/company/vynoxmedia" },
    x: { label: "X", href: "https://x.com/vynoxmedia", handle: "@vynoxmedia" },
    youtube: { label: "YouTube", href: "https://www.youtube.com/@vynoxmedia" },
  },
} as const;

export const siteContent = {
  brand: brandContent,
  metadata: {
    home: {
      title: "Vynox Media | Influencer Marketing & Social Media Agency",
      description:
        "Vynox Media helps brands grow with creator partnerships, influencer campaigns, social media strategy and campaign management, while supporting creators through talent management.",
    },
    about: {
      title: "About",
      description:
        "Learn how Vynox Media helps brands and creators grow through creator partnerships, influencer campaigns, social media strategy, campaign management, and talent support.",
    },
    caseStudies: {
      title: "Case Studies",
      description:
        "Explore campaign case studies featuring creator partnerships, social media strategy, and campaign management across multiple industries.",
    },
    careers: {
      title: "Careers",
      description:
        "Explore full-time remote roles at Vynox Media in creator research and creator partnerships. Review each position and apply online.",
    },
    contact: {
      title: "Contact",
      description:
        "Contact Vynox Media to discuss creator partnerships, influencer marketing, social media strategy, campaign management, or talent support for creators.",
    },
    privacy: {
      title: "Privacy Policy",
      description: "How Vynox Media collects, uses, and protects your data.",
    },
    terms: {
      title: "Terms of Service",
      description:
        "The terms that govern your use of the Vynox Media website and services.",
    },
  },
  navigation: {
    ariaLabel: "Primary navigation",
    homeLabel: sharedLabels.home,
    links: [
      { id: "home", href: "/", label: "Home", match: "exact" },
      {
        id: "services",
        href: "/services",
        label: "Services",
        match: "prefix",
      },
      { id: "about", href: "/about", label: "About", match: "prefix" },
      {
        id: "case-studies",
        href: "/case-studies",
        label: "Case Studies",
        match: "prefix",
      },
      { id: "careers", href: "/careers", label: "Careers", match: "prefix" },
    ],
    servicesHeading: sharedLabels.services,
    servicesDescription:
      "Let our services guide your brand strategy and creator growth.",
    services: [
      {
        id: "influencer-marketing",
        href: "/services/influencer-marketing",
        label: "Influencer Marketing",
        description:
          "Connect with the right creators to amplify your brand's reach and impact.",
      },
      {
        id: "social-media-management",
        href: "/services/social-media-management",
        label: "Social Media Management",
        description:
          "Crafting compelling content and strategies to elevate your brand's social presence.",
      },
      {
        id: "talent-management",
        href: "/services/talent-management",
        label: "Talent Management",
        description:
          "Supporting creators with brand partnerships, content creation, and career growth.",
      },
      {
        id: "campaign-management",
        href: "/services/campaign-management",
        label: "Campaign Management",
        description:
          "End-to-end strategic campaign execution, tracking and reporting.",
      },
    ],
    contactLabel: sharedLabels.contact,
    contactHref: sharedLabels.contactHref,
    mobile: {
      ariaLabel: "Mobile navigation",
      openLabel: "Open menu",
      closeLabel: "Close menu",
    },
  },
  footer: {
    defaultCta: {
      titleLine: "Ready to go",
      underlineWord: "Ready",
      scriptWord: "Viral?",
      subtext:
        "Let's create something incredible together. Get in touch and let's discuss your next campaign.",
      buttonLabel: "Schedule a Meet",
      buttonHref: "/contact",
      talkLabel: "Let's Talk",
    },
    description: "Making work that does more than just sit there looking pretty.",
    serviceOrder: [
      "influencer-marketing",
      "social-media-management",
      "campaign-management",
      "talent-management",
    ],
    companyHeading: "Company",
    companyLinks: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about#team" },
      { label: "Careers", href: "/careers" },
      { label: sharedLabels.contact, href: sharedLabels.contactHref },
    ],
    contactHeading: "Contact",
    email: { label: "hello@vynoxmedia.com", href: "mailto:hello@vynoxmedia.com" },
    phone: { label: "+91 xxxxx xxxxx", href: "tel:+91xxxxxxxxxx" },
    location: "India | भारत",
    copyright: "Vynox Media. All rights reserved.",
    privacyLabel: "Privacy Policy",
    termsLabel: "Terms of Service",
    wordmark: { firstLine: "LET'S CREATE SOMETHING", accent: "VIRAL" },
  },
} as const;

export const notFoundContent = {
  title: "404",
  message: "This page could not be found.",
};
