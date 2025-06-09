import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Calculator from '../components/Calculator'
import Button from '../components/ui/Button'

const Home = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                React Calculator
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium text-gray-900">{user?.mobile}</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-gray-700 hover:text-gray-900"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Calculator App
            </h2>
            <p className="text-gray-600">
              Perform calculations with our beautiful calculator
            </p>
          </div>
          
          {/* Calculator Component */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <Calculator />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>Logged in at: {user?.loginTime ? new Date(user.loginTime).toLocaleString() : 'N/A'}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
