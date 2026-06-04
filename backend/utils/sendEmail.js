const SibApiV3Sdk = require('sib-api-v3-sdk');

const client = SibApiV3Sdk.ApiClient.instance;

// AUTH
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();



const sendEmail = async (email, otp) => {

    try {

        const sendSmtpEmail = {
            to: [
                {
                    email: email
                }
            ],

            sender: {
                name: "Todo App",
                email: "aayushintern17@gmail.com"
            },

            subject: "Verify Your Account",

            htmlContent: `
                <div style="font-family: Arial; padding: 20px;">
                    <h2>Email Verification</h2>
                    <p>Your OTP is:</p>
                    <h1 style="color:#2563eb">${otp}</h1>
                    <p>This OTP expires in 5 minutes.</p>
                </div>
            `
        };



        await tranEmailApi.sendTransacEmail(sendSmtpEmail);

        console.log("Email sent successfully");

    } catch (error) {

        console.log("Email sending failed:", error);

        throw new Error("Email failed to send");
    }
};



module.exports = sendEmail;