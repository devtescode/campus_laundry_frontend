import { baseURL } from '../Config/config';
// console.log('Base URL:', baseURL)


export const API_URLS = {
    userlogin: `${baseURL}/userlaundry/login`,
    resendverification : `${baseURL}/userlaundry/resend-verification`,
    usersignup: `${baseURL}/userlaundry/usersignup`,
    userapplyjob: `${baseURL}/userlaundry/userapplyjob`,
    getcreatepost: `${baseURL}/userlaundry/getcreatepost`,
    getallusers: `${baseURL}/admin/getallusers`,
    posterstats: (userId)=>`${baseURL}/userlaundry/posterstats/${userId}`,
    washerstats: `${baseURL}/userlaundry/washerstats`,
    getuserpost: (userId) => `${baseURL}/userlaundry/getuserpost/${userId}`,
    getWasherJobs: (washerId) => `${baseURL}/userlaundry/getWasherJobs/${washerId}`,
    deleteuserpost: (jobId) => `${baseURL}/userlaundry/deleteuserpost/${jobId}`,
    notifications: (userId) => `${baseURL}/userlaundry/notifications/${userId}`,
    completejob: (jobId) => `${baseURL}/userlaundry/completejob/${jobId}`,
    getmessages: (jobId) => `${baseURL}/userlaundry/getmessages/${jobId}`,
    sendmessages: `${baseURL}/userlaundry/sendmessages`,
    getalljobsdetails: `${baseURL}/admin/getalljobsdetails`,
    exists: `${baseURL}/admin/exists`,
    login: `${baseURL}/admin/login`,
    signup: `${baseURL}/admin/signup`,
    getallchats: `${baseURL}/admin/getallchats`,
    recentactivity: `${baseURL}/admin/recentactivity`,
    dashboardstats: `${baseURL}/admin/dashboardstats`,
    verifyemail: (token) => `${baseURL}/userlaundry/verify-email/${token}`,
    forgotpassword: `${baseURL}/userlaundry/forgotpassword`,
    createpost: `${baseURL}/userlaundry/createpost`,
    resetpassword: (token) => `${baseURL}/userlaundry/resetpassword/${token}`,
    getWasherHistory: (washerId) => `${baseURL}/userlaundry/getWasherHistory/${washerId}`,
};