import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ConnectMe from "../assets/Connect Me.png"
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";

// ── API config ────────────────────────────────────────────────────────────────
const domainCompany = "http://connectmeef.runasp.net";

const APICompany = {
    createJob: `${domainCompany}/api/Vacancy/Create`,
    getAllJobs: `${domainCompany}/api/Vacancy/All`,
};

function getToken() {
    return localStorage.getItem("companyToken");
}

function authHeaders() {
    return { Authorization: `Bearer ${getToken()}` };
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ onUpload }) {
    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
            <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/HomeCompany">
                        <div className="w-8 h-8 text-blue-800 bg-gray-100 rounded-full flex items-center justify-center text-[50px] font-bold cursor-pointer">
                            <GoArrowLeft />
                        </div>
                    </Link>
                    <img src={ConnectMe} alt="" />
                </div>
            </div>
        </header>
    );
}

// ── Matched Banner ────────────────────────────────────────────────────────────
function MatchedBanner({ count, loading }) {
    return (
        <div className="bg-linear-to-r from-blue-600 to-blue-500 text-white px-4 py-4">
            <div className="max-w-5xl mx-auto">
                <p className="font-semibold text-sm flex items-center gap-2">
                    <span>✦</span> Jobs Matched to Your Profile
                </p>
                <p className="text-blue-100 text-xs mt-0.5">
                    {loading ? "Loading jobs..." : `We found ${count} jobs that match your skills and experience`}
                </p>
            </div>
        </div>
    );
}

// ── Tag Pill ──────────────────────────────────────────────────────────────────
function Tag({ label }) {
    const colors = {
        "Full Time": "bg-gray-100 text-gray-700",
        Technology: "bg-blue-50 text-blue-700",
        Remote: "bg-green-50 text-green-700",
        "Part Time": "bg-orange-50 text-orange-700",
        Onsite: "bg-purple-50 text-purple-700",
        Hybrid: "bg-yellow-50 text-yellow-700",
    };
    const cls = colors[label] || "bg-gray-100 text-gray-600";
    return (
        <span className={`${cls} text-xs font-medium px-2.5 py-1 rounded-full`}>{label}</span>
    );
}

// ── Normalize Job ─────────────────────────────────────────────────────────────
// ✅ الـ function دي بتقفل هنا — مفيش حاجة جوّاها غير الـ return
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
        } catch {
            return dateStr;
        }
    };
    return {
        id: String(raw.vacancyID ?? raw.vacancyId ?? raw.id ?? Date.now()),
        title: raw.jobTitle ?? raw.title ?? "Untitled",
        company: companyName,
        companyIcon: raw.companyIcon ?? "🏢",
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
} // ✅ اتقفلت هنا صح

