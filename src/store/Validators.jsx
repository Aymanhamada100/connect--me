import * as Yup from 'yup';

export const LoginFormValues = { email: '', password: '', rememberIndex: false };
export const loginFormSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export const registerValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    academicLevel: '',
    university: '',

};

export const registerSchema = Yup.object({
    userName: Yup.string()
        .min(4, 'Username must be at least 4 characters')
        .required('User name is required'),

    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),

    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),

    academicLevel: Yup.string()
        .required('Academic Level is required'),

    university: Yup.string()
        .required('University is required'),
});



export const companyRegisterValues = {
    companyname: '',
    industry: '',
    companySize: '',
    officialemail: '',
    phonenumber: '',
    city: '',
    country: '',
    password: '',
    confirmPassword: ''
};

export const companyLoginValues = {
    Email: '',
    Password: ''
};

export const companyRegisterSchema = Yup.object().shape({
    companyname: Yup.string().required('Company name is required'),
    industry: Yup.string().required('Industry is required'),
    companySize: Yup.string().required('Company size is required'),
    officialemail: Yup.string().email('Invalid email').required('Official email is required'),
    phonenumber: Yup.string().required('Phone number is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});
