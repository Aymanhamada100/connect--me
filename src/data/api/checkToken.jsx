import axios from "axios";
import { API, domain } from "../../store";

export const checkToken = async (jwt) => {
    try {
        const res = await axios.get(`${domain}/api/users/me`, {
            headers: { Authorization: `Bearer ${jwt}` },
            params: { populate: "*" },
        });
        return res.data;
    } catch (err) {
        console.error("Error checking token:", err.response?.data || err.message);
        throw err;
    }
};