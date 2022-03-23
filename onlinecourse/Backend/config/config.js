// mail password for OTP
exports.password=process.env.MAIL_PASS;
// mongo database
exports.mongo = process.env.MONGO_DATABASE;
// jwt authentication 
exports.accessToken=process.env.ACCESS_TOKEN_SECRET;
exports.refereshToken=process.env.REFRESH_TOKEN_SECRET;
exports.accessTokenLife=process.env.ACCESS_TOKEN_LIFE;
exports.refereshTokenLife=process.env.REFRESH_TOKEN_LIFE;
