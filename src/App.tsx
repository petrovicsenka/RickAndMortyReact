import Login from './pages/Login/Login'
import CharacterContent from './pages/CharacterContent/CharacterContent'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Favourites from './pages/Favourites/Favourites';

function App() {

  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/character" element={<CharacterContent />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App
