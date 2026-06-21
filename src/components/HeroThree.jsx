import { useState, useEffect } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { APICompany } from "../store";

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function getToken() {
    return (
        localStorage.getItem("companyToken") ||
        sessionStorage.getItem("companyToken") ||
        localStorage.getItem("userToken") ||
        sessionStorage.getItem("userToken") ||
        ""
    );
}

function authHeaders() {
    const token = getToken();
    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
}

function normalizeJob(j, index) {
    const posted = j.postedDate || j.posted || j.createdAt || j.CreatedAt || "";

    const rawCompany = j.companyName || j.company || j.Company;
    const company =
        typeof rawCompany === "object" && rawCompany !== null
            ? rawCompany.companyName || rawCompany.name || rawCompany.Name || "—"
            : rawCompany || "—";

    const rawLocation = j.location || j.Location;
    const location =
        typeof rawLocation === "object" && rawLocation !== null
            ? rawLocation.city || rawLocation.address || rawLocation.name || "—"
            : rawLocation || "—";

    const domain =
        typeof rawCompany === "object" && rawCompany !== null
            ? rawCompany.websiteLink || rawCompany.domain || ""
            : "";

    return {
        id: j.id || j.Id || j.vacancyId || index,
        title: j.title || j.Title || j.jobTitle || "Untitled",
        company,
        domain,
        location,
        type: j.type || j.Type || j.jobType || "Full-time",
        salary: j.salary || j.Salary || "Negotiable",
        posted:
            posted && posted.includes("-")
                ? new Date(posted).toLocaleDateString("en-EG", { month: "short", day: "numeric" })
                : posted || "—",
        description: j.description || j.Description || "",
        requirements: Array.isArray(j.requirements || j.Requirements)
            ? j.requirements || j.Requirements
            : [],
        benefits: Array.isArray(j.benefits || j.Benefits)
            ? j.benefits || j.Benefits
            : [],
        tags: Array.isArray(j.tags || j.Tags || j.skills)
            ? j.tags || j.Tags || j.skills
            : [],
    };
}

// ─── COMPANY LOGO ─────────────────────────────────────────────────────────────
function CompanyLogo({ domain, company }) {
    const [error, setError] = useState(false);

    const faviconUrl = domain
        ? `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
        : null;

    if (!faviconUrl || error) {
        return (
            <div className="w-11 h-11 rounded-xl border border-gray-100 bg-orange-50 flex items-center justify-center text-orange-500 font-extrabold text-lg shrink-0">
                {company?.charAt(0) || "?"}
            </div>
        );
    }

    return (
        <div className="w-11 h-11 rounded-xl border border-gray-100 bg-white flex items-center justify-center shrink-0 overflow-hidden p-1">
            <img
                src={faviconUrl}
                alt={company}
                className="w-full h-full object-contain"
                onError={() => setError(true)}
            />
        </div>
    );
}

// ─── SKELETON ─────────────────────────────────────────────────────────────────
function CardSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-200 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
            </div>
            <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-100 rounded w-2/3" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
            </div>
            <div className="flex gap-2">
                <div className="h-6 bg-gray-100 rounded-full w-16" />
                <div className="h-6 bg-gray-100 rounded-full w-24" />
                <div className="h-6 bg-gray-200 rounded-full w-20" />
            </div>
        </div>
    );
}

// ─── JOB CARD ─────────────────────────────────────────────────────────────────
function JobCard({ job, saved, onToggleSave }) {
    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all duration-200 cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
                <CompanyLogo domain={job.domain} company={job.company} />
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{job.title}</h3>
                    <p className="text-xs text-gray-400">{job.company}</p>
                </div>
                <button
                    onClick={() => onToggleSave(job.id)}
                    className="p-1 transition-all duration-200 hover:scale-110"
                    aria-label="Bookmark"
                >
                    {saved
                        ? <BsBookmarkFill className="text-orange-500 text-lg" />
                        : <BsBookmark className="text-gray-400 text-lg hover:text-orange-400 transition-colors" />
                    }
                </button>
            </div>

            <div className="flex flex-col gap-1 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>📍</span> {job.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>💼</span> {job.type}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>💰</span> {job.salary}
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
                    Remote
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
                    Priority slots available
                </span>
                <span className="bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    🕐 {job.posted}
                </span>
            </div>
        </div>
    );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ open, onClose, jobs }) {
    const [query, setQuery] = useState("");

    const filtered = jobs.filter(
        (j) =>
            j.title.toLowerCase().includes(query.toLowerCase()) ||
            j.company.toLowerCase().includes(query.toLowerCase())
    );

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl w-full max-w-xl max-h-[80vh] flex flex-col p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-extrabold text-gray-900">
                        All <span className="text-orange-500">Jobs</span>
                    </h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search job title or company..."
                    className="w-full border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-orange-400 mb-4 transition-colors"
                />

                <div className="overflow-y-auto flex flex-col gap-3 pr-1">
                    {filtered.length === 0 ? (
                        <p className="text-center text-gray-400 py-10 text-sm">No jobs found 😔</p>
                    ) : (
                        filtered.map((j) => (
                            <div
                                key={j.id}
                                className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all cursor-pointer"
                            >
                                <CompanyLogo domain={j.domain} company={j.company} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-900">{j.title}</p>
                                    <p className="text-xs text-gray-400">{j.company} · {j.location}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                                        {j.type}
                                    </span>
                                    <span className="bg-gray-900 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                        {j.posted}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function HeroThree() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(new Set());
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetch(APICompany.getAllJobs, { headers: authHeaders() })
            .then(async (res) => {
                if (!res.ok) throw new Error("Failed to fetch jobs");
                return res.json();
            })
            .then((data) => {
                const raw = Array.isArray(data)
                    ? data
                    : Array.isArray(data.data) ? data.data
                        : Array.isArray(data.vacancies) ? data.vacancies
                            : Array.isArray(data.Vacancies) ? data.Vacancies
                                : [];
                setJobs(raw.map(normalizeJob));
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const toggleSave = (id) => {
        setSaved((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    return (
        <section className="bg-white min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">

                <div className="text-center mb-10">
                    <span className="text-2xl block mb-1">✦</span>
                    <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
                        Latest Featured <span className="text-orange-500">Jobs</span>
                    </h2>
                    <p className="mt-3 text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                        Search and find your dream job is now easier than ever. Just browse a job and apply if you need to
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {loading
                        ? [1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} />)
                        : jobs.slice(0, 6).map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                saved={saved.has(job.id)}
                                onToggleSave={toggleSave}
                            />
                        ))
                    }
                </div>

                {!loading && jobs.length === 0 && (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-4xl mb-3">📭</p>
                        <p className="text-sm">No jobs available right now.</p>
                    </div>
                )}

                {!loading && jobs.length > 0 && (
                    <div className="text-center mt-10">
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-gray-900 hover:bg-orange-500 text-white font-bold px-10 py-3.5 rounded-full text-sm transition-colors duration-200"
                        >
                            View All Jobs ({jobs.length})
                        </button>
                    </div>
                )}
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} jobs={jobs} />
        </section>
    );
}