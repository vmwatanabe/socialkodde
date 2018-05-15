module.exports.post = function(application, req, res){
    res.render('main/init');
}

module.exports.topost = function(application, req, res){
    console.log(req.body);
    var data_form = req.body;

    var connection = application.config.dbConnection;
    var postDAO = new application.app.models.postDAO(connection);
    
    postDAO.insertPost(data_form);
    res.send('kkkE');
}