var auth = false;
function userDAO(connection){
    this._connection = connection();
}

userDAO.prototype.signup = function(user){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("user", function(err, collection){
            collection.insert(user);
            mongoclient.close();
        });
    });
}

userDAO.prototype.auth = function(user, req, res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("user", function(err, collection){
            collection.find(user).toArray(function(err, result){
                
                if(result[0] != undefined){
                    console.log('autenticou');
                    req.session.auth = true;
                    req.session.user = result[0].user;
                }
                if(req.session.auth){
                    res.redirect('main');
                }else{
                    res.render("index", { validation: {} });
                }

            });
            mongoclient.close();
        });
    });
}

module.exports = function(){
    return userDAO;
}