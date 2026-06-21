import axios from "axios";
import { API } from "../../store";

export const authRegister = (values) => {
    return axios.post(API.registerUser, {
        name: values.userName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        academicLevel: values.academicLevel,
        university: values.university
    });
};