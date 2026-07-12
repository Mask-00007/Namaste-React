import { useState } from 'react'

import './App.css'

function App() {
 const [color, setColor] = useState("white");

  return (
//   <div className='w-full h-screen duration-200' style={{ backgroundColor: color }}>
//   <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
//     <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl'>
//       <button onClick={() => setColor("red")} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: "red"}}>RED</button>
//       <button onClick={() => setColor("green")} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: "green"}}>GREEN</button>
//       <button onClick={() => setColor("blue")} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: "blue"}}>BLUE</button>
//       <button onClick={() => setColor("#6b5b95")} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: "#6b5b95"}}>LAVENDER</button>
//       <button onClick={() => setColor("#ff1493")} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: "#ff1493"}}>PINK</button>
//     </div>
//   </div>
// </div>
    
   <div className='w-full h-screen duration-200' style={{ backgroundColor: color }}>
    <div className='fixed flex flex-col items-start gap-3 left-4 top-1/2 -translate-y-1/2'>
     <button onClick={() => setColor("red")} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: "red"}}>RED</button>
     <button onClick={() => setColor("green")} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: "green"}}>GREEN</button>
     <button onClick={() => setColor("blue")} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: "blue"}}>BLUE</button>
     <button onClick={() => setColor("#6b5b95")} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: "#6b5b95"}}>LAVENDER</button>
     <button onClick={() => setColor("#ff1493")} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: "#ff1493"}}>PINK</button>
    </div>
   </div>




  )
}

export default App
