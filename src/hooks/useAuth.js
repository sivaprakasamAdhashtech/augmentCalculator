import { useState, useEffect } from 'react'
import { getSession, clearSession, login as authLogin, logout as authLogout } from '../utils/auth'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const session = getSession()
    if (session) {
      setUser(session)
    }
    setLoading(false)
  }, [])

  const login = async (mobile, otp) => {
    try {
      const userData = await authLogin(mobile, otp)
      setUser(userData)
      return { success: true, user: userData }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    authLogout()
    setUser(null)
  }

  const isAuthenticated = () => {
    return user && user.isAuthenticated
  }

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: isAuthenticated()
  }
}
