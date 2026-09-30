"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/cn";
import { ASSETS } from "@/config/assets";
import { Button } from "@/components/ui/button";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";
import { FEATURES } from "@/config/features";

const dropdownContainerVariants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: -6 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.2,
      ease: EASE,
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(10px)",
    y: -6,
    transition: {
      duration: 0.15,
      ease: "easeIn" as const,
    },
  },
};

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const { navigation } = siteContent;
  const navLinks = navigation.links.filter(
    (link) => link.id !== "case-studies" || FEATURES.caseStudies,
  );
  const servicesList = navigation.services;
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const activeIndex = navLinks.findIndex((link) =>
    link.match === "exact" ? pathname === link.href : pathname.startsWith(link.href),
  );
  const targetIndex = hoveredIndex !== null ? hoveredIndex : (activeIndex !== -1 ? activeIndex : null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, x: "-50%" }}
      animate={{
        opacity: 1,
        width: isScrolled ? "min(1100px, calc(100vw - 32px))" : "100%",
        top: isScrolled ? "23px" : "0px",
        x: "-50%",
      }}
      transition={{
        duration: 1.4,
        ease: EASE,
      }}
      className={cn(
        "navbar-shell fixed left-1/2 z-50",
        className,
      )}
    >
      <motion.nav
        aria-label={navigation.ariaLabel}
        animate={{
          borderRadius: isScrolled ? "9999px" : "0px",
          borderTopWidth: isScrolled ? "1px" : "0px",
          borderLeftWidth: isScrolled ? "1px" : "0px",
          borderRightWidth: isScrolled ? "1px" : "0px",
          borderBottomWidth: isScrolled ? "1px" : "0px",
          borderColor: isScrolled ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0)",
          boxShadow: isScrolled
            ? "inset 0 1px 6.5px rgba(255, 255, 255, 0.15), 0 20px 40px rgba(0, 0, 0, 0.4)"
            : "inset 0 1px 6.5px rgba(66, 66, 66, 0)",
          backgroundImage: (isScrolled || mobileOpen)
            ? "linear-gradient(to bottom, rgba(20, 16, 24, 0.96) 0%, rgba(20, 16, 24, 0.96) 100%)"
            : "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
          backgroundColor: "rgba(0, 0, 0, 0)",
          backdropFilter: isMobile
            ? "none"
            : isScrolled
              ? "blur(20px) saturate(180%)"
              : "blur(10px) saturate(100%)",
        }}
        transition={{
          duration: 1.4,
          ease: EASE,
        }}
        className={cn(
          "navbar-glass relative flex size-full items-center transition-shadow duration-700",
          isScrolled && "hover:shadow-[0_8px_32px_rgb(var(--color-glow-primary-rgb)/0.18),_inset_0_1px_8px_rgb(var(--color-glow-primary-rgb)/0.2)]"
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full h-full items-center justify-between transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
            isScrolled
              ? "px-6 md:px-[var(--navbar-inline-padding)] max-w-full"
              : "max-w-[1200px] px-6 min-[1248px]:px-0"
          )}
        >
        <Link href="/" aria-label={navigation.homeLabel} onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }} className="relative z-10 flex shrink-0 items-center gap-2.5">
          <Image
            src={ASSETS.navbar.logo}
            alt={siteContent.brand.name}
            width={33}
            height={30}
            priority
            className="navbar-logo object-contain"
          />
          <span className="hidden lg:inline-block font-vastago text-xl font-medium tracking-tight text-white select-none">
            {siteContent.brand.name}
          </span>
        </Link>

        <div
          className="navbar-links relative z-10 hidden h-9.75 shrink-0 items-center justify-between md:flex"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navLinks.map((link, index) => {
            const isActive = index === activeIndex;
            const isTarget = index === targetIndex;
            const isHovered = hoveredIndex === index;
            const isServices = link.id === "services";

            const linkContent = (
              <>
                <span className="relative z-10">{link.label}</span>
                {isTarget && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0.75 left-1/2 h-0.75 rounded-full bg-gradient-to-r from-primary to-primary-grad-end -translate-x-1/2"
                    style={{ originX: 0.5 }}
                    animate={{
                      width: hoveredIndex !== null && isHovered ? "100%" : "28px",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </>
            );

            if (isServices) {
              return (
                <div
                  key={link.href}
                  className="relative flex h-full items-center justify-center"
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    setIsServicesHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsServicesHovered(false);
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                    aria-current={isActive ? "page" : undefined}
                    className="relative flex h-full items-center justify-center px-0 font-inter text-base font-medium leading-none text-white transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    {linkContent}
                  </Link>

                  <AnimatePresence>
                    {isServicesHovered && (
                      <div className="absolute top-[80%] left-1/2 z-50 -translate-x-1/2 pt-4">
                        <motion.div
                          variants={dropdownContainerVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="w-[580px] rounded-[20px] border border-white/10 bg-[#09080d] p-3.5 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
                        >
                          <div className="grid grid-cols-[210px_1fr] gap-3">
                            <motion.div
                              whileHover={{ scale: 1.01 }}
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                              className="group/card relative flex flex-col justify-between rounded-[16px] border border-white/15 bg-[linear-gradient(135deg,#1f1338_0%,#110a1f_50%,#180e2b_100%)] p-6 overflow-hidden text-left shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                            >
                              <div
                                aria-hidden
                                className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(168,85,247,0.35)_0%,transparent_65%)] pointer-events-none transition-opacity duration-500 group-hover/card:opacity-100 opacity-80"
                              />
                              <div
                                aria-hidden
                                className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgb(var(--color-glow-primary-rgb)/0.25)_0%,transparent_60%)] pointer-events-none"
                              />

                              <div className="relative z-10">
                                <motion.div
                                  whileHover={{ scale: 1.1, rotate: 3 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                  className="w-fit cursor-pointer"
                                >
                                  <Image
                                    src={ASSETS.navbar.logo}
                                    alt={siteContent.brand.name}
                                    width={38}
                                    height={34}
                                    className="object-contain filter drop-shadow-[0_2px_8px_rgb(var(--color-glow-primary-rgb)/0.5)]"
                                  />
                                </motion.div>
                              </div>
                              <div className="relative z-10 mt-10">
                                <h3 className="font-inter text-xl font-bold tracking-tight text-white">
                                  {navigation.servicesHeading}
                                </h3>
                                <p className="mt-2 font-inter text-xs text-white/70 leading-relaxed">
                                  {navigation.servicesDescription}
                                </p>
                              </div>
                            </motion.div>

                            <div className="flex flex-col justify-center gap-1.5 p-1">
                              {servicesList.map((service) => (
                                <motion.div
                                  key={service.href}
                                  whileHover={{ x: 6, scale: 1.012 }}
                                  transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.8 }}
                                >
                                  <Link
                                    href={service.href}
                                    onClick={() => setIsServicesHovered(false)}
                                    className="group relative flex flex-col rounded-[12px] border border-transparent p-3 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/[0.08] hover:border-white/10 hover:shadow-lg focus-visible:outline-none overflow-hidden"
                                  >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />

                                    <div className="relative z-10 flex items-center justify-between">
                                      <span className="font-inter text-sm font-semibold text-white tracking-tight group-hover:text-primary transition-colors duration-300">
                                        {service.label}
                                      </span>
                                      <motion.div
                                        className="text-white/40 group-hover:text-primary"
                                        whileHover={{ scale: 1.15 }}
                                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                      >
                                        <ArrowUpRight
                                          size={16}
                                          className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        />
                                      </motion.div>
                                    </div>
                                    <p className="relative z-10 mt-1 font-inter text-xs font-normal text-white/50 leading-snug group-hover:text-white/70 transition-colors duration-300">
                                        {service.description}
                                    </p>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                      onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                aria-current={isActive ? "page" : undefined}
                className="relative flex h-full items-center justify-center px-0 font-inter text-base font-medium leading-none text-white transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {linkContent}
              </Link>
            );
          })}
        </div>

        <Button
          href={navigation.contactHref}
          variant="primary"
          className="navbar-contact-inline relative z-10 hidden shrink-0 md:flex !px-5 !py-2.5"
        >
          {navigation.contactLabel}
        </Button>

        <button
          type="button"
          className="relative z-10 flex size-10 shrink-0 items-center justify-center text-white md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="navbar-mobile-panel"
          aria-label={mobileOpen ? navigation.mobile.closeLabel : navigation.mobile.openLabel}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                <X size={24} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                <Menu size={24} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              aria-hidden
              className="fixed inset-0 z-40 bg-black/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              id="navbar-mobile-panel"
              role="dialog"
              aria-label={navigation.mobile.ariaLabel}
              className="liquid-glass-panel absolute inset-x-0 top-[calc(100%+12px)] z-50 mx-auto flex flex-col gap-1 overflow-hidden rounded-[20px] p-3.5"
              style={{ width: "min(420px, calc(100vw - 40px))" }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 rounded-[20px] bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_28%,rgba(255,255,255,0)_55%,rgb(var(--color-glow-primary-rgb)/0.08)_100%)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 rounded-[20px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_-20px_30px_-20px_rgb(var(--color-glow-primary-rgb)/0.15)]"
              />
              {navLinks
                .filter((link) => link.id !== "services")
                .map((link) => {
                  const isActive = link.match === "exact"
                    ? pathname === link.href
                    : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex h-12 items-center border-l-[3px] pl-3 font-inter text-base font-medium text-white transition-colors hover:text-primary",
                        isActive ? "border-primary text-primary" : "border-transparent",
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}

              <div>
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-between border-l-[3px] border-transparent pl-3 font-inter text-base font-medium text-white"
                  aria-expanded={mobileServicesOpen}
                  onClick={() => setMobileServicesOpen((v) => !v)}
                >
                  {navigation.servicesHeading}
                  <motion.span
                    animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="mr-2 flex"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1 pb-1 pl-3">
                        {servicesList.map((service) => {
                          return (
                            <Link
                              key={service.href}
                              href={service.href}
                              onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                              className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-primary/10"
                            >
                              <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-white/5 bg-white/5 text-white/70 transition-colors group-hover:border-primary/20 group-hover:bg-primary/15 group-hover:text-primary">
                                <span className="size-2 rounded-full bg-current transition-transform group-hover:scale-125" />
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="font-inter text-sm font-medium text-white transition-colors group-hover:text-primary">
                                  {service.label}
                                </span>
                                <span className="font-inter text-xs text-muted leading-tight">
                                  {service.description.split(".")[0]}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="my-1 border-t border-navbar-border" />

              <div onClick={() => setMobileOpen(false)}>
                <Button
                  href={navigation.contactHref}
                  variant="primary"
                  className="w-full justify-center !px-5 !py-3"
                >
                  {navigation.contactLabel}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
