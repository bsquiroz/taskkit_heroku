const nodemailer = require("nodemailer");
const googleapis = require("googleapis");

const Oauth2 = googleapis.google.auth.OAuth2;

const createTransporter = async () => {
    const oauthClient = new Oauth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_SECRET,
        process.env.GOOGLE_REDIRECT_URL
    );

    oauthClient.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    try {
        const accessToken = await oauthClient.getAccessToken();

        const tranporte = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "recursividad2000@gmail.com",
                accessToken,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            },
        });

        return tranporte;
    } catch (error) {
        throw new Error(error);
    }
};

const sendMail = async (options) => {
    try {
        const gmailTransporte = await createTransporter();
        const results = await gmailTransporte.sendMail(options);
    } catch (error) {
        throw new Error(error);
    }
};

const emailOptions = {
    subject: "",
    to: "",
    from: "recursividad2000@gmail.com",
    html: "",
};

module.exports = {
    sendMail,
    emailOptions,
};
