var flappy = document.getElementById("bird");
var groundHeight = document.getElementById("grass").offsetHeight;
var topPillar = document.getElementsByClassName("top-pillar");
var bottomPillar = document.getElementsByClassName("bottom-pillar");
var devHeight = document.body.offsetHeight;
var devWidth = document.body.offsetWidth;
var jumpStarted = false;
var broke = false;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function computeHeight() {
    broke = false;
    jumpStarted = true;
    var flappyOgPos = flappy.offsetTop
    var i = 0;
    while(true){
        if(jumpStarted == false){
            broke = true;
            break;
        }else{
            flappy.style.top = `${flappyOgPos + (((i - 500) * (i - 500)) / 2500 - 100)}px`;
            // console.log(flappy.offsetTop);
            await sleep(2);
        }
        i+=2;
    }
    jumpStarted = false;
}

async function jump() {
    if(event.key == " " || event.key == "ArrowUp"){
        if(jumpStarted == false) {
            computeHeight();
        }else{
            jumpStarted = false;
            for(var i = 0; i <= 2000; i+=2){
                await sleep(1);
                if(broke){
                computeHeight();
                break;
                }
            }
        }
    }
}

function altjump(gravity) {
    
}

function start() {
    
}