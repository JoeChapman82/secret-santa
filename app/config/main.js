module.exports = {
    session: {
        cookieName: 'santas-secret-session',
        cookieLifespan: 36000000,
        httpOnly: true,
        secure: false,
        signed: true
    },
    csrf: {
        lifespan: 36000,
        httpOnly: true,
        secure: false,
        signed: true
    }
};
