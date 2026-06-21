import { useEffect, useState } from "react";
import { APICompany } from "../store";
import HeaderCompany from "../components/HeaderCompany";
import SearchCompany from "../components/SearchCompany";
import UsersCompany from "../components/UsersCompany";
import Jobs from "../components/Jobs";
import JobPortalSections from "../components/JobPortalSections";


export default function HomeCompany() {
    const [companyName, setCompanyName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("companyToken") || sessionStorage.getItem("companyToken");
        const companyId = localStorage.getItem("companyId") || sessionStorage.getItem("companyId");

        if (!token || !companyId) return;

        const fetchProfile = async () => {
            try {
                const res = await fetch(APICompany.profile(companyId), {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (data?.data?.companyName) setCompanyName(data.data.companyName);
            } catch (err) {
                console.error("Failed to fetch company profile:", err);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="w-full h-full">
            <HeaderCompany companyName={companyName} />
            <SearchCompany companyName={companyName} />
            <UsersCompany companyName={companyName} />
            <Jobs companyName={companyName} />
            <JobPortalSections companyName={companyName} />

        </div>
    );
}