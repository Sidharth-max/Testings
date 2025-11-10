
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Usercomponent from './Usercomponent'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
     
        
        {/* User Registration Form */}
        <Usercomponent />
        
    
    </div>
  )
}

export default App
