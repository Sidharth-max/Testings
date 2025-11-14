
import { useState } from 'react'
// import Usercomponent from './Usercomponent'
import EmployeeComponent from './EmployeeComponent'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
        {/* Employee CRUD Component */}
        <EmployeeComponent />
    </div>
  )
}

export default App
