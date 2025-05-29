import { useState } from 'react'
import Calculator from './components/Calculator'
import Login from './components/Login'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>React Calculator</h1>
        <div className="user-info">
          <span>Welcome, +91 {user.mobileNumber}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
      <Calculator />
    </div>
  )
}

export default App
