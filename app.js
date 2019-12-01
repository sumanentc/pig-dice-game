/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer,scores,totalScore,gamePlaying;

init();


//document.querySelector('current-'+ activePlayer).textContent=dice;
//score = document.querySelector('score-'+ activePlayer).textContent;



document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
        //Generate Random Number for the Dice
        var dice = Math.floor(Math.random() * 6 ) + 1;

        //Display the Dice Result
        let diceDom = document.querySelector('.dice')
        diceDom.style.display ='block';
        diceDom.src = 'dice-'+ dice + '.png';

        //Update the Score of Each User 
        if(dice !== 1){
                totalScore += dice;
                document.querySelector('#current-'+activePlayer).textContent= totalScore;
        }else{

                document.getElementById('current-0').textContent= 0;
                document.getElementById('current-1').textContent= 0;

                totalScore = 0;

               //Next Player
               nextPlayer();
        }
       
    }

    
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    
    if(gamePlaying){
       //Add the Current Score to Total
        scores[activePlayer] += totalScore;

        //Update in the UI
        document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        let winningScore;
        if(input){
           winningScore = input;
        }else{
           winningScore =100;
        }

        //Check if the Player Won the Game
        if(scores[activePlayer] >= winningScore){
                document.getElementById('name-' + activePlayer).textContent ='Winner !!!'
                //To Hide the Dice
                document.querySelector('.dice').style.display='none';

                document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
                document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');

                gamePlaying = false;
           }else{
               //Next Player
               nextPlayer();
           }
        }
});

document.querySelector('.btn-new').addEventListener('click',init);

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    totalScore = 0;
   //Toggle the active Player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

   //To Hide the Dice
   document.querySelector('.dice').style.display='none';
}

function init(){
    scores =[0,0];
    activePlayer = 0;
    totalScore =0;
    
    //To Hide the Dice
    document.querySelector('.dice').style.display='none';

    //Reseting the Values of Both Players to 0
    document.getElementById('score-0').textContent=0;
    document.getElementById('score-1').textContent=0;
    document.getElementById('current-0').textContent=0;
    document.getElementById('current-1').textContent=0;
    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
    
    gamePlaying=true;
    
}




