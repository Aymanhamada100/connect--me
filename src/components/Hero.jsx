import { IoSearchOutline } from "react-icons/io5";

export default function Hero() {
    return (
        <section className="min-h-screen bg-[#d6e2edfc] flex flex-col items-center gap-12 pt-45 px-4 pb-16">
            <div className="w-full max-w-3xl">
                <p className="text-5xl font-normal text-black text-center leading-tight">
                    Find Your <span className="text-blue-500">Dream Job</span> That Suit With Exciting Opportunities
                </p>
            </div>

            {/* ===== SUBTITLE ===== */}
            <div className="w-full max-w-2xl">
                <p className="text-center font-normal text-lg text-[#979AA0]">
                    Embark on a journey towards your dream career, your ultimate job-finding companion! We curated
                    a platform that connects talented individuals with exciting opportunities.
                </p>
            </div>

            {/* ===== SEARCH ===== */}
            <div className="w-full max-w-2xl flex flex-col gap-2">
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                        <input
                            type="text"
                            placeholder="Job title, Salary, or Companies...."
                            className="w-full h-14 pl-12 pr-4 rounded-[5px] bg-white placeholder-gray-400 text-black outline-none"
                        />
                    </div>
                    <button className="btn btn-neutral h-14 px-6 font-semibold text-lg rounded-[5px] shrink-0">
                        Explore Now
                    </button>
                </div>

                {/* popular categories */}
                <div className="flex flex-wrap gap-3 pl-2">
                    <span className="text-sm text-[#ADACAC]">Popular Categories:</span>
                    <span className="text-sm text-[#10141D] underline cursor-pointer">Product Manager</span>
                    <span className="text-sm text-[#10141D] underline cursor-pointer">Frontend Dev</span>
                    <span className="text-sm text-[#10141D] underline cursor-pointer">Data Analyst</span>
                </div>
            </div>

            {/* ===== STATS ===== */}
            <div className="w-full max-w-3xl grid grid-cols-4 divide-x-2 text-black mt-8">
                <div className="flex flex-col justify-center items-center px-4">
                    <p className="font-normal text-base text-center">Live Jobs</p>
                    <h1 className="font-bold text-3xl">30000+</h1>
                </div>
                <div className="flex flex-col justify-center items-center px-4">
                    <p className="font-normal text-base text-center">Daily Job Post</p>
                    <h1 className="font-bold text-3xl">5000+</h1>
                </div>
                <div className="flex flex-col justify-center items-center px-4">
                    <p className="font-normal text-base text-center">People Get Hired</p>
                    <h1 className="font-bold text-3xl">25000+</h1>
                </div>
                <div className="flex flex-col justify-center items-center px-4">
                    <p className="font-normal text-base text-center">Companies</p>
                    <h1 className="font-bold text-3xl">1000+</h1>
                </div>
            </div>

        </section>
    );
}