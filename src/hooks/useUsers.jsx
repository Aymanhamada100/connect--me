import axios from 'axios';
import { API, domain } from '../store';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useUsers() {
    const navigate = useNavigate();

    const getAllUsers = async () => {
        try {
            const res = await axios.get(`${domain}/api/users`, { params: { populate: 'user_role' } });
            return res.data;
        } catch (err) {
            console.error('Error fetching users:', err.response?.data || err.message);
            toast.error('Failed to fetch users');
            return [];
        }
    };
    const getUserRoles = async () => {
        try {
            const res = await axios.get(`${domain}/api/user-roles`);
            return res.data.data;
        } catch (err) {
            console.error('Error fetching roles:', err.response?.data || err.message);
            toast.error('Failed to fetch user roles');
            return [];
        }
    };
    const addNewUser = async (values) => {
        try {
            const res = await axios.post(API.registerUser, {
                name: values.userName,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
                academicLevel: values.academicLevel,
                university: values.university
            });
            toast.success('User Added Successfully');
            navigate('/login');
        } catch (err) {
            console.error('Error adding user:', err.response?.data || err.message);
            toast.error(err.response?.data?.title || err.response?.data?.message || 'Something went wrong');
        }
    };
    const getUserDetails = async (userId) => {
        try {
            const res = await axios.get(`${domain}/api/users/${userId}?populate=*`);
            return res.data;
        } catch (err) {
            console.error('Error fetching user details:', err.response?.data || err.message);
            toast.error('Failed to fetch user details');
            return null;
        }
    };
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${domain}/api/users/${userId}`);
            toast.success('User deleted successfully');
        } catch (err) {
            console.error('Error deleting user:', err.response?.data || err.message);
            toast.error('Failed to delete user');
        }
    };
    return { getAllUsers, getUserRoles, addNewUser, getUserDetails, deleteUser };
}