// ── Job Detail ────────────────────────────────────────────────────────────────
function JobDetail({ job, onClose }) {
    const [saved, setSaved] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-50">
                <span className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                    🗂 Job details
                </span>
                <button className="text-xs text-blue-600 font-medium hover:underline" onClick={onClose}>
                    View all
                </button>
            </div>

            <div className="p-5 space-y-5">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                            {job.companyIcon || "🏢"}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm">
                                <span className="text-orange-400">🔥</span> {job.title}
                            </p>
                            <p className="text-gray-500 text-xs">{job.company}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setSaved(!saved)}
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${saved ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-400 hover:border-blue-300"
                            }`}
                    >
                        {saved ? "🔖" : "🏷"}
                    </button>
                </div>

                {job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {job.tags.map((t) => <Tag key={t} label={t} />)}
                    </div>
                )}

                <div className="text-xs text-gray-600 space-y-1.5">
                    {job.location && <p><span className="font-semibold text-gray-800">Location:</span> {job.location}</p>}
                    {job.experience && <p><span className="font-semibold text-gray-800">Experience:</span> {job.experience}</p>}
                    {job.salary && <p><span className="font-semibold text-gray-800">Salary:</span> {job.salary}</p>}
                    {job.posted && <p><span className="font-semibold text-gray-800">Posted:</span> {job.posted}</p>}
                </div>

                {job.description && (
                    <>
                        <hr className="border-gray-100" />
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm mb-2">✏️ Job Description</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">{job.description}</p>
                        </div>
                    </>
                )}

                {job.skills.length > 0 && (
                    <>
                        <hr className="border-gray-100" />
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm mb-2">🛠 Required Skills</h3>
                            <ul className="space-y-1">
                                {job.skills.map((s) => (
                                    <li key={s} className="text-xs text-gray-600 flex items-center gap-2">
                                        <span className="text-gray-300">*</span>{s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                {job.requirements.length > 0 && (
                    <>
                        <hr className="border-gray-100" />
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm mb-2">📋 Requirements</h3>
                            <ul className="space-y-1">
                                {job.requirements.map((r) => (
                                    <li key={r} className="text-xs text-gray-600 flex items-center gap-2">
                                        <span className="text-gray-300">*</span>{r}
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
                            <h3 className="font-bold text-gray-900 text-sm mb-2">🎁 Benefits</h3>
                            <ul className="space-y-1">
                                {job.benefits.map((b) => (
                                    <li key={b} className="text-xs text-gray-600 flex items-center gap-2">
                                        <span className="text-gray-300">*</span>{b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                <hr className="border-gray-100" />
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-xl transition-colors active:scale-95">
                    Apply Now
                </button>
            </div>
        </div>
    );
}

// ── Add Job Form ──────────────────────────────────────────────────────────────
const TAG_OPTIONS = ["Full Time", "Part Time", "Remote", "Onsite", "Hybrid", "Technology"];

function AddJobForm({ onSave, onCancel, saving }) {
    const [form, setForm] = useState({
        title: "",
        company: "",
        companyIcon: "🏢",
        tags: [],
        location: "",
        experience: "",
        salary: "",
        description: "",
        skills: "",
        requirements: "",
        benefits: "",
    });

    const toggle = (tag) =>
        setForm((f) => ({
            ...f,
            tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
        }));

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = () => {
        if (!form.title || !form.company) return alert("Title and company are required.");
        const job = {
            ...form,
            skills: form.skills.split("\n").map((s) => s.trim()).filter(Boolean),
            requirements: form.requirements.split("\n").map((s) => s.trim()).filter(Boolean),
            benefits: form.benefits.split("\n").map((s) => s.trim()).filter(Boolean),
        };
        onSave(job);
    };

    const inp =
        "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 bg-white";
    const emojis = ["🏢", "🚀", "🎨", "🤖", "☁️", "📊", "🦊", "⚙️", "🛍️", "🧮"];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <h2 className="font-bold text-gray-900 text-base flex items-center gap-2">➕ Add New Job</h2>

            <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Company Icon</label>
                <div className="flex gap-2 flex-wrap">
                    {emojis.map((e) => (
                        <button
                            key={e}
                            onClick={() => setForm((f) => ({ ...f, companyIcon: e }))}
                            className={`text-xl w-9 h-9 rounded-lg border transition-all ${form.companyIcon === e ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                                }`}
                        >
                            {e}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1 block">Job Title *</label>
                    <input className={inp} placeholder="e.g. Front-End Developer" value={form.title} onChange={set("title")} />
                </div>
                <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1 block">Company *</label>
                    <input className={inp} placeholder="e.g. Tech Vision" value={form.company} onChange={set("company")} />
                </div>
                <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1 block">Location</label>
                    <input className={inp} placeholder="e.g. Cairo, Egypt" value={form.location} onChange={set("location")} />
                </div>
                <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1 block">Experience</label>
                    <input className={inp} placeholder="e.g. 1 – 3 Years" value={form.experience} onChange={set("experience")} />
                </div>
                <div className="col-span-2">
                    <label className="text-xs font-semibold text-gray-700 mb-1 block">Salary</label>
                    <input className={inp} placeholder="e.g. 10,000 – 15,000 EGP" value={form.salary} onChange={set("salary")} />
                </div>
            </div>

            <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Tags</label>
                <div className="flex flex-wrap gap-2">
                    {TAG_OPTIONS.map((t) => (
                        <button
                            key={t}
                            onClick={() => toggle(t)}
                            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${form.tags.includes(t)
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">Job Description</label>
                <textarea
                    className={`${inp} resize-none`} rows={3}
                    placeholder="Describe the role..."
                    value={form.description} onChange={set("description")}
                />
            </div>

            {[
                { key: "skills", label: "Required Skills", placeholder: "HTML / CSS\nJavaScript\nReact.js" },
                { key: "requirements", label: "Requirements", placeholder: "Bachelor's degree...\nGood problem-solving..." },
                { key: "benefits", label: "Benefits", placeholder: "Competitive Salary\nFlexible Hours..." },
            ].map(({ key, label, placeholder }) => (
                <div key={key}>
                    <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        {label} <span className="text-gray-400 font-normal">(one per line)</span>
                    </label>
                    <textarea
                        className={`${inp} resize-none`} rows={3}
                        placeholder={placeholder}
                        value={form[key]} onChange={set(key)}
                    />
                </div>
            ))}

            <div className="flex gap-3 pt-1">
                <button
                    onClick={submit}
                    disabled={saving}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-sm py-3 rounded-xl transition-colors active:scale-95"
                >
                    {saving ? "⏳ Saving..." : "💾 Save Job"}
                </button>
                <button
                    onClick={onCancel}
                    disabled={saving}
                    className="px-5 border border-gray-200 text-gray-600 hover:border-gray-300 text-sm font-medium rounded-xl transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

// ── Job Card (sidebar) ────────────────────────────────────────────────────────
function JobCard({ job, active, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer border transition-all ${active ? "border-blue-500 bg-blue-50" : "border-transparent hover:bg-gray-50"
                }`}
        >
            <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center text-lg shrink-0">
                {job.companyIcon || "🏢"}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">{job.title}</p>
                <p className="text-xs text-gray-500">{job.company}</p>
                <p className="text-xs text-gray-400 mt-0.5">{job.posted}</p>
            </div>
        </div>
    );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
    const [jobs, setJobs] = useState([]);
    const [selected, setSelected] = useState(null);
    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    // ── Fetch all jobs from API ──────────────────────────────────────────────
    const fetchJobs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(APICompany.getAllJobs, {
                headers: authHeaders(),
            });

            const raw = Array.isArray(res.data)
                ? res.data
                : res.data?.data ?? res.data?.jobs ?? res.data?.vacancies ?? [];

            const normalized = raw.map(normalizeJob);
            setJobs(normalized);
            if (normalized.length > 0) setSelected(normalized[0]);
        } catch (err) {
            const msg =
                err.response?.status === 401
                    ? "Not authorized. Please log in again."
                    : err.response?.data?.message || "Failed to load jobs.";
            setError(msg);
            console.error("fetchJobs error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    // ── Create job via API ───────────────────────────────────────────────────
    const handleSave = async (formJob) => {
        setSaving(true);
        try {
            const companyID = Number(localStorage.getItem("companyId")) || 0;

            const body = {
                companyID,
                jobTitle: formJob.title,
                jobDescription: formJob.description,
                requirements: formJob.requirements.join(", "),
                requiredSkills: formJob.skills.join(", "),
                benefits: formJob.benefits.join(", "),
                experience: formJob.experience,
                location: formJob.location,
                salaryRange: formJob.salary,
                jobType: formJob.tags[0] ?? "",
            };

            const res = await axios.post(APICompany.createJob, body, {
                headers: authHeaders(),
            });

            const created = normalizeJob(res.data?.data ?? res.data ?? { ...body, id: Date.now() });
            setJobs((prev) => [created, ...prev]);
            setSelected(created);
            setAdding(false);
            showToast("✅ Job saved successfully!");
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to save job.";
            showToast(`❌ ${msg}`, "error");
            console.error("createJob error:", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <Navbar onUpload={() => alert("Upload CV feature coming soon!")} />
            <MatchedBanner count={jobs.length} loading={loading} />

            <div className="max-w-5xl mx-auto px-4 py-6 flex gap-5">

                {/* LEFT – job list */}
                <div className="w-64 shrink-0 space-y-3">
                    <button
                        onClick={() => { setAdding(true); setSelected(null); }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                        ➕ Add New Job
                    </button>

                    <button
                        onClick={fetchJobs}
                        disabled={loading}
                        className="w-full border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 text-xs font-medium py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                        {loading ? "⏳ Loading..." : "🔄 Refresh Jobs"}
                    </button>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 space-y-0.5">
                        {loading && (
                            <div className="text-xs text-gray-400 text-center py-8 space-y-2">
                                <div className="animate-spin text-2xl">⏳</div>
                                <p>Loading jobs from API...</p>
                            </div>
                        )}

                        {!loading && error && (
                            <div className="text-xs text-red-500 text-center py-6 px-2">
                                <p className="font-semibold mb-1">⚠️ Error</p>
                                <p>{error}</p>
                                <button onClick={fetchJobs} className="mt-3 text-blue-600 underline">
                                    Try again
                                </button>
                            </div>
                        )}

                        {!loading && !error && jobs.length === 0 && (
                            <p className="text-xs text-gray-400 text-center py-6">No jobs found. Add one!</p>
                        )}

                        {!loading && jobs.map((j) => (
                            <JobCard
                                key={j.id}
                                job={j}
                                active={selected?.id === j.id}
                                onClick={() => { setSelected(j); setAdding(false); }}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT – detail or form */}
                <div className="flex-1 min-w-0">
                    {adding ? (
                        <AddJobForm
                            onSave={handleSave}
                            onCancel={() => setAdding(false)}
                            saving={saving}
                        />
                    ) : selected ? (
                        <JobDetail job={selected} onClose={() => setSelected(null)} />
                    ) : (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center h-64">
                            <p className="text-gray-400 text-sm">Select a job or add a new one</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div
                    className={`fixed bottom-6 left-1/2 -translate-x-1/2 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50 animate-bounce ${toast.type === "error" ? "bg-red-500" : "bg-green-600"
                        }`}
                >
                    {toast.msg}
                </div>
            )}
        </div>
    );
}
