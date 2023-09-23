const nodemailer = require('nodemailer');
const sendEmail = async (email, token) => {
    const subject = 'Email Verification';
    const encodedToken = encodeURIComponent(token);
    const text = `Please click on the link to verify your email :http://localhost:3000/auth/verify/${encodedToken}`;
    try {
        var transporter =  nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "neetusinghajgara@gmail.com",
                pass: "cnvm njnz dwre lnkt",
            },
        });
        var mailOptions = {
            from: "",
            to: email,
            subject: subject,
            text: text,
        };
        const result = await transporter.sendMail(mailOptions);
        return result;
    }
    catch (err) {
        return err;
    }
};

module.exports = {
    sendEmail,

}
