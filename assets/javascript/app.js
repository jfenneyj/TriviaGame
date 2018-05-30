$(document).ready(function(){




var questionList = [ {
  question: "In Sleeping Beauty, who was Princess Aurora betrothed to?",
  choices: ["Prince Phillip", "Prince Charles", "Prince Henry", "Prince William"],
  indexAnswer: 0,
  photo: "assets/images/princephillip_250.gif"
}, {
  question: "In The Little Mermaid, what was the name of the human that Ariel falls in love with?",
  choices: ["King Triton", "Prince Sebastian ", "Prince Eric", "Prince Louis"],
  indexAnswer: 2,
  photo: "assets/images/princeeric.gif"
}, {
  question: "What is the name of the animated science fiction comedy-dram film released in 2002 about a Hawaiian girl and her unusual pet?",
  choices: ["Ellen & Froggy", "Attina & Scuttle", "Ariel & Hammy", "Lilo & Stitch"],
  indexAnswer: 3,
  photo: "assets/images/Lilo-stitch.gif"
}, {
  question: "In Beauty and the Beast, what is the name of Gaston's bumbling sidekick?",
  choices: ["CandleStick", "LeFou", "Bummbles", "McFarley"],
  indexAnswer: 1,
  photo: "assets/images/Lefou.gif"
}, {
  question: "What was the name of the kleptomaniac monkey in the Disney movie Aladdin?",
  choices: ["Klepto", "MooMoo", "Abu", "Kantar"],
  indexAnswer: 2,
  photo: "assets/images/abu.gif"
}, {
  question: "In which US city was Walt Disney born?",
  choices: ["Illinois", "Maui", "Miami", "Los Angeles"],
  indexAnswer: 0,
  photo: "assets/images/Disney.gif"
}, {
  question: "What are the names of the three fairies in the Disney classic Sleeping Beauty",
  choices: ["Attina, Aquata, Ursala", "Flora, Fauna and Merryweather", "Hilo, Milo and Dingo", "Aerwyna, Ailsa and Aine"],
  indexAnswer: 1,
  photo: "assets/images/flora-fauna-merryweather.gif"
},

];

/*
 1. click start button to activate game hide reset button
 2. start timer for 20 second and add question 1 to screen with possible answers.
 3. if/else statements for both timer and possible answers
 4. set up images to be display if answers are correct / set Incorrect answer text with the correct answer text.
 5. move on the next question and possible answers
 6. when all question are answers display count of how many were right
*/

var correctCount = 0;
var wrongCount = 0;
var timer = 20;
var userAnswer = "";
var timerId;
var running = false;
var currentQuestion = 0;



// hide elements until called 
$("#reset").hide();
$("img").hide();
$("#next").hide();
$("input").hide();

//click start button to begin game
$("#start").on("click", function(){

// alert("I've been clicked, press okay and then I'm hidden");
    $("#start").hide();
    displayQuestion(0);
    runTimer();
  $("input").on("click", function(event){
    if (questionList[currentQuestion].indexAnswer == $(this).val()){
      correctCount++;
      $("img").attr("src", questionList[currentQuestion].photo)
      $("img").show();
      console.log("correct");
    } else {
      var correctAnswerIndex = questionList[currentQuestion].indexAnswer;
      var correctAnswerText = questionList[currentQuestion].choices[correctAnswerIndex];
      $("#correctAnswer").text("The correct answer is " + correctAnswerText);
      $("#correctAnswer").show();
      wrongCount++;
    }
    $("#next").show();
  });
  $("#next").on("click", function(){
    currentQuestion++;
    timer = 20;
    displayQuestion(currentQuestion);
  })
  $("#reset").on("click", function(){
    currentQuestion = 0;
    timer = 20;
    correctCount = 0;
    wrongCount = 0;
    displayQuestion(currentQuestion)
    runTimer();
    $("#numberCorrect").hide();
    $("#numberWrong").hide();
    $("#timerCt").show();
    $("#reset").hide();
    $("#containInput").show();
  })
    
})

//timer start
function runTimer(){
    if (!running){
      timerId = setInterval(decrement, 1000);
      running = true;
    }
}

//timer countdown
function decrement(){
  timer--;
  $("#timerCt").html("<h3>Time Remaining: " + timer + "<h3>");
  
//stop timer if reach 0
  if(timer === 0) {
    currentQuestion++;
    displayQuestion(currentQuestion);
    timer = 20;
    
  } 
    
}
//display & hide questions

function displayQuestion (i){
  $("img").hide();
  $("#next").hide();
  $("#correctAnswer").hide();
  $("input").show();
  $("input").prop("checked", false);

//statements
  if (questionList.length == i+1){
    $("#numberCorrect").text("You got this many correct: " + correctCount).show();
    $("#numberWrong").text("You got this many wrong: " + wrongCount).show();
    $("#reset").show();
    clearInterval(timerId);
    $("#timerCt").hide();
    running = false;
    $("#containInput").hide();
  }
  //for loop question & answers
  $("#questions").text(questionList[i].question);
   for (var j= 0; j < 4; j++){
    $("label[for=choice" + j + "]").text(questionList[i].choices[j]);
    $("input#choice" + j).attr("value", j);
   }

}























});