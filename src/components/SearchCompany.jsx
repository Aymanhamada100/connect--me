

export default function SearchCompany() {
    return (
        <section className="h-100 bg-[#155DFC] flex flex-col justify-center items-center mt-25">
            <div className="flex flex-col items-center gap-2 mb-8 text-white">
                <h1 className="font-medium text-[36px]">
                    Find Your Dream Job Today
                </h1>
                <p className="font-normal text-[18px] opacity-90">
                    Connect with top companies and discover thousands of opportunities
                </p>
            </div>
            <div className="w-225 bg-white rounded-2xl shadow-xl flex items-center p-2">
                <div className="flex items-center flex-1 px-4 py-3 border-r border-gray-200">
                    <svg
                        className="w-5 h-5 text-gray-400 mr-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>

                    <input
                        type="text"
                        placeholder="Job title, keywords, or company"
                        className="w-full outline-none text-gray-600 placeholder-gray-400"
                    />
                </div>
                <div className="flex items-center flex-1 px-4 py-3 border-r border-gray-200">
                    <svg
                        className="w-5 h-5 text-gray-400 mr-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z" />
                        <circle cx="12" cy="11" r="2.5" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Location"
                        className="w-full outline-none text-gray-600 placeholder-gray-400"
                    />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition">
                    Search
                </button>
            </div>
            <p className="font-normal text-[14px] pt-5">Popular: Designer, Developer, Manager, Marketing</p>

        </section>
    )
}