import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useTimer } from '../hooks/useTimer'
import { STATIC_CREDENTIALS } from '../utils/auth'
import Input from './ui/Input'
import Button from './ui/Button'

const Login = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const { timeLeft, isFinished, startTimer } = useTimer(30)

  const [formData, setFormData] = useState({
    mobileNumber: STATIC_CREDENTIALS.mobile,
    otp: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showOtpField, setShowOtpField] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true })
    }
  }, [isAuthenticated, navigate])

  // Start timer when OTP field is shown
  useEffect(() => {
    if (showOtpField) {
      startTimer()
    }
  }, [showOtpField, startTimer])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleMobileSubmit = (e) => {
    e.preventDefault()

    if (!formData.mobileNumber) {
      setErrors({ mobileNumber: 'Mobile number is required' })
      return
    }

    if (formData.mobileNumber !== STATIC_CREDENTIALS.mobile) {
      setErrors({ mobileNumber: 'Invalid mobile number' })
      return
    }

    setShowOtpField(true)
    setErrors({})
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()

    if (!formData.otp) {
      setErrors({ otp: 'OTP is required' })
      return
    }

    if (formData.otp.length !== 6) {
      setErrors({ otp: 'OTP must be 6 digits' })
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const result = await login(formData.mobileNumber, formData.otp)

      if (result.success) {
        navigate('/home', { replace: true })
      } else {
        setErrors({ general: result.error || 'Invalid credentials. Please try again.' })
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = () => {
    console.log('Resend OTP clicked - simulating resend')
    startTimer()
    setFormData(prev => ({ ...prev, otp: '' }))
    setErrors({})
  }

  const handleBackToMobile = () => {
    setShowOtpField(false)
    setFormData(prev => ({ ...prev, otp: '' }))
    setErrors({})
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {showOtpField ? 'Verify OTP' : 'Welcome Back'}
            </h1>
            <p className="text-gray-600">
              {showOtpField
                ? `Enter the OTP sent to ${formData.mobileNumber}`
                : 'Sign in to access your calculator'
              }
            </p>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-slide-up">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          {/* Mobile Number Form */}
          {!showOtpField && (
            <form onSubmit={handleMobileSubmit} className="space-y-6">
              <Input
                label="Mobile Number"
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
                error={errors.mobileNumber}
                className="text-lg"
                readOnly
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
              >
                Send OTP
              </Button>
            </form>
          )}

          {/* OTP Form */}
          {showOtpField && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <Input
                label="Enter OTP"
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="123456"
                error={errors.otp}
                maxLength="6"
                className="text-lg text-center tracking-widest"
                autoFocus
              />

              {/* Timer and Resend */}
              <div className="text-center">
                {!isFinished ? (
                  <p className="text-gray-600 text-sm">
                    Resend OTP in <span className="font-semibold text-blue-600">{timeLeft}s</span>
                  </p>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleResendOtp}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Resend OTP
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  loading={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Login'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackToMobile}
                  className="w-full"
                  disabled={isLoading}
                >
                  Back to Mobile Number
                </Button>
              </div>
            </form>
          )}

          {/* Demo Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <strong>Demo Credentials:</strong><br />
              Mobile: {STATIC_CREDENTIALS.mobile}<br />
              OTP: {STATIC_CREDENTIALS.otp}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
