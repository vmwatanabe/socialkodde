module.exports = function(application){
    application.get('/main', function(req, res){
        application.app.controllers.post.post(application, req, res);
        // res.send("boa filhão");
    });
    application.post('/api', function(req, res){
		application.app.controllers.post.topost(application, req, res);
	});
};