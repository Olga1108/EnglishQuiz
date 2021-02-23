const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit')
const createQuizBtn = document.getElementById('create_constructor')


 function buildQuiz(){
    
    const output = [];
  
    // перебираем вопросы
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
          const answers = []; 
  
        // перебираем ответы
        for(letter in currentQuestion.answers){
  
          // добавляем радио кнопку
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
         
        }
  
         output.push(
          `<div class="card">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join('')} </div>
           </div>`
        );
        setAnswersToLS(answers)
      
      }
    );
  
    quizContainer.innerHTML = output.join('');
    
  }
  const setAnswersToLS = (data) => {
    localStorage.setItem('answers', JSON.stringify(data));
  }
  const getAnswersLS = () => {
  const answersLS = JSON.parse(localStorage.getItem('answers'));
  if (answersLS) {
    answersLS.forEach((answer, index) => answers[index] = answer)
    }
  }


function showResults(){

    // контейнер для ответов
    const answerContainers = quizContainer.querySelectorAll('.answers');
  
    // счётчик правильных ответов
    let numCorrect = 0;
    
    // для каждого вопроса
    myQuestions.forEach( (currentQuestion, questionNumber) => {
  
      // находим выбранный ответ
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      const rightAnswer = currentQuestion.correctAnswer;
      
      // если ответ правильный
      if(userAnswer === rightAnswer){
        // то добавляем к правильным ответам
        numCorrect++;
  
        // и отмечаем зелёным
        answerContainers[questionNumber].style.color = 'green';
      }
      // если ответ не правильный, или не отмеченный 
      else  {
        
       // - тогда красный
        answerContainers[questionNumber].style.color = 'red';
        const correctAnswer = document.createElement('p');
        correctAnswer.innerText=`Correct answer is: ${rightAnswer}`
        answerContainers[questionNumber].appendChild(correctAnswer)
      }
    });
  
    // показываем результат
    let userTestResult = numCorrect >= 7 ? "passed" : "did not pass";
    resultsContainer.innerHTML = `<h4>You ${userTestResult} the test! <a href="#" class="test-again">Take the test again</a></h4>
                                  <h5>You scored ${numCorrect} out of ${myQuestions.length}</h5>`;

     document.querySelector('.test-again').onclick = (e) => {
       e.preventDefault();
       localStorage.removeItem('answers');
       location.reload();
     } 
}