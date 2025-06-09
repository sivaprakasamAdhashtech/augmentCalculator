// Authentication utility functions

const STORAGE_KEY = 'auth_session'

// Static credentials from environment variables
export const STATIC_CREDENTIALS = {
  mobile: import.meta.env.VITE_STATIC_MOBILE || '+1 9999999999',
  otp: import.meta.env.VITE_STATIC_OTP || '123456'
}

// Session management
export const saveSession = (userData) => {
  try {
    const sessionData = {
      ...userData,
      timestamp: Date.now(),
      isAuthenticated: true
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData))
    console.log('Session saved:', sessionData)
    return true
  } catch (error) {
    console.error('Failed to save session:', error)
    return false
  }
}

export const getSession = () => {
  try {
    const sessionData = localStorage.getItem(STORAGE_KEY)
    if (!sessionData) return null
    
    const parsed = JSON.parse(sessionData)
    
    // Check if session is still valid (24 hours)
    const isExpired = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000
    if (isExpired) {
      clearSession()
      return null
    }
    
    return parsed
  } catch (error) {
    console.error('Failed to get session:', error)
    clearSession()
    return null
  }
}

export const clearSession = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    console.log('Session cleared')
    return true
  } catch (error) {
    console.error('Failed to clear session:', error)
    return false
  }
}

export const isAuthenticated = () => {
  const session = getSession()
  return session && session.isAuthenticated
}

// Login validation
export const validateCredentials = (mobile, otp) => {
  console.log('Login attempt:', { mobile, otp })
  
  const isValidMobile = mobile === STATIC_CREDENTIALS.mobile
  const isValidOtp = otp === STATIC_CREDENTIALS.otp
  
  const result = {
    isValid: isValidMobile && isValidOtp,
    errors: {}
  }
  
  if (!isValidMobile) {
    result.errors.mobile = 'Invalid mobile number'
  }
  
  if (!isValidOtp) {
    result.errors.otp = 'Invalid OTP'
  }
  
  console.log('Validation result:', result)
  return result
}

// Simulate login process
export const login = async (mobile, otp) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const validation = validateCredentials(mobile, otp)
      
      if (validation.isValid) {
        const userData = {
          mobile,
          loginTime: new Date().toISOString()
        }
        
        if (saveSession(userData)) {
          resolve(userData)
        } else {
          reject(new Error('Failed to save session'))
        }
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 1500) // Simulate network delay
  })
}

// Logout function
export const logout = () => {
  clearSession()
  console.log('User logged out')
}
