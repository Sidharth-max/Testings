
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ClassComponentExample from './ClassComponentExample'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Rizz</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      
      <hr style={{ margin: '40px 0' }} />
      
      {/* Class Component Example */}
      <ClassComponentExample userName="Sidharth" />
    </>
  )
}

export default App
