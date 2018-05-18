module.exports = function(application){
    application.get('/search', function(req, res){
        application.app.controllers.search.search(application, req, res);
    });
};