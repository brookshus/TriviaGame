$(document).ready(function () {

//not sure how to do the hover for color over the choices

//create variable for question options and thiers answers
//makes questions objects with properties including choices, answer
var options = [
	{
		question: "Who never died in Buffy?", 
		choice: ["Anya", "Buffy", "Xander", "Tara"],
		answer: 2,
		photo: "assets/images/xander.jpeg"
	 },
	 {
	 	question: "What is the name of Oz's band ?", 
		choice: ["Flying monkeys", "Cool dudes", "Llamas Ate my Donkey", "Dingoes Ate My Baby"],
		answer: 3,
		photo: "assets/images/oz.jpeg"
	 }, 
	 {
	 	question: "Where did Buffy live before she came to Sunnydale?", 
		choice: ["Orange County", "Los Angeles", "Seattle", "San Diego" ],
		answer: 1,
		photo: "assets/images/LA.jpeg"
	}, 
	{
		question: "What gift does Angel give Buffy?", 
		choice: ["Information on The Master", "Silver Cross", "Mr. Pointy", "Holy Water" ],
		answer: 1,
		photo: "assets/images/cross.png"
	}, 
	{
		question: "Who's Darla?", 
		choice: ["Angel's Sire", "Buffy's Mother", "Spike's Sister", "Buffy's Classmate" ],
		answer: 0,
		photo: "assets/images/darla.jpg"
	}, 
	{
		question: "Where is the Hellmouth?", 
		choice: ["Under the Bronze", "In L.A.", "In the basement of the high school", "In another dimension" ],
		answer: 2,
		photo: "assets/images/hellmouth.jpeg"
	}, 
	{
		question: "How did Buffy die? (Season 1)", 
		choice: ["Angel killed her", "She was in a car wreck", "She was bitten by the Master", "She drowned" ],
		answer: 3,
		photo: "assets/images/drowned.jpg"
	}, 
	{
		question: "Who did Xander lose his virginity too?", 
		choice: ["Anya", "Faith", "Cordelia", "Willow" ],
		answer: 1,
		photo: "assets/images/faith.jpeg"
    },
    {
		question: " What is the name of Willow's second girlfriend?", 
		choice: ["Kennedy", "Louisa", "Charlie", "Tara" ],
		answer: 0,
		photo: "assets/images/kennedy.jpeg"
    }, 
    {
		question: "Who did Spike date after Drusilla dump him for a fungus demon in season 4?", 
		choice: ["Faith", "Gloria", "Harmony", "Buffy" ],
		answer: 2,
		photo: "assets/images/harmony.jpeg"
    }];
//rest of the variable
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
    
    //timers timers timers
    //hide the reset button
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
    //function for timer to start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //function to show timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //a way for the time to stop when it reaches 0 and not go negative like the one in class
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //function for timer to stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //a function to randomly select and display one of the questions in the array
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //need to us jquery to create a div for the answers
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
        //loop to display the choices 
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
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
    
    // This function appends the photos based on the correct answer
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //once the last question is done do a final tally
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
    //reset function
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

    