// Random number
function random_number() {
    var random = Math.random() * 4;
    var no = Math.floor(random);
    return no;
}

let buttoncolors = ["red", "green", "yellow", "blue"];
let computer_btn = [];
let user_clicks = [];
let level = 0;
let started = false;

// Start game on key press
$(document).on("keydown", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        agla_click();
        started = true;
    }
});

// User clicks button
$(".btn").on("click", function () {
    var user_click = $(this).attr("id");
    user_clicks.push(user_click);

    playSound(user_click);
    animatePress(user_click);

    checkAnswer(user_clicks.length - 1);
});

// Next sequence
function agla_click() {
    user_clicks = []; // reset user clicks for this round
    level++;
    $("#level-title").text("Level " + level);

    var randomIndex = random_number();
    var randomColor = buttoncolors[randomIndex];
    computer_btn.push(randomColor);

    // Show animation + sound
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

// Check user answer
function checkAnswer(currentLevel) {
    if (computer_btn[currentLevel] === user_clicks[currentLevel]) {
        if (user_clicks.length === computer_btn.length) {
            // agar pura sequence sahi ho gaya → next round
            setTimeout(function () {
                agla_click();
            }, 1000);
        }
    } else {
        // Galti ho gayi
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// Restart game
function startOver() {
    level = 0;
    computer_btn = [];
    started = false;
}

// Sound function
function playSound(name) {
    var audio = new Audio("assets/sounds/" + name + ".mp3");
    audio.play();
}

// Button animation
function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}

