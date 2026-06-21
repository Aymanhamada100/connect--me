import { useState, useEffect } from "react";
import { FaUser, FaBell, FaSearch, FaSignOutAlt, FaPen, FaCheck } from "react-icons/fa";
import useLogin from "../hooks/useLogin";
import logo from "../assets/Connect Me.png";
import { IoMdSettings } from "react-icons/io";
import { API } from "../store";
import toast from "react-hot-toast";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
// ─── NAV ─────────────────────────────────────────────────────────────────────
const navItems = [
    { id: "profile", label: "My Profile", icon: FaUser },

];

// ─── FIELDS ───────────────────────────────────────────────────────────────────
const profileFields = [
    { key: "phoneNumber", label: "Phone Number", icon: "📞", link: false },
    { key: "employeeType", label: "Employee Type", icon: "💼", link: false },
    { key: "location", label: "Location", icon: "📍", link: false },
    { key: "currentPosition", label: "Current Position", icon: "🎯", link: false },
    { key: "industry", label: "Industry", icon: "🏭", link: false },
    { key: "linkedInUrl", label: "LinkedIn", icon: "🔗", link: true },
];

const editFields = [
    { key: "name", label: "Full Name" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "employeeType", label: "Employee Type" },
    { key: "location", label: "Location" },
    { key: "currentPosition", label: "Current Position" },
    { key: "industry", label: "Industry" },
    { key: "linkedInUrl", label: "LinkedIn URL" },
];

// ─── SKELETON ─────────────────────────────────────────────────────────────────
function ProfileSkeleton() {
    return (
        <div className="animate-pulse space-y-4 p-6">
            <div className="flex gap-4 items-center pb-6 border-b border-slate-100">
                <div className="w-20 h-20 rounded-2xl bg-slate-200 shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="h-5 bg-slate-200 rounded-lg w-1/3" />
                    <div className="h-3 bg-slate-100 rounded-lg w-1/4" />
                    <div className="h-3 bg-slate-100 rounded-lg w-1/2" />
                </div>
            </div>
            {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="flex justify-between items-center py-2">
                    <div className="h-3 bg-slate-100 rounded w-1/4" />
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                </div>
            ))}
        </div>
    );
}

