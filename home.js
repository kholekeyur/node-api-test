
var express = require('express');
var app = express();
var fs = require("fs");

const bodyParser = require('body-parser');


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.get('/listUsers', function (req, res) {
   fs.readFile("./" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/addUser', function (req, res) {
   // First read existing users.

   var obj = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

    let lastelement=Object.keys(obj)
  
      let last = lastelement.length + 1
        console.log(last);
     const book = req.body;

          //console.log(book)

     let newValue="user"+last
     console.log(book);
      

    
     obj[newValue]=book[newValue]

    // console.log(obj)
   

  fs.writeFile ("./users.json", JSON.stringify(obj), function(err) {
    if (err) throw err;
    console.log('complete');
    }
);
      
         res.end( JSON.stringify(obj));
      
   // });
})




app.get('/users/:id', function (req, res) {
   // First read existing users.
   fs.readFile("./" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})



const PORT = process.env.PORT || 8081;

var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
