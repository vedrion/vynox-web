import { Space_Grotesk, Inter, Caveat, Montaga } from "next/font/google";
import localFont from "next/font/local";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-raw",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter-raw",
  display: "swap",
});

const montaga = Montaga({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-montaga-raw",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-caveat-raw",
  display: "swap",
});

const vastago = localFont({
  src: [
    { path: "../../public/fonts/VastagoGrotesk-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/vastago-grotesk-medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/vastago-grotesk-bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-vastago-raw",
  display: "swap",
});

const maryGeoise = localFont({
  src: "../../public/fonts/MaryGeoise DEMO.ttf",
  variable: "--font-mary-raw",
  display: "swap",
});

export const fontVars = [
  spaceGrotesk.variable,
  inter.variable,
  caveat.variable,
  vastago.variable,
  maryGeoise.variable,
  montaga.variable,
].join(" ");
