import { ASSETS } from "@/config/assets";

export interface Creator {
  name: string;
  followers: string;
  tags: string[];
  photo: string;
}

export const creatorsSectionContent = {
  headingLines: ["Our Network Of "],
  accent: "Creators",
  highlightWord: "Creators",
  previousLabel: "Previous creator",
  nextLabel: "Next creator",
};

export const CREATORS: Creator[] = [
  {
    name: "Shivam Mishra",
    followers: "1.2M+",
    tags: ["Tech", "AI"],
    photo: ASSETS.creators.shivamMishra,
  },
  {
    name: "Gen-Z Way",
    followers: "1.2M+",
    tags: ["Business", "Marketing"],
    photo: ASSETS.creators.genzwayofficial,
  },
  {
    name: "Ankit Jogi",
    followers: "1M+",
    tags: ["Tech", "EV"],
    photo: ASSETS.creators.ankitJogi,
  },
  {
    name: "Satyam Mishra",
    followers: "719K+",
    tags: ["Tech", "AI"],
    photo: ASSETS.creators.satyamMishra,
  },
  {
    name: "Shreya Patidar",
    followers: "583K+",
    tags: ["Tech", "AI"],
    photo: ASSETS.creators.shreyaPatidar,
  },
  {
    name: "Naresh Kumar",
    followers: "516K+",
    tags: ["Tech", "AI"],
    photo: ASSETS.creators.nareshKumar,
  },
  {
    name: "Sikander Kathat",
    followers: "375K+",
    tags: ["Tech", "Gadgets"],
    photo: ASSETS.creators.sikanderKathat,
  },
  {
    name: "Nitin Jaiswal",
    followers: "301K+",
    tags: ["Tech", "AI"],
    photo: ASSETS.creators.nitinJaiswal,
  },
  {
    name: "Ankit Ankk",
    followers: "299K+",
    tags: ["Tech", "Education"],
    photo: ASSETS.creators.ankitAnkk,
  },
  {
    name: "Karan Munjal",
    followers: "179K+",
    tags: ["AI", "Business"],
    photo: ASSETS.creators.karanMunjal,
  },
  {
    name: "Anil Kumar",
    followers: "123K+",
    tags: ["Tech", "Reviews"],
    photo: ASSETS.creators.anilKumar,
  },
  {
    name: "Aditya Pratap Singh",
    followers: "121K+",
    tags: ["Tech", "Gaming"],
    photo: ASSETS.creators.adityaPratapSingh,
  },
  {
    name: "Vinod Kaitoliya",
    followers: "115K+",
    tags: ["AI", "Tech"],
    photo: ASSETS.creators.vinodKaitoliya,
  },
];
