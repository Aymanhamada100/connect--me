import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginFormSchema, LoginFormValues } from "../store/Validators";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { Link } from "react-router-dom";

import useCompanyAuth from "../hooks/useCompanyAuth";

export default function LoginPageCompany() {
    const { loginCompany } = useCompanyAuth();
    return (
        <Formik initialValues={LoginFormValues} validationSchema={loginFormSchema} onSubmit={loginCompany}  >
            <Form className="min-h-screen bg-[#c4d2dffc] flex flex-col justify-center items-center ">
                <h1 className="text-black font-medium text-[24px]">Find the job that fits you best</h1>
                <div className="w-120 h-160 bg-white rounded-xl flex flex-col items-center gap-4">
                    <h1 className="font-medium text-[32px] text-black">Welcome</h1>
                    <p className="text-[#ADAFAD] font-medium text-[24px]">Log in or sign up for a new account</p>
                    <div className="w-100 h-16 bg-[#ADAFAD] rounded-[70px]">
                        <button type="button" className="btn btn-outline w-50 h-16 rounded-[65px]"><Link to="/login">User</Link></button>
                        <button type="button" className=" btn btn-outline w-50 rounded-[65px] dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[state=active]:bg-gradient-primary data-[state=active]:text-white " >
                            Company
                        </button>
                    </div>
                    <div className="w-100 h-16 bg-[#ADAFAD] rounded-[70px]">
                        <button type="button" className="btn btn-outline w-50 h-16 rounded-[65px]">Sign in</button>
                        <button type="button" className=" btn btn-outline w-50 rounded-[65px] dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[state=active]:bg-gradient-primary data-[state=active]:text-white " >
                            <Link to="/signup">Sign Up</Link>
                        </button>
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className="text-black font-medium text-[21px] flex justify-start">OfficialEmail</h1>
                        <div className="relative w-full">
                            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                            <Field type="email" name="email" placeholder="Enter your email" className="w-100 h-12 pl-12 pr-4  rounded-2xl bg-[#ADAFAD] text-[#6B6E6A] placeholder:text-[#6B6E6A] outline-none" />
                        </div>
                        <ErrorMessage component="div" className="text-red-500 mt-1" name="email" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <div className="flex justify-between">
                            <h1 className="text-black font-medium text-[21px] flex justify-start">Password</h1>
                            <a className="text-[#0A66C2] font-medium text-[16px]" href="#">Forgot password</a>
                        </div>
                        <div className="relative w-full">
                            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                            <Field type="password" name="password" placeholder="Enter you password" className="w-100 h-12 pl-12 pr-4  rounded-2xl bg-[#ADAFAD] text-[#6B6E6A] placeholder:text-[#6B6E6A] outline-none" />
                        </div>
                        <ErrorMessage component={'div'} className="text-red-500" name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 font-medium text-[22px] text-base/6 rounded-xl">Sign in</button>
                    <h1 className="text-[#7B7E7A] font-medium text-[21px]">----------- OR CONTINUE WITH -----------</h1>
                    <button type="button" className="btn bg-white text-black border-[#e5e5e5] w-100">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Continue with Google
                    </button>
                </div>
            </Form>
        </Formik>
    )
}

