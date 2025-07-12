document.addEventListener('DOMContentLoaded',()=>{
    const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  const startBtn = document.getElementById('start-btn')
  const restartBtn = document.getElementById('restart-btn')
  const nextBtn = document.getElementById('next-btn')
  const questionContainer = document.getElementById('question-container')
  const questionText = document.getElementById('question-text')
  const choicesList = document.getElementById('choices-list')
  const scoreDisplay = document.getElementById('score')
  const resultContainer = document.getElementById('result-container')

  let currQuestionIndex = -1
  let score = 0

  // Event listener for the start button
  startBtn.addEventListener('click',(event)=>{
    questionContainer.classList.remove('hidden')

    // Hide the start button
    startBtn.classList.add('hidden')

    playQuiz()
  })

  // displays the quiz question and choices
  function playQuiz(){
    currQuestionIndex += 1

    if (currQuestionIndex === questions.length){
        endQuiz()
    }
    else{
        // Show the next button
        nextBtn.classList.remove('hidden')

        // Update the questionText
        questionText.innerText = questions[currQuestionIndex].question
        
        // Update the choices after removing previous choices
        choicesList.innerHTML = ""

        questions[currQuestionIndex].choices.forEach((choice)=>{
            const li = document.createElement('li')
            li.innerText = choice
            choicesList.appendChild(li)
        })

    }
  }

    // Event listener for the choices in the quiz game
    choicesList.addEventListener('click',(event)=>{
            choiceText = event.target.innerText

            if (choiceText === questions[currQuestionIndex].answer){
                score += 1
            }
    })
    
    // Event listener for the next button
    nextBtn.addEventListener('click',(event)=>{
        // Play the quiz game
        playQuiz()
    })

  function endQuiz(){
        // Hide the question container
        questionContainer.classList.add('hidden')

        // Show the result container
        resultContainer.classList.remove('hidden')

        // Display the score
        scoreDisplay.innerText = `${score}/${questions.length}`;
  }

  // Event listener for restart Button
  restartBtn.addEventListener('click',(event)=>{
    // Reset the index of the questions array
    currQuestionIndex = -1
    // Reset the score
    score = 0
    
    // Hide the result container
    resultContainer.classList.add('hidden')

    // Show the start button
    startBtn.classList.remove('hidden')
  })

})