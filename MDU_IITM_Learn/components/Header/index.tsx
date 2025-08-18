"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const pathname = usePathname();

  // Navbar toggle state
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Close navbar on route change
  useEffect(() => {
    setNavbarOpen(false);
  }, [pathname]);

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

  // Submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

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
        <div className="relative -mx-4 flex items-center justify-between">
          {/* Logo Section */}
          <div className="w-60 max-w-full px-4 xl:mr-12">
            <Link
              href="/"
              className={`header-logo w-full ${sticky ? "py-5 lg:py-2" : "py-8"}`}
            >
              <div className="flex items-center justify-end pr-16 lg:pr-3">
                <Image
                  className="rounded-xl w-[140px] sm:w-[180px] md:w-[200px] lg:w-[200px] h-auto max-w-[200px] object-contain block mb-3 sm:mb-0"
                  src="/images/logo/brand.svg"
                  alt="logo"
                  width={200}
                  height={100}
                  unoptimized
                />
              </div>
            </Link>
          </div>

          {/* Navbar Menu */}
          <div className="flex w-full items-center justify-between px-4">
            <div>
              {/* Mobile Menu Toggle Button */}
              <button
                onClick={navbarToggleHandler}
                aria-label="Mobile Menu"
                className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
              >
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? "top-[7px] rotate-45" : ""}`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${navbarOpen ? "top-[-8px] -rotate-45" : ""}`}
                />
              </button>

              {/* Navigation Links */}
              <nav
                  className={`navbar absolute right-0 z-30 w-[250px] rounded-md border border-border bg-background px-6 py-4 shadow-sm duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                  navbarOpen ? "visibility top-full opacity-100" : "invisible top-[120%] opacity-0"
                }`}
              >
                <ul className="block lg:flex lg:space-x-12">
                  {menuData.map((menuItem, index) => (
                    <li key={index} className="group relative">
                      {menuItem.path ? (
                        <Link
                          href={menuItem.path}
                          className={`relative flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 transition-colors ${
                            pathname === menuItem.path ? "text-primary" : "text-foreground/80 hover:text-primary"
                          } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full`}
                        >
                          {menuItem.title}
                        </Link>
                      ) : (
                        <>
                          <p
                            onClick={() => handleSubmenu(index)}
                            className="flex cursor-pointer items-center justify-between py-2 text-base text-foreground/80 group-hover:text-primary lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                          >
                            {menuItem.title}
                            <span className="pl-3">
                              <svg width="25" height="24" viewBox="0 0 25 24">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </p>
                          <div
                            className={`submenu relative left-0 top-full rounded-md border border-border bg-background transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[260px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                              openIndex === index ? "block" : "hidden"
                            }`}
                          >
                            {menuItem.submenu?.map((submenuItem, subIndex) => (
                              <Link
                                href={submenuItem?.path || "#"}
                                key={subIndex}
                                className="block rounded py-2.5 text-sm text-foreground/80 hover:text-primary lg:px-3"
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
            </div>

            {/* Theme Toggle Button */}
            <div className="flex items-center justify-end pr-16 lg:pr-0">
              <ThemeToggler />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
