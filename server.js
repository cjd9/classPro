//dependent already defined variables
var express = require('express');
var hbs = require('hbs');
var path = require('path');
var bodyParser = require('body-parser');

//User model
var users = require('./controllers/users'); //user defined dependent variable
var app = express(); //to create server

app.set('views', path.join(__dirname,'views'));
app.set('view engine','html');
app.engine('html',hbs.__express);
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
        extended: false
        
    }));
app.use(express.static('public'));

//Routes
app.get('/', function(request,response){
   // 
    //.render displays dynamic data as opposed to sendfile whih only sends a static file //console.log(users.getUsers()+'this is it'); 
    response.render('index',{       
        title: "Home",
        users: users.getUsers()});

}); //sends title and users along with index file ( '{{}}' actually displays the attribute )

app.get('/users/:id',
       function(request,response){
           var user = users.getUser(request.params.id);
           response.render('profile',{title:" user Profile",
               user:user
           });
           
       });

app.get('/home',function(request,response){
    response.render('index',users.getUsers);
});


app.get('/login', function(request,response){
    response.render('login',{title:"Login"});

});
app.get('/signup', function(request,response){
    response.render('signup', { title:"Signup" } );

});
app.get('/about', function(request,response){
    response.render('about',{title:"About"});

});

app.post('/login',function(request,response){ 
   // console.log(request.body);
  var result= users.compareAuth(request.body.email, request.body.password); 
    if (  result)
  {
      response.send("Login Succesful. Hi "+result.name);
  }
    else
    {
     response.send("Failed")
    }
    
    
    console.log(request.body.email);
    console.log(request.body.password);
       // response.send("Send Data"+request.body.email+request.body.password);
   
} );



app.listen(3000);

