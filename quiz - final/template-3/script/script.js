const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('#tryAgain-btn');
const goHomeBtn = document.querySelector('#goHome-btn');
const timeCount = document.querySelector(".time");
let counter;

// if Start Quiz button clicked
startBtn.onclick= () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

// if Return button clicked
exitBtn.onclick= () => {
    popupInfo.classList.remove('active');   //hide info box
    main.classList.remove('active');        
}

// if Continue button clicked
continueBtn.onclick = ()=>{
    quizSection.classList.add('active');   //show quiz box
    popupInfo.classList.remove('active');  //hide info box
    main.classList.remove('active');
    quizBox.classList.add('active');       //show quiz box

    showQuestions(0);
    questionCounter(1);
    headerScore();
    startTimer(30);

    skipBtn.classList.add('active');
}

// if Try again button clicked
tryAgainBtn.onclick= () => {
    quizBox.classList.add('active');        //hide info box
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb=1;
    userScore=0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
    clearInterval(counter);
    startTimer(30);
    
    headerScore();
}

// if Home button clicked
goHomeBtn.onclick= () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb=1;
    userScore=0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
    
    headerScore();
}

let questionCount = 0;
let questionNumb=1;
let userScore=0;

const skipBtn=document.querySelector('.skip-btn');

skipBtn.onclick=() => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions (questionCount);
        questionNumb++;
        questionCounter (questionNumb);
        clearInterval(counter);
        startTimer(30);

        nextBtn.classList.remove('active');
        skipBtn.classList.add('active');
    }
    else {
        clearInterval(counter);
        showResult();
    }
}


const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions (questionCount);
        questionNumb++;
        questionCounter (questionNumb);
        startTimer(30);

        nextBtn.classList.remove('active');
        skipBtn.classList.add('active');
    }
    else {
        showResult();
    }
}

const optionList = document.querySelector('.option-list');

// getting questions and options from array
function showQuestions (index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `Q. ${questions[index].question}`;

    let optionTag = `<div class="option"><span class="select-option">${questions[index].options[0]}</span><span class="explan"></span></div>
        <div class="option"><span class="select-option">${questions [index].options[1]}</span><span class="explan"></span></div>
        <div class="option"><span class="select-option">${questions [index].options[2]}</span><span class="explan"></span></div>
        <div class="option"><span class="select-option">${questions [index].options[3]}</span><span class="explan"></span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected (answer) {
    clearInterval(counter);
    let userAnswer;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if(answer==null){
        for (let i = 0 ; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].textContent=questions[questionCount].explan;
                optionList.children[i].setAttribute('class','option correct');
            }
        }
    }

    else{
        userAnswer=answer.textContent;
        if (userAnswer == correctAnswer) {
            answer.textContent = questions[questionCount].explan;
            answer.classList.add('correct');
            userScore++;
            headerScore();
        }
        else {
            answer.classList.add('incorrect');
            answer.textContent+=" ✘";
    
            //if answer incorrect,auto select correct answer
            for (let i = 0 ; i < allOptions; i++) {
                if (optionList.children[i].textContent == correctAnswer) {
                    optionList.children[i].textContent=questions[questionCount].explan;
                    optionList.children[i].setAttribute('class','option correct');
                }
            }
        }
    }

    // if user has selected, disable all options
    for(let i=0;i<allOptions;i++){
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
    skipBtn.classList.remove('active');
}

function questionCounter (index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent=`Score: ${userScore} / ${questions.length}`;
}

function showResult(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score is ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length)* 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(rgb(0 176 196) ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;   //changing the value of timeCount with time value
        time--;                         //decrement the time value

        if(time < 0){                           //if timer is less than 0
            clearInterval(counter);            //clear counter
            timeCount.textContent = "Time Off"; //change the time text to time off
            optionSelected();
        }
    }
}
