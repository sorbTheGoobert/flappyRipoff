var flappy = document.getElementById("bird");
var groundHeight = document.getElementById("grass").offsetHeight;
var topPillar = document.getElementsByClassName("top-pillar");
var bottomPillar = document.getElementsByClassName("bottom-pillar");
var devHeight = document.body.offsetHeight;
var devWidth = document.body.offsetWidth;
var gravity = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function jump(gravity) {
    if(event.key == " " || event.key == "ArrowUp"){
        for(gravity = -50; gravity < 0; gravity){

        }
    }
}

function altjump(gravity) {
    
}
function flappyUpdate() {

}