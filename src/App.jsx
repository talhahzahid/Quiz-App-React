import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [question, setQuestion] = useState([]);
  const [questionState , setQuestionState] = useState(0)

  const checkedInput = useRef([]);
  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions")
      .then((res) => {
        console.log(res.data)
        setQuestion(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }, [])


  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array;
  }

  function nextQuestion (index){
    const checkedButton = checkedInput.current.find(input => input.checked);
    if (checkedButton) {
      const selectedValue = checkedButton.value;
      console.log("Slected Value:", selectedValue);

    }


    questionState < question.length - 1 ? setQuestionState(questionState + 1) : alert("Question Compeleted")

  }

  return (
    <>
      <h1 className='text-center text-4xl'>Quiz App</h1>
      {question.length > 0 ? <div>
        <h1 className='text-center mt-5'>Q{questionState + 1}: {question[questionState].question.text}</h1>
        <ul className='text-center mt-5'>
          {shuffleArray([...question[questionState].incorrectAnswers , question[questionState].correctAnswer]).map((item , index)=>{
            return <p key={index}>
            <input type="radio" name='choice' id={item} value={item} ref={el => (checkedInput.current[index] = el)}/>
            <label htmlFor={item}>{item}</label>
          </p>
          
          })}
        <button className='mt-4 border border-sky-500 w-[10rem] bg-cyan-500 hover:bg-cyan-600 ' onClick={()=> nextQuestion()}> Done </button>
        </ul>
      </div> : <h1>Loading...</h1>}
    </>
  )
}

export default App
