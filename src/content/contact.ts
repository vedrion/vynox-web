import { siteContent } from "@/content/site";

export const businessServices = [
  "Influencer Marketing",
  "Brand Partnerships",
  "Content Strategy",
  "Social Media Management",
  "Campaign Management",
];

export const platformOptions = ["Instagram", "YouTube", "TikTok", "Twitter/X", "LinkedIn", "Podcast"];
export const nicheOptions = ["Fashion", "Tech / AI", "Gaming", "Food", "Travel", "Beauty", "Finance", "Fitness"];
export const projectTypes = ["Brand Deal", "Sponsored Content", "Product Review", "Ambassador", "Co-creation"];
export const contactMethods = ["Email", "WhatsApp", "Instagram DM", "Twitter DM", "Call"];
export const timeSlots = [
  "10:00–11:00 AM",
  "11:00–12:00 PM",
  "1:00–2:00 PM",
  "2:00–3:00 PM",
  "4:00–5:00 PM",
];

export const businessFields = {
  fullName: { label: "Full Name", placeholder: "Your full name" },
  email: { label: "Email", placeholder: "you@company.com" },
  brandName: { label: "Brand / Company", placeholder: "Your brand or company name" },
  service: { label: "Service", placeholder: "What can we help with?", options: businessServices },
  campaign: {
    label: "Tell Us About Your Project",
    placeholder: "Tell us what you're looking to achieve...",
  },
  budget: { label: "Budget", placeholder: "eg. $500 to $2000" },
} as const;

export const creatorFields = {
  name: { label: "Full Name", placeholder: "Your full name" },
  email: { label: "Email", placeholder: "you@email.com" },
  platform: { label: "Platform", placeholder: "Select your platform", options: platformOptions },
  niche: { label: "Niche", placeholder: "Select your niche", options: nicheOptions },
  audienceSize: { label: "Audience Size", placeholder: "e.g. 50K followers" },
  projectType: { label: "Looking For", placeholder: "What are you looking for?", options: projectTypes },
  preferredContact: { label: "Preferred Contact", placeholder: "How to reach you...", options: contactMethods },
  details: {
    label: "Additional Details",
    placeholder: "Tell us a little about what you do and what you're looking for...",
  },
} as const;

export const scheduleFields = {
  scheduleDate: { label: "Date", placeholder: "Select Date" },
  scheduleTime: { label: "Time", placeholder: "Time", options: timeSlots },
  previousMonthAriaLabel: "Previous month",
  nextMonthAriaLabel: "Next month",
  monthNames: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
} as const;

export const contactFormContent = {
  title: "Contact Form",
  tabs: { business: "Business", creator: "Creator" },
  scheduleTitle: "Schedule a meet",
  submit: { business: "Start Your Campaign", creator: "Get In Touch", pending: "Sending..." },
  success: {
    title: "Message sent",
    body: "Thanks for reaching out. We've dropped a confirmation in your inbox and someone from the team will get back to you within one business day.",
    reset: "Send another",
  },
  errors: {
    generic: "Something went wrong on our end. Please try again in a moment.",
    rateLimited: "Too many requests. Please try again in a few minutes.",
    validation: "Please fix the highlighted fields and try again.",
  },
};

export const contactValidationContent = {
  required: (label: string) => `${label} is required`,
  tooLong: (label: string) => `${label} is too long`,
  invalidOption: (label: string) => `Select a valid ${label.toLowerCase()}`,
  minimumLength: (label: string, length: number) => `${label} needs at least ${length} characters`,
  invalidEmail: "Enter a valid email address",
  invalidDate: "Pick a valid date",
  invalidTime: "Pick a valid time slot",
};

export const contactPageContent = {
  backgroundText: "LET'S WORK TOGETHER",
  hero: {
    firstLine: "Let's build",
    emphasizedWord: "your",
    secondLine: "next",
    scriptWord: "campaign.",
    body: "Reach out and let us know how we can bring your vision to life, together!",
  },
  info: {
    label: "Email Us",
    email: siteContent.footer.email.label,
    href: siteContent.footer.email.href,
    ariaLabel: "Email Vynox Media",
  },
};

export const contactEmailContent = {
  notification: {
    subjectPrefix: { business: "New business enquiry", creator: "New creator enquiry" },
    heading: { business: "New business enquiry", creator: "New creator enquiry" },
    scheduleHeading: "Requested meeting slot",
  },
  autoReply: {
    subject: "We got your message - Vynox Media",
    heading: "Thanks for reaching out",
    body: "We've received your enquiry and the team is already looking at it. Expect a reply within one business day.",
    signOff: "- Team Vynox Media",
    summaryHeading: "What you sent us",
  },
};

