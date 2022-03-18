// sendgrid key for OTP
exports.Sendgrid=process.env.SENDGRID_KEY;

// mongo database
exports.mongo = process.env.MONGO_DATABASE;


// jwt authentication 
exports.accessToken=process.env.ACCESS_TOKEN_SECRET;
exports.refereshToken=process.env.REFRESH_TOKEN_SECRET;

exports.accessTokenLife=process.env.ACCESS_TOKEN_LIFE;
exports.refereshTokenLife=process.env.REFRESH_TOKEN_LIFE;


// google auth
exports.googleAuth = process.env.OAuth2Client;


