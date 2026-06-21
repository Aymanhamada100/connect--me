import { useState, useEffect } from "react";
import ConnectMe from "../assets/Connect Me.png";
import { APICompany } from "../store";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function getToken() { return localStorage.getItem("companyToken") || sessionStorage.getItem("companyToken") || ""; }
function getCompanyId() { return localStorage.getItem("companyId") || sessionStorage.getItem("companyId") || ""; }
function authHeaders() {
    const token = getToken();
    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
}

function normalizeJob(j) {
    const posted = j.postedDate || j.posted || j.createdAt || j.CreatedAt || "";
    return {
        id: j.id || j.Id || j.vacancyId || Math.random(),
        title: j.title || j.Title || j.jobTitle || "Untitled",
        location: j.location || j.Location || "—",
        type: j.type || j.Type || j.jobType || "—",
        salary: j.salary || j.Salary || "—",
        status: j.status || j.Status || "Active",
        applicants: j.applicants || j.Applicants || j.applicantsCount || 0,
        posted:
            posted && posted.includes("-")
                ? new Date(posted).toLocaleDateString("en-EG", { month: "short", day: "numeric" })
                : posted || "—",
    };
}

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
const STATUS_STYLE = {
    Active: "bg-green-50 text-green-700 border border-green-200",
    Paused: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    Closed: "bg-red-50 text-red-500 border border-red-200",
    Pending: "bg-yellow-50 text-yellow-700",
    Reviewed: "bg-blue-50 text-blue-700",
    Interview: "bg-purple-50 text-purple-700",
    Accepted: "bg-green-50 text-green-700",
    Rejected: "bg-red-50 text-red-500",
};

