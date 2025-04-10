"use client";
import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";
import { useEffect, useRef, useState } from "react";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Vikram",
    designation: "BTech IT Student",
    content:
      "Fantastic platform! The free notes are a lifesaver, especially when juggling multiple subjects. Everything is laid out in a way that's easy to understand, and it's made my study sessions much more productive.",
    image: "/images/testimonials/auth-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Neha",
    designation: "BTech Civil Student ",
    content:
      "MDU IITM Notes has been a huge help during my semester. The notes are well-organized and easy to follow, which makes studying a lot more effective. A great resource for every BTech student.",
    image: "/images/testimonials/9131478.png",
    star: 5,
  },
  {
    id: 3,
    name: "Aakash",
    designation: "BTech Electrical Student",
    content:
      "MDU IITM Notes for BTech is a fantastic resource! The notes are detailed and easy to understand, and having free access to them has been a huge advantage in my studies. It's made exam prep so much more manageable!.",
    image: "/images/testimonials/8017294.png",
    star: 5,
  },
  {
    id: 4,
    name: "Priya",
    designation: "BTech CS Student",
    content:
      "I've tried many resources, but MDU IITM Notes stands out for clarity and organization. The structured approach to explaining complex concepts makes even the hardest topics easier to grasp. Highly recommended!",
    image: "/images/testimonials/9131478.png",
    star: 5,
  },
  {
    id: 5,
    name: "Rahul",
    designation: "BTech ECE Student",
    content:
      "These notes have been my go-to resource throughout my degree. The quality is excellent, and they cover everything in the syllabus. Having them readily available has saved me so much time and stress.",
    image: "/images/testimonials/8017294.png",
    star: 5,
  },
  {
    id: 6,
    name: "Ananya",
    designation: "BTech Mechanical Student",
    content:
      "The depth of content in MDU IITM Notes is impressive. I can always rely on finding comprehensive explanations for even the most complex mechanical engineering topics. It has become an essential part of my study routine.",
    image: "/images/testimonials/9131478.png",
    star: 5,
  },
  {
    id: 7,
    name: "Rohan",
    designation: "BTech Chemical Student",
    content:
      "As a Chemical Engineering student, finding quality notes can be challenging. MDU IITM Notes solved this problem completely! The materials are detailed, accurate, and follow the syllabus perfectly. An absolute game-changer.",
    image: "/images/testimonials/8017294.png",
    star: 5,
  },
];

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((current) => {
          const next = (current + 1) % testimonialData.length;
          // Scroll to the active testimonial smoothly
          const container = scrollRef.current;
          if (container) {
            const activeItem = container.querySelector(`.testimonial-item:nth-child(${next + 1})`);
            if (activeItem) {
              container.scrollTo({
                left: (activeItem as HTMLElement).offsetLeft - container.offsetLeft,
                behavior: 'smooth'
              });
            }
          }
          return next;
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="dark:bg-bg-color-dark bg-gray-light relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="What Our Users Says"
          paragraph="Students rave about the platform's user-friendly interface and the quality of notes available. With free access to essential study materials, users feel more confident and prepared for their BTech courses at MDU IITM."
          center
        />

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto carousel scrollbar-hide pb-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {testimonialData.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`testimonial-item flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4 transition-all duration-300 ${
                index === activeIndex ? 'opacity-100' : 'opacity-80'
              }`}
            >
              <SingleTestimonial testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {testimonialData.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-primary scale-110' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              onClick={() => {
                setActiveIndex(index);
                // Scroll to the clicked indicator's corresponding testimonial
                const container = scrollRef.current;
                if (container) {
                  const clickedItem = container.querySelector(`.testimonial-item:nth-child(${index + 1})`);
                  if (clickedItem) {
                    container.scrollTo({
                      left: (clickedItem as HTMLElement).offsetLeft - container.offsetLeft,
                      behavior: 'smooth'
                    });
                  }
                }
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative SVGs */}
      <div className="absolute right-0 top-5 z-[-1]">
        <svg
          width="238"
          height="531"
          viewBox="0 0 238 531"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="422.819"
            y="-70.8145"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 422.819 -70.8145)"
            fill="url(#paint0_linear_83:2)"
          />
          <rect
            opacity="0.3"
            x="426.568"
            y="144.886"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 426.568 144.886)"
            fill="url(#paint1_linear_83:2)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_83:2"
              x1="517.152"
              y1="-251.373"
              x2="517.152"
              y2="459.865"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_83:2"
              x1="455.327"
              y1="-35.673"
              x2="455.327"
              y2="675.565"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-5 left-0 z-[-1]">
        <svg
          width="279"
          height="106"
          viewBox="0 0 279 106"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5">
            <path
              d="M-57 12L50.0728 74.8548C55.5501 79.0219 70.8513 85.7589 88.2373 79.3692C109.97 71.3821 116.861 60.9642 156.615 63.7423C178.778 65.291 195.31 69.2985 205.911 62.3533C216.513 55.408 224.994 47.7682 243.016 49.1572C255.835 50.1453 265.278 50.8936 278 45.3373"
              stroke="url(#paint0_linear_72:302)"
            />
            <path
              d="M-57 1L50.0728 63.8548C55.5501 68.0219 70.8513 74.7589 88.2373 68.3692C109.97 60.3821 116.861 49.9642 156.615 52.7423C178.778 54.291 195.31 58.2985 205.911 51.3533C216.513 44.408 224.994 36.7682 243.016 38.1572C255.835 39.1453 265.278 39.8936 278 34.3373"
              stroke="url(#paint1_linear_72:302)"
            />
            <path
              d="M-57 23L50.0728 85.8548C55.5501 90.0219 70.8513 96.7589 88.2373 90.3692C109.97 82.3821 116.861 71.9642 156.615 74.7423C178.778 76.291 195.31 80.2985 205.911 73.3533C216.513 66.408 224.994 58.7682 243.016 60.1572C255.835 61.1453 265.278 61.8936 278 56.3373"
              stroke="url(#paint2_linear_72:302)"
            />
            <path
              d="M-57 35L50.0728 97.8548C55.5501 102.022 70.8513 108.759 88.2373 102.369C109.97 94.3821 116.861 83.9642 156.615 86.7423C178.778 88.291 195.31 92.2985 205.911 85.3533C216.513 78.408 224.994 70.7682 243.016 72.1572C255.835 73.1453 265.278 73.8936 278 68.3373"
              stroke="url(#paint3_linear_72:302)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_72:302"
              x1="256.267"
              y1="53.6717"
              x2="-40.8688"
              y2="8.15715"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_72:302"
              x1="256.267"
              y1="42.6717"
              x2="-40.8688"
              y2="-2.84285"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_72:302"
              x1="256.267"
              y1="64.6717"
              x2="-40.8688"
              y2="19.1572"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_72:302"
              x1="256.267"
              y1="76.6717"
              x2="-40.8688"
              y2="31.1572"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .carousel {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;  /* Firefox */
          -ms-overflow-style: none;  /* IE and Edge */
        }
        
        @media (max-width: 768px) {
          .carousel .testimonial-item {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
