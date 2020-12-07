module.exports = (req, res, next) => {
    if(!res.locals.tempToken && !res.locals.userToken) {
        return redirects.index(req, res);
    }
    let token = res.locals.userToken || res.locals.tempToken;
    switch(token.permissions) {
    case 'Admin': {
        return res.redirect('admin/dashboard');
    }
    default: {
        return res.redirect('/');
    }
    }
};
