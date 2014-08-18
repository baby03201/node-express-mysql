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

exports.login = function(req,res) {
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function(req, connection) {
        connection.query('SELECT * FROM user WHERE username = ?',input.username, function(err, rows) {
            if (err) {
                console.log("Username doesn't exist: %s", err);
                res.render('loginFailed', {page_title:"Login Failed", data:"Username doesn't exist"});
            } else {
                if (rows[0].password.match(input.password)) {

                    console.log("User password is matched");
                    res.render('userHomepage', {page_title:"Homepage - Node.js", data:rows});
                } else {
                    
                    console.log("user password is not matched");
                    res.render('loginFailed', {page_title:"Login Failed", data:"Password is wrong"});
                }
            }
        });
    });
};
