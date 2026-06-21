import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import ConnectMe from "../assets/Connect Me.png";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const domain = "https://connectmeef.runasp.net";

const APIUser = {
    getMyApplications: (userId) => `${domain}/api/Applicants/user/${userId}`,
};

function getUserToken() {
    return localStorage.getItem("token") || sessionStorage.getItem("token") || "";
}
function getUserId() {
    return localStorage.getItem("userId") || sessionStorage.getItem("userId") || "";
}
function authHeaders() {
    const token = getUserToken();
    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
}

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
    Pending: { color: "bg-yellow-50 text-yellow-700 border border-yellow-200", dot: "bg-yellow-400", icon: "⏳", label: "Pending" },
    Reviewed: { color: "bg-blue-50 text-blue-700 border border-blue-200", dot: "bg-blue-500", icon: "👁", label: "Reviewed" },
    Interview: { color: "bg-purple-50 text-purple-700 border border-purple-200", dot: "bg-purple-500", icon: "📅", label: "Interview" },
    Accepted: { color: "bg-green-50 text-green-700 border border-green-200", dot: "bg-green-500", icon: "✅", label: "Accepted" },
    Rejected: { color: "bg-red-50 text-red-500 border border-red-200", dot: "bg-red-400", icon: "❌", label: "Rejected" },
};

