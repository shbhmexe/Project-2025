import Link from "next/link";
import { Arvo } from 'next/font/google';

const arvo = Arvo({
    subsets: ['latin'],
    weight: ['400', '700'],
});


export default function NotFound() {
    return (
        <section className={`${arvo.className} fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-y-auto py-10`}>
            <div className="container">
                <div className="flex justify-center">
                    <div className="w-full max-w-[800px] text-center">

                        {/* 404 Heading at the top */}
                        <h1 className="text-center text-6xl md:text-[80px] font-bold text-black mb-4">
                            404
                        </h1>

                        {/* Background GIF in the middle */}
                        <div
                            className="four_zero_four_bg h-[250px] md:h-[400px] bg-center bg-no-repeat bg-contain md:bg-auto"
                            style={{
                                backgroundImage: "url('/images/404-bg.gif')",
                            }}
                        >
                        </div>

                        {/* Content box at the bottom */}
                        <div className="contant_box_404 mt-0 md:mt-[-50px]">
                            <h3 className="text-2xl md:text-4xl font-bold mb-4 text-black">
                                Look like you're lost
                            </h3>

                            <p className="text-base text-body-color mb-6">
                                the page you are looking for not available!
                            </p>

                            <Link
                                href="/"
                                className="inline-block px-10 py-3 bg-[#39ac31] text-white font-medium rounded hover:bg-[#349e2d] transition-all duration-300 shadow-md"
                            >
                                Go to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
