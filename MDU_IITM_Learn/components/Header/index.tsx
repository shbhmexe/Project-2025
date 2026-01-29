"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";

import ThemeToggler from "./ThemeToggler";
import { AuthButton } from "./AuthButton";
import menuData from "./menuData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Header = () => {
  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Notice banner visibility state
  const [showNotice, setShowNotice] = useState(true);
  const [fadeNotice, setFadeNotice] = useState(false);

  // Hide notice after 10 seconds with animation
  useEffect(() => {
    const totalDisplayTime = 24000;

    const fadeTimer = setTimeout(() => {
      setFadeNotice(true);
    }, totalDisplayTime - 1000);

    const hideTimer = setTimeout(() => {
      setShowNotice(false);
    }, totalDisplayTime);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Helper to check if a route is active
  const checkActive = (path: string | undefined) => {
    if (!path) return false;
    const pathStr = pathname || "";
    const normalizedPathname = pathStr === "/" ? "/" : pathStr.replace(/\/$/, "");
    const normalizedPath = path === "/" ? "/" : path.replace(/\/$/, "");

    if (normalizedPath === "/") return normalizedPathname === "/";
    return normalizedPathname === normalizedPath || normalizedPathname.startsWith(normalizedPath + "/");
  };

  // Check for mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll Behavior
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [sticky, setSticky] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Sticky Threshold
    if (latest >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }

    // Hide/Show Logic
    // Show at top, Show on Down, Hide on Up 
    // Uses velocity to ignore layout shifts (e.g. theme toggle)
    const velocity = scrollY.getVelocity();

    if (latest < 50) {
      setHidden(false); // Always show at top
    } else if (Math.abs(velocity) > 50) {
      if (velocity > 0) {
        setHidden(false); // Scrolling down -> Show
      } else {
        setHidden(true); // Scrolling up -> Hide
      }
    }
  });

  return (
    <motion.header
      initial={false}
      animate={{
        y: hidden ? "-100%" : (sticky ? 10 : 0),
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={cn(
        "header left-0 top-0 z-40 w-full",
        sticky ? "fixed z-[9999]" : "absolute bg-transparent"
      )}
    >
      <motion.div
        initial={false}
        animate={{
          width: sticky ? (isMobile ? "95%" : "100%") : "100%",
          maxWidth: sticky ? "1100px" : "1280px", // Animating from a fixed large width to smaller
          borderRadius: sticky ? "50px" : "0px",
          paddingLeft: sticky ? "10px" : "24px", // Matching container padding
          paddingRight: sticky ? "10px" : "24px",
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 30,
        }}
        className={cn(
          "mx-auto transition-colors duration-300",
          sticky
            ? "bg-background/80 backdrop-blur-lg border border-border/50 shadow-lg"
            : ""
        )}
      >
        <div className="flex items-center justify-between gap-4 py-2 lg:py-0">
          {/* Logo */}
          <Link
            href="/"
            className={`header-logo flex items-center ${sticky ? "py-1 lg:py-2" : "py-6 lg:py-8"}`}
            aria-label="Home"
          >
            <motion.div
              initial={false}
              animate={{
                width: isMobile
                  ? (sticky ? 90 : 120)
                  : (sticky ? 100 : 170),
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
              }}
              className="relative aspect-[180/100]"
            >
              <Image
                src={
                  mounted && (theme === "dark" || resolvedTheme === "dark")
                    ? "/images/logo/logomain.png"
                    : "/images/logo/logowhite.png"
                }
                alt="MDU IITM LEARN Home"
                fill
                className={`object-contain ${mounted && (theme === "dark" || resolvedTheme === "dark")
                  ? "mix-blend-screen"
                  : "mix-blend-multiply"
                  }`}
                unoptimized
              />
            </motion.div>
          </Link>

          {/* Right side: nav + actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Desktop navigation */}
            <nav className="hidden lg:block" aria-label="Primary">
              <ul className="flex items-center gap-4 lg:gap-4 xl:gap-8">
                {menuData.map((menuItem) => (
                  <li key={menuItem.id} className="relative group">
                    {menuItem.path ? (
                      <Link
                        href={menuItem.path}
                        className={cn(
                          "relative inline-flex text-sm xl:text-base whitespace-nowrap transition-colors",
                          sticky ? "py-3" : "py-6",
                          checkActive(menuItem.path) && menuItem.path !== "/"
                            ? "text-primary"
                            : "text-foreground/80 hover:text-primary",
                          "after:absolute after:bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full",
                          checkActive(menuItem.path) && menuItem.path !== "/" ? "after:w-full" : ""
                        )}
                      >
                        {menuItem.title}
                      </Link>
                    ) : (
                      <>
                        <button
                          type="button"
                          className={cn(
                            "inline-flex items-center gap-1 text-sm xl:text-base whitespace-nowrap transition-colors",
                            sticky ? "py-3" : "py-6",
                            menuItem.submenu?.some(sub => checkActive(sub.path))
                              ? "text-primary"
                              : "text-foreground/80 hover:text-primary"
                          )}
                        >
                          {menuItem.title}
                          <svg width="20" height="20" viewBox="0 0 25 24" aria-hidden="true">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>

                        <div className="invisible absolute left-0 top-full z-40 mt-2 w-[260px] rounded-md border border-border bg-background p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                          {menuItem.submenu?.map((submenuItem) => (
                            <Link
                              href={submenuItem?.path || "#"}
                              key={submenuItem.id}
                              className={`block rounded-md px-3 py-2 text-sm transition-colors ${checkActive(submenuItem.path)
                                ? "bg-accent text-primary"
                                : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                                }`}
                            >
                              {submenuItem.title}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <AuthButton />
            <ThemeToggler />

            {/* Mobile sheet menu */}
            <div className="lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Open menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-[300px] border-l border-white/10 bg-background/95 p-0 backdrop-blur-xl sm:w-[350px]"
                >
                  <div className="relative h-full w-full overflow-hidden">
                    {/* Background glows */}
                    <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-[80px]" />
                    <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-teal-500/10 blur-[80px]" />

                    <div className="relative flex h-full flex-col px-6 py-8">
                      <SheetHeader className="mb-8 text-left flex-shrink-0">
                        <SheetTitle className="text-2xl font-bold tracking-tight text-foreground">
                          Menu
                        </SheetTitle>
                      </SheetHeader>

                      <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
                        <ul className="space-y-4 pb-4">
                          {menuData.map((item) => (
                            <li key={item.id} className="relative group">
                              {item.path ? (
                                <Link
                                  href={item.path}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`flex items-center rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200 ${checkActive(item.path)
                                    ? "bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20"
                                    : "text-foreground/80 hover:bg-white/5 hover:text-foreground"
                                    }`}
                                >
                                  {item.title}
                                </Link>
                              ) : (
                                <Accordion type="single" collapsible className="w-full">
                                  <AccordionItem value={`item-${item.id}`} className="border-b-0">
                                    <AccordionTrigger
                                      className={`flex rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200 [&[data-state=open]]:bg-emerald-500/5 [&[data-state=open]]:text-emerald-500 hover:no-underline ${item.submenu?.some(sub => checkActive(sub.path))
                                        ? "bg-emerald-500/5 text-emerald-500"
                                        : "text-foreground/80 hover:bg-white/5 hover:text-foreground"
                                        }`}
                                    >
                                      {item.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-2 pt-1">
                                      <div className="ml-4 flex flex-col space-y-2 border-l border-white/10 pl-4 mt-2">
                                        {item.submenu?.map((sub) => (
                                          <Link
                                            key={sub.id}
                                            href={sub.path || "#"}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`block rounded-lg px-4 py-2 text-sm font-medium transition-colors ${checkActive(sub.path)
                                              ? "text-emerald-500 bg-emerald-500/10"
                                              : "text-foreground/60 hover:text-emerald-500"
                                              }`}
                                          >
                                            {sub.title}
                                          </Link>
                                        ))}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              )}
                            </li>
                          ))}
                        </ul>
                      </nav>

                      {/* Optional Footer/Action in menu */}
                      <div className="mt-auto pt-8 border-t border-white/5">
                        <p className="text-center text-xs font-medium text-muted-foreground/60">
                          MDU IITM LEARN © {new Date().getFullYear()}
                        </p>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
