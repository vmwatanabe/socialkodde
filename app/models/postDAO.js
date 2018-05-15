function postDAO(connection){
    console.log("postDAO");
    this._connection = connection();
    // console.log(this._connection);
    
}

postDAO.prototype.insertPost = function(data){    
    var Grid = require('gridfs-stream');
    var db = this._connection;
    console.log(this._connection);
    this._connection.open(function(err, mongocli){
        var gfs = Grid(db, mongocli);
        gfs.collection('uploads');
        mongocli.collection("posts", function(err, collection){
            collection.insert(data);
        });
    });
}

module.exports = function(){
    return postDAO;
}