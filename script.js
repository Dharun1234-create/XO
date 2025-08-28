const Box=document.querySelectorAll(".box")
const Status=document.querySelector(".status")
const Restartbtn=document.getElementById("restart")
const Popup=document.querySelector(".popup")
const Hide=document.getElementById("hide")
let x="<img src='./x.png' width='100px' height='100px'>"
let o="<img src='./o.png' width='100px' height='100px'>"
let xwin="<img src='./x-won.png'> "
let owin="<img src='./o-won.png'> "
let matchdraw="<img src='./x-o-matchdraw.png'> "
let winning=[[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]]
let currentPlayer=x
let player="X"
let choice=["","","","","","","","",""]
let gameover=false
start()
function start(){
    // here add the EventListener for all the 9 box
    Box.forEach(box=>box.addEventListener('click',boxclick))
    Restartbtn.addEventListener("click",restart)
    Restartbtn.textContent="Start"
    Status.textContent=`${player}'s Turn`
    gameover=true
} 
function boxclick(){
    // in this the chocie not empty or field we need not touch or distrub and the game is defined 
    // as gameover when the game is start it will be true while all box where complete it will be flase
    // so that we cannot able touch once again
    const index=this.dataset.touch
    if(choice[index]!="" || !gameover){
        return
    }
    changebox(this,index)
    winner()
}
function changebox(box,index){
    // the image where be added here by index position
    choice[index]=player 
    box.innerHTML=currentPlayer

}
function changeplayer(){
    // below this we can change the player alternatively by using teritary operator
    player=(player=="X")?"O":"X"
    currentPlayer=(currentPlayer==x)?  o : x
    Status.textContent=`Player ${player}'s Turn`
    
}
function winner(){
    let won=false
    for(let i=0;i<winning.length;i++) {
        // in this the combination run 0 to 8 
        // for ex i choose the 4 what is in [2,4,6] this three value is store in condition 1,2,3
        // if three has same x or o then we can see who is winner
        let combination=winning[i]
        let condition1=choice[combination[0]]
        let condition2=choice[combination[1]]
        let condition3=choice[combination[2]]
        if(condition1=="" || condition2=="" || condition3==""){
            continue
        }
        if(condition1==condition2 && condition2==condition3){
            Box[combination[0]].classList.add("win")
            Box[combination[1]].classList.add("win")
            Box[combination[2]].classList.add("win")
            won=true
        }
    }
    if(won){
        Status.textContent=`Player ${player} Won the Match`
        gameover=false
        if(player=="X"){
            Popup.innerHTML=xwin
        }
        else{
            Popup.innerHTML=owin
        }
        Popup.style.display = "flex"
        Hide.style.opacity=0.1
        Restartbtn.textContent="ReStart"
    }
   
    else if(!choice.includes("")){
        Status.textContent=`Match Is Draw`
        gameover=false
        Popup.innerHTML=matchdraw
        Popup.style.display = "flex"
        Hide.style.opacity=0.1
        Restartbtn.textContent="ReStart"
    }
    else{
        changeplayer()
    }
}
Restartbtn.addEventListener('click', restart)
function restart(){
    // from here we reset the all the things
    currentPlayer=x
    player="X"
    choice=["","","","","","","","",""]
    Box.forEach(box=>{
        box.innerHTML=""
        box.classList.remove("win")
    })
    Status.textContent=`Play Now`
    gameover=true
    Popup.style.display="none"
    Hide.style.opacity=1
}
/* <img src="x-won.png" alt="">
<img src="o-won.png" alt="">
<img src="x-o-matchdraw.png" alt=""> */