module.exports = function(application){
    application.get('/', function(req, res){
        application.app.controllers.index.index(application, req, res);
    });
    application.post('/login', function(req, res){
        application.app.controllers.index.login(application, req, res);
    });
    application.post('/signup', function(req, res){
        application.app.controllers.index.signup(application, req, res);
    });
    application.get('/logout', function(req, res){
        application.app.controllers.index.logout(application, req, res);
    });
};