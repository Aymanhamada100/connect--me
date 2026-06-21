import { API } from '../store';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function useLogin() {
    const navigate = useNavigate();
    const location = useLocation();

    const login = async (values) => {
        try {
            const res = await axios.post(API.login, {
                email: values.email,
                password: values.password
            });

            const token = res.data.token;
            if (!token) {
                toast.error("Invalid login response");
                return;
            }
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.sub;

            if (values.rememberIndex) {
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
            } else {
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('userId', userId);
            }

            toast.success("Login Successful");
            navigate('/');

        } catch (err) {
            console.log(err.response?.data);
            toast.error("Wrong Email or Password");
        }
    };

    const logOut = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/login');
    };

    return { login, logOut };
}