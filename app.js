//npm install express ejs mysql body-parser
//npm init -aage jaake app.js

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "hellosql",
    database: "user"
    // insecureAuth : true
});

var sql,values;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));



connection.connect();

app.get("/", function(req, res){
    connection.query("SELECT * from people", function(err, response){
        if(err){
            console.log(err);
        } else {
            console.log(response);
            res.render("main",{
                result:response
            })
        }
    });
});

app.get("/daalo", function(req, res){
    res.render("form");
});

app.post("/daalo", function(req, res){
    sql = "INSERT INTO people (name,age,location) VALUES ?"
    values = [[req.body.name, req.body.age, req.body.location]];
    // connection.query("INSERT INTO")
    connection.query(sql, [values], function(err, respone){
        if(err){
            console.log(err);
        } else {
            res.render("main");

            connection.query("SELECT * from people", function(err, response){
                if(err){
                    console.log(err);
                } else {
                    console.log(response);
                    res.render("main",{
                        result:response
                    })
                }
            });
        }
    })
});

app.listen(3000,function(){
    console.log("Server has started");
});
