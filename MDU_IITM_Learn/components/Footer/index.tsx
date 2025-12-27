"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer
        className="bg-background pt-16 md:pt-20 lg:pt-24 border-t border-border"
        data-wow-delay=".1s"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
              <div className="mb-12 lg:mb-16 flex flex-col items-center text-center md:items-start md:text-left">
                <Link href="/" className="mb-8 inline-block w-52">
                  <Image
                    src="/images/logo/logo-transparent.png"
                    alt="logo"
                    className="w-full"
                    width={140}
                    height={30}
                  />
                </Link>
                <p className="mb-9 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  The ultimate study companion for MDU & IITM students. Everything you need to excel, all in one place.
                </p>
                <div className="flex items-center">
                  <a
                    href="https://github.com/shbhmexe/Projects-2024"
                    aria-label="github"
                    className="mr-6 text-muted-foreground duration-300 hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" className="text-gray-800 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors duration-300" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                  </a>
                  <a
                    href="https://www.instagram.com/shbhm.exe/"
                    aria-label="instagram"
                    className="mr-6 text-muted-foreground duration-300 hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" className="text-gray-800 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-300" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/shubham-shukla-62095032a/"
                    aria-label="linkedin"
                    className="mr-6 text-muted-foreground duration-300 hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" className="text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
                  </a>
                  <a
                    href="https://discord.gg/BSfNGWHE"
                    aria-label="discord"
                    className="text-muted-foreground duration-300 hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="text-gray-800 dark:text-gray-300 hover:text-[#5865F2] dark:hover:text-[#5865F2] transition-colors duration-300" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M19.98,5.69c-1.68-1.34-4.08-1.71-5.12-1.82h-0.04c-0.16,0-0.31,0.09-0.36,0.24c-0.09,0.23,0.05,0.48,0.28,0.52 c1.17,0.24,2.52,0.66,3.75,1.43c0.25,0.15,0.31,0.49,0.11,0.72c-0.16,0.18-0.43,0.2-0.64,0.08C15.56,5.38,12.58,5.3,12,5.3 S8.44,5.38,6.04,6.86C5.83,6.98,5.56,6.96,5.4,6.78C5.2,6.55,5.26,6.21,5.51,6.06c1.23-0.77,2.58-1.19,3.75-1.43 c0.23-0.04,0.37-0.29,0.28-0.52c-0.05-0.15-0.2-0.24-0.36-0.24H9.14C8.1,3.98,5.7,4.35,4.02,5.69C3.04,6.6,1.09,11.83,1,16.46 c0,0.31,0.08,0.62,0.26,0.87c1.17,1.65,3.71,2.64,5.63,2.78c0.29,0.02,0.57-0.11,0.74-0.35c0.01,0,0.01-0.01,0.02-0.02 c0.35-0.48,0.14-1.16-0.42-1.37c-1.6-0.59-2.42-1.29-2.47-1.34c-0.2-0.18-0.22-0.48-0.05-0.68c0.18-0.2,0.48-0.22,0.68-0.04 c0.03,0.02,2.25,1.91,6.61,1.91s6.58-1.89,6.61-1.91c0.2-0.18,0.5-0.16,0.68,0.04c0.17,0.2,0.15,0.5-0.05,0.68 c-0.05,0.05-0.87,0.75-2.47,1.34c-0.56,0.21-0.77,0.89-0.42,1.37c0.01,0.01,0.01,0.02,0.02,0.02c0.17,0.24,0.45,0.37,0.74,0.35 c1.92-0.14,4.46-1.13,5.63-2.78c0.18-0.25,0.26-0.56,0.26-0.87C22.91,11.83,20.96,6.6,19.98,5.69z M8.89,14.87 c-0.92,0-1.67-0.86-1.67-1.91c0-1.06,0.75-1.92,1.67-1.92c0.93,0,1.67,0.86,1.67,1.92C10.56,14.01,9.82,14.87,8.89,14.87z M15.11,14.87c-0.93,0-1.67-0.86-1.67-1.91c0-1.06,0.74-1.92,1.67-1.92c0.92,0,1.67,0.86,1.67,1.92 C16.78,14.01,16.03,14.87,15.11,14.87z" /></svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-foreground">
                  Useful Links
                </h2>
                <ul>
                  <li>
                    <Link
                      href="/notes"
                      className="mb-4 inline-block text-base text-muted-foreground duration-300 hover:text-primary"
                    >
                      Notes
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/Syllabus"
                      className="mb-4 inline-block text-base text-muted-foreground duration-300 hover:text-primary"
                    >
                      Syllabus
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/cgpa"
                      className="mb-4 inline-block text-base text-muted-foreground duration-300 hover:text-primary"
                    >
                      CGPA Calculator
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/youtube-explanation/semester"
                      className="mb-4 inline-block text-base text-muted-foreground duration-300 hover:text-primary"
                    >
                      YouTube Videos
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-foreground">
                  Terms
                </h2>
                <ul>
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="mb-4 inline-block text-base text-muted-foreground duration-300 hover:text-primary"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/Terms-Conditions"
                      className="mb-4 inline-block text-base text-muted-foreground duration-300 hover:text-primary"
                    >
                      Terms and Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-foreground">
                  Support & Help
                </h2>
                <ul>
                  <li>
                    <Link
                      href="/contact"
                      className="mb-4 inline-block text-base text-muted-foreground duration-300 hover:text-primary"
                    >
                      Open Support Ticket
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="mb-4 inline-block text-base text-muted-foreground duration-300 hover:text-primary"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="mb-4 inline-block text-base text-muted-foreground duration-300 hover:text-primary"
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-8"></div>
          <div className="py-8">
            <p className="text-center text-base text-body-color dark:text-gray-400">
              © {new Date().getFullYear()} MDU_IITM Learn. Developed by
              <a
                href="https://www.linkedin.com/in/shubham-shukla-62095032a/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shubham Shukla LinkedIn"
                className="ml-2 inline-block text-primary font-semibold   transition-colors duration-200 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 rounded"
              >
                Shubham Shukla
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
