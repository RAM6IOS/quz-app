import React,{useState} from 'react';
import QuestionCard from "./components/QuestionCard";
import {Difficulty, fetchQuizQuestions,QuestionsState} from './Apis'

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string

}

 const TOTAL_QUESTIONS = 15;

function App() {

  const[loading,setLoading]=useState(false);
  const[questions , setQuestions]= useState<QuestionsState[]>([]);
  const [number , setNumber] = useState(0);
  const [userAnswers ,setUserAnswers]= useState<AnswerObject[]>([]);
  const [score , setScore]=useState(0);
  const [gameOver , setGameOver]= useState(true);


  console.log(questions)





  const startTrivia = async ()=> {
      console.log("hi");
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false)


  }
  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>)=>{
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }

  }

  const nextQuestion = () => {
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }

  }
  return (
    <>
    <h1>Quiz app</h1>
    {gameOver || userAnswers.length === TOTAL_QUESTIONS ?(
    <button onClick={
      startTrivia
    }>start</button>
  ) : null}
    {!gameOver ? <p>
      Score:
    </p> :null}
    {loading&& <p>Loding Qusetions...</p>}
    {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion} >
            Next Question
          </button>
        ) : null}

    </>
  );
}

export default App;
