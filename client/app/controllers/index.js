module.exports.login = function(application, req, res){
    var data = req.body;
    req.assert('user', 'Usuário não pode ser vazio').notEmpty();
    req.assert('password', 'Senha não pode ser vazia').notEmpty();

    var err = req.validationErrors();

    if (err){
        console.log(err);
        res.render("home/init", {validation:err});
        return;
    }

    var connection = application.config.dbConnection;
    var userDAO = new application.app.models.userDAO(connection);
    userDAO.auth(data, req, res);

}

module.exports.signup = function(application, req, res){
    var data = req.body;
    req.assert('user', 'Usuário não pode ser vazio').notEmpty();
    req.assert('password', 'Senha não pode ser vazia').notEmpty();
    req.assert('confirm_password', 'Senha não pode ser vazia').notEmpty();

    var err = req.validationErrors();
    console.log(data);
    if (err){
        console.log(err);
        res.render("home/init", {validation:err});
        return;
    }

    var connection = application.config.dbConnection;
    var userDAO = new application.app.models.userDAO(connection);
    var auth = userDAO.signup(data, req, res);

}

module.exports.index = function(application, req, res){
    res.render('home/init', {validation: {}});
}

module.exports.logout = function(application, req, res){
    req.session.destroy(function(err){
        res.render('home/init',{});
    });
}