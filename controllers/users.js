var users = require('../models/Users');

exports.getUsers = function()

{
    return users.users;    
}


    


exports.getUser = function(id){
    for(var i=0;i<users.length;i++){
        if(users[i].id == id)
            return users[i];
    }
}

//export saves require pulls

exports.compareAuth=function(username,password) {
 for(var i=0; i<users.length; i++)
     
 {
     
     if(users[i].username == username && users[i].password == password)
     {
        return users[i];
         //return true;
     }
 }
     
        
    
}