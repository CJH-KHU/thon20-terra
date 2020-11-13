const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const PORT = 80;
const session = require('express-session');
const FileStore = require('session-file-store')(session); 

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'/public')))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
    id: 0
}))
app.use(router);

var playerList = new Array();
var playerNumber = 0;

const move = require('./api/move.js');

class human{
    constructor(sess,id){
        this.location = {
            x:0,
            y:0
        }
        this.number = id
        this.session = sess
    }
}


router.get('/login',function(req,res){
    playerList[playerNumber] = new human(req.sessionID,playerNumber)
    playerNumber +=1
    res.redirect('/')
    console.log(playerNumber)
})

router.post('/move',function(req,res){   
    var sessID = req.sessionID
    var nowplayerNumber = 0;
    for(var i =0;i<playerNumber+1;i++){
        if(playerList[i].session == sessID){
            nowplayerNumber = i;
            break;
        }
    }
    if(req.body.key == 38){
        playerList[nowplayerNumber].location.y -=1
    }
    else if(req.body.key == 40){
        playerList[nowplayerNumber].location.y +=1
    }
    else if(req.body.key==37){
        playerList[nowplayerNumber].location.x -=1
    }
    else if(req.body.key==39){
        playerList[nowplayerNumber].location.x +=1
    }
    var succsess = {
        message: 'moved'
    }
    res.send(succsess);
})
router.post('/state',function(req,res){
    var message = {
        playerNumber: playerNumber,
        playerList: playerList
    }
    res.json(message);
})


app.listen(PORT,function(err){
    if(err){
        console.log(err);
    }else{
        console.log('server is running on '+ PORT);
    }
})