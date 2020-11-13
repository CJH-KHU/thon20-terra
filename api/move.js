human1 = {
    location:{
        x:0,
        y:0
    }
}

result = function(req,res){   

    if(req.body.key == 38){
        human1.location.y -=1
    }
    else if(req.body.key == 40){
        human1.location.y +=1
    }
    else if(req.body.key==37){
        human1.location.x -=1
    }
    else if(req.body.key==39){
        human1.location.x +=1
    }
    var message = {
        mess : human1.location
    }
    res.send(JSON.stringify(message))
}

module.exports = result