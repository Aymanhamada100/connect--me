import { useState, useEffect } from "react";
import axios from "axios";
import ConnectMe from "../assets/Connect Me.png";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

const BASE_URL = "https://connectmeef.runasp.net/api";
const VACANCY_ALL = `${BASE_URL}/Vacancy/All`;
const VACANCY_APPLY = `${BASE_URL}/Vacancy/Apply`;

function getUserToken() {
    return localStorage.getItem("token") || sessionStorage.getItem("token") || null;
}

function normalizeJob(raw) {
    const companyName =
        typeof raw.company === "object"
            ? raw.company?.companyName ?? ""
            : raw.company ?? raw.companyName ?? "";

    const toArray = (val) => {
        if (!val) return [];
        if (Array.isArray(val)) return val;
        return val.split(/,|\n/).map((s) => s.trim()).filter(Boolean);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "Recently";
        try {
            return new Date(dateStr).toLocaleDateString("en-GB", {
                day: "numeric", month: "short", year: "numeric",
            });
        } catch { return dateStr; }
    };

    return {
        id: String(raw.vacancyID ?? raw.vacancyId ?? raw.id ?? Date.now()),
        title: raw.jobTitle ?? raw.title ?? "Untitled",
        company: companyName,
        tags: [raw.jobType].filter(Boolean),
        location: raw.location ?? "",
        experience: raw.experience ?? "",
        salary: raw.salaryRange ?? raw.salary ?? "",
        posted: formatDate(raw.createdAt ?? raw.posted),
        description: raw.jobDescription ?? raw.description ?? "",
        skills: toArray(raw.requiredSkills ?? raw.skills),
        requirements: toArray(raw.requirements),
        benefits: toArray(raw.benefits),
    };
}

function Tag({ label }) {
    const colors = {
        "Full-time": "bg-blue-50 text-blue-700",
        "Full Time": "bg-blue-50 text-blue-700",
        "Part Time": "bg-orange-50 text-orange-700",
        Remote: "bg-green-50 text-green-700",
        Onsite: "bg-purple-50 text-purple-700",
        Hybrid: "bg-yellow-50 text-yellow-700",
    };
    const cls = colors[label] || "bg-gray-100 text-gray-600";
    return <span className={`${cls} text-xs font-semibold px-2.5 py-1 rounded-full`}>{label}</span>;
}

