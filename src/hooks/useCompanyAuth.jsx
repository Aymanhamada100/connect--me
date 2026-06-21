// useCompanyAuth.jsx
import axios from "axios";
import { APICompany } from "../store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

export default function useCompanyAuth() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const loginCompany = async (values) => {
        setLoading(true);
        try {
            const res = await axios.post(APICompany.login, {
                OfficialEmail: values.email,
                Password: values.password
            });

            const data = res.data;

            console.log("LOGIN DATA:", data);

            const token = data?.token;

            if (!token) {
                toast.error("Invalid login");
                return;
            }

            const companyId = data.companyId || data.companyID;

            if (!companyId) {
                console.log("❌ companyId missing in response");
                return;
            }

            localStorage.setItem("companyToken", token);
            localStorage.setItem("companyId", String(companyId));
            localStorage.setItem("companyData", JSON.stringify(data));

            toast.success("Logged in successfully!");
            navigate("/HomeCompany");

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    console.log(localStorage.getItem("companyId"));

    const logoutCompany = () => {
        localStorage.removeItem("companyToken");
        localStorage.removeItem("companyId");
        localStorage.removeItem("companyData");
        sessionStorage.removeItem("companyToken");
        sessionStorage.removeItem("companyId");
        sessionStorage.removeItem("companyData");
        toast.success("Logged out successfully!");
        navigate("/loginpagecompany");
    };

    const registerCompany = async (values) => {
        setLoading(true);
        try {
            await axios.post(APICompany.register, {
                CompanyName: values.companyname,
                Industry: values.industry,
                CompanySize: values.companySize,
                OfficialEmail: values.officialemail,
                PhoneNumber: values.phonenumber,
                City: values.city,
                Country: values.country,
                Password: values.password,
                ConfirmPassword: values.confirmPassword
            });

            toast.success("Company registered successfully!");
            navigate("/loginpagecompany");
        } catch (error) {
            console.log(error.response?.data);
            toast.error(error.response?.data?.message || "Registration failed or network error");
        } finally {
            setLoading(false);
        }
    };

    return { loginCompany, logoutCompany, registerCompany, loading };
}