const env = process.env.NODE_ENV || 'development';
const port  = process.env.PORT || 4000;
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/project-4-${env}`;
const secret = process.env.AUTH_SECRET || 'hYgs^=?>@qrTfxLp';
const bandsInTownAppId = 'e00e7701bd747c53beec09c4d2d63bba';
const spotifyAppId = 'be0c644bd7d943b5a8727fd2c6df7883';

module.exports = { port, dbURI, secret, env, bandsInTownAppId, spotifyAppId };
