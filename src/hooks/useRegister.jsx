import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoginRepo } from "../data/Repo";

export default function useRegister() {

    const navigate = useNavigate();

    const register = (values) => {
        LoginRepo.auth_register(values)
            .then((res) => {
                toast.success("Account Created Successfully 🎉");
                navigate("/login");
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || "Registration Failed ❌");
            });
    };

    return { register };
}
