
import { BrowserRouter, Routes } from 'react-router-dom'

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<h1>Welcome to the React App</h1>} />
  </Routes>
  </BrowserRouter>
  )
}

export default App
