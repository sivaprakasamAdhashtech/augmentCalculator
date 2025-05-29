import { useState } from 'react'
import '../styles/Login.css'

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateMobileNumber = (mobile) => {
    // Check if mobile number is exactly 10 digits
    const mobileRegex = /^[0-9]{10}$/
    return mobileRegex.test(mobile)
  }

  const validatePassword = (password) => {
    // Password should be at least 6 characters
    return password.length >= 6
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // For mobile number, only allow digits and limit to 10 characters
    if (name === 'mobileNumber') {
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10)
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = {}

    // Validate mobile number
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required'
    } else if (!validateMobileNumber(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be exactly 10 digits'
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Simulate login process
    setIsLoading(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, accept any valid mobile/password combination
      onLogin({
        mobileNumber: formData.mobileNumber,
        isAuthenticated: true
      })
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to access your calculator</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="mobileNumber" className="form-label">
              Mobile Number
            </label>
            <div className="input-wrapper">
              <span className="country-code">+91</span>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Enter 10-digit mobile number"
                className={`form-input ${errors.mobileNumber ? 'error' : ''}`}
                maxLength="10"
              />
            </div>
            {errors.mobileNumber && (
              <div className="error-message">
                {errors.mobileNumber}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={`form-input ${errors.password ? 'error' : ''}`}
            />
            {errors.password && (
              <div className="error-message">
                {errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo credentials: Any 10-digit mobile number + password (6+ chars)</p>
        </div>
      </div>
    </div>
  )
}

export default Login
