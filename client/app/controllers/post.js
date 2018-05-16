module.exports.post = function(application, req, res){
    if (req.session.auth){
        var session = new Object();
        session.user = req.session.user;
        res.render('main/init', {session: session});
    }else{
        res.redirect('/');
    }
}

module.exports.topost = function(application, req, res){
    console.log(req.body);
    var data_form = req.body;

    var connection = application.config.dbConnection;
    var postDAO = new application.app.models.postDAO(connection);
    
    postDAO.insertPost(data_form);
}