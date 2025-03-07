"use client";
import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";
import { motion } from "framer-motion";



const Brands = () => {
  return (
    <section className="">
      <div className="container">
        <div className="mx-4 flex flex-wrap ">
          <div className="w-screen px-0 flex justify-center sm:justify-evenly">

          <motion.div
      className="relative bg-gray-light dark:bg-gray-dark flex flex-wrap items-center justify-center 
      px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 xl:px-12 xl:py-12 rounded-3xl 
      mt-[-30px] mb-8 transition-all duration-10"
      whileHover={{
        boxShadow: "0px 0px 20px rgba(0, 128, 255, 0.4)", // Blue glow effect
        backdropFilter: "blur(30px)", // Light blur effect
      }}
    >
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 xl:gap-8 w-full">
        {brandsData.map((brand) => (
          <SingleBrand key={brand.id} brand={brand} />
        ))}
      </div>
    </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, name } = brand;

  return (
    <div className="flex items-center justify-center py-2 sm:py-3 w-auto">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 
        lg:w-24 lg:h-24 xl:w-28 xl:h-28 opacity-70 grayscale transition 
        hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:hover:opacity-100"
      >
        <Image src={image} alt={name} fill className="object-contain" />
      </a>
    </div>
  );
};
