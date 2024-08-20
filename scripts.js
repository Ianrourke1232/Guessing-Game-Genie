document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const startButton = document.getElementById('startButton');
    const questionElement = document.getElementById('question');
    const genieGuessElement = document.getElementById('genieGuess');
    const statusElement = document.getElementById('status');
    const gameContainer = document.getElementById('game');

    let currentQuestionIndex = 0;
    let isFinalGuess = false;
    let possibleAnswers = [];
    let questionPath = [];

    const questions = [
        { text: "Is it a living thing?", category: "living" },
        { text: "Is it a mammal?", category: "mammal", parentCategory: "living" },
        { text: "Is it a device?", category: "device" },
        { text: "Is it something you find at home?", category: "home" },
        { text: "Is it a famous person?", category: "famous" },
    ];

    const finalGuesses = [
        { text: "Is it a cat?", category: "mammal" },
        { text: "Is it a dog?", category: "mammal" },
        { text: "Is it a smartphone?", category: "device" },
        { text: "Is it a vacuum cleaner?", category: "home" },
        { text: "Is it a celebrity?", category: "famous" },
    ];

    function startGame() {
        currentQuestionIndex = 0;
        isFinalGuess = false;
        questionPath = [];
        possibleAnswers = [...finalGuesses];
        statusElement.textContent = "The Genie is thinking...";
        startButton.style.display = 'none';
        gameContainer.style.display = 'block';
        askQuestion();
    }

    function askQuestion() {
        if (possibleAnswers.length === 1) {
            makeFinalGuess();
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.text;
    }

    function makeFinalGuess() {
        const guess = possibleAnswers[0];
        questionElement.textContent = guess.text;
        genieGuessElement.textContent = "I think I know what it is!";
        isFinalGuess = true;
    }

    function filterAnswers(isYes) {
        const currentQuestion = questions[currentQuestionIndex];

        questionPath.push({ question: currentQuestion.text, answer: isYes });

        if (isYes) {
            possibleAnswers = possibleAnswers.filter(guess => guess.category === currentQuestion.category);
        } else {
            possibleAnswers = possibleAnswers.filter(guess => guess.category !== currentQuestion.category);
        }

        if (possibleAnswers.length === 0) {
            questionElement.textContent = "Hmm... I'm stumped!";
            genieGuessElement.textContent = "I couldn't guess it. You win!";
            statusElement.textContent = "Try again with a different object!";
            yesButton.disabled = true;
            noButton.disabled = true;
            return;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length || possibleAnswers.length === 1) {
            makeFinalGuess();
        } else {
            askQuestion();
        }
    }

    yesButton.addEventListener('click', () => {
        if (isFinalGuess) {
            genieGuessElement.textContent = "I guessed it!";
            statusElement.textContent = "You were thinking of " + possibleAnswers[0].text;
            yesButton.disabled = true;
            noButton.disabled = true;
        } else {
            filterAnswers(true);
        }
    });

    noButton.addEventListener('click', () => {
        if (isFinalGuess) {
            genieGuessElement.textContent = "I was wrong!";
            statusElement.textContent = "I couldn't guess it. You win!";
            yesButton.disabled = true;
            noButton.disabled = true;
        } else {
            filterAnswers(false);
        }
    });

    startButton.addEventListener('click', startGame);
});
