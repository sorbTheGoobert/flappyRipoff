var flappy = document.getElementById("bird");
// var groundPos = document.getElementById("grass").offsetTop;
var topPillar = document.getElementsByClassName("top-pillar");
var bottomPillar = document.getElementsByClassName("bottom-pillar");
const devHeight = document.body.offsetHeight;
const devWidth = document.body.offsetWidth;
var jumpStarted = false;
var broke = false;
var gap = bottomPillar[0].offsetTop - (topPillar[0].offsetHeight + topPillar[0].offsetTop); //(not sure if this works but probably no)
var gameStarted = false;
var pillarGenerationInterval;
var pillarMovementInterval;
var jumpable = true;
// var timeSinceJumped = 0;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkCollision(object1, object2/*, n*/) {
    //i totallly did not rip this from my previous project. (definetly (certainly (source: just trust me))) 
    // if(n == 1){ // 1 if vertical
    //     if(
    //         object1.offsetTop + object1.offsetHeight >= object2.offsetTop &&
    //         object2.offsetTop + object2.offsetHeight >= object1.offsetTop
    //     ){
            
    //     }
    // }else 
    //if(n == 2){ // 2 if horizontal 
    if (
        (
            object1.offsetLeft + object1.offsetWidth >= object2.offsetLeft &&
            object2.offsetLeft + object2.offsetWidth >= object1.offsetLeft
        ) &&
        (
            object1.offsetTop + object1.offsetHeight >= object2.offsetTop &&
            object2.offsetTop + object2.offsetHeight >= object1.offsetTop
        )
    ) {
        return true;
    }
    //}
}

async function computeHeight(i) {
    broke = false;
    jumpStarted = true;
    var flappyOgPos = flappy.offsetTop
    while(true){
        if(jumpStarted == false){
            broke = true;
            break;
        }else{
            if(flappy.offsetTop < 0){
                flappy.style.top = 0;
                i = 1000;
            }else if(flappy.offsetTop + flappy.offsetHeight > devHeight){
                flappy.style.top = `${devHeight - flappy.offsetHeight}px`;
                broke = true
                jumpStarted = false;
            }else{
                flappy.style.top = `${flappyOgPos + ( ( ( ( i - 500 ) * ( i - 500 ) ) / 2500 - 100 ) * 1.6) }px`;
            }
            await sleep(1);
        }
        i+=11;
    }
    jumpStarted = false;
}

async function jump() {
    if(jumpable == true){
        if(event.key == " " || event.key == "ArrowUp" || event.key == "w"){
            if(jumpStarted == false) {
                computeHeight(0);
            }else{
                jumpStarted = false;
                for(var i = 0; i <= 2000; i+=2){
                    await sleep(1);
                    if(broke){
                        computeHeight(0);
                        break;
                    }
                }
            }
        }
        else if(event.key == "s" || event.key == "ArrowDown"){
            if(jumpStarted == false) {
                computeHeight(1000);
            }else{
                jumpStarted = false;
                for(var i = 0; i <= 2000; i+=2){
                    await sleep(1);
                    if(broke){
                        computeHeight(1000);
                        break;
                    }
                }
            }
        }
    }
    else{
        await sleep(5000);
        location.reload();
    }
}

// async function altjump() {
//     if(jumpStarted == false) {
//         computeHeight();
//     }else{
//         jumpStarted = false;
//         for(var i = 0; i <= 2000; i+=2){
//             await sleep(1);
//             if(broke){
//                 computeHeight();
//                 break;
//             }
//         }
//     }
// }


var pillarCount = 0;
const ogPillarPos = topPillar[0].offsetTop;
const ogVisibleHeight = document.getElementById("height").offsetHeight;

function spawnPillars() {
    if(pillarCount != 0){
        for(var i = 0; i < topPillar.length; i++){
            var offsetRNG = Math.floor(Math.random() * ogVisibleHeight);
            var sideRNG = Math.floor(Math.random() * 2);
            if(topPillar[i].offsetLeft <= -100){
                if(i != 0){
                    topPillar[i].style.left = `${topPillar[i-1].offsetLeft + 600}px`;
                    bottomPillar[i].style.left = `${bottomPillar[i-1].offsetLeft + 600}px`;
                }else{
                    topPillar[i].style.left = `${topPillar[topPillar.length - 1].offsetLeft + 600}px`;
                    bottomPillar[i].style.left = `${bottomPillar[bottomPillar.length - 1].offsetLeft + 600}px`;
                }
                if(sideRNG % 2 == 0){
                    topPillar[i].style.top = `${ogPillarPos + offsetRNG}px`;
                    bottomPillar[i].style.top = `${topPillar[i].offsetTop + topPillar[i].offsetHeight + gap}px`;
                }else{
                    topPillar[i].style.top = `${ogPillarPos - offsetRNG}px`;
                    bottomPillar[i].style.top = `${topPillar[i].offsetTop + topPillar[i].offsetHeight + gap}px`;
                }
            }
        }
    }else{
        for(var i = 0; i < topPillar.length; i++) {
            var offsetRNG = Math.floor(Math.random() * ogVisibleHeight);
            var sideRNG = Math.floor(Math.random() * 2);
            topPillar[i].style.left = `${devWidth + 600 * i}px`;
            bottomPillar[i].style.left = `${devWidth + 600 * i}px`;
            if(sideRNG % 2 == 0){
                topPillar[i].style.top = `${ogPillarPos + offsetRNG}px`;
                bottomPillar[i].style.top = `${topPillar[i].offsetTop + topPillar[i].offsetHeight + gap}px`;
            }else{
                topPillar[i].style.top = `${ogPillarPos - offsetRNG}px`;
                bottomPillar[i].style.top = `${topPillar[i].offsetTop + topPillar[i].offsetHeight + gap}px`;
            }
        }
    }
    pillarCount++;
}

function gameLost() {
    clearInterval(pillarGenerationInterval);
    clearInterval(pillarMovementInterval);
    clearInterval(pillarCollisionCheck);
    jumpable = false;
    jumpStarted = false;
}

function losingConditionCheck() {
    for(var i = 0; i < topPillar.length; i++){
        if(
            checkCollision(flappy, topPillar[i]) ||
            checkCollision(flappy, bottomPillar[i])
        ){
            console.log("Skill issue");
            gameLost();
        }
    }
}

function movePillars() {
    for(var i = 0; i < topPillar.length; i++){
        topPillar[i].style.left = `${topPillar[i].offsetLeft - 5}px`
        bottomPillar[i].style.left = `${bottomPillar[i].offsetLeft - 5}px`
    }
}

function start() {
    if(!gameStarted){
        pillarGenerationInterval = setInterval(spawnPillars, 10);
        pillarMovementInterval = setInterval(movePillars, 1);
        pillarCollisionCheck = setInterval(losingConditionCheck, 10);
        for(var i = 0; i < topPillar.length; i++){
            topPillar[i].style.opacity = 1;
            bottomPillar[i].style.opacity = 1;
        }
        gameStarted = true;
    }
}