import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from './components/Home'
import { Upload } from './components/Upload'
import { Capture } from './components/Capture'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/capture' element={<Capture />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