const STEPS = ["Applied", "Reviewed", "Interview", "Decision"];
const STEP_STATUS_MAP = {
    Pending: 1,
    Reviewed: 2,
    Interview: 3,
    Accepted: 4,
    Rejected: 4,
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function normalizeApplication(a) {
    return {
        id: a.id || a.Id || a.applicationId || Math.random(),
        jobTitle: a.vacancyTitle || a.jobTitle || a.title || "Untitled",
        company: a.companyName || a.company || "—",
        location: a.location || a.Location || "—",
        status: a.status || a.Status || "Pending",
        appliedDate: a.appliedDate || a.createdAt || a.CreatedAt || "",
        matchScore: a.matchPercentage || a.matchScore || 0,
        salary: a.salary || a.Salary || null,
        type: a.type || a.jobType || null,
    };
}

function formatDate(dateStr) {
    if (!dateStr) return "—";
    try {
        return new Date(dateStr).toLocaleDateString("en-EG", { month: "short", day: "numeric", year: "numeric" });
    } catch {
        return dateStr;
    }
}

// ─── BADGE ────────────────────────────────────────────────────────────────────
function Badge({ status }) {
    const cfg = STATUS_CONFIG[status] || { color: "bg-gray-100 text-gray-600", icon: "•", label: status };
    return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${cfg.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot || "bg-gray-400"}`} />
            {cfg.label}
        </span>
    );
}

// ─── PROGRESS STEPPER ────────────────────────────────────────────────────────
function Stepper({ status }) {
    const currentStep = STEP_STATUS_MAP[status] || 1;
    const isRejected = status === "Rejected";

    return (
        <div className="flex items-center w-full px-4 pb-4 pt-1">
            {STEPS.map((step, idx) => {
                const stepNum = idx + 1;
                const isDone = stepNum < currentStep;
                const isActive = stepNum === currentStep;
                const isFailed = isRejected && stepNum === currentStep;
                const isLast = idx === STEPS.length - 1;

                let dotClass = "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ";
                if (isFailed) dotClass += "bg-red-50 border-red-300 text-red-500";
                else if (isDone) dotClass += "bg-green-500 border-green-500 text-white";
                else if (isActive) dotClass += "bg-blue-600 border-blue-600 text-white ring-2 ring-blue-100";
                else dotClass += "bg-gray-100 border-gray-200 text-gray-400";

                let lineClass = "flex-1 h-px mx-1 ";
                lineClass += isDone ? "bg-green-400" : "bg-gray-200";

                return (
                    <div key={step} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1">
                            <div className={dotClass}>
                                {isFailed ? "✕" : isDone ? "✓" : stepNum}
                            </div>
                            <span className={`text-[9px] font-semibold whitespace-nowrap ${isFailed ? "text-red-400"
                                : isDone ? "text-green-600"
                                    : isActive ? "text-blue-600"
                                        : "text-gray-400"
                                }`}>
                                {step}
                            </span>
                        </div>
                        {!isLast && <div className={lineClass} style={{ marginBottom: "14px" }} />}
                    </div>
                );
            })}
        </div>
    );
}

// ─── SKELETON ─────────────────────────────────────────────────────────────────
function CardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse space-y-3">
            <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                </div>
                <div className="h-6 w-20 bg-gray-200 rounded-full" />
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex gap-2">
                {[1, 2, 3, 4].map(i => <div key={i} className="flex-1 h-6 bg-gray-100 rounded" />)}
            </div>
        </div>
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

// ─── NOTIFICATION BANNER ──────────────────────────────────────────────────────
function NotifBanner({ apps }) {
    const recent = apps
        .filter(a => a.status === "Accepted" || a.status === "Interview" || a.status === "Rejected")
        .slice(0, 1)[0];

    if (!recent) return null;

    const msgs = {
        Accepted: { text: `🎉 Congrats! ${recent.company} accepted your application for ${recent.jobTitle}`, bg: "bg-green-50 border-green-200 text-green-800" },
        Interview: { text: `📅 ${recent.company} moved you to Interview stage for ${recent.jobTitle}`, bg: "bg-purple-50 border-purple-200 text-purple-800" },
        Rejected: { text: `${recent.company} updated your application status for ${recent.jobTitle}`, bg: "bg-red-50 border-red-200 text-red-700" },
    };

    const m = msgs[recent.status];
    if (!m) return null;

    return (
        <div className={`border rounded-2xl px-5 py-3.5 flex items-center gap-3 text-sm font-semibold ${m.bg}`}>
            <span className="w-2 h-2 rounded-full bg-current opacity-60 shrink-0" />
            {m.text}
        </div>
    );
}

// ─── APPLICATION CARD ─────────────────────────────────────────────────────────
function AppCard({ app }) {
    const isAccepted = app.status === "Accepted";
    const isRejected = app.status === "Rejected";

    return (
        <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${isAccepted ? "border-green-200" : isRejected ? "border-red-100" : "border-gray-100"
            }`}>

            {/* Header */}
            <div className="flex items-start gap-3 px-5 pt-5 pb-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 border ${isAccepted ? "bg-green-50 border-green-200"
                    : isRejected ? "bg-red-50 border-red-100"
                        : "bg-blue-50 border-blue-100"
                    }`}>
                    🏢
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-900 text-sm truncate">{app.jobTitle}</p>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1 flex-wrap">
                        <span>{app.company}</span>
                        {app.location && app.location !== "—" && (
                            <><span className="text-gray-300">·</span><span>📍 {app.location}</span></>
                        )}
                        {app.type && (
                            <><span className="text-gray-300">·</span>
                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px] font-medium">{app.type}</span></>
                        )}
                    </p>
                </div>
                <Badge status={app.status} />
            </div>

            {/* Accepted Banner */}
            {isAccepted && (
                <div className="mx-5 mb-3 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 flex items-center gap-2.5">
                    <span className="text-lg">🎉</span>
                    <div>
                        <p className="text-xs font-black text-green-800">Congratulations! You got the job</p>
                        <p className="text-[10px] text-green-600 mt-0.5">The company accepted your application</p>
                    </div>
                </div>
            )}

            {/* Rejected Banner */}
            {isRejected && (
                <div className="mx-5 mb-3 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 flex items-center gap-2.5">
                    <span className="text-lg">📋</span>
                    <div>
                        <p className="text-xs font-black text-red-700">Application not selected</p>
                        <p className="text-[10px] text-red-400 mt-0.5">Keep applying — the right opportunity is coming</p>
                    </div>
                </div>
            )}

            {/* Stepper */}
            <div className="border-t border-gray-50 pt-2">
                <p className="text-[10px] font-bold text-gray-400 px-5 pt-1 uppercase tracking-wide">Application progress</p>
                <Stepper status={app.status} />
            </div>

            {/* Footer */}
            <div className="border-t border-gray-50 px-5 py-3 flex items-center gap-3">
                <span className="text-xs text-gray-400 flex items-center gap-1 flex-1">
                    🗓 Applied {formatDate(app.appliedDate)}
                </span>
                {app.matchScore > 0 && (
                    <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                        {app.matchScore}% match
                    </span>
                )}
                {app.salary && (
                    <span className="text-xs text-gray-400">💰 {app.salary}</span>
                )}
            </div>
        </div>
    );
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
function EmptyState({ filter }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 text-center">
            <p className="text-4xl mb-3">{filter === "All" ? "📭" : "🔍"}</p>
            <p className="text-sm font-bold text-gray-700">
                {filter === "All" ? "No applications yet" : `No ${filter.toLowerCase()} applications`}
            </p>
            <p className="text-xs text-gray-400 mt-1">
                {filter === "All" ? "Start applying to jobs to track your progress here." : "Try a different filter."}
            </p>
            {filter === "All" && (
                <Link to="/UserJobsPage">
                    <button className="mt-5 text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors">
                        Browse Jobs →
                    </button>
                </Link>
            )}
        </div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [error, setError] = useState(null);

    // ── Fetch applications ─────────────────────────────────────────────────────
    useEffect(() => {
        const userId = getUserId();
        const endpoint = APIUser.getMyApplications(userId);

        fetch(endpoint, { headers: authHeaders() })
            .then(async (res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                const raw = Array.isArray(data)
                    ? data
                    : Array.isArray(data.data)
                        ? data.data
                        : Array.isArray(data.applications)
                            ? data.applications
                            : [];
                setApplications(raw.map(normalizeApplication));
            })
            .catch((err) => {
                console.error("Applications fetch error:", err);
                setError("Could not load your applications. Please try again.");
                setApplications([]);
            })
            .finally(() => setLoading(false));
    }, []);

    // ── Stats ──────────────────────────────────────────────────────────────────
    const total = applications.length;
    const pending = applications.filter(a => a.status === "Pending").length;
    const interview = applications.filter(a => a.status === "Interview").length;
    const accepted = applications.filter(a => a.status === "Accepted").length;

    // ── Filter ─────────────────────────────────────────────────────────────────
    const filters = ["All", "Pending", "Reviewed", "Interview", "Accepted", "Rejected"];
    const filtered = filter === "All"
        ? applications
        : applications.filter(a => a.status === filter);

    return (
        <div className="min-h-screen bg-[#F4F7FC] font-sans">

            {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-30 h-16 flex items-center px-6 gap-4 shadow-sm">
                <div className="flex items-center gap-2 flex-1">
                    <Link to="/Home">
                        <div className="w-8 h-8 text-blue-800 bg-gray-100 rounded-full flex items-center justify-center text-[50px] font-bold cursor-pointer">
                            <GoArrowLeft />
                        </div>
                    </Link>
                    <img src={ConnectMe} alt="ConnectMe" />
                </div>
                <span className="text-green-600 text-xs font-bold flex items-center gap-1.5 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                    Connected
                </span>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">

                {/* ── WELCOME BANNER ──────────────────────────────────────────────── */}
                <div className="bg-linear-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black">📋 My Applications</h1>
                        <p className="text-blue-100 text-sm mt-1">
                            {pending > 0
                                ? `${pending} application${pending > 1 ? "s" : ""} waiting for company response`
                                : interview > 0
                                    ? `🎯 You have ${interview} interview${interview > 1 ? "s" : ""} scheduled!`
                                    : "Track the status of all your job applications here"}
                        </p>
                    </div>
                    <div className="text-5xl opacity-60 hidden md:block">🚀</div>
                </div>

                {/* ── STAT CARDS ──────────────────────────────────────────────────── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard icon="📄" label="Total Applied" value={loading ? "…" : total} gradient="from-blue-500 to-blue-600" sub="All time" />
                    <StatCard icon="⏳" label="Pending Reply" value={loading ? "…" : pending} gradient="from-orange-400 to-orange-500" sub="Awaiting response" />
                    <StatCard icon="📅" label="Interviews" value={loading ? "…" : interview} gradient="from-violet-500 to-violet-600" sub="Scheduled" />
                    <StatCard icon="✅" label="Accepted" value={loading ? "…" : accepted} gradient="from-emerald-500 to-emerald-600" sub="Offers received" />
                </div>

                {/* ── NOTIFICATION ────────────────────────────────────────────────── */}
                {!loading && <NotifBanner apps={applications} />}

                {/* ── FILTER TABS ─────────────────────────────────────────────────── */}
                <div className="flex gap-2 flex-wrap">
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-all ${filter === f
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
                                }`}
                        >
                            {f}
                            {f !== "All" && (
                                <span className="ml-1 opacity-60">
                                    ({applications.filter(a => a.status === f).length})
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* ── ERROR ───────────────────────────────────────────────────────── */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-3 text-sm text-red-600 font-semibold">
                        ⚠️ {error}
                    </div>
                )}

                {/* ── CARDS ───────────────────────────────────────────────────────── */}
                <div className="space-y-4">
                    {loading ? (
                        [1, 2, 3].map(i => <CardSkeleton key={i} />)
                    ) : filtered.length === 0 ? (
                        <EmptyState filter={filter} />
                    ) : (
                        filtered.map(app => <AppCard key={app.id} app={app} />)
                    )}
                </div>

            </div>
        </div>
    );
}