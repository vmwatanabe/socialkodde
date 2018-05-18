module.exports.search = function(application, req, res){
    if (req.session.auth){
        var session = new Object();
        session.user = req.session.user;
        res.render('search/init', {session: session});
    }else{
        res.redirect('/');
    }
}