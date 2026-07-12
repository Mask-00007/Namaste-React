import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  // This code session is purely based on the hooks concept.
  // Bascially, let [counter, setCounter] = useState(15);
  // Here you’re using the useState hook.
  // useState is a special React function that lets you add state (data that changes over time) to functional components.
  // It returns an array with two values:
  // counter → the current state value (initially 15).
  // setCounter → a function to update that state

  let [counter, setCounter] = useState(15);
  //let counter = 15;

  const addValue = () => {
    //counter = counter + 1;
    if (counter === 20) {
      return;
    }
    setCounter(counter + 1);
  };
  const removeValue = () => {
    //counter = counter + 1;
    if ( counter === 0) {
      return;
    }
    setCounter(counter - 1);
  };
  

  return (
    <>
      <h1>Chai aur react</h1>
      <h2>Counter value: {counter} </h2>

      <button onClick={addValue}>ADD VALUE</button>
      <br />
      <button onClick={removeValue}>REMOVE VALUE</button>
    </>
  )
}

export default App
