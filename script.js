const startButton = document.querySelector('.start-button');
const popupInfo = document.querySelector('.popup-info');
const exitButton = document.querySelector('.exit-button');
const continueButton = document.querySelector('.continue-button');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');

startButton.onclick = () => {
    popupInfo.classList.add('active');
}

exitButton.onclick = () => {
    popupInfo.classList.remove('active');
}

continueButton.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

let questionCount = 0;
let questionNumber = 1;
let userScore = 0;

const nextButton = document.querySelector('.next');

nextButton.onclick = () => {
    if(questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumber++;
        questionCounter(questionNumber);

        nextButton.classList.remove('active');
    }
    else{
        console.log('Question Completed');
    }
}

const optionList = document.querySelector('.option-list');

function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;
    
        optionList.innerHTML = optionTag;

        const option = document.querySelectorAll('.option');
        for(let i = 0; i < option.length; i++){
            option[i].setAttribute('onclick','optionSelected(this)');
        }
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;
    console.log(correctAnswer);
    if(userAnswer == correctAnswer){
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else{
        answer.classList.add('incorrect');
        for(let i = 0; i < allOptions; i++){
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class','option correct');
            }
        }
    }

    for(let i = 0; i < allOptions; i++){
        optionList.children[i].classList.add('disabled');
    }
    nextButton.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}