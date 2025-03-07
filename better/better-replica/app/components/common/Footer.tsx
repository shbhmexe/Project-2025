// src/components/common/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} Better Replica. All rights reserved.
          </p>
        </div>
        <div className="flex justify-center space-x-10 md:order-2">
          <Link href="/" className="text-gray-400 hover:text-gray-300">
            Home
          </Link>
          <Link href="/about-us" className="text-gray-400 hover:text-gray-300">
            About Us
          </Link>
          <Link href="/mortgage-calculator" className="text-gray-400 hover:text-gray-300">
            Mortgage Calculator
          </Link>
          <Link href="/start" className="text-gray-400 hover:text-gray-300">
            Get Started
          </Link>
        </div>
      </div>
    </footer>
  );
}