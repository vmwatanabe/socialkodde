module.exports = function(app){
    app.get('/', function(req, res){
        res.render("home/init");
        // res.send("boa filhão");
    });
};