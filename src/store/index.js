//login User

export const domain = "http://connectmeweb.runasp.net";

export const API = {
    login: `${domain}/api/UserAuth/Login`,
    registerUser: `${domain}/api/UserAuth/Register`,
    getProfile: `${domain}/api/UserAuth/my-profile`,
    updateProfile: `${domain}/api/UserAuth/update-profile`,
    uploadAndMatch: `${domain}/api/Resume/upload-and-match`,
};


// login Company
export const domainCompany = "http://connectmeef.runasp.net";

export const APICompany = {
    login: `${domainCompany}/api/CompanyAuth/Login`,
    register: `${domainCompany}/api/CompanyAuth/SignUp`,
    profile: (id) => `${domainCompany}/api/CompanyAuth/Profile/${id}`,
    updateProfile: `${domainCompany}/api/CompanyAuth/UpdateProfile`,
    createJob: `${domainCompany}/api/Vacancy/Create`,
    getAllJobs: `${domainCompany}/api/Vacancy/All`,
    applyJob: `${domainCompany}/api/Vacancy/Apply`,
    getApplicants: `${domainCompany}/api/Applicants/All`,
    updateApplicantStatus: (id) => `${domainCompany}/api/Applicants/${id}/Status`,
};


