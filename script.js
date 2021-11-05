document.addEventListener("DOMContentLoaded",() => {
    var BaseElement = document.getElementById('app');
    const imposter = document.createElement("div")
    let GameOver = false;
    let BasesCount = 6;
    let imposterLeftSpace = 50;
    let imposterBottomSpace = 150;
    let startpoint = 150;
    // let downmotion = 
    let isjumping = false;
    let Bases  = [];
    let score = 0;
    let BaseMotion;
    
    //Creating base
    class Base{
        constructor(bottomspace){
            this.left = Math.random()*315;
            this.bottom = bottomspace;
            this.element = document.createElement("div");
            this.element.classList.add("Base");
            this.element.style.left = this.left+"px";
            this.element.style.bottom = this.bottom+"px";
            // console.log(this.element);
            BaseElement.appendChild(this.element);
        }
    }
    
    //Creating platform for basr
    function CreatePlatforms(){
        for (var i = 0; i<BasesCount; i++){
            let BaseGap = 600 / BasesCount;
            let newBaseBottom = 100 + i * BaseGap;
            let newBase = new Base(newBaseBottom);
            Bases.push(newBase);
            // console.log(Bases);
        }
    }
    
    //Create Avatar
    function CreateImposter(){
        BaseElement.appendChild(imposter);
        imposter.classList.add("Imposter");
        imposterLeftSpace = Bases[0].left;
        imposter.style.left = imposterLeftSpace+ "px";
        imposter.style.bottom = Bases[0].bottom + "px";
    }
   //Motion in The base in downward direction
    function moveBase(){

        Bases.forEach(BaseIndex=>{
            BaseIndex.bottom = BaseIndex.bottom - 4;
            BaseIndex.element.style.bottom = BaseIndex.bottom+"px";
            if(BaseIndex.bottom<10){
                BaseIndex.element.classList.remove("Base");
                Bases.shift();
                score++;
                let newBase = new Base(600);
                Bases.push(newBase);
            }
        })
        var scoretext = document.getElementById("score");
        scoretext.innerText="Your Score is : "+ score;
    }
    let downmotion;
    
    //Jump Avatar when touching any platform
    function jump(){
        clearInterval(downmotion);
        isjumping = true;
        upmotion = setInterval(function()
        {   
            imposterBottomSpace += 20; 
            imposter.style.bottom=imposterBottomSpace+"px";
            if(imposterBottomSpace>startpoint+300){
                fall();
                isjumping=false;
            }
        },20)
    }
    //Falling after jumping
    function fall(speed = 30){
        clearInterval(upmotion);
        isjumping = false;
        downmotion = setInterval(function(){
            imposterBottomSpace -= 5; 
            imposter.style.bottom=imposterBottomSpace+"px";

            if(imposterBottomSpace<=0){
                GameOverText();
            }

            Bases.forEach(BaseIndex=>{
                if((imposterBottomSpace  >= BaseIndex.bottom) &&
                (imposterBottomSpace <= (BaseIndex.bottom + 15)) &&
                (imposterLeftSpace + 60 >= BaseIndex.left) &&
                (imposterLeftSpace  <= (BaseIndex.left + 85)) && 
                !isjumping){

                        startPoint = imposterBottomSpace;
                        jump();
                        isjumping=true
                    }
            })
            // console.log(imposter.style.left,imposter.style.bottom);
        },speed)
    }
    //Game over Function
    function GameOverText(){
        clearInterval(downmotion);
        clearInterval(BaseMotion);
        clearInterval(leftMotion);
        clearInterval(RightMotion);
        BaseElement.innerHTML = '';
        var scoretext = document.getElementById("score");
        scoretext.innerText="Better Luck Next Time ! Your Score is : "+ score;
    }
    //ceating motion in Impostar on user click
    function motion(e){
        imposter.style.bottom = imposterBottomSpace + "px";
        console.log(e.key)
        if(e.key === "ArrowLeft"){
            motionLeft();
        }
        else if(e.key === "ArrowRight"){
            motionRight();
        }
        else if(e.key === "ArrowUp"){
            motionStright();
        }
        else if(e.key === "ArrowDown"){
            motionDown();
        }
    }
    
    //Falling Imposter Rapidly on button down event
    function motionDown(){
        fall(10)
    }
    let RightMotion;
    let isRightMotion=false;
    let leftMotion;
    let isLeftMotion=false;
    //Moving imposter left
    function motionLeft(){
        if(isRightMotion){
            clearInterval(RightMotion);
            isRightMotion=false;
        }
        isLeftMotion=true
        leftMotion = setInterval(function(){
            if(imposterLeftSpace>=0){
                // console.log(imposterLeftSpace);
                imposterLeftSpace=imposterLeftSpace-5;
                imposter.style.left=imposterLeftSpace+"px";
                
            }
            else{
                motionRight();
            }
        },20)
        
        
    }
    //Moving Imposter Right
    function motionRight(){
        if(isLeftMotion){
            clearInterval(leftMotion);
            isLeftMotion=false;
        }
        isRightMotion=true
        RightMotion = setInterval(function(){
            if(imposterLeftSpace<=313){
                
                imposterLeftSpace=imposterLeftSpace+5;
                imposter.style.left=imposterLeftSpace+"px";
                console.log(imposter.style.left);
                
            }
            else{
                motionLeft();
            }
        },20)
        
    }
    //Stop motion
    function motionStright(){
        isLeftMotion=false;
        isRightMotion=false;    
        clearInterval(RightMotion);
        clearInterval(leftMotion);
    }
    //Start Game
    function Start(){
        if(!GameOver){
            CreatePlatforms(); //Create Platforms
            CreateImposter(); //Create Imposter
            BaseMotion = setInterval(moveBase,30); //Moving Platform
            jump(); //Jump for first time
            document.addEventListener("keyup",motion); //Added event listener
        }
        
    }

    Start();
})
    
    
