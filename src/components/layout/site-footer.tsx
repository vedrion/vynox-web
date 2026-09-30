"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin } from "lucide-react";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { cn } from "@/lib/cn";
import { ASSETS } from "@/config/assets";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/content/site";

const footerContent = siteContent.footer;
const socialIcons = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  youtube: FaYoutube,
} as const;
const socialLinks = Object.entries(siteContent.brand.socialProfiles);
const serviceLinks = footerContent.serviceOrder
  .map((id) => siteContent.navigation.services.find((service) => service.id === id))
  .filter((service): service is (typeof siteContent.navigation.services)[number] => Boolean(service))
  .map(({ label, href }) => ({ label, href }));

export interface FooterCtaContent {
  titleLine: string;
  underlineWord: string;
  scriptWord: string;
  subtext: string;
  buttonLabel: string;
  buttonHref?: string;
}

interface SiteFooterProps {
  variant?: "full" | "compact";
  cta?: Partial<FooterCtaContent>;
  className?: string;
}

export function SiteFooter({
  variant = "full",
  cta,
  className,
}: SiteFooterProps) {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";
  const activeVariant = isContactPage ? "compact" : variant;
  const isFull = activeVariant === "full";
  const resolvedCta: FooterCtaContent = {
    ...footerContent.defaultCta,
    ...cta,
  };

  return (
    <footer className={cn("site-footer text-white", isFull ? "pt-7.5" : "pt-17", className)}>
      {isFull ? <FooterCta content={resolvedCta} /> : null}

      <div className="site-footer-content mx-auto">
        <div className={cn("site-footer-divider border-t", isFull ? "mt-15" : "mt-0")} />
        <FooterColumns className={isFull ? "py-17" : "pt-17 pb-18.5"} />
        <div className="site-footer-divider border-t" />
        <FooterBottom />
        <div className="site-footer-divider border-t" />
        <FooterWordmark className="mt-15 pb-4" />
      </div>
    </footer>
  );
}

function FooterCta({ content }: { content: FooterCtaContent }) {
  const { titleLine, underlineWord, scriptWord, subtext, buttonLabel, buttonHref = "/contact" } = content;
  const words = titleLine.split(" ");
  const underlineIndex = words.indexOf(underlineWord);

  return (
    <section className="relative mx-auto flex min-h-[280px] max-w-240 flex-col items-center text-center px-4">
      <div className="relative mt-12.5 w-full flex justify-center">
        <h2 className="site-footer-cta-title relative z-10 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2 font-vastago font-bold leading-tight text-white px-4">
          <span className="flex flex-wrap justify-center gap-x-2.5">
            {words.map((word, i) => (
              <span key={i}>
                {i === underlineIndex ? (
                  <span className="relative inline-block">
                    <span className="absolute bottom-0 left-0 z-[-1] h-[16%] w-full bg-primary" aria-hidden="true" />
                    {word}
                  </span>
                ) : (
                  word
                )}
              </span>
            ))}
          </span>
          <span className="site-footer-cta-script font-mary font-normal leading-none text-primary">
            {scriptWord}
          </span>
        </h2>
      </div>
      <p className="site-footer-cta-copy mt-7 w-full max-w-[800px] px-6 font-inter text-base text-white opacity-85 leading-relaxed">
        {subtext}
      </p>
      <Button
        href={buttonHref}
        variant="primary"
        className="mt-10 md:mt-12 lg:mt-15"
      >
        {buttonLabel}
      </Button>
      <div className="site-footer-talk absolute right-4 top-4 sm:top-4 xl:-right-42.5 xl:top-7 rounded-btn bg-primary px-3.75 py-1 font-caveat text-[22px] sm:text-[25px] leading-none text-white">
        {siteContent.footer.defaultCta.talkLabel}
      </div>
    </section>
  );
}

function FooterColumns({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "site-footer-grid grid grid-cols-1 items-start gap-9 sm:grid-cols-2 sm:gap-x-14 sm:gap-y-12 lg:grid-cols-[1.4fr_1fr_0.75fr_1.1fr] lg:gap-x-10 xl:gap-20",
        className,
      )}
    >
      <div>
        <Link href="/" className="inline-flex items-center gap-5" aria-label={siteContent.navigation.homeLabel}>
          <Image
            src={ASSETS.footer.logo}
            alt=""
            width={52}
            height={48}
            className="h-[var(--footer-brand-logo-height)] w-[var(--footer-brand-logo-width)] object-contain"
          />
          <span className="font-vastago text-[length:var(--footer-brand-title)] font-bold leading-none text-white">
            {siteContent.brand.name}
          </span>
        </Link>
        <p className="mt-8 max-w-75.5 font-inter text-base leading-[1.2] text-muted">
          {footerContent.description}
        </p>
        <div className="mt-7 flex items-center gap-4.5">
          {socialLinks.map(([id, link]) => {
            const Icon = socialIcons[id as keyof typeof socialIcons];
            return (
              <SocialLink key={id} href={link.href} label={link.label}>
                <Icon size={18} />
              </SocialLink>
            );
          })}
        </div>
      </div>

      <FooterLinkGroup title={siteContent.navigation.servicesHeading} links={serviceLinks} />
      <FooterLinkGroup title={footerContent.companyHeading} links={footerContent.companyLinks} />

      <div>
        <h3 className="font-vastago text-lg font-medium leading-none text-white">{footerContent.contactHeading}</h3>
        <ul className="mt-4.5 space-y-2.5 font-inter text-base text-muted">
          <ContactItem icon={<Mail size={20} />} label={footerContent.email.label} href={footerContent.email.href} />
          {/* <ContactItem icon={<Phone size={20} />} label={footerContent.phone.label} href={footerContent.phone.href} /> */}
          <ContactItem icon={<MapPin size={20} />} label={footerContent.location} />
        </ul>
      </div>
    </div>
  );
}

function FooterLinkGroup({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-vastago text-lg font-medium leading-none text-white">{title}</h3>
      <ul className="mt-4.5 space-y-2.5 font-inter text-base text-muted">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactItem({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const content = (
    <>
      <span className="text-primary">{icon}</span>
      <span>{label}</span>
    </>
  );

  return (
    <li>
      {href ? (
        <Link href={href} className="flex items-center gap-2.5 transition-colors hover:text-white">
          {content}
        </Link>
      ) : (
        <span className="flex items-center gap-2.5">{content}</span>
      )}
    </li>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex size-7.5 items-center justify-center rounded-full bg-white/30 text-white transition-colors hover:bg-primary"
    >
      {children}
    </Link>
  );
}

function FooterBottom() {
  const footerContent = siteContent.footer;
  return (
    <div className="site-footer-bottom flex items-center justify-between py-9 font-inter text-base text-muted">
      <p>© {new Date().getFullYear()} {footerContent.copyright}</p>
      <div className="flex items-center gap-12">
        <Link href="/privacy-policy" className="transition-colors hover:text-white">
          {footerContent.privacyLabel}
        </Link>
        <Link href="/terms-of-service" className="transition-colors hover:text-white">
          {footerContent.termsLabel}
        </Link>
      </div>
    </div>
  );
}

function FooterWordmark({ className }: { className?: string }) {
  const { firstLine, accent } = siteContent.footer.wordmark;
  return (
    <p className={cn("site-footer-wordmark max-[820px]:whitespace-normal text-center font-vastago font-bold tracking-[-0.04em]", className)}>
      {firstLine}{" "}
      <span className="site-footer-wordmark-accent font-caveat font-normal tracking-normal">{accent}</span>
    </p>
  );
}
