import { ErrorMessage, Field, Form, Formik } from 'formik'
import { registerValues, registerSchema } from "../store/Validators";
import useUsers from "../hooks/useUsers";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { Link } from 'react-router-dom';

export default function SignUpPage() {
    const { addNewUser } = useUsers();
    return (
        <Formik initialValues={registerValues} validationSchema={registerSchema} onSubmit={addNewUser}>
            <Form className="min-h-screen bg-[#c4d2dffc] flex flex-col justify-center items-center">
                <h1 className="text-black font-medium text-[24px]">Find the job that fits you best</h1>
                <div className="w-133 h-220 bg-white rounded-xl flex flex-col items-center gap-2 ">
                    <h1 className="font-medium text-[32px] text-black">Welcome</h1>
                    <p className="text-[#ADAFAD] font-medium text-[24px]">Log in or sign up for a new account</p>
                    <div className="flex gap-8">
                        <button className="btn btn-active btn-primary w-40 h-25 rounded-[20px]">Job Seeker</button>
                        <button className="btn btn-outline btn-primary w-40 h-25 rounded-[20px]" type="button">
                            <Link to="/Company">Company</Link>
                        </button>
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className="text-black font-medium text-[21px] flex justify-start">Full Name</h1>
                        <div className="relative w-full">
                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                            <Field type="text" name="userName" placeholder="Enter your full name" className="w-100 h-12 pl-12 pr-4  rounded-2xl bg-[#ADAFAD] text-[#6B6E6A] placeholder:text-[#6B6E6A] outline-none" />
                        </div>
                        <ErrorMessage component="div" className="text-red-500 mt-1" name="userName" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className="text-black font-medium text-[21px] flex justify-start">Email</h1>
                        <div className="relative w-full">
                            <MdOutlineEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                            <Field type="email" name="email" placeholder="Enter your email" className="w-100 h-12 pl-12 pr-4  rounded-2xl bg-[#ADAFAD] text-[#6B6E6A] placeholder:text-[#6B6E6A] outline-none" />
                        </div>
                        <ErrorMessage component="div" className="text-red-500 mt-1" name="email" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className="text-black font-medium text-[21px] flex justify-start">Academic Level</h1>
                        <div className="relative w-full">
                            <Field type="text" name="academicLevel" placeholder="Select your academic level" className="w-100 h-12 pl-12 pr-4  rounded-2xl bg-[#ADAFAD] text-[#6B6E6A] placeholder:text-[#6B6E6A] outline-none" />
                        </div>
                        <ErrorMessage component="div" className="text-red-500 mt-1" name="academicLevel" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className="text-black font-medium text-[21px] flex justify-start">University</h1>
                        <div className="relative w-full">
                            <HiOutlineAcademicCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                            <Field type="text" name="university" placeholder="Enter your university" className="w-100 h-12 pl-12 pr-4  rounded-2xl bg-[#ADAFAD] text-[#6B6E6A] placeholder:text-[#6B6E6A] outline-none" />
                        </div>
                        <ErrorMessage component="div" className="text-red-500 mt-1" name="university" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <div className="flex justify-between">
                            <h1 className="text-black font-medium text-[21px] flex justify-start">Password</h1>
                        </div>
                        <div className="relative w-full">
                            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                            <Field type="password" name="password" placeholder="Create a password" className="w-100 h-12 pl-12 pr-4  rounded-2xl bg-[#ADAFAD] text-[#6B6E6A] placeholder:text-[#6B6E6A] outline-none" />
                        </div>
                        <ErrorMessage component={'div'} className="text-red-500" name="password" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <div className="flex justify-between">
                            <h1 className="text-black font-medium text-[21px] flex justify-start">Confirm Password</h1>
                        </div>
                        <div className="relative w-full">
                            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                            <Field type="password" name="confirmPassword" placeholder="Confirm your password" className="w-100 h-12 pl-12 pr-4  rounded-2xl bg-[#ADAFAD] text-[#6B6E6A] placeholder:text-[#6B6E6A] outline-none" />
                        </div>
                        <ErrorMessage component={'div'} className="text-red-500" name="confirmPassword" />
                    </div>
                    <button className="btn btn-primary w-100 font-medium text-[22px] text-base/6 rounded-xl" type="submit">Create Account</button>
                    <h1 className="text-[#7B7E7A] font-medium text-[21px]">----------- OR CONTINUE WITH -----------</h1>
                    <button className="btn bg-white text-black border-[#e5e5e5] w-100">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Continue with Google
                    </button>

                </div>


            </Form>

        </Formik>

    )
}
