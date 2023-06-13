import { useState } from 'react'
import './App.css'
import Coords from './Components/Coords/Coords.jsx';

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <Coords />
    </>
  )
}

export default App