function Badge({ label }) {
    return (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${STATUS_STYLE[label] || "bg-gray-100 text-gray-600"}`}>
            {label}
        </span>
    );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, gradient, sub }) {
    return (
        <div className={`bg-linear-to-br ${gradient} rounded-2xl p-5 text-white`}>
            <span className="text-2xl">{icon}</span>
            <p className="text-3xl font-black mt-2">{value}</p>
            <p className="text-white/80 text-xs font-semibold mt-1">{label}</p>
            {sub && <p className="text-white/50 text-xs mt-0.5">{sub}</p>}
        </div>
    );
}

// ─── TABLE SKELETON ───────────────────────────────────────────────────────────
function TableSkeleton() {
    return (
        <div className="animate-pulse divide-y divide-gray-50">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4 px-5 py-4 items-center">
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/6" />
                    <div className="h-3 bg-gray-100 rounded w-1/6" />
                    <div className="h-3 bg-gray-200 rounded w-1/12 ml-auto" />
                </div>
            ))}
        </div>
    );
}


export default function CompanyDashboard() {
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [loadingA, setLoadingA] = useState(true);
    const [loadingC, setLoadingC] = useState(true);
    const [loadingJ, setLoadingJ] = useState(true);
    const [jobFilter, setJobFilter] = useState("All");
    const [appFilter, setAppFilter] = useState("All");
    const [jobSearch, setJobSearch] = useState("");

    useEffect(() => {
        const id = getCompanyId();
        if (!id) { setLoadingC(false); return; }

        fetch(APICompany.profile(id), { headers: authHeaders() })
            .then(async (res) => {
                if (!res.ok) throw new Error("Failed to fetch profile");
                return res.json();
            })
            .then((data) => {
                setCompany(data?.data || data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoadingC(false));
    }, []);
    useEffect(() => {
        fetch(APICompany.getApplicants, { headers: authHeaders() })
            .then(async (res) => {
                if (!res.ok) throw new Error("Failed to fetch applicants");
                return res.json();
            })
            .then((data) => {
                console.log("Applicants API:", data);

                const raw = Array.isArray(data)
                    ? data
                    : Array.isArray(data.data)
                        ? data.data
                        : Array.isArray(data.applicants)
                            ? data.applicants
                            : [];

                const normalized = raw.map((a) => ({
                    id: a.id || a.Id,
                    name: a.fullName || a.name || "Unknown",
                    job: a.vacancyTitle || a.jobTitle || "—",
                    status: a.status || "Pending",
                    date: a.appliedDate
                        ? new Date(a.appliedDate).toLocaleDateString("en-EG")
                        : "—",
                    match: a.matchPercentage || 0,
                }));
                setApplicants(normalized);
            })
            .catch((err) => {
                console.error(err);
                setApplicants([]);
            })
            .finally(() => setLoadingA(false));
    }, []);
    useEffect(() => {
        fetch(APICompany.getAllJobs, { headers: authHeaders() })
            .then(async (res) => {
                if (!res.ok) {
                    if (res.status === 401) {
                        console.error("Unauthorized - redirecting to login");
                        localStorage.removeItem("companyToken");
                        sessionStorage.removeItem("companyToken");
                        window.location.href = "/company-login";
                        return null;
                    }
                    throw new Error("Request failed");
                }
                return res.json();
            })
            .then((d) => {
                if (!d) return;
                console.log("Jobs API:", d);

                const raw = Array.isArray(d)
                    ? d
                    : Array.isArray(d.data)
                        ? d.data
                        : Array.isArray(d.vacancies)
                            ? d.vacancies
                            : Array.isArray(d.Vacancies)
                                ? d.Vacancies
                                : [];

                setJobs(raw.map(normalizeJob));
            })
            .catch((err) => {
                console.error(err);
                setJobs([]);
            })
            .finally(() => setLoadingJ(false));
    }, []);

    // ── إحصائيات ───────────────────────────────────────────────────────────────
    const activeJobs = jobs.filter((j) => j.status === "Active").length;
    const totalApps = applicants.length;
    const pendingApps = applicants.filter((a) => a.status === "Pending").length;
    const acceptedApps = applicants.filter((a) => a.status === "Accepted").length;

    // ── فلترة الوظايف ──────────────────────────────────────────────────────────
    const filteredJobs = jobs.filter((j) => {
        const matchFilter = jobFilter === "All" || j.status === jobFilter;
        const matchSearch =
            (j.title || "").toLowerCase().includes(jobSearch.toLowerCase()) ||
            (j.location || "").toLowerCase().includes(jobSearch.toLowerCase());
        return matchFilter && matchSearch;
    });

    // ── فلترة المتقدمين ─────────────────────────────────────────────────────────
    const filteredApps =
        appFilter === "All"
            ? applicants
            : applicants.filter((a) => a.status === appFilter);

    // ── تحديث status متقدم ─────────────────────────────────────────────────────
    const updateApp = async (id, status) => {
        try {
            const res = await fetch(APICompany.updateApplicantStatus(id), {
                method: "PUT",
                headers: authHeaders(),
                body: JSON.stringify({ status }),
            });

            if (!res.ok) throw new Error("Update failed");

            setApplicants((prev) =>
                prev.map((a) => (a.id === id ? { ...a, status } : a))
            );
        } catch (err) {
            console.error(err);
        }
    };

    const companyName = company?.companyName || "";
    const location = [company?.country, company?.city].filter(Boolean).join(", ");

    return (
        <div className="min-h-screen bg-[#F4F7FC] font-sans">

            {/* ── NAVBAR ───────────────────────────────────────────────────────── */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-30 h-16 flex items-center px-6 gap-4 shadow-sm">
                <div className="flex items-center gap-2 flex-1">
                    <Link to="/HomeCompany">
                        <div className="w-8 h-8 text-blue-800 bg-gray-100 rounded-full flex items-center justify-center  text-[50px] font-bold cursor-pointer">
                            <GoArrowLeft />
                        </div>
                    </Link>
                    <img src={ConnectMe} alt="" />
                </div>
                <div className="flex items-center gap-3">
                    {loadingC ? (
                        <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                    ) : companyName ? (
                        <span className="text-sm font-bold text-gray-700 hidden md:block">🏢 {companyName}</span>
                    ) : null}
                    <span className="text-green-600 text-xs font-bold flex items-center gap-1.5 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                        Connected
                    </span>
                    <button
                        onClick={() => {
                            ["companyToken", "companyId", "companyData"].forEach((k) => {
                                localStorage.removeItem(k);
                                sessionStorage.removeItem(k);
                            });
                            window.location.href = "/company-login";
                        }}
                        className="text-xs text-red-500 font-semibold bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-full transition-colors"
                    >
                        🚪 Logout
                    </button>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

                {/* ── WELCOME BANNER ───────────────────────────────────────────────── */}
                <div className="bg-linear-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white flex items-center justify-between">
                    <div>
                        {loadingC ? (
                            <div className="h-6 w-52 bg-white/30 rounded animate-pulse mb-2" />
                        ) : (
                            <h1 className="text-2xl font-black">
                                👋 Welcome{companyName ? `, ${companyName}` : ""}
                            </h1>
                        )}
                        <p className="text-blue-100 text-sm mt-1">
                            {location && `📍 ${location} · `}
                            {pendingApps > 0
                                ? `${pendingApps} pending application${pendingApps > 1 ? "s" : ""} waiting for your review`
                                : "All applications are up to date ✅"}
                        </p>
                    </div>
                    <div className="text-5xl opacity-60 hidden md:block">🏢</div>
                </div>

                {/* ── STAT CARDS ───────────────────────────────────────────────────── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard
                        icon="💼"
                        label="Active Jobs"
                        value={loadingJ ? "…" : activeJobs}
                        gradient="from-blue-500 to-blue-600"
                        sub="Live right now"
                    />
                    <StatCard
                        icon="👥"
                        label="Total Applicants"
                        value={loadingA ? "…" : totalApps}
                        gradient="from-violet-500 to-violet-600"
                        sub="All applications"
                    />
                    <StatCard
                        icon="⏳"
                        label="Pending Review"
                        value={loadingA ? "…" : pendingApps}
                        gradient="from-orange-400 to-orange-500"
                        sub="Need your action"
                    />
                    <StatCard
                        icon="✅"
                        label="Accepted"
                        value={loadingA ? "…" : acceptedApps}
                        gradient="from-emerald-500 to-emerald-600"
                        sub="Hired this period"
                    />
                </div>

                {/* ── JOBS TABLE ───────────────────────────────────────────────────── */}
                <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-50 flex flex-col md:flex-row md:items-center gap-3">
                        <h2 className="font-black text-gray-900 text-base flex-1">
                            💼 Job Listings
                            <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                                {loadingJ ? "…" : jobs.length}
                            </span>
                        </h2>

                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 gap-2 w-full md:w-52">
                            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                                <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <input
                                value={jobSearch}
                                onChange={(e) => setJobSearch(e.target.value)}
                                placeholder="Search jobs…"
                                className="flex-1 py-2 text-xs bg-transparent outline-none placeholder-gray-400"
                            />
                        </div>

                        <div className="flex gap-1.5 flex-wrap">
                            {["All", "Active", "Paused", "Closed"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setJobFilter(f)}
                                    className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-all ${jobFilter === f
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loadingJ ? (
                        <TableSkeleton />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50/70 border-b border-gray-100">
                                        {["Job Title", "Location", "Type", "Salary", "Applicants", "Status", "Posted"].map((h) => (
                                            <th key={h} className="text-left text-xs font-bold text-gray-400 px-5 py-3 whitespace-nowrap">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredJobs.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="text-center py-14 text-gray-400">
                                                <p className="text-3xl mb-2">📭</p>
                                                <p className="text-sm">{jobs.length === 0 ? "No jobs posted yet." : "No jobs match your search."}</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredJobs.map((job) => (
                                            <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-5 py-3.5">
                                                    <p className="font-bold text-gray-900 text-sm">{job.title}</p>
                                                </td>
                                                <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">📍 {job.location}</td>
                                                <td className="px-5 py-3.5">
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">{job.type}</span>
                                                </td>
                                                <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">💰 {job.salary}</td>
                                                <td className="px-5 py-3.5">
                                                    <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                                                        👥 {job.applicants}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3.5"><Badge label={job.status} /></td>
                                                <td className="px-5 py-3.5 text-xs text-gray-400 whitespace-nowrap">{job.posted}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                {/* ── APPLICANTS TABLE ─────────────────────────────────────────────── */}
                <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-50 flex flex-col md:flex-row md:items-center gap-3">
                        <h2 className="font-black text-gray-900 text-base flex-1">
                            👥 Applicants
                            {pendingApps > 0 && (
                                <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                                    {pendingApps} pending
                                </span>
                            )}
                        </h2>
                        <div className="flex gap-1.5 flex-wrap">
                            {["All", "Pending", "Reviewed", "Interview", "Accepted", "Rejected"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setAppFilter(f)}
                                    className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-all ${appFilter === f
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
                                        }`}
                                >
                                    {f}
                                    {f !== "All" && (
                                        <span className="ml-1 opacity-60">
                                            ({applicants.filter((a) => a.status === f).length})
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loadingA ? (
                        <TableSkeleton />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50/70 border-b border-gray-100">
                                        {["Applicant", "Applied For", "Match %", "Status", "Date", "Action"].map((h) => (
                                            <th key={h} className="text-left text-xs font-bold text-gray-400 px-5 py-3 whitespace-nowrap">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredApps.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-14 text-gray-400">
                                                <p className="text-3xl mb-2">🔍</p>
                                                <p className="text-sm">No applicants in this category.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredApps.map((a) => (
                                            <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-5 py-3.5">
                                                    <p className="font-bold text-gray-900 text-sm">{a.name}</p>
                                                </td>
                                                <td className="px-5 py-3.5 text-xs text-gray-500">{a.job}</td>
                                                <td className="px-5 py-3.5">
                                                    <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                                                        {a.match}%
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3.5"><Badge label={a.status} /></td>
                                                <td className="px-5 py-3.5 text-xs text-gray-400 whitespace-nowrap">{a.date}</td>
                                                <td className="px-5 py-3.5">
                                                    <div className="flex gap-1.5">
                                                        {a.status === "Pending" && (
                                                            <button
                                                                onClick={() => updateApp(a.id, "Reviewed")}
                                                                className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                                                            >
                                                                👁 Review
                                                            </button>
                                                        )}
                                                        {a.status === "Reviewed" && (
                                                            <>
                                                                <button
                                                                    onClick={() => updateApp(a.id, "Interview")}
                                                                    className="text-xs bg-purple-50 text-purple-700 hover:bg-purple-100 font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                                                                >
                                                                    📅 Interview
                                                                </button>
                                                                <button
                                                                    onClick={() => updateApp(a.id, "Rejected")}
                                                                    className="text-xs bg-red-50 text-red-500 hover:bg-red-100 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                                                                >
                                                                    ❌
                                                                </button>
                                                            </>
                                                        )}
                                                        {a.status === "Interview" && (
                                                            <>
                                                                <button
                                                                    onClick={() => updateApp(a.id, "Accepted")}
                                                                    className="text-xs bg-green-50 text-green-700 hover:bg-green-100 font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                                                                >
                                                                    ✅ Accept
                                                                </button>
                                                                <button
                                                                    onClick={() => updateApp(a.id, "Rejected")}
                                                                    className="text-xs bg-red-50 text-red-500 hover:bg-red-100 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                                                                >
                                                                    ❌
                                                                </button>
                                                            </>
                                                        )}
                                                        {(a.status === "Accepted" || a.status === "Rejected") && (
                                                            <span className="text-xs text-gray-300 italic">Done</span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
}