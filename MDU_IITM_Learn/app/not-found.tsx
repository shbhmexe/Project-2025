import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white py-20 dark:bg-gray-dark overflow-y-auto">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[850px] text-center">
                            <div className="relative mx-auto mb-10 w-full max-w-[400px]">
                                <h1 className="text-[120px] font-bold leading-none text-primary/20 sm:text-[150px] md:text-[200px] dark:text-white/10">
                                    404
                                </h1>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl">
                                        Page Not Found
                                    </h2>
                                </div>
                            </div>
                            <h3 className="mb-5 text-xl font-semibold text-black dark:text-white sm:text-2xl">
                                Oops! The page you're looking for doesn't exist.
                            </h3>
                            <p className="mb-10 text-base font-medium text-body-color dark:text-body-color-dark">
                                The link you followed may be broken, or the page may have been removed.
                                Don't worry, you can always go back to the homepage.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center rounded-lg bg-black dark:bg-white px-8 py-4 text-center text-base font-semibold text-white dark:text-black hover:opacity-90 transition-all duration-300 shadow-submit transition-all"
                            >
                                Go Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
