import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Portfolio from './components/Portfolio'
import './App.css'

function ReactApp() {
  return (
    <div>
      <h1>React App</h1>
      <p>This is the React app page. Go to <a href="/">/</a> to see the portfolio.</p>
    </div>
  )
}

function App() {
  return (
    <Router basename="/myweb/">
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/react-app" element={<ReactApp />} />
      </Routes>
    </Router>
  )
}

export default App
