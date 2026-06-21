import { useState, useEffect } from "react";
import { APICompany } from "../store";

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function getToken() {
    return localStorage.getItem("companyToken") ||
        sessionStorage.getItem("companyToken") ||
        localStorage.getItem("userToken") ||
        sessionStorage.getItem("userToken") || "";
}

function authHeaders() {
    const token = getToken();
    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
}

const JOB_COLORS = [
    { color: "from-blue-50 to-indigo-50", accent: "bg-blue-100", emoji: "🚀" },
    { color: "from-purple-50 to-pink-50", accent: "bg-purple-100", emoji: "🎨" },
    { color: "from-green-50 to-teal-50", accent: "bg-green-100", emoji: "🤖" },
    { color: "from-orange-50 to-amber-50", accent: "bg-orange-100", emoji: "☁️" },
    { color: "from-rose-50 to-red-50", accent: "bg-rose-100", emoji: "💡" },
    { color: "from-cyan-50 to-sky-50", accent: "bg-cyan-100", emoji: "⚡" },
];

function normalizeJob(j, index) {
    const style = JOB_COLORS[index % JOB_COLORS.length];
    const posted = j.postedDate || j.posted || j.createdAt || j.CreatedAt || "";

    // company ممكن يكون object أو string
    const rawCompany = j.companyName || j.company || j.Company;
    const company = typeof rawCompany === "object" && rawCompany !== null
        ? rawCompany.companyName || rawCompany.name || rawCompany.Name || "—"
        : rawCompany || "—";

    // location ممكن يكون object أو string
    const rawLocation = j.location || j.Location;
    const location = typeof rawLocation === "object" && rawLocation !== null
        ? rawLocation.city || rawLocation.address || rawLocation.name || "—"
        : rawLocation || "—";

    return {
        id: j.id || j.Id || j.vacancyId || index,
        title: j.title || j.Title || j.jobTitle || "Untitled",
        company,
        location,
        type: j.type || j.Type || j.jobType || "Full-time",
        salary: j.salary || j.Salary || "—",
        description: j.description || j.Description || j.details || "",
        requirements: Array.isArray(j.requirements || j.Requirements) ? (j.requirements || j.Requirements) : [],
        benefits: Array.isArray(j.benefits || j.Benefits) ? (j.benefits || j.Benefits) : [],
        tags: Array.isArray(j.tags || j.Tags || j.skills) ? (j.tags || j.Tags || j.skills) : [],
        posted: posted && posted.includes("-")
            ? new Date(posted).toLocaleDateString("en-EG", { month: "short", day: "numeric" })
            : posted || "—",
        ...style,
    };
}

// ─── SKELETON ─────────────────────────────────────────────────────────────────
function CardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <div className="h-3 bg-gray-100 rounded w-20" />
                <div className="h-8 bg-gray-200 rounded-xl w-24" />
            </div>
        </div>
    );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function JobModal({ job, onClose }) {
    if (!job) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className={`bg-linear-to-br ${job.color} p-6 rounded-t-2xl relative`}>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-gray-600 hover:text-gray-900 transition-all text-lg font-bold"
                    >
                        ×
                    </button>
                    <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 ${job.accent} rounded-xl flex items-center justify-center text-3xl shadow-sm`}>
                            {job.emoji}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
                            <p className="text-gray-600 font-medium mt-1">{job.company}</p>
                            <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                                <span>📍 {job.location}</span>
                                <span>🕐 {job.type}</span>
                                <span>💰 {job.salary}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Tags */}
                    {job.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {job.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Description */}
                    {job.description && (
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2 text-lg">About the Role</h3>
                            <p className="text-gray-600 leading-relaxed">{job.description}</p>
                        </div>
                    )}

                    {/* Requirements */}
                    {job.requirements.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Requirements</h3>
                            <ul className="space-y-2">
                                {job.requirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-600">
                                        <span className="text-blue-500 mt-1">✓</span>
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Benefits */}
                    {job.benefits.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Benefits</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {job.benefits.map((b, i) => (
                                    <div key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                                        <span className="text-green-500">⭐</span>
                                        {b}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="flex gap-3 pt-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                            Apply Now
                        </button>
                        <button className="px-4 py-3 border-2 border-gray-200 hover:border-blue-300 text-gray-600 hover:text-blue-600 rounded-xl transition-colors">
                            🔖 Save
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-400">Posted {job.posted}</p>
                </div>
            </div>
        </div>
    );
}

// ─── JOB CARD ─────────────────────────────────────────────────────────────────
function JobCard({ job, onViewJob }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 p-5">
            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${job.accent} rounded-xl flex items-center justify-center text-2xl shrink-0`}>
                    {job.emoji}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-base leading-tight">{job.title}</h3>
                    <p className="text-gray-500 text-sm mt-0.5">{job.company}</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-400">
                        <span>📍 {job.location}</span>
                        <span>🕐 {job.type}</span>
                        <span>💰 {job.salary}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-400">{job.posted}</span>
                <button
                    onClick={() => onViewJob(job)}
                    className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                >
                    Apply Now
                </button>
            </div>
        </div>
    );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [viewAll, setViewAll] = useState(false);

    useEffect(() => {
        fetch(APICompany.getAllJobs, { headers: authHeaders() })
            .then(async (res) => {
                if (!res.ok) throw new Error("Failed to fetch jobs");
                return res.json();
            })
            .then((data) => {
                console.log("Jobs API:", data);

                const raw = Array.isArray(data)
                    ? data
                    : Array.isArray(data.data) ? data.data
                        : Array.isArray(data.vacancies) ? data.vacancies
                            : Array.isArray(data.Vacancies) ? data.Vacancies
                                : [];

                setJobs(raw.map(normalizeJob));
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load jobs. Please try again.");
            })
            .finally(() => setLoading(false));
    }, []);

    const displayedJobs = viewAll ? jobs : jobs.slice(0, 4);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Featured Jobs</h1>
                    <p className="text-gray-500 mt-2">Hand-picked jobs featured by our team</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="text-center py-10 text-red-500">
                        <p className="text-3xl mb-2">⚠️</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {loading
                        ? [1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)
                        : displayedJobs.map((job) => (
                            <JobCard key={job.id} job={job} onViewJob={setSelectedJob} />
                        ))
                    }
                </div>

                {/* Empty state */}
                {!loading && !error && jobs.length === 0 && (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-4xl mb-3">📭</p>
                        <p className="text-sm">No jobs available right now.</p>
                    </div>
                )}

                {/* View All Button */}
                {!loading && jobs.length > 4 && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => setViewAll(!viewAll)}
                            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200"
                        >
                            {viewAll ? "Show Less ↑" : `View All Jobs (${jobs.length}) →`}
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        </div>
    );
}