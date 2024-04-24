import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './SignUp'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={ <SignUp/> }></Route>
                <Route path="/login" element={ <Login/> }></Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
