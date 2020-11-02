module.exports = {
    ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Пожалуйста авторизируйтесь, чтобы войти!');
    res.redirect('/login');
    },
    forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin');      
    }
};