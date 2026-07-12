import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0);
  let myObj = {      // declaration of object
    username: "Mask",
    age: 21
  };

  let arr = [1, 2, 3];   // declaration of array

  return (
    <>
    <h1 className='bg-green-400 text-black p-4 rounded-xl'>TAILWIND TEST</h1>
    <Card username="chaiaurcode" />
    <Card />

    </>
  )
}

export default App
