import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";
import ConnectMe from "../assets/Connect Me.png";

export default function Header() {
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const userToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsLoggedInUser(!!userToken);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "Find Jobs", path: "/UploadCV" },
    { name: "Apply Jobs", path: "/UserJobsPage" },
  ];

  return (
    <div
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-[#d6e2edfc]"
        }`}
    >
      {/* الصف الرئيسي */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">

        {/* اللوجو */}
        <img src={ConnectMe} alt="ConnectMe" className="h-10 md:h-12 object-contain" />

        {/* اللينكات - تتخفى على الموبيل */}
        <nav className="hidden md:flex items-center gap-6 text-black font-normal text-lg">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `transition hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* الأزرار - تتخفى على الموبيل */}
        <div className="hidden md:flex gap-3 items-center">
          {isLoggedInUser ? (
            <Link to="/ProfilePageUser">
              <div className="w-12 h-12 bg-slate-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-400 transition">
                <CiUser className="text-3xl" />
              </div>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-outline btn-primary px-6 h-11 rounded-md">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-active btn-primary px-6 h-11 rounded-md">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* زرار الهامبرجر - بيظهر على الموبيل بس */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* القائمة المنسدلة للموبيل */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-4 pb-4 gap-3 bg-[#d6e2edfc] border-t border-blue-200">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 border-b border-blue-100 text-base font-medium transition hover:text-blue-600 ${isActive ? "text-blue-600" : "text-gray-800"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {isLoggedInUser ? (
            <Link to="/ProfilePageUser" onClick={() => setMenuOpen(false)}>
              <div className="w-12 h-12 bg-slate-300 rounded-full flex items-center justify-center mt-2">
                <CiUser className="text-3xl" />
              </div>
            </Link>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1">
                <button className="btn btn-outline btn-primary w-full h-11 rounded-md">
                  Sign In
                </button>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="flex-1">
                <button className="btn btn-active btn-primary w-full h-11 rounded-md">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}