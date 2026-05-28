const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({

    host: 'smtp-relay.brevo.com',

    port: 587,

    secure: false,

    auth: {

        user: process.env.BREVO_SMTP_USER,

        pass: process.env.BREVO_SMTP_PASS
    }
});
transporter.verify((error, success) => {

    if (error) {

        console.log("SMTP ERROR:", error);

    } else {

        console.log("SMTP SERVER READY");
    }
});


const sendEmail = async (email, otp) => {

    try {

        const mailOptions = {

            from: '"Todo App" <aayushintern17@gmail.com>',

            to: email,

            subject: 'Verify Your Account',

            html: `

                <div style="font-family: Arial, sans-serif; padding: 20px;">

                    <h2>Email Verification</h2>

                    <p>Your OTP is:</p>

                    <h1 style="color: #2563eb; letter-spacing: 2px;">
                        ${otp}
                    </h1>

                    <p>This OTP expires in 5 minutes.</p>

                </div>
            `
        };



        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully');

    } catch (error) {

        console.log('Email sending failed:', error);

        throw new Error('Failed to send email');
    }
};



module.exports = sendEmail;