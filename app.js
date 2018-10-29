var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));


require("./router/main.js")(app);



io.on('connection', function(socket){
    console.log('user connected');
    socket.on('chat message',function(msg){
        
        //console.log(msg);
        
        io.emit('client message', msg);
        var sum=0;
        for(var i=1;i<=5;i++){
            
        setTimeout(function(){
            io.emit('server message', 'Good Evening');
        },(2000+sum));
        sum+=2000;
    }
        

    });
    socket.on('disconnect', function(){
        console.log('disconnected');
    });

  });
  


app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));
http.listen(5000,function(req,res){
    console.log("Server listen at Port 5000");
});