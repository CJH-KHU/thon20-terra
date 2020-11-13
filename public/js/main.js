
var screen = document.getElementsByTagName('body')[0];
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

screen.onkeydown = function(){
    move(event.keyCode);
}



function move(data){
    var data = {
        key: data
    }
    fetch('/move',{
        method : "POST",
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
          }
        }).then(function(res){
            return res.json();
        }).then(function(data){
            console.log(data)
        })
}

function getState(){
    fetch('/state',{
        method : "POST",
        headers:{
            'Content-Type': 'application/json'
          }
        }).then(function(res){
            return res.json();
        }).then(function(data){
            stat(JSON.stringify(data))
        })   
}

setInterval(getState,100);

function stat(data){
    console.log(data);
    data = JSON.parse(data)
    var playerList = data.playerList
    
    playerList.forEach(person => {
        var x = person.location.x
        var y = person.location.y
        drawPeople(x,y)
    });
}

function drawPeople(x, y){
    ctx.clearRect(0,0,canvas.clientWidth,canvas.height)
    ctx.beginPath();
    ctx.arc(x,y,10,0,Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}