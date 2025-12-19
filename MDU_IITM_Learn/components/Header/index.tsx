"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const pathname = usePathname();

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    setSticky(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
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
    const totalDisplayTime = 24000; // 2 rotations at 12s each

    const fadeTimer = setTimeout(() => {
      setFadeNotice(true);
    }, totalDisplayTime - 1000); // Start fade slightly before hiding

    const hideTimer = setTimeout(() => {
      setShowNotice(false);
    }, totalDisplayTime);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <header
      className={`header left-0 top-0 z-40 w-full ${sticky
        ? "fixed z-[9999] bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border transition"
        : "absolute bg-transparent"
      }`}
    >
      {/*2nd sem Notice banner */}

      {/* {showNotice && (
        <div className={`w-full bg-gradient-to-r from-primary to-secondary py-3 text-center overflow-hidden border-b border-border/50 shadow-sm transition-all duration-300 ${fadeNotice ? 'animate-fadeOut' : ''}`}>
          <div className="animate-marquee whitespace-nowrap flex items-center justify-center tracking-wide">
            <span className="inline-flex items-center gap-2 font-semibold text-primary-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              IMPORTANT NOTICE:
            </span>
            <span className="mx-3 text-primary-foreground/90 font-medium">
              2nd Semester Notes, PYQ's and Syllabus is now available on website | Access latest study materials for better preparation | Download now!
            </span>
          </div>
        </div>
      )} */}

      <div className="container">
        <div className="flex items-center justify-between gap-4 py-3 lg:py-0">
          {/* Logo */}
          <Link
            href="/"
            className={`header-logo flex items-center ${sticky ? "py-3 lg:py-2" : "py-6 lg:py-8"}`}
            aria-label="Home"
          >
            <Image
              className="rounded-xl w-[120px] sm:w-[150px] md:w-[160px] lg:w-[170px] h-auto max-w-[170px] object-contain"
              src="/images/logo/logo-transparent.png"
              alt="logo"
              width={180}
              height={100}
              unoptimized
            />
          </Link>

          {/* Right side: nav + actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Desktop navigation */}
            <nav className="hidden lg:block" aria-label="Primary">
              <ul className="flex items-center gap-8 xl:gap-12">
                {menuData.map((menuItem) => (
                  <li key={menuItem.id} className="relative group">
                    {menuItem.path ? (
                      <Link
                        href={menuItem.path}
                        className={`relative inline-flex py-6 text-base transition-colors ${
                          pathname === menuItem.path
                            ? "text-primary"
                            : "text-foreground/80 hover:text-primary"
                        } after:absolute after:bottom-4 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
                          pathname === menuItem.path ? "after:w-full" : ""
                        }`}
                      >
                        {menuItem.title}
                      </Link>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 py-6 text-base text-foreground/80 transition-colors hover:text-primary"
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
                              className="block rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
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

            <ThemeToggler />

            {/* Mobile sheet menu */}
            <div className="lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Open menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[320px] sm:w-[380px]">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>

                  <div className="mt-6">
                    <Separator className="mb-4" />

                    <nav aria-label="Mobile">
                      <ul className="space-y-1">
                        {menuData.map((item) => (
                          <li key={item.id}>
                            {item.path ? (
                              <Link
                                href={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                  pathname === item.path
                                    ? "bg-accent text-accent-foreground"
                                    : "text-foreground/90 hover:bg-accent hover:text-accent-foreground"
                                }`}
                              >
                                {item.title}
                              </Link>
                            ) : (
                              <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value={`item-${item.id}`} className="border-b-0">
                                  <AccordionTrigger className="rounded-md px-3 hover:bg-accent hover:text-accent-foreground">
                                    {item.title}
                                  </AccordionTrigger>
                                  <AccordionContent className="pb-2">
                                    <div className="space-y-1">
                                      {item.submenu?.map((sub) => (
                                        <Link
                                          key={sub.id}
                                          href={sub.path || "#"}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="block rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
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
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
