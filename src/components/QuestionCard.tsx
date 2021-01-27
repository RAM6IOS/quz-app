import { type } from 'os'
import React from 'react';
import {AnswerObject} from "../App"

type Props = {
  question:string;
  answers:string[];
  callback:(e:React.MouseEvent<HTMLButtonElement>)=> void;
  userAnswer:AnswerObject| undefined;
  questionNr:number;
  totalQuestions:number;


}

 const QustensCards: React.FC<Props>=({question, answers,callback,userAnswer,questionNr,totalQuestions})=> {
  return (
    <>
    <p>Question:{questionNr}/{totalQuestions}</p>
    <p dangerouslySetInnerHTML={{__html: question}}></p>
    <div>
      {
        answers.map((answer , index) => (
          <div key={index}>
            <button disabled={!!userAnswer} onClick={callback} value={answer}>
              <span dangerouslySetInnerHTML={{__html:answer}}></span>
            </button>
          </div>
        ))
      }

    </div>
<h1>QUZI APP</h1>
    </>
  )
}
export default QustensCards