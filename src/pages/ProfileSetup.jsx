import { useState } from "react";
import logo from "../assets/Frame 58.png"

const SUGGESTED_SKILLS = [
    "React", "TypeScript", "Node.js", "JavaScript", "Python", "SQL",
    "MongoDB", "AWS", "Git", "Express", "Docker", "Cypress", "HTML"
];

const POPULAR_ROLES = [
    "Frontend Developer", "Full Stack Developer", "React Developer",
    "Node.js Developer", "Data Scientist", "UI/UX Designer"
];

const EXPERIENCE_LEVELS = [
    "Junior (0–1 years)",
    "Mid-level (2–5 years)",
    "Senior (5–8 years)",
    "Lead / Principal (8+ years)",
];

export default function ProfileSetup() {
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [roles, setRoles] = useState([]);
    const [roleInput, setRoleInput] = useState("");
    const [location, setLocation] = useState("");
    const [experience, setExperience] = useState("Mid-level (2–5 years)");
    const [salary, setSalary] = useState(30000);
    const [remote, setRemote] = useState(true);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const addSkill = (skill) => {
        const trimmed = skill.trim();
        if (trimmed && !skills.includes(trimmed)) {
            setSkills([...skills, trimmed]);
        }
        setSkillInput("");
    };

    const removeSkill = (skill) => setSkills(skills.filter((s) => s !== skill));

    const addRole = (role) => {
        const trimmed = role.trim();
        if (trimmed && !roles.includes(trimmed)) {
            setRoles([...roles, trimmed]);
        }
        setRoleInput("");
    };

    const removeRole = (role) => setRoles(roles.filter((r) => r !== role));

    const handleSubmit = async () => {
        setError("");
        setLoading(true);
        try {
            const payload = {
                technical_skills: skills,
                preferred_roles: roles,
                preferred_location: location,
                experience_level: experience,
                expected_salary_egp: salary,
                open_to_remote: remote,
            };

            // Replace with your actual API endpoint
            const res = await fetch("/api/profile/preferences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save. Please try again.");
            window.location.href = "/featured-jobs";
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-sm w-full">
                    <div className="text-5xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">تم إعداد ملفك!</h2>
                    <p className="text-slate-500">هنبدأ دلوقتي نلاقيلك الفرص المناسبة.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#c4d2dffc] flex flex-col items-center py-10 px-4 font-sans">
            {/* Logo */}
            <img src={logo} alt="" className="ml-15" />

            {/* Header */}
            <h1 className="text-black text-[29px] font-medium mb-1">Let's get your profile ready</h1>
            <p className="text-[#7B7E7A] text-[21px] font-normal mb-6 ">This helps us find the right job for you</p>

            {/* Progress */}
            <div className="w-full max-w-lg mb-6">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Step 2 of 2</span>
                    <span>100% done</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full w-full transition-all duration-500" />
                </div>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-md w-full max-w-lg p-6 space-y-7">
                <div>
                    <p className="text-black text-[16px] font-normal">Let us know your preferences</p>
                    <p className="text-[#7B7E7A] text-[16px] font-normal">Tell us which opportunities you're interested in</p>
                </div>

                {/* Technical Skills */}
                <section>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Technical Skills</label>
                    <div className="flex gap-2">
                        <input
                            className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-slate-400 text-black"
                            placeholder="Add a skill..."
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addSkill(skillInput)}
                        />
                        <button
                            onClick={() => addSkill(skillInput)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold transition"
                        >
                            +
                        </button>
                    </div>

                    {/* Selected Skills */}
                    {skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {skills.map((s) => (
                                <span key={s} className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                                    {s}
                                    <button onClick={() => removeSkill(s)} className="ml-1 font-bold hover:text-blue-200">×</button>
                                </span>
                            ))}
                        </div>
                    )}

                    <p className="text-xs text-slate-400 mt-3 mb-2">Suggested skills:</p>
                    <div className="flex flex-wrap gap-2">
                        {SUGGESTED_SKILLS.filter((s) => !skills.includes(s)).map((s) => (
                            <button
                                key={s}
                                onClick={() => addSkill(s)}
                                className="border border-slate-200 text-slate-600 text-xs px-3 py-1 rounded-full hover:border-blue-400 hover:text-blue-600 transition"
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Preferred Roles */}
                <section>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Roles</label>
                    <div className="flex gap-2">
                        <input
                            className="flex-1 border text-black border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-slate-400"
                            placeholder="Add a role..."
                            value={roleInput}
                            onChange={(e) => setRoleInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addRole(roleInput)}
                        />
                        <button
                            onClick={() => addRole(roleInput)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold transition"
                        >
                            +
                        </button>
                    </div>

                    {/* Selected Roles */}
                    {roles.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {roles.map((r) => (
                                <span key={r} className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                                    {r}
                                    <button onClick={() => removeRole(r)} className="ml-1 font-bold hover:text-blue-200">×</button>
                                </span>
                            ))}
                        </div>
                    )}

                    <p className="text-xs text-slate-400 mt-3 mb-2">Popular roles:</p>
                    <div className="flex flex-wrap gap-2">
                        {POPULAR_ROLES.filter((r) => !roles.includes(r)).map((r) => (
                            <button
                                key={r}
                                onClick={() => addRole(r)}
                                className="border border-slate-200 text-slate-600 text-xs px-3 py-1 rounded-full hover:border-blue-400 hover:text-blue-600 transition"
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Preferred Location */}
                <section>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Location</label>
                    <input
                        className="w-full border text-black border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-slate-400"
                        placeholder="e.g., Cairo, Alexandria, Mansoura"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </section>

                {/* Level of Experience */}
                <section>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Level of Experience</label>
                    <select
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                    >
                        {EXPERIENCE_LEVELS.map((l) => (
                            <option key={l}>{l}</option>
                        ))}
                    </select>
                </section>

                {/* Salary Range */}
                <section>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Expected Salary Range (EGP)
                    </label>
                    <input
                        type="range"
                        min={15000}
                        max={50000}
                        step={500}
                        value={salary}
                        onChange={(e) => setSalary(Number(e.target.value))}
                        className="w-full accent-blue-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>EGP 15,000</span>
                        <span className="text-blue-600 font-semibold">EGP {salary.toLocaleString()}</span>
                        <span>EGP 50,000</span>
                    </div>
                </section>

                {/* Remote Toggle */}
                <section className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-slate-700">Open to Remote Work</p>
                        <p className="text-xs text-slate-400">Include Work-from-Home & Hybrid Jobs</p>
                    </div>
                    <button
                        onClick={() => setRemote(!remote)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${remote ? "bg-blue-600" : "bg-slate-300"}`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${remote ? "translate-x-6" : "translate-x-0"}`}
                        />
                    </button>
                </section>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
                )}

                {/* Actions */}
                <div className="flex justify-between pt-2">
                    <button
                        onClick={() => window.history.back()}
                        className="border border-slate-200 text-slate-600 text-sm px-5 py-2.5 rounded-lg hover:bg-slate-50 transition flex items-center gap-1"
                    >
                        ← Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            "✓"
                        )}
                        Complete Setup
                    </button>
                </div>
            </div>
        </div>
    );
}