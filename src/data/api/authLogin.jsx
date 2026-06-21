import axios from "axios";
import { API } from "../../store";

export const authLogin = async (values) => {
    const res = await axios.post(API.login, {
        email: values.email,
        password: values.password
    });

    return res.data;
};