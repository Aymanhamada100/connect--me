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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFile = async () => {
        if (!file) {
            toast.error("Please upload your CV first");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post(API.uploadAndMatch, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("API Response:", res.data);

            const matches = res.data?.matches || [];

            toast.success(`Found ${res.data?.matchCount || matches.length} job matches!`);

            navigate("/FeaturedJobs", {
                state: {
                    matches,
                    cvId: res.data?.cvId,
                    matchCount: res.data?.matchCount,
                },
            });

        } catch (err) {
            console.error("Error status:", err.response?.status);
            console.error("Error body:", JSON.stringify(err.response?.data));
            console.error("Token value:", token);
            toast.error("Failed - check console");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#c4d2dffc] flex flex-col justify-center items-center">
            <div>
                <img src={logo} alt="" className="ml-15" />
                <p className="text-black text-[29px] font-medium">Let's get your profile ready</p>
                <p className="text-[#7B7E7A] text-[21px] font-normal">This helps us find the right job for you</p>
            </div>
            <div className="w-133 mt-10">
                <p className="text-center mr-90">Step {step} of {totalSteps}</p>
                <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="w-133 h-149 bg-white rounded-[20px] mt-10">
                    <p className="text-black text-[16px] font-medium pt-8 pl-8">Upload Your Resume</p>
                    <p className="text-[#7B7E7A] text-[16px] font-normal pl-8">Upload your resume to help our AI get to know you better</p>

                    <div className="w-122 h-62 shadow-md rounded-xl border-4 border-[#D9D9D9] mt-20 ml-5 flex flex-col justify-center items-center">
                        {!file ? (
                            <>
                                <FiUploadCloud className="w-10 h-9 text-[#0A66C2]" />
                                <p className="text-black text-[14px] font-medium">Drop your resume to get started</p>
                                <p className="text-black text-[14px] font-light">Or click to select your file</p>
                                <div className="mt-8">
                                    <input
                                        type="file"
                                        id="cvUpload"
                                        accept=".pdf,.txt"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <label htmlFor="cvUpload" className="bg-[#D9D9D9] px-4 py-2 rounded cursor-pointer">
                                        Choose File
                                    </label>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 rounded-full bg-green-400 flex items-center justify-center text-white text-3xl mb-3">✓</div>
                                <p className="font-medium text-black">{file.name}</p>
                                <p className="text-black text-sm">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                                <button onClick={() => setFile(null)} className="mt-4 bg-[#D9D9D9] px-4 py-2 rounded">
                                    Remove
                                </button>
                            </>
                        )}
                    </div>
                    <p className="text-black text-[14px] font-normal pt-10 pl-6">You can upload: PDF </p>
                    <p className="text-black text-[14px] font-normal pl-6">Maximum file size: 5MB</p>
                    <p className="text-black text-[14px] font-normal pl-6">We process your data locally, then securely share it with AI</p>
                    <div className="w-120 ml-6 mt-5 border-b-4 border-[#D9D9D9]"></div>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        disabled={step === 1}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                    >
                        <Link to="/Home">Prev</Link>
                    </button>

                    <button
                        onClick={uploadFile}
                        disabled={loading || !file}
                        className={`px-4 py-2 text-white rounded flex items-center gap-2 ${loading || !file ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500"
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
                        ) : (
                            "Next"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
