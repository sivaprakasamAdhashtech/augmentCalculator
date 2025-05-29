import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../Login'

describe('Login Component', () => {
  const mockOnLogin = vi.fn()

  beforeEach(() => {
    mockOnLogin.mockClear()
    vi.clearAllTimers()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  describe('Rendering', () => {
    it('renders login form', () => {
      render(<Login onLogin={mockOnLogin} />)
      
      expect(screen.getByText('Welcome Back')).toBeInTheDocument()
      expect(screen.getByText('Sign in to access your calculator')).toBeInTheDocument()
      expect(screen.getByLabelText('Mobile Number')).toBeInTheDocument()
      expect(screen.getByLabelText('Password')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    })

    it('renders country code prefix', () => {
      render(<Login onLogin={mockOnLogin} />)
      expect(screen.getByText('+91')).toBeInTheDocument()
    })

    it('renders demo credentials info', () => {
      render(<Login onLogin={mockOnLogin} />)
      expect(screen.getByText(/demo credentials/i)).toBeInTheDocument()
    })

    it('has correct form structure', () => {
      render(<Login onLogin={mockOnLogin} />)
      const form = screen.getByRole('form') || document.querySelector('form')
      expect(form).toBeInTheDocument()
    })
  })

  describe('Input Validation', () => {
    it('validates mobile number format', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Login onLogin={mockOnLogin} />)
      
      const mobileInput = screen.getByLabelText('Mobile Number')
      await user.type(mobileInput, '123')
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      await user.click(submitButton)
      
      expect(screen.getByText('Mobile number must be exactly 10 digits')).toBeInTheDocument()
    })

    it('validates mobile number length', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Login onLogin={mockOnLogin} />)
      
      const mobileInput = screen.getByLabelText('Mobile Number')
      await user.type(mobileInput, '12345678901') // 11 digits
      
      // Should be truncated to 10 digits
      expect(mobileInput.value).toBe('1234567890')
    })

    it('only allows numeric input for mobile number', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Login onLogin={mockOnLogin} />)
      
      const mobileInput = screen.getByLabelText('Mobile Number')
      await user.type(mobileInput, 'abc123def456')
      
      expect(mobileInput.value).toBe('123456')
    })

    it('validates password minimum length', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Login onLogin={mockOnLogin} />)
      
      const passwordInput = screen.getByLabelText('Password')
      await user.type(passwordInput, '123')
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      await user.click(submitButton)
      
      expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument()
    })

    it('requires mobile number', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Login onLogin={mockOnLogin} />)
      
      const passwordInput = screen.getByLabelText('Password')
      await user.type(passwordInput, 'password123')
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      await user.click(submitButton)
      
      expect(screen.getByText('Mobile number is required')).toBeInTheDocument()
    })

    it('requires password', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Login onLogin={mockOnLogin} />)
      
      const mobileInput = screen.getByLabelText('Mobile Number')
      await user.type(mobileInput, '9876543210')
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      await user.click(submitButton)
      
      expect(screen.getByText('Password is required')).toBeInTheDocument()
    })
  })

  describe('Real-time Validation', () => {
    it('clears errors when user starts typing', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Login onLogin={mockOnLogin} />)
      
      // Trigger validation error
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      await user.click(submitButton)
      
      expect(screen.getByText('Mobile number is required')).toBeInTheDocument()
      
      // Start typing to clear error
      const mobileInput = screen.getByLabelText('Mobile Number')
      await user.type(mobileInput, '9')
      
      expect(screen.queryByText('Mobile number is required')).not.toBeInTheDocument()
    })

    it('validates mobile number in real-time', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Login onLogin={mockOnLogin} />)
      
      const mobileInput = screen.getByLabelText('Mobile Number')
      
      // Type invalid length
      await user.type(mobileInput, '123')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      await user.click(submitButton)
      
      expect(screen.getByText('Mobile number must be exactly 10 digits')).toBeInTheDocument()
      
      // Complete the number
      await user.type(mobileInput, '4567890')
      await user.click(submitButton)
      
      expect(screen.queryByText('Mobile number must be exactly 10 digits')).not.toBeInTheDocument()
    })
  })

  describe('Form Submission', () => {
    it('submits form with valid credentials', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Login onLogin={mockOnLogin} />)
      
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      // Fast-forward through the loading delay
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(mockOnLogin).toHaveBeenCalledWith({
          mobileNumber: '9876543210',
          isAuthenticated: true
        })
      })
    })

    it('shows loading state during submission', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Login onLogin={mockOnLogin} />)
      
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      expect(screen.getByText('Signing In...')).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
    })

    it('prevents multiple submissions', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Login onLogin={mockOnLogin} />)
      
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      
      await user.click(submitButton)
      await user.click(submitButton) // Second click should be ignored
      
      expect(submitButton).toBeDisabled()
    })
  })

  describe('Accessibility', () => {
    it('has proper form labels', () => {
      render(<Login onLogin={mockOnLogin} />)
      
      expect(screen.getByLabelText('Mobile Number')).toBeInTheDocument()
      expect(screen.getByLabelText('Password')).toBeInTheDocument()
    })

    it('has proper input types', () => {
      render(<Login onLogin={mockOnLogin} />)
      
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      
      expect(mobileInput).toHaveAttribute('type', 'tel')
      expect(passwordInput).toHaveAttribute('type', 'password')
    })

    it('has proper placeholders', () => {
      render(<Login onLogin={mockOnLogin} />)
      
      expect(screen.getByPlaceholderText('Enter 10-digit mobile number')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Login onLogin={mockOnLogin} />)
      
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      mobileInput.focus()
      expect(mobileInput).toHaveFocus()
      
      await user.tab()
      expect(passwordInput).toHaveFocus()
      
      await user.tab()
      expect(submitButton).toHaveFocus()
    })
  })

  describe('Error Handling', () => {
    it('displays validation errors with proper styling', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Login onLogin={mockOnLogin} />)
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      await user.click(submitButton)
      
      const mobileError = screen.getByText('Mobile number is required')
      const passwordError = screen.getByText('Password is required')
      
      expect(mobileError).toHaveClass('error-message')
      expect(passwordError).toHaveClass('error-message')
    })

    it('applies error styling to inputs', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Login onLogin={mockOnLogin} />)
      
      const mobileInput = screen.getByLabelText('Mobile Number')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.click(submitButton)
      
      expect(mobileInput).toHaveClass('error')
    })
  })

  describe('Edge Cases', () => {
    it('handles undefined onLogin prop', () => {
      expect(() => {
        render(<Login onLogin={undefined} />)
      }).not.toThrow()
    })

    it('handles form submission with Enter key', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Login onLogin={mockOnLogin} />)
      
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      await user.keyboard('{Enter}')
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(mockOnLogin).toHaveBeenCalled()
      })
    })

    it('handles rapid input changes', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Login onLogin={mockOnLogin} />)
      
      const mobileInput = screen.getByLabelText('Mobile Number')
      
      await user.type(mobileInput, '1234567890')
      await user.clear(mobileInput)
      await user.type(mobileInput, '9876543210')
      
      expect(mobileInput.value).toBe('9876543210')
    })
  })
})
