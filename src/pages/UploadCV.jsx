import logo from "../assets/Connect Me.png";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../store";
import toast from "react-hot-toast";

export default function UploadCV() {

    const [step, setStep] = useState(1);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const totalSteps = 2;
    const progress = (step / totalSteps) * 100;
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const uploadFile = async () => {
        if (!file) { toast.error("Please upload your CV first"); return; }
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await axios.post(API.uploadAndMatch, formData, {
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
            });
            const matches = res.data?.matches || [];
            toast.success(`Found ${res.data?.matchCount || matches.length} job matches!`);
            navigate("/FeaturedJobs", { state: { matches, cvId: res.data?.cvId, matchCount: res.data?.matchCount } });
        } catch (err) {
            console.error(err.response?.data);
            toast.error("Failed - check console");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#c4d2dffc] flex flex-col justify-center items-center px-4 py-10">

            {/* ===== HEADER ===== */}
            <div className="flex flex-col items-center text-center mb-6">
                <img src={logo} alt="ConnectMe" className="h-10 object-contain mb-2" />
                <p className="text-black text-xl sm:text-2xl md:text-[29px] font-medium">
                    Let's get your profile ready
                </p>
                <p className="text-[#7B7E7A] text-base sm:text-lg md:text-[21px] font-normal">
                    This helps us find the right job for you
                </p>
            </div>

            {/* ===== CARD WRAPPER ===== */}
            <div className="w-full max-w-lg">

                {/* Progress */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Step {step} of {totalSteps}</p>
                    <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
                        <div
                            className="bg-blue-500 h-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
                    <p className="text-black text-base font-medium mb-1">Upload Your Resume</p>
                    <p className="text-[#7B7E7A] text-sm mb-6">
                        Upload your resume to help our AI get to know you better
                    </p>

                    {/* Drop Zone */}
                    <div className="border-4 border-dashed border-[#D9D9D9] rounded-xl flex flex-col justify-center items-center py-10 px-4 text-center">
                        {!file ? (
                            <>
                                <FiUploadCloud className="w-10 h-10 text-[#0A66C2] mb-2" />
                                <p className="text-black text-sm font-medium">Drop your resume to get started</p>
                                <p className="text-black text-sm font-light mb-6">Or click to select your file</p>
                                <input
                                    type="file"
                                    id="cvUpload"
                                    accept=".pdf,.txt"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="cvUpload"
                                    className="bg-[#D9D9D9] hover:bg-gray-300 transition-colors px-5 py-2 rounded cursor-pointer text-sm font-medium"
                                >
                                    Choose File
                                </label>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 rounded-full bg-green-400 flex items-center justify-center text-white text-3xl mb-3">
                                    ✓
                                </div>
                                <p className="font-medium text-black text-sm">{file.name}</p>
                                <p className="text-gray-500 text-xs mt-1">
                                    {(file.size / 1024 / 1024).toFixed(1)} MB
                                </p>
                                <button
                                    onClick={() => setFile(null)}
                                    className="mt-4 bg-[#D9D9D9] hover:bg-gray-300 transition-colors px-4 py-2 rounded text-sm"
                                >
                                    Remove
                                </button>
                            </>
                        )}
                    </div>

                    {/* Info */}
                    <div className="mt-5 flex flex-col gap-1 text-sm text-black border-t-2 border-[#D9D9D9] pt-4">
                        <p>📄 You can upload: PDF</p>
                        <p>📦 Maximum file size: 5MB</p>
                        <p>🔒 We process your data locally, then securely share it with AI</p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-5">
                    <Link to="/">
                        <button
                            disabled={step === 1}
                            className="px-5 py-2 bg-gray-400 hover:bg-gray-500 transition-colors text-white rounded text-sm"
                        >
                            Prev
                        </button>
                    </Link>

                    <button
                        onClick={uploadFile}
                        disabled={loading || !file}
                        className={`px-5 py-2 text-white rounded text-sm flex items-center gap-2 transition-colors ${loading || !file
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Analyzing...
                            </>
                        ) : "Next"}
                    </button>
                </div>
            </div>
        </div>
    );
}