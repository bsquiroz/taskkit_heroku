const isCountVerify = (req, res, next) => {
    const verified = req.user.verified;

    if (verified) {
        return next();
    }

    return res.redirect("/auth/verified");
};

module.exports = isCountVerify;
