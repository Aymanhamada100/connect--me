import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import icon from "../assets/Icon 4.png"
import ConnectMe from "../assets/Connect Me.png"
export default function HeaderCompany() {

    const [isLoggedInCompany, setIsLoggedInCompany] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // تحقق من أي نوع حساب مسجل دخول
        const companyToken = localStorage.getItem("companyToken") || sessionStorage.getItem("companyToken");


        setIsLoggedInCompany(!!companyToken);

        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { name: "Home", path: "/HomeCompany" },
        { name: "AddNewJob", path: "/Jobportalapp" },
        { name: "Dashboard", path: "/CompanyDashboard" },

    ];

    return (
        <div
            className={`w-full h-25 flex justify-center items-center fixed top-0 left-0 z-50 transition-all duration-300 gap-15 ${scrolled
                ? "bg-white backdrop-blur-md"
                : "bg-white"
                }`} >
            <img src={ConnectMe} alt="" />


            <div className="flex items-center gap-6 text-black font-normal text-[20px]">
                {links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                            `transition hover:text-blue-600 ${isActive ? "text-blue-600" : ""}`
                        }
                    >
                        {link.name}
                    </NavLink>
                ))}
            </div>

            <div className="flex gap-4 items-center">
                {isLoggedInCompany ? (
                    <Link to="/ProfilePageCompany">
                        <div className="w-17 h-17 bg-slate-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-400 transition">
                            <div className="text-4xl"><CiUser /></div>
                        </div>
                    </Link>

                ) : (
                    <>
                        <div className=" flex pl-16 gap-2">
                            <Link to="/login">
                                <button className="btn btn-outline btn-primary h-13.25 w-28.75 rounded-[5px]">Sign In</button>
                            </Link>login
                            <Link to="/signup">
                                <button className="btn btn-active btn-primary h-13.25 w-28.75 rounded-[5px]">Sign Up</button>
                            </Link>
                        </div>
                    </>
                )}
            </div>

        </div>
    )
}