export default function ProfilePageUser() {
    const { logOut } = useLogin();
    const [active, setActive] = useState("profile");
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);
    const [draft, setDraft] = useState(null);

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    useEffect(() => {
        if (!token) { setLoading(false); return; }
        (async () => {
            setLoading(true);
            try {
                const res = await fetch(API.getProfile, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                console.log("Profile response:", data);

                const profileData =
                    data?.data ||
                    data?.profile ||
                    data?.user ||
                    (data?.name ? data : null);

                if (profileData) {
                    setProfile(profileData);
                    setDraft(profileData);
                } else {
                    setProfile(data);
                    setDraft(data);
                }
            } catch (err) {
                console.error(err);
                toast.error("Error fetching profile");
            } finally {
                setLoading(false);
            }
        })();
    }, [token]);
    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            const res = await fetch(API.updateProfile, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: draft.name,
                    phoneNumber: draft.phoneNumber,
                    employeeType: draft.employeeType,
                    location: draft.location,
                    currentPosition: draft.currentPosition,
                    industry: draft.industry,
                    linkedInUrl: draft.linkedInUrl,
                }),
            });
            console.log("Save status:", res.status);
            if (!res.ok) throw new Error("Update failed");
            setProfile({ ...profile, ...draft });
            setEditing(false);
            toast.success("Profile updated!");
        } catch (err) {
            console.error(err);
            setError("Update failed, please try again.");
        } finally {
            setSaving(false);
        }
    };

    const initials = profile?.name
        ? profile.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
        : "U";

    return (
        <div className="w-screen h-screen bg-slate-100 flex items-center justify-center p-4 md:p-6"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>

            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>

            <div className="w-full h-full max-w-7xl flex rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50">

                {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
                <aside className="w-60 shrink-0 bg-white border-r border-slate-100 flex flex-col py-7 px-4">

                    {/* Logo */}
                    <div className="px-2 mb-8">
                        <Link to="/Home">
                            <div className="w-8 h-8 text-blue-800 bg-gray-100 rounded-full flex items-center justify-center  text-[50px] font-bold cursor-pointer">
                                <GoArrowLeft />
                            </div>
                        </Link>
                        <img src={logo} alt="logo" className="h-8 object-contain" />
                    </div>

                    {/* User mini card */}
                    {profile && (
                        <div className="mx-1 mb-6 bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl p-4 text-white">
                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-sm font-black mb-3">
                                {initials}
                            </div>
                            <p className="font-bold text-sm leading-tight truncate">{profile.name}</p>
                            <p className="text-blue-200 text-xs mt-0.5 truncate">{profile.currentPosition || "User"}</p>
                        </div>
                    )}

                    {/* Nav */}
                    <nav className="flex flex-col gap-1 flex-1">
                        {navItems.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActive(id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold w-full text-left transition-all duration-150 ${active === id
                                    ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                    }`}
                            >
                                <Icon className={`w-4 h-4 shrink-0 ${active === id ? "opacity-100" : "opacity-50"}`} />
                                {label}
                            </button>
                        ))}
                    </nav>

                    {/* Logout */}
                    <button
                        onClick={logOut}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all w-full text-left"
                    >
                        <FaSignOutAlt className="w-4 h-4" />
                        Log Out
                    </button>
                </aside>

                {/* ── MAIN ─────────────────────────────────────────────────────────── */}
                <div className="flex flex-col flex-1 min-w-0 bg-[#F4F7FC]">

                    {/* Topbar */}
                    <div className="flex items-center gap-3 px-8 py-5 bg-white border-b border-slate-100">
                        <div className="flex-1">
                            <h1 className="text-xl font-bold text-slate-900">My Profile</h1>
                            <p className="text-slate-400 text-xs mt-0.5">Manage your personal information</p>
                        </div>
                        <button className="w-10 h-10 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center transition-colors">
                            <IoMdSettings className="w-5 h-5 text-slate-500" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-6 min-h-0">
                        <div className="max-w-2xl mx-auto space-y-4">

                            {loading ? <ProfileSkeleton /> : !profile ? (
                                <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
                                    <p className="text-4xl mb-3">⚠️</p>
                                    <p className="text-slate-500 text-sm">Could not load profile. Please try again.</p>
                                </div>
                            ) : (
                                <>
                                    {/* ── HEADER CARD ── */}
                                    <div className="bg-white rounded-3xl shadow-sm p-6 flex items-center gap-5">
                                        <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-black text-white shrink-0">
                                            {initials}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-xl font-black text-slate-900">{profile.name}</h2>
                                            <p className="text-blue-600 text-sm font-semibold mt-0.5">
                                                {profile.currentPosition || "User"}
                                            </p>
                                            {profile.email && (
                                                <p className="text-slate-400 text-sm mt-1">✉️ {profile.email}</p>
                                            )}
                                        </div>
                                        {!editing && (
                                            <button
                                                onClick={() => setEditing(true)}
                                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold transition-colors border border-blue-200 shrink-0"
                                            >
                                                <FaPen className="w-3 h-3" /> Edit Profile
                                            </button>
                                        )}
                                    </div>

                                    {/* ── INFO / EDIT CARD ── */}
                                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

                                        {!editing ? (
                                            /* VIEW MODE */
                                            <div className="divide-y divide-slate-50">
                                                {profileFields.map(({ key, label, icon, link }) => (
                                                    <div key={key} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-colors">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-base w-6 text-center">{icon}</span>
                                                            <span className="text-slate-500 text-sm">{label}</span>
                                                        </div>
                                                        {link ? (
                                                            <a
                                                                href={profile[key] || "#"}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-blue-600 text-sm font-semibold hover:underline truncate max-w-xs"
                                                            >
                                                                {profile[key] || "—"}
                                                            </a>
                                                        ) : (
                                                            <span className="text-slate-800 text-sm font-semibold text-right max-w-xs truncate">
                                                                {profile[key] || "—"}
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            /* EDIT MODE */
                                            <div className="p-6 space-y-3">
                                                <h3 className="font-bold text-slate-800 text-sm mb-4">Edit Information</h3>

                                                {editFields.map(({ key, label }) => (
                                                    <div key={key} className="flex items-center gap-4">
                                                        <label className="text-slate-500 text-sm w-40 shrink-0">{label}</label>
                                                        <input
                                                            value={draft?.[key] || ""}
                                                            onChange={e => setDraft({ ...draft, [key]: e.target.value })}
                                                            className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                                                        />
                                                    </div>
                                                ))}

                                                {error && (
                                                    <p className="text-red-500 text-sm text-center pt-1">{error}</p>
                                                )}

                                                <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                                                    <button
                                                        onClick={() => { setEditing(false); setDraft(profile); setError(null); }}
                                                        className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 font-semibold text-sm hover:bg-slate-50 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleSave}
                                                        disabled={saving}
                                                        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors disabled:opacity-60 flex items-center gap-2 shadow-sm shadow-blue-200"
                                                    >
                                                        {saving ? (
                                                            <>
                                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                                                </svg>
                                                                Saving…
                                                            </>
                                                        ) : (
                                                            <><FaCheck className="w-3 h-3" /> Save Changes</>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}