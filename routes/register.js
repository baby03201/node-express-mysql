exports.save = function(req,res) {
    
    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function(req, connection){
        
        console.log("JSON input: %s", input);
        var data = {
            username    : input.username,
            password    : input.password,
            email       : input.email
        };

        connection.query('INSERT INTO user SET ?',data, function(err, rows) {
            if (err)
                console.log("Error register: %s",err);
            res.redirect('/');
        });
    });
};

exports.show = function(req,res) {
    res.render('register', {page_title: "Register - Node.js"});
};
