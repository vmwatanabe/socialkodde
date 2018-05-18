var express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb'),
    multiparty = require('connect-multiparty'),
    fs = require('fs');
    objectId = require('mongodb').ObjectID;

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(multiparty());

var port = 7331;

app.listen(port);

var db = new mongodb.Db(
    'socialkodde',
    new mongodb.Server('localhost',27017,{}),
    {}
);

console.log('Servidor HTTP esta escutando na porta ' + port);

app.get('/', function(req, res){
    res.send({msg:'Olá'});
});

// POST(create)
app.post('/api', function(req, res){

    res.setHeader("Access-Control-Allow-Origin", "*");

    var data = req.body;
    console.log(data);
    var date = new Date();
    time_stamp = date.getTime();
    var post_obj = {
        url_image: '',
        comment: data.comment,
        time_stamp: time_stamp
    };
    if (data.file != 'undefined' ){
        var path_origin = req.files.file.path;
        var image_name = time_stamp + '_' + req.files.file.originalFilename;
        var path_end = './uploads/' + image_name;
        post_obj.url_image = image_name;
        fs.rename(path_origin, path_end, function(err){
            if (err){
                console.log('erro');
                res.status(500).json({error: err});
                return
            }

        })
    }
    db.open(function(err, mongoclient){
        mongoclient.collection('posts', function(err, collection){
            collection.insert(post_obj, function(err, records){
                if(err){
                    res.json({'status': 'erro'});
                }else{
                    res.json({'status': 'inclusao realizada com sucesso'});
                }
                mongoclient.close();
            });
        });
    });
});

// GET(ready)
app.get('/api', function(req, res){
    console.log('get api');
    res.setHeader("Access-Control-Allow-Origin", "*");
    db.open(function(err, mongoclient){
        mongoclient.collection('posts', function(err, collection){
            collection.find().toArray(function(err, results){
                if(err){
                    res.json(err);
                }else{
                    res.json(results);
                }
                mongoclient.close();
            });
        });
    });
});

app.post('/users', function(req, res){
    var data = req.body;
    var username = data.search_text;
    var logged_user = data.logged_user;
    console.log(username);
    console.log('get users api');
    res.setHeader("Access-Control-Allow-Origin", "*");
    db.open(function(err, mongoclient){
        mongoclient.collection('user', function(err, collection){
            collection.find({'user': {'$regex': username}}).toArray(function(err, results){
                if(err){
                    res.json(err);
                }else{
                    res.json(results);
                }
                mongoclient.close();
            });
        });
    });
});

app.get('/uploads/:img', function(req, res){
    console.log('get image');
    var img = req.params.img;

    fs.readFile('./uploads/'+ img, function(err, data){
        if (err){
            res.status(400).json(err);
            return;
        }

        res.writeHead(200, {
            'Content-type': 'image/jpg'
        });

        res.end(data);
    });
});

// GET by ID(ready)
app.get('/api/:id', function(req, res){

    res.setHeader("Access-Control-Allow-Origin", "*");
    db.open(function(err, mongoclient){
        mongoclient.collection('postagens', function(err, collection){
            collection.find(objectId(req.params.id)).toArray(function(err, results){
                if(err){
                    res.json(err);
                }else{
                    res.status(200).json(results);
                }
                mongoclient.close();
            });
        });
    });
});

// PUT by ID(update)
app.put('/api/:id', function(req, res){
    db.open(function(err, mongoclient){
        mongoclient.collection('postagens', function(err, collection){
            collection.update(
                { _id : objectId(req.params.id) },
                { $set : { titulo : req.body.titulo }},
                {},
                function(err, records){
                    if(err){
                        res.json(err);
                    }else{
                        res.json(records);
                    }
                    mongoclient.close();
                }
            );
        });
    });
});

// DELETE by ID(delete)
app.delete('/api/:id', function(req, res){
    db.open(function(err, mongoclient){
        mongoclient.collection('postagens', function(err, collection){
            collection.remove(
                { _id : objectId(req.params.id) },
                function(err, records){
                    if(err){
                        res.json(err);
                    }else{
                        res.json(records);
                    }
                    mongoclient.close();
                }  
            );
        });
    });
});