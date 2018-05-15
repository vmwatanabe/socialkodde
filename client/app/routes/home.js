module.exports = function(application){
    application.get('/', function(req, res){
        res.render("home/init");
        // res.send("boa filhão");
    });
};