$(document).ready(function () {
    var options = [
        {
         question: "What player scored the most points in one game?",
        choice: ["Lebron James", "Kobe Bryant", "Wilt Chamberlin",],
        answer: 2,
        photo:"assets/images/Wilt100.jpg",
         },
         {
        question: "What is Kareem Abdul-Jabbar's birth name?",
        choice: ["Rawn Bosley", "Lew Alcindor", "Tyrone Green",],
        answer: 1,
        photo:"assets/images/Lew.jpg",
         }, 
         {
        question: "Who was the #1 draft pick in 2003?",
        choice: ["Lebron James", "Carmelo Anthony", "Dwayne Wade",],
        answer: 0,
        photo: "assets/images/lebronJ.jpg"
        }, 
        {
        question: "What team drafted Kobe Bryant?",
        choice: ["Los Angeles Lakers", "Charlotte Hornets", "Seattle Super Sonics",],
        answer: 1,
        photo: "assets/images/hornets.jpg",
        }, 
        {
        question: "What player has the most career assists?",
        choice: ["John Stockton", "Gary Payton", "Jason Kidd",],
        answer: 0,
        photo: "assets/images/JStockton.jpg"
        }, 
       ];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //stop timer
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
   
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        userGuess = parseInt($(this).attr("data-guessvalue")); 
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img class='answerImage' src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen when questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })


