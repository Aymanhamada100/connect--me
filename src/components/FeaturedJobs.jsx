import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API = {
    uploadMatch: "http://yourdomain.com/api/Resume/upload-and-match",
};

// ───────── Avatar ─────────
function CompanyAvatar({ company }) {
    const colors = [
        "bg-pink-500", "bg-blue-600", "bg-purple-500", "bg-sky-500",
        "bg-rose-500", "bg-indigo-500", "bg-teal-600",
    ];
    const color = colors[(company?.charCodeAt(0) || 0) % colors.length];
    const initials = company?.slice(0, 2).toUpperCase() || "??";

    return (
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white text-xs font-bold`}>
            {initials}
        </div>
    );
}

// ───────── Job Card ─────────
function JobCard({ job, onReadMore }) {
    return (
        <div className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition relative">

            <span className="absolute top-4 right-4 text-green-600 text-sm font-semibold">
                {Math.round(job.matchScore)}% Match
            </span>

            <div className="flex gap-3 mb-2">
                <CompanyAvatar company={job.company} />
                <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.company}</p>
                    <p className="text-xs text-gray-400">{job.location}</p>
                </div>
            </div>

            <p className="text-sm text-gray-500 line-clamp-2">
                {job.description}
            </p>

            {/* AI */}
            {job.explanation && (
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-3 mt-3">
                    <p className="text-xs text-teal-600 font-semibold mb-1">
                        AI Analysis
                    </p>
                    <p className="text-xs text-teal-800 line-clamp-3">
                        {job.explanation}
                    </p>
                </div>
            )}

            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => onReadMore(job)}
                    className="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-50"
                >
                    View Details
                </button>

                <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm hover:bg-blue-700 text-center"
                >
                    Apply Now
                </a>
            </div>
        </div>
    );
}

// ───────── Modal ─────────
function JobModal({ job, onClose }) {
    if (!job) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl p-6 max-w-xl w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-2">{job.title}</h2>
                <p className="text-sm text-gray-500 mb-4">{job.company}</p>

                <p className="text-sm mb-4 whitespace-pre-line">
                    {job.description}
                </p>

                {job.explanation && (
                    <div className="bg-teal-50 p-3 rounded-xl mb-4">
                        <p className="text-sm text-teal-700 whitespace-pre-line">
                            {job.explanation}
                        </p>
                    </div>
                )}

                <a
                    href={job.link}
                    target="_blank"
                    className="block bg-blue-600 text-white text-center py-2 rounded-lg"
                >
                    Apply Now
                </a>
            </div>
        </div>
    );
}

// ───────── Sidebar ─────────
function Sidebar({ jobsCount }) {
    return (
        <div className="bg-white p-5 rounded-2xl border space-y-4 sticky top-6">
            <h3 className="font-semibold text-gray-800">Your Profile</h3>

            <div className="flex flex-wrap gap-2">
                {["React", "JavaScript", "HTML", "CSS"].map((s, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {s}
                    </span>
                ))}
            </div>

            <div className="text-sm text-gray-500">
                Found {jobsCount} matching jobs
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Enable Alerts
            </button>
        </div>
    );
}

// ───────── Skeleton ─────────
function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl border p-5 animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
        </div>
    );
}

// ───────── Main ─────────
export default function FeaturedJobs() {
    const location = useLocation();
    const navigate = useNavigate();

    const [jobs, setJobs] = useState(location.state?.matches || []);
    const [selectedJob, setSelectedJob] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadCV = async (file) => {
        if (!file) return;

        // validation
        if (!file.type.includes("pdf")) {
            toast.error("Only PDF allowed");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Max size is 5MB");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("file", file);

            const token = localStorage.getItem("token");

            const res = await axios.post(API.uploadMatch, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (!res.data?.success) {
                toast.error("Something went wrong");
                return;
            }

            const matches = res.data.matches || [];

            toast.success(`Found ${matches.length} jobs!`);

            setJobs(matches);

        } catch (err) {
            toast.error(err.response?.data?.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Jobs Matched to Your Profile
                    </h1>
                    <p className="text-gray-500 text-sm">
                        We found {jobs.length} jobs matching your CV
                    </p>
                </div>

                <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700">
                    {loading ? "Analyzing CV..." : "Upload New CV"}
                    <input
                        type="file"
                        hidden
                        accept=".pdf"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) uploadCV(file);
                        }}
                    />
                </label>
            </div>

            {/* Layout */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Jobs */}
                <div className="lg:col-span-3 space-y-4">

                    {loading ? (
                        <>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </>
                    ) : jobs.length > 0 ? (
                        jobs.map((job, i) => (
                            <JobCard key={i} job={job} onReadMore={setSelectedJob} />
                        ))
                    ) : (
                        <div className="bg-white p-10 text-center rounded-2xl border">
                            No jobs yet. Upload your CV.
                        </div>
                    )}

                </div>

                {/* Sidebar */}
                <Sidebar jobsCount={jobs.length} />

            </div>
        </div>
    );
}