import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllTimers()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  describe('Authentication Flow', () => {
    it('renders login component when user is not authenticated', () => {
      render(<App />)
      
      expect(screen.getByText('Welcome Back')).toBeInTheDocument()
      expect(screen.getByText('Sign in to access your calculator')).toBeInTheDocument()
      expect(screen.getByLabelText('Mobile Number')).toBeInTheDocument()
      expect(screen.getByLabelText('Password')).toBeInTheDocument()
    })

    it('does not render calculator when not authenticated', () => {
      render(<App />)
      
      expect(screen.queryByText('React Calculator')).not.toBeInTheDocument()
      expect(screen.queryByText('+')).not.toBeInTheDocument()
    })

    it('renders calculator after successful login', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Fill login form
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      // Fast-forward through login delay
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
        expect(screen.getByText('+')).toBeInTheDocument()
        expect(screen.queryByText('Welcome Back')).not.toBeInTheDocument()
      })
    })

    it('shows user info after login', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Login process
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('Welcome, +91 9876543210')).toBeInTheDocument()
      })
    })

    it('shows logout button after login', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Login process
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('Logout')).toBeInTheDocument()
      })
    })
  })

  describe('Logout Functionality', () => {
    it('returns to login screen after logout', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Login first
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
      })
      
      // Now logout
      const logoutButton = screen.getByText('Logout')
      await user.click(logoutButton)
      
      expect(screen.getByText('Welcome Back')).toBeInTheDocument()
      expect(screen.queryByText('React Calculator')).not.toBeInTheDocument()
    })

    it('clears user session on logout', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Login
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('Welcome, +91 9876543210')).toBeInTheDocument()
      })
      
      // Logout
      const logoutButton = screen.getByText('Logout')
      await user.click(logoutButton)
      
      expect(screen.queryByText('Welcome, +91 9876543210')).not.toBeInTheDocument()
    })
  })

  describe('Calculator Integration', () => {
    it('calculator works after login', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Login
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
      })
      
      // Test calculator functionality
      await user.click(screen.getByText('5'))
      await user.click(screen.getByText('+'))
      await user.click(screen.getByText('3'))
      await user.click(screen.getByText('='))
      
      expect(screen.getByText('8')).toBeInTheDocument()
    })

    it('maintains calculator state during session', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Login
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
      })
      
      // Perform calculation
      await user.click(screen.getByText('1'))
      await user.click(screen.getByText('2'))
      await user.click(screen.getByText('3'))
      
      expect(screen.getByText('123')).toBeInTheDocument()
      
      // State should persist (no re-render of calculator)
      expect(screen.getByText('123')).toBeInTheDocument()
    })
  })

  describe('Responsive Layout', () => {
    it('renders header with proper layout', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Login to see header
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        const header = document.querySelector('.app-header')
        expect(header).toBeInTheDocument()
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
        expect(screen.getByText('Welcome, +91 9876543210')).toBeInTheDocument()
        expect(screen.getByText('Logout')).toBeInTheDocument()
      })
    })

    it('has proper CSS classes', () => {
      render(<App />)
      
      const app = document.querySelector('.app')
      expect(app).toBeInTheDocument()
      expect(app).toHaveClass('app')
    })
  })

  describe('Error Handling', () => {
    it('handles login errors gracefully', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Try to submit with invalid data
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      await user.click(submitButton)
      
      // Should show validation errors, not crash
      expect(screen.getByText('Mobile number is required')).toBeInTheDocument()
      expect(screen.getByText('Password is required')).toBeInTheDocument()
    })

    it('handles rapid login/logout cycles', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      for (let i = 0; i < 3; i++) {
        // Login
        const mobileInput = screen.getByLabelText('Mobile Number')
        const passwordInput = screen.getByLabelText('Password')
        const submitButton = screen.getByRole('button', { name: /sign in/i })
        
        await user.clear(mobileInput)
        await user.clear(passwordInput)
        await user.type(mobileInput, '9876543210')
        await user.type(passwordInput, 'password123')
        await user.click(submitButton)
        
        vi.advanceTimersByTime(1500)
        
        await waitFor(() => {
          expect(screen.getByText('Logout')).toBeInTheDocument()
        })
        
        // Logout
        const logoutButton = screen.getByText('Logout')
        await user.click(logoutButton)
        
        expect(screen.getByText('Welcome Back')).toBeInTheDocument()
      }
    })
  })

  describe('Accessibility', () => {
    it('maintains focus management during login/logout', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Login
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('Logout')).toBeInTheDocument()
      })
      
      // Focus should be manageable
      const logoutButton = screen.getByText('Logout')
      logoutButton.focus()
      expect(logoutButton).toHaveFocus()
    })

    it('has proper semantic structure', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Login to see full app
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'React Calculator' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument()
      })
    })
  })

  describe('Performance', () => {
    it('renders efficiently', () => {
      const startTime = performance.now()
      render(<App />)
      const endTime = performance.now()
      
      expect(endTime - startTime).toBeLessThan(100)
    })

    it('handles state changes efficiently', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      const startTime = performance.now()
      
      // Login
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('Logout')).toBeInTheDocument()
      })
      
      const endTime = performance.now()
      expect(endTime - startTime).toBeLessThan(2000)
    })
  })

  describe('Edge Cases', () => {
    it('handles component unmounting gracefully', () => {
      const { unmount } = render(<App />)
      
      expect(() => {
        unmount()
      }).not.toThrow()
    })

    it('handles rapid re-renders', () => {
      const { rerender } = render(<App />)
      
      for (let i = 0; i < 10; i++) {
        rerender(<App />)
      }
      
      expect(screen.getByText('Welcome Back')).toBeInTheDocument()
    })
  })
})
