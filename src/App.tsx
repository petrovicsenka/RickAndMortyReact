import Login from './pages/login/Login'
import CharacterContent from './pages/character-content/CharacterContent'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/character" element={<CharacterContent />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
