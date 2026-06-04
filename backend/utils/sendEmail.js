const brevo = require('@getbrevo/brevo');

const apiInstance =
    new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

const sendEmail = async (
    email,
    otp
) => {

    try {

        const sendSmtpEmail =
            new brevo.SendSmtpEmail();

        sendSmtpEmail.sender = {
            name: 'Todo App',
            email: 'aayushintern17@gmail.com'
        };

        sendSmtpEmail.to = [
            {
                email
            }
        ];

        sendSmtpEmail.subject =
            'Verify Your Account';

        sendSmtpEmail.htmlContent = `
            <div style="font-family: Arial; padding: 20px;">
                <h2>Email Verification</h2>

                <p>Your OTP is:</p>

                <h1 style="color:#2563eb">
                    ${otp}
                </h1>

                <p>
                    This OTP expires in 5 minutes.
                </p>
            </div>
        `;

        await apiInstance.sendTransacEmail(
            sendSmtpEmail
        );

        console.log(
            'Email sent successfully'
        );

    } catch (error) {

        console.error(
            'Email sending failed:',
            error
        );

        throw new Error(
            'Email failed to send'
        );
    }
};

module.exports = sendEmail;