import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllTimers()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  describe('Complete User Journey', () => {
    it('completes full login to calculation workflow', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Step 1: User sees login screen
      expect(screen.getByText('Welcome Back')).toBeInTheDocument()
      
      // Step 2: User enters credentials
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      
      // Step 3: User submits login
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      await user.click(submitButton)
      
      // Step 4: Loading state is shown
      expect(screen.getByText('Signing In...')).toBeInTheDocument()
      
      // Step 5: Login completes
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
        expect(screen.getByText('Welcome, +91 9876543210')).toBeInTheDocument()
      })
      
      // Step 6: User performs calculation (80 + 5 = 85)
      await user.click(screen.getByText('8'))
      await user.click(screen.getByText('0'))
      expect(screen.getByText('80')).toBeInTheDocument()
      
      await user.click(screen.getByText('+'))
      expect(screen.getByText('80 +')).toBeInTheDocument()
      
      await user.click(screen.getByText('5'))
      expect(screen.getByText('80 + 5')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
      
      await user.click(screen.getByText('='))
      expect(screen.getByText('80 + 5 =')).toBeInTheDocument()
      expect(screen.getByText('85')).toBeInTheDocument()
      
      // Step 7: User logs out
      const logoutButton = screen.getByText('Logout')
      await user.click(logoutButton)
      
      expect(screen.getByText('Welcome Back')).toBeInTheDocument()
      expect(screen.queryByText('React Calculator')).not.toBeInTheDocument()
    })

    it('handles complex calculation workflow', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Login
      await user.type(screen.getByLabelText('Mobile Number'), '9876543210')
      await user.type(screen.getByLabelText('Password'), 'password123')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
      })
      
      // Complex calculation: 15 × 4 ÷ 3 + 7 = 27
      await user.click(screen.getByText('1'))
      await user.click(screen.getByText('5'))
      await user.click(screen.getByText('×'))
      await user.click(screen.getByText('4'))
      await user.click(screen.getByText('÷'))
      await user.click(screen.getByText('3'))
      await user.click(screen.getByText('+'))
      await user.click(screen.getByText('7'))
      await user.click(screen.getByText('='))
      
      expect(screen.getByText('27')).toBeInTheDocument()
    })
  })

  describe('Keyboard and Mouse Integration', () => {
    it('mixes keyboard and mouse input seamlessly', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Login with keyboard
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      await user.keyboard('{Enter}')
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
      })
      
      // Mix keyboard and mouse for calculation
      fireEvent.keyDown(document, { key: '5' }) // Keyboard
      await user.click(screen.getByText('+')) // Mouse
      fireEvent.keyDown(document, { key: '3' }) // Keyboard
      await user.click(screen.getByText('=')) // Mouse
      
      expect(screen.getByText('8')).toBeInTheDocument()
    })

    it('handles keyboard shortcuts throughout app', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Login
      await user.type(screen.getByLabelText('Mobile Number'), '9876543210')
      await user.type(screen.getByLabelText('Password'), 'password123')
      await user.keyboard('{Enter}')
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
      })
      
      // Use keyboard for entire calculation
      fireEvent.keyDown(document, { key: '1' })
      fireEvent.keyDown(document, { key: '0' })
      fireEvent.keyDown(document, { key: '*' })
      fireEvent.keyDown(document, { key: '5' })
      fireEvent.keyDown(document, { key: 'Enter' })
      
      expect(screen.getByText('50')).toBeInTheDocument()
      
      // Clear with keyboard
      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  describe('Error Recovery Workflows', () => {
    it('recovers from login validation errors', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Try invalid login first
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      expect(screen.getByText('Mobile number is required')).toBeInTheDocument()
      expect(screen.getByText('Password is required')).toBeInTheDocument()
      
      // Fix errors and login successfully
      const mobileInput = screen.getByLabelText('Mobile Number')
      const passwordInput = screen.getByLabelText('Password')
      
      await user.type(mobileInput, '9876543210')
      await user.type(passwordInput, 'password123')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
      })
      
      // Calculator should work normally
      await user.click(screen.getByText('5'))
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('handles calculator errors gracefully', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Login
      await user.type(screen.getByLabelText('Mobile Number'), '9876543210')
      await user.type(screen.getByLabelText('Password'), 'password123')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
      })
      
      // Test division by zero
      await user.click(screen.getByText('5'))
      await user.click(screen.getByText('÷'))
      await user.click(screen.getByText('0'))
      await user.click(screen.getByText('='))
      
      expect(screen.getByText('0')).toBeInTheDocument() // Should handle gracefully
      
      // Calculator should continue working
      await user.click(screen.getByText('C'))
      await user.click(screen.getByText('3'))
      expect(screen.getByText('3')).toBeInTheDocument()
    })
  })

  describe('State Persistence', () => {
    it('maintains calculator state during session', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Login
      await user.type(screen.getByLabelText('Mobile Number'), '9876543210')
      await user.type(screen.getByLabelText('Password'), 'password123')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
      })
      
      // Start calculation
      await user.click(screen.getByText('1'))
      await user.click(screen.getByText('2'))
      await user.click(screen.getByText('+'))
      
      expect(screen.getByText('12 +')).toBeInTheDocument()
      
      // Continue calculation
      await user.click(screen.getByText('3'))
      await user.click(screen.getByText('='))
      
      expect(screen.getByText('15')).toBeInTheDocument()
      expect(screen.getByText('12 + 3 =')).toBeInTheDocument()
    })

    it('resets state on logout and login', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Login
      await user.type(screen.getByLabelText('Mobile Number'), '9876543210')
      await user.type(screen.getByLabelText('Password'), 'password123')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
      })
      
      // Perform calculation
      await user.click(screen.getByText('9'))
      await user.click(screen.getByText('9'))
      expect(screen.getByText('99')).toBeInTheDocument()
      
      // Logout
      await user.click(screen.getByText('Logout'))
      expect(screen.getByText('Welcome Back')).toBeInTheDocument()
      
      // Login again
      await user.type(screen.getByLabelText('Mobile Number'), '9876543210')
      await user.type(screen.getByLabelText('Password'), 'password123')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
        expect(screen.getByText('0')).toBeInTheDocument() // Should reset to 0
      })
    })
  })

  describe('Accessibility Integration', () => {
    it('maintains accessibility throughout user journey', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Check login accessibility
      expect(screen.getByLabelText('Mobile Number')).toBeInTheDocument()
      expect(screen.getByLabelText('Password')).toBeInTheDocument()
      
      // Login with tab navigation
      const mobileInput = screen.getByLabelText('Mobile Number')
      mobileInput.focus()
      expect(mobileInput).toHaveFocus()
      
      await user.type(mobileInput, '9876543210')
      await user.tab()
      
      const passwordInput = screen.getByLabelText('Password')
      expect(passwordInput).toHaveFocus()
      
      await user.type(passwordInput, 'password123')
      await user.tab()
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      expect(submitButton).toHaveFocus()
      
      await user.keyboard('{Enter}')
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
      })
      
      // Check calculator accessibility
      const calculatorButtons = screen.getAllByRole('button')
      expect(calculatorButtons.length).toBeGreaterThan(0)
      
      // Test keyboard navigation on calculator
      fireEvent.keyDown(document, { key: '5' })
      expect(screen.getByText('5')).toBeInTheDocument()
    })
  })

  describe('Performance Integration', () => {
    it('maintains performance throughout user session', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      
      const startTime = performance.now()
      render(<App />)
      
      // Login
      await user.type(screen.getByLabelText('Mobile Number'), '9876543210')
      await user.type(screen.getByLabelText('Password'), 'password123')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
      })
      
      // Perform multiple calculations
      for (let i = 0; i < 10; i++) {
        await user.click(screen.getByText('1'))
        await user.click(screen.getByText('+'))
        await user.click(screen.getByText('1'))
        await user.click(screen.getByText('='))
        await user.click(screen.getByText('C'))
      }
      
      const endTime = performance.now()
      expect(endTime - startTime).toBeLessThan(5000) // Should complete in reasonable time
    })

    it('handles rapid user interactions efficiently', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Quick login
      await user.type(screen.getByLabelText('Mobile Number'), '9876543210')
      await user.type(screen.getByLabelText('Password'), 'password123')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
      })
      
      // Rapid button clicking
      const startTime = performance.now()
      
      for (let i = 0; i < 50; i++) {
        await user.click(screen.getByText('1'))
        await user.click(screen.getByText('C'))
      }
      
      const endTime = performance.now()
      expect(endTime - startTime).toBeLessThan(3000)
      
      // App should still be responsive
      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  describe('Cross-Component Communication', () => {
    it('properly communicates between Login and App components', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Verify initial state
      expect(screen.getByText('Welcome Back')).toBeInTheDocument()
      
      // Login should trigger state change in App
      await user.type(screen.getByLabelText('Mobile Number'), '9876543210')
      await user.type(screen.getByLabelText('Password'), 'password123')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        // App should receive user data and render calculator
        expect(screen.getByText('Welcome, +91 9876543210')).toBeInTheDocument()
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
      })
    })

    it('properly communicates between Calculator components', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<App />)
      
      // Login first
      await user.type(screen.getByLabelText('Mobile Number'), '9876543210')
      await user.type(screen.getByLabelText('Password'), 'password123')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      vi.advanceTimersByTime(1500)
      
      await waitFor(() => {
        expect(screen.getByText('React Calculator')).toBeInTheDocument()
      })
      
      // ButtonGrid should communicate with Calculator
      await user.click(screen.getByText('7'))
      
      // Display should show the result
      expect(screen.getByText('7')).toBeInTheDocument()
      
      // Calculator should update expression
      await user.click(screen.getByText('+'))
      expect(screen.getByText('7 +')).toBeInTheDocument()
    })
  })
})
