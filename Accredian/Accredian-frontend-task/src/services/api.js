import { API_BASE_URL } from "./config";

// Referral create karne ke liye function
export const createReferral = async (referralData) => {
    const response = await fetch(`${API_BASE_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(referralData),
    });
    return response.json();
};

// Referrals fetch karne ke liye function
export const getReferrals = async () => {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.json();
};

// Referral email send karne ke liye function
export const sendReferralEmail = async (emailData) => {
    const response = await fetch(`${API_BASE_URL}send-referral-email`, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
    });
    return response.json();
};
