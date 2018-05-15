function postDAO(connection){
    console.log("postDAO");
    this._connection = connection();
    // console.log(this._connection);
    
}

postDAO.prototype.insertPost = function(data){    
    var db = this._connection;
    this._connection.open(function(err, mongocli){
        mongocli.collection("posts", function(err, collection){
            collection.insert(data, function(err, records){
                if(err){
                    res.json({'status': 'erro'});
                }else{
                    res.json({'status': 'inclusao realizada com sucesso'});
                }
                mongocli.close();
            });
        });
    });
}

module.exports = function(){
    return postDAO;
}