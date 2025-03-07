import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for 587
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false, // Self-signed certificate issue fix
        }
    });

    try {
        const info = await transporter.sendMail({
            from: `"MDU ITM Learn" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        });

        return { success: true, message: `Email sent: ${info.messageId}` };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
