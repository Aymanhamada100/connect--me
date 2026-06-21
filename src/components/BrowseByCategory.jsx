import { useState } from "react";

const allCategories = [
    {
        id: 1,
        icon: "🖥️",
        bg: "bg-blue-100",
        label: "IT & Software",
        count: 24,
        tags: "Web, Mobile, AI, Data",
        filter: ["All", "Full-time"],
    },
    {
        id: 2,
        icon: "🎨",
        bg: "bg-yellow-100",
        label: "Design",
        count: 12,
        tags: "UI/UX, Graphic, Motion",
        filter: ["All", "Remote", "Work from home"],
    },
    {
        id: 3,
        icon: "📊",
        bg: "bg-pink-100",
        label: "Marketing",
        count: 18,
        tags: "Digital, Content, SEO",
        filter: ["All", "Full-time", "Remote"],
    },
    {
        id: 4,
        icon: "⚙️",
        bg: "bg-blue-100",
        label: "Engineering",
        count: 6,
        tags: "Civil, Mechanical, Electrical",
        filter: ["All", "Full-time"],
    },
    {
        id: 5,
        icon: "🛍️",
        bg: "bg-yellow-100",
        label: "Sales",
        count: 11,
        tags: "Retail, B2B, Real Estate",
        filter: ["All", "Full-time", "Remote"],
    },
    {
        id: 6,
        icon: "🧮",
        bg: "bg-green-100",
        label: "Accounting",
        count: 9,
        tags: "Tax, Auditing, Content, Banking",
        filter: ["All", "Work from home"],
    },
];

const filters = ["All", "Full-time", "Remote", "Work from home"];

export default function BrowseByCategory() {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [showMore, setShowMore] = useState(false);
    const [viewedCategory, setViewedCategory] = useState(null);

    const filtered = allCategories.filter((cat) => {
        const matchSearch = cat.label.toLowerCase().includes(search.toLowerCase()) ||
            cat.tags.toLowerCase().includes(search.toLowerCase());
        const matchFilter = cat.filter.includes(activeFilter);
        return matchSearch && matchFilter;
    });

    return (
        <div className="min-h-screen bg-slate-200 px-4 py-12 font-sans">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Browse Jobs by Category</h1>
                    <p className="text-gray-500 text-sm mt-1">Choose your field and explore available opportunities.</p>
                </div>

                {/* Search */}
                <div className="flex gap-2 mb-4">
                    <div className="flex-1 flex items-center bg-white rounded-xl px-4 gap-2 shadow-sm border border-gray-100">
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" strokeWidth="2" />
                            <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 py-3 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
                        />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shadow-sm">
                        Search
                    </button>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${activeFilter === f
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                    <button
                        onClick={() => setShowMore(!showMore)}
                        className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-blue-300 transition-all text-sm"
                    >
                        {showMore ? "▲" : "▼"}
                    </button>
                    {showMore && (
                        <div className="flex gap-2 flex-wrap">
                            {["Contract", "Internship", "Part-time"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${activeFilter === f
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Category Grid */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    {filtered.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            <p className="text-4xl mb-3">🔍</p>
                            <p className="text-sm">No categories match your search.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {filtered.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <div className={`w-12 h-12 ${cat.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                                        {cat.icon}
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-sm">{cat.label}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{cat.count} Open Positions</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{cat.tags}</p>
                                    <button
                                        onClick={() => setViewedCategory(cat)}
                                        className="mt-4 w-full flex items-center justify-center gap-1 border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white text-xs font-semibold py-2 rounded-lg transition-all"
                                    >
                                        View Jobs <span className="text-xs">›</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <h2 className="text-xl font-bold text-gray-900">Can't Find Your Category?</h2>
                    <button className="mt-4 bg-blue-100 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold px-8 py-3 rounded-xl transition-all inline-flex items-center gap-2 text-sm">
                        Explore All Jobs <span>→</span>
                    </button>
                </div>
            </div>

            {/* Modal */}
            {viewedCategory && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
                    onClick={() => setViewedCategory(null)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 ${viewedCategory.bg} rounded-xl flex items-center justify-center text-2xl`}>
                                    {viewedCategory.icon}
                                </div>
                                <div>
                                    <h2 className="font-bold text-gray-900">{viewedCategory.label}</h2>
                                    <p className="text-xs text-gray-400">{viewedCategory.count} Open Positions</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewedCategory(null)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold"
                            >
                                ×
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Specializations: <span className="text-gray-700 font-medium">{viewedCategory.tags}</span></p>
                        <div className="space-y-3">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex items-center justify-between border border-gray-100 rounded-xl p-3 hover:bg-gray-50 transition-colors">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{viewedCategory.label} Role #{i + 1}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">📍 Remote · 💰 $80k–$120k</p>
                                    </div>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                                        Apply
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setViewedCategory(null)}
                            className="mt-5 w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
