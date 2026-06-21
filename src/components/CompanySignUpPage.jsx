import { ErrorMessage, Field, Form, Formik } from "formik";
import { companyRegisterSchema, companyRegisterValues } from "../store/Validators";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { VscLightbulbSparkle } from "react-icons/vsc";
import { HiUsers } from "react-icons/hi";
import { MdOutlineMail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { FaGlobeAmericas } from "react-icons/fa";
import { HiOutlineLockClosed } from "react-icons/hi2";
import useCompanyAuth from "../hooks/useCompanyAuth";


export default function CompanySignUpPage() {
    const { registerCompany, loading } = useCompanyAuth();
    return (
        <Formik initialValues={companyRegisterValues} validationSchema={companyRegisterSchema} onSubmit={(values) => registerCompany(values)}>
            <Form className="min-h-screen bg-[#c4d2dffc] flex flex-col justify-center items-center">
                <h1 className="text-black font-medium text-[24px]">Find the job that fits you best</h1>
                <div className="w-133 h-280 bg-white rounded-xl flex flex-col items-center gap-4 ">
                    <h1 className="font-medium text-[32px] text-black">Welcome</h1>
                    <p className="text-[#ADAFAD] font-medium text-[24px]">Log in or sign up for a new account</p>
                    <div className="flex flex-col justify-start">
                        <h1 className="text-black font-medium text-[21px] flex justify-start">Company Name</h1>
                        <div className="relative w-full">
                            <MdOutlineMapsHomeWork className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                            <Field type="text" name="companyname" placeholder="Enter your company name" className="w-100 h-12 pl-12 pr-4  rounded-2xl bg-[#ADAFAD] text-[#6B6E6A] placeholder:text-[#6B6E6A] outline-none" />
                        </div>
                        <ErrorMessage component="div" className="text-red-500 mt-1" name="companyname" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className="text-black font-medium text-[21px] flex justify-start">Industry</h1>
                        <div className="relative w-full">
                            <VscLightbulbSparkle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                            <Field type="text" name="industry" placeholder="e.g. Technology, Finance, Education" className="w-100 h-12 pl-12 pr-4  rounded-2xl bg-[#ADAFAD] text-[#6B6E6A] placeholder:text-[#6B6E6A] outline-none" />
                        </div>
                        <ErrorMessage component="div" className="text-red-500 mt-1" name="industry" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className="text-black font-medium text-[21px] flex justify-start">Company Size</h1>
                        <div className="relative w-full">
                            <HiUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                            <Field type="text" name="companySize" placeholder="Select company size" className="w-100 h-12 pl-12 pr-4  rounded-2xl bg-[#ADAFAD] text-[#6B6E6A] placeholder:text-[#6B6E6A] outline-none" />
                        </div>
                        <ErrorMessage component="div" className="text-red-500 mt-1" name="companySize" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className="text-black font-medium text-[21px] flex justify-start">Official Email</h1>
                        <div className="relative w-full">
                            <MdOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                            <Field type="text" name="officialemail" placeholder="Enter official email" className="w-100 h-12 pl-12 pr-4  rounded-2xl bg-[#ADAFAD] text-[#6B6E6A] placeholder:text-[#6B6E6A] outline-none" />
                        </div>
                        <ErrorMessage component="div" className="text-red-500 mt-1" name="officialemail" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className="text-black font-medium text-[21px] flex justify-start">Phone Number</h1>
                        <div className="relative w-full">
                            <MdLocalPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                            <Field type="text" name="phonenumber" inputMode="numeric" maxLength={11} pattern="[0-9]{11}" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ""); }}
                                placeholder="e.g. +20 123 456 7890" className="w-100 h-12 pl-12 pr-4 rounded-2xl bg-[#ADAFAD] text-[#6B6E6A] outline-none placeholder:text-[#6B6E6A]"
                            />
                        </div>
                        <ErrorMessage component="div" className="text-red-500 mt-1" name="phonenumber" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className="text-black font-medium text-[21px] flex justify-start">City</h1>
                        <div className="relative w-full">
                            <FaGlobeAmericas className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                            <Field type="text" name="city" placeholder="e.g. Cairo, Egypt" className="w-100 h-12 pl-12 pr-4  rounded-2xl bg-[#ADAFAD] text-[#6B6E6A] placeholder:text-[#6B6E6A] outline-none" />
                        </div>
                        <ErrorMessage component="div" className="text-red-500 mt-1" name="city" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className="text-black font-medium text-[21px] flex justify-start">Country</h1>
                        <div className="relative w-full">
                            <FaGlobeAmericas className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                            <Field type="text" name="country" placeholder="e.g. Cairo, Egypt" className="w-100 h-12 pl-12 pr-4  rounded-2xl bg-[#ADAFAD] text-[#6B6E6A] placeholder:text-[#6B6E6A] outline-none" />
                        </div>
                        <ErrorMessage component="div" className="text-red-500 mt-1" name="country" />
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
                    <h1 className="text-[#7B7E7A] font-medium text-[21px]">---------------- OR LogIn ----------------</h1>
                </div>

            </Form>
        </Formik>

    )
}
