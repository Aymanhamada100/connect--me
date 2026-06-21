export default function About() {
    return (
        <>
            {/* ===== HERO ===== */}
            <section className="relative bg-[#8DBAEF] flex flex-col items-center justify-center text-center px-6 sm:px-8 py-14 gap-5 overflow-hidden">

                {/* Decorative X - hidden on mobile */}
                <div className="hidden sm:block absolute left-10 top-1/2 -translate-y-1/2 select-none pointer-events-none">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <line x1="2" y1="2" x2="26" y2="26" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="26" y1="2" x2="2" y2="26" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                </div>

                {/* Decorative sparkles - hidden on mobile */}
                <div className="hidden sm:flex absolute right-14 top-[35%] flex-col items-start gap-2 pointer-events-none select-none">
                    <svg width="36" height="36" viewBox="0 0 40 40" fill="white">
                        <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" />
                    </svg>
                    <svg width="14" height="14" viewBox="0 0 40 40" fill="white" className="ml-5">
                        <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" />
                    </svg>
                </div>

                {/* Heading */}
                <h1 className="font-bold text-2xl sm:text-3xl md:text-[38px] leading-tight text-white">
                    Explore Your{" "}
                    <span className="text-blue-700">Next Career</span>{" "}
                    Move
                </h1>

                {/* Subtitle */}
                <p className="text-white text-sm md:text-[15px] leading-relaxed max-w-md">
                    Are you ready to take the next step in your career? ConnectMe help you discover
                    <br className="hidden sm:block" />
                    exciting opportunities tailored to your skills and aspirations
                </p>

                {/* CTA */}
                <button className="mt-1 bg-white text-gray-800 font-semibold text-sm px-8 sm:px-10 py-3 rounded-full hover:bg-gray-50 transition-colors">
                    Sign Up Now
                </button>

                {/* Divider */}
                <div className="absolute bottom-0 left-4 right-4 sm:left-8 sm:right-8 h-px bg-white/25" />
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="bg-[#8DBAEF] px-4 sm:px-8 md:px-10 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 items-start">

                    {/* Left - description */}
                    <p className="text-white font-semibold text-sm leading-relaxed text-center sm:text-left">
                        Join thousands of successful job seekers who have found their dream
                        careers through our platform. Your future begins here!
                    </p>

                    {/* Center - nav links */}
                    <div className="flex flex-row flex-wrap justify-center sm:flex-col sm:items-center gap-3 sm:gap-1.5">
                        {["Home", "Find Jobs", "Companies", "Categories", "Post Jobs"].map((link) => (
                            <a key={link} href="#" className="text-white text-sm hover:underline">
                                {link}
                            </a>
                        ))}
                    </div>

                    {/* Right - newsletter */}
                    <div className="flex flex-col items-center sm:items-start">
                        <h3 className="text-white font-bold text-sm md:text-[15px] leading-snug mb-3 text-center sm:text-left">
                            Subscribe to our newsletter
                        </h3>
                        <div className="flex w-full max-w-xs">
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="flex-1 px-3 py-2 rounded-l-md text-sm text-gray-600 outline-none bg-white min-w-0"
                            />
                            <button className="bg-yellow-400 hover:bg-yellow-500 transition-colors px-3 py-2 rounded-r-md shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
            </footer>
        </>
    );
}