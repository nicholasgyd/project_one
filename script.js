// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var wall = document.getElementById("wall");
var gap = document.getElementById("gap");
var jumping = 0;
var scoreCounter = -1;

gap.addEventListener('animationiteration', () => {
    const random = (-((Math.random()*300)+150));
    gap.style.top = random+"px";
    scoreCounter++
});

//Gravity logic
setInterval(function(){
    var playerTop = 
    parseInt(window.getComputedStyle(player).getPropertyValue("top")); //get value of player position
    if (jumping == 0) {
        player.style.top = (playerTop + 3) +"px"; //speed of gravity
    }
    var wallLeft = parseInt(window.getComputedStyle(wall).getPropertyValue("left")); //get margin value of left of the wall
    var gapTop = parseInt(window.getComputedStyle(gap).getPropertyValue("top")); //get margin value of top of the gap
    var pTop = -(500-playerTop); //this is to match playerTop with the top of the gap (which is at default -500) for the crash detection
    //crash detection:
    if((playerTop>480) || ((wallLeft<20) && (wallLeft>-50) && ((pTop < gapTop) || (pTop>gapTop+130)))){
    // 1. if player hits bottom, or 2. if the wall is in the player's column, and the player does not pass through the gap, then crash is true
        alert("Yikes! Game over. Score: " + scoreCounter + ".");
        player.style.top = 100 + "px"; //reset player
        scoreCounter = -1; //reset score
    }
},10)

//Jump logic
function jump(){ 
    jumping = 1;
    let jumpCount = 0; 
    var jumpInterval = setInterval(function(){
        var playerTop = 
        parseInt(window.getComputedStyle(player).getPropertyValue("top"));
        //prevent player from going past top of game map
        //create a hangtime after jump for the last 50ms of the 200ms jump
        if((playerTop > 6) && (jumpCount <15)){
            player.style.top = (playerTop - 5) +"px"; //determines jump sensitivity: less sensity = easier
        }
        //jumpCount determines how long the jump will last for
        //set to <20 = 200ms, make longer for slower jumps
        if (jumpCount > 20){ //after 200ms, exit jump function
            clearInterval(jumpInterval);
            jumping = 0; //to restart gravity
            jumpCount = 0;
        }
        jumpCount++;
    },10);
}