function JobCard({ job, active, onClick, applied }) {
    return (
        <div
            onClick={onClick}
            className={`relative p-4 rounded-2xl cursor-pointer border transition-all ${active
                ? "border-blue-500 bg-blue-50 shadow-sm"
                : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm"
                }`}
        >
            {applied && (
                <span className="absolute top-3 right-3 text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                    ✓ Applied
                </span>
            )}
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center text-lg shrink-0 font-bold text-blue-600">
                    {job.company?.[0]?.toUpperCase() || "C"}
                </div>
                <div className="flex-1 min-w-0 pr-6">
                    <p className="font-bold text-gray-900 text-sm truncate">{job.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{job.company}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {job.tags.map((t) => <Tag key={t} label={t} />)}
                        {job.location && (
                            <span className="text-xs text-gray-400">📍 {job.location}</span>
                        )}
                    </div>
                    {job.salary && (
                        <p className="text-xs text-gray-500 mt-1.5 font-medium">💰 {job.salary}</p>
                    )}
                </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">{job.posted}</p>
        </div>
    );
}

function JobDetail({ job, applied, onApply, applying, onBack }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* زرار الرجوع - بيظهر على الموبيل بس */}
            <button
                onClick={onBack}
                className="md:hidden flex items-center gap-2 text-blue-600 text-sm font-semibold px-5 pt-4 pb-0"
            >
                <GoArrowLeft /> Back to jobs
            </button>

            <div className="bg-linear-to-r from-blue-600 to-blue-500 p-5 sm:p-6 text-white">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black text-white shrink-0">
                        {job.company?.[0]?.toUpperCase() || "C"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="font-black text-base sm:text-lg leading-tight">{job.title}</h2>
                        <p className="text-blue-100 text-sm mt-0.5">{job.company}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {job.tags.map((t) => (
                                <span key={t} className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full font-medium">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 sm:p-5 space-y-5">
                <div className="grid grid-cols-2 gap-3">
                    {job.location && (
                        <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-400 font-medium">Location</p>
                            <p className="text-sm font-bold text-gray-800 mt-0.5">📍 {job.location}</p>
                        </div>
                    )}
                    {job.salary && (
                        <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-400 font-medium">Salary</p>
                            <p className="text-sm font-bold text-gray-800 mt-0.5">💰 {job.salary}</p>
                        </div>
                    )}
                    {job.experience && (
                        <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-400 font-medium">Experience</p>
                            <p className="text-sm font-bold text-gray-800 mt-0.5">🏆 {job.experience}</p>
                        </div>
                    )}
                    {job.posted && (
                        <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-400 font-medium">Posted</p>
                            <p className="text-sm font-bold text-gray-800 mt-0.5">📅 {job.posted}</p>
                        </div>
                    )}
                </div>

                {applied ? (
                    <div className="w-full bg-green-50 border border-green-200 text-green-700 font-bold text-sm py-3.5 rounded-xl text-center">
                        ✅ Already Applied
                    </div>
                ) : (
                    <button
                        onClick={onApply}
                        disabled={applying}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-black text-sm py-3.5 rounded-xl transition-all active:scale-95"
                    >
                        {applying ? "⏳ Applying..." : "🚀 Apply Now"}
                    </button>
                )}

                <hr className="border-gray-100" />

                {job.description && (
                    <div>
                        <h3 className="font-black text-gray-900 text-sm mb-2">📋 Job Description</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">{job.description}</p>
                    </div>
                )}

                {job.skills.length > 0 && (
                    <>
                        <hr className="border-gray-100" />
                        <div>
                            <h3 className="font-black text-gray-900 text-sm mb-2">🛠 Required Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {job.skills.map((s) => (
                                    <span key={s} className="text-xs bg-blue-50 text-blue-700 font-semibold px-3 py-1.5 rounded-full">{s}</span>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {job.requirements.length > 0 && (
                    <>
                        <hr className="border-gray-100" />
                        <div>
                            <h3 className="font-black text-gray-900 text-sm mb-2">📌 Requirements</h3>
                            <ul className="space-y-1.5">
                                {job.requirements.map((r) => (
                                    <li key={r} className="text-xs text-gray-600 flex items-start gap-2">
                                        <span className="text-blue-400 mt-0.5">▸</span>{r}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                {job.benefits.length > 0 && (
                    <>
                        <hr className="border-gray-100" />
                        <div>
                            <h3 className="font-black text-gray-900 text-sm mb-2">🎁 Benefits</h3>
                            <ul className="space-y-1.5">
                                {job.benefits.map((b) => (
                                    <li key={b} className="text-xs text-gray-600 flex items-start gap-2">
                                        <span className="text-green-400 mt-0.5">✓</span>{b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function UserJobsPage() {
    const [jobs, setJobs] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [applying, setApplying] = useState(false);
    const [toast, setToast] = useState(null);
    const [appliedIds, setAppliedIds] = useState([]);

    // على الموبيل: هل بنشوف التفاصيل ولا اللستة؟
    const [showDetail, setShowDetail] = useState(false);

    const showToast = (msg, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const res = await axios.get(VACANCY_ALL);
                const raw = Array.isArray(res.data)
                    ? res.data
                    : res.data?.data ?? res.data?.vacancies ?? [];
                const normalized = raw.map(normalizeJob);
                setJobs(normalized);
                if (normalized.length > 0) setSelected(normalized[0]);
            } catch (err) {
                setError("Failed to load jobs. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleApply = async () => {
        const token = getUserToken();
        const vacancyId = Number(selected.id);
        setApplying(true);
        try {
            await axios.post(
                VACANCY_APPLY,
                { vacancyId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            setAppliedIds((prev) => [...prev, selected.id]);
            showToast("✅ Applied successfully!");
        } catch (err) {
            showToast("❌ Failed to apply. Try again.", "error");
            console.error(err.response?.data);
        } finally {
            setApplying(false);
        }
    };

    // لما يضغط على كارت على الموبيل
    const handleSelectJob = (job) => {
        setSelected(job);
        setShowDetail(true);
    };

    const jobTypes = ["All", ...new Set(jobs.flatMap((j) => j.tags))].filter(Boolean);

    const filtered = jobs.filter((j) => {
        const matchSearch =
            j.title.toLowerCase().includes(search.toLowerCase()) ||
            j.company.toLowerCase().includes(search.toLowerCase()) ||
            j.location.toLowerCase().includes(search.toLowerCase());
        const matchType = typeFilter === "All" || j.tags.includes(typeFilter);
        return matchSearch && matchType;
    });

    return (
        <div className="min-h-screen bg-slate-50 font-sans">

            {/* ===== HEADER ===== */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-30 h-14">
                <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link to="/">
                            <div className="w-8 h-8 text-blue-800 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer">
                                <GoArrowLeft />
                            </div>
                        </Link>
                        <img src={ConnectMe} alt="ConnectMe" className="h-7 object-contain" />
                    </div>
                    <div className="flex items-center gap-3">
                        {appliedIds.length > 0 && (
                            <span className="text-xs bg-green-50 text-green-700 font-medium px-2.5 py-1 rounded-full">
                                ✓ {appliedIds.length} Applied
                            </span>
                        )}
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">U</div>
                    </div>
                </div>
            </header>

            {/* ===== HERO / SEARCH ===== */}
            <div className="bg-linear-to-r from-blue-600 to-blue-500 text-white px-4 py-6 sm:py-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-xl sm:text-2xl font-black mb-1">Find Your Next Job 🚀</h1>
                    <p className="text-blue-100 text-sm mb-4">
                        {loading ? "Loading jobs..." : `${jobs.length} jobs available for you`}
                    </p>
                    <div className="flex items-center bg-white rounded-2xl px-4 gap-3 h-11 sm:h-12 shadow-sm max-w-xl">
                        <span className="text-gray-400">🔍</span>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search jobs, companies..."
                            className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent"
                        />
                        {search && (
                            <button onClick={() => setSearch("")} className="text-gray-300 hover:text-gray-500 text-lg">×</button>
                        )}
                    </div>
                    <div className="flex gap-2 mt-3 flex-wrap">
                        {jobTypes.map((t) => (
                            <button
                                key={t}
                                onClick={() => setTypeFilter(t)}
                                className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${typeFilter === t ? "bg-white text-blue-600" : "bg-white/20 text-white hover:bg-white/30"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== CONTENT ===== */}
            <div className="max-w-6xl mx-auto px-4 py-5">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="text-4xl animate-spin mb-3">⏳</div>
                            <p className="text-gray-400 text-sm">Loading jobs...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-center py-16 text-red-500">
                        <p className="text-3xl mb-2">⚠️</p>
                        <p>{error}</p>
                    </div>
                ) : (
                    <>
                        {/* ── ديسك/تابلت: جنب بعض ── */}
                        <div className="hidden md:flex gap-5">
                            {/* List */}
                            <div className="w-72 lg:w-80 shrink-0 space-y-3">
                                <p className="text-xs text-gray-400 font-semibold px-1">
                                    {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
                                </p>
                                {filtered.length === 0 ? (
                                    <div className="text-center py-16 text-gray-400">
                                        <p className="text-3xl mb-2">🔍</p>
                                        <p className="text-sm">No jobs match your search.</p>
                                    </div>
                                ) : (
                                    filtered.map((j) => (
                                        <JobCard
                                            key={j.id}
                                            job={j}
                                            active={selected?.id === j.id}
                                            applied={appliedIds.includes(j.id)}
                                            onClick={() => setSelected(j)}
                                        />
                                    ))
                                )}
                            </div>

                            {/* Detail */}
                            <div className="flex-1 min-w-0">
                                {selected ? (
                                    <JobDetail
                                        job={selected}
                                        applied={appliedIds.includes(selected.id)}
                                        onApply={handleApply}
                                        applying={applying}
                                        onBack={() => { }}
                                    />
                                ) : (
                                    <div className="bg-white rounded-2xl border border-gray-100 flex items-center justify-center h-64">
                                        <p className="text-gray-400 text-sm">Select a job to view details</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── موبيل: اللستة أو التفاصيل ── */}
                        <div className="md:hidden">
                            {!showDetail ? (
                                <div className="space-y-3">
                                    <p className="text-xs text-gray-400 font-semibold px-1">
                                        {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
                                    </p>
                                    {filtered.length === 0 ? (
                                        <div className="text-center py-16 text-gray-400">
                                            <p className="text-3xl mb-2">🔍</p>
                                            <p className="text-sm">No jobs match your search.</p>
                                        </div>
                                    ) : (
                                        filtered.map((j) => (
                                            <JobCard
                                                key={j.id}
                                                job={j}
                                                active={false}
                                                applied={appliedIds.includes(j.id)}
                                                onClick={() => handleSelectJob(j)}
                                            />
                                        ))
                                    )}
                                </div>
                            ) : (
                                selected && (
                                    <JobDetail
                                        job={selected}
                                        applied={appliedIds.includes(selected.id)}
                                        onApply={handleApply}
                                        applying={applying}
                                        onBack={() => setShowDetail(false)}
                                    />
                                )
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* ===== TOAST ===== */}
            {toast && (
                <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 text-white text-sm font-bold px-5 py-3 rounded-xl shadow-lg z-50 transition-all ${toast.type === "error" ? "bg-red-500" : "bg-green-600"
                    }`}>
                    {toast.msg}
                </div>
            )}
        </div>
    );
}