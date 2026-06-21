import { useState, useEffect } from "react";
import { FaUser, FaBell, FaEnvelope, FaSearch, FaSignOutAlt, FaExchangeAlt, FaPen } from "react-icons/fa";
import { APICompany } from "../store";
import useCompanyAuth from "../hooks/useCompanyAuth";
import logo from "../assets/Frame 58.png"
import { IoMdSettings } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

const navItems = [
  { id: "profile", label: "My profile", icon: <FaUser className="w-4 h-4" /> },
  { id: "notifications", label: "Notifications", icon: <FaBell className="w-4 h-4" /> },
  { id: "messages", label: "Messages", icon: <FaEnvelope className="w-4 h-4" /> },
  { id: "vacancies", label: "Vacancies", icon: <FaSearch className="w-4 h-4" /> },
];

const profileFields = [
  { key: "companyFocus", label: "Company Focus", link: false },
  { key: "industry", label: "Industry", link: false },
  { key: "companySize", label: "Company Size", link: false },
  { key: "websiteLink", label: "Website Link", link: true },
  { key: "socialMediaLinks", label: "Social Media Links", link: true },
  { key: "companyAddress", label: "Company Address", link: false },
  { key: "phoneNumber", label: "Phone Number", link: false },
  { key: "officialEmail", label: "Official Email", link: false },
];

const editFields = [
  { key: "companyName", label: "Company Name" },
  { key: "country", label: "Country" },
  { key: "city", label: "City" },
  { key: "location", label: "Location" },
  { key: "companyFocus", label: "Company Focus" },
  { key: "industry", label: "Industry" },
  { key: "companySize", label: "Company Size" },
  { key: "websiteLink", label: "Website Link" },
  { key: "socialMediaLinks", label: "Social Media Links" },
  { key: "companyAddress", label: "Company Address" },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "officialEmail", label: "Official Email" },
];

export default function ProfilePageCompany() {

  const { logoutCompany } = useCompanyAuth();

  const [active, setActive] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [profile, setProfile] = useState({
    companyID: 0,
    companyName: "",
    industry: "",
    companySize: "",
    officialEmail: "",
    phoneNumber: "",
    country: "",
    city: "",
    location: "",
    companyFocus: "",
    websiteLink: "",
    socialMediaLinks: "",
    companyAddress: "",
  });

  const [draft, setDraft] = useState({ ...profile });

  useEffect(() => {
    const companyName = localStorage.getItem("companyName") || sessionStorage.getItem("companyName");
    if (companyName) {
      setProfile((prev) => ({ ...prev, companyName }));
      setDraft((prev) => ({ ...prev, companyName }));
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSave = async () => {

    setLoading(true);
    setError(null);

    const token = localStorage.getItem("companyToken") || sessionStorage.getItem("companyToken");

    try {

      const formData = new FormData();

      Object.keys(draft).forEach((key) => {
        formData.append(key, draft[key]);
      });

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const res = await fetch(APICompany.UpdateProfile, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();

      setProfile(updated);

      const storage = localStorage.getItem("companyToken") ? localStorage : sessionStorage;

      storage.setItem("companyName", updated.companyName);

      setEditing(false);

    } catch (err) {
      setError("فشل التحديث، حاول تاني.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-6">
      <div className="w-500 h-250 flex rounded-[80px] overflow-hidden shadow-xl">

        {/* SIDEBAR */}

        <div className="w-100 flex flex-col shrink-0 py-8 px-4 bg-white border-r border-slate-200">

          <div className="mb-10 px-2">
            <img src={logo} />
          </div>

          <nav className="flex flex-col gap-1 flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors cursor-pointer border-0 text-left w-full
                ${active === item.id
                    ? "bg-blue-700 text-white"
                    : "bg-transparent text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-1 mt-4">

            <button
              onClick={logoutCompany}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-slate-400 hover:text-slate-600 hover:bg-slate-200"
            >
              <FaSignOutAlt />
              Log Out
            </button>

            <button className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-slate-400 hover:text-slate-600 hover:bg-slate-200">
              <FaExchangeAlt />
              Change User
            </button>

          </div>

        </div>

        {/* MAIN */}

        <div className="flex flex-col flex-1 bg-[#F4F7FC]">

          <div className="flex items-center px-8 py-5 border gap-10">

            <div className="flex items-center gap-3 w-385 h-22 bg-white rounded-[20px]">
              <FaArrowRightLong className="text-slate-400" />
              <span className="font-medium text-[28px] text-slate-900">My Profile</span>
            </div>

            <button className="w-22 h-22 rounded-[20px] flex justify-center items-center bg-white">
              <IoMdSettings className="w-10 h-10 text-black" />
            </button>

          </div>

          <div className="p-8 flex-1">

            <div className="bg-white rounded-[20px] p-6 shadow-sm">

              {/* PROFILE HEADER */}

              <div className="flex items-start gap-5 pb-5 mb-5 border-b">

                <div className="relative w-28 h-28">

                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-slate-200">

                    {image ? (
                      <img src={image} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                        <FaUser className="w-15 h-15 text-blue-700" />
                      </div>
                    )}

                  </div>

                  <label className="absolute bottom-0 right-0 bg-blue-700 text-white p-1.5 rounded-full cursor-pointer">
                    <FaPen className="w-3 h-3" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                </div>

                <div className="flex-1">

                  <h2 className="text-xl font-bold">{profile.companyName || "—"}</h2>

                  <p className="text-blue-700 text-sm">Company</p>

                  <p className="text-slate-400 text-sm">
                    {[profile.country, profile.city, profile.location].filter(Boolean).join(", ") || "—"}
                  </p>

                </div>

                <button
                  onClick={() => { setDraft({ ...profile }); setEditing(true); }}
                  className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center"
                >
                  <FaPen className="w-3 h-3 " />
                </button>

              </div>

              {/* PROFILE DATA */}

              {!editing ? (

                <div className="flex flex-col gap-3">

                  {profileFields.map(({ key, label, link }) => (

                    <div key={key} className="flex justify-between">

                      <span className="text-slate-500">{label}</span>

                      {link ? (
                        <a href={profile[key]} target="_blank" rel="noreferrer" className="text-blue-700">
                          {profile[key] || "—"}
                        </a>
                      ) : (
                        <span>{profile[key] || "—"}</span>
                      )}

                    </div>

                  ))}

                </div>

              ) : (

                <div className="flex flex-col gap-3">

                  {editFields.map(({ key, label }) => (

                    <div key={key} className="flex items-center gap-3">

                      <label className="w-40">{label}</label>

                      <input
                        value={draft[key] || ""}
                        onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
                        className="flex-1 px-3 py-1.5 rounded-lg border"
                      />

                    </div>

                  ))}

                  <div className="flex gap-3 mt-3 justify-end">

                    <button
                      onClick={() => setEditing(false)}
                      className="px-5 py-2 rounded-xl border"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="px-5 py-2 rounded-xl bg-blue-700 text-white"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}