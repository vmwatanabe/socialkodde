var mongo = require('mongodb');

var connMongoDB = function(){
    console.log('teste');
    var db = new mongo.Db(
        'socialkodde',
        new mongo.Server(
            'localhost',
            27017,
            {}
        ),
        {}
    );
    return db;

}

module.exports = function(){
    return connMongoDB;
};