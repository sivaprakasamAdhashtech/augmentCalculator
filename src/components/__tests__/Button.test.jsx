import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../Button'

describe('Button Component', () => {
  const mockOnClick = vi.fn()

  beforeEach(() => {
    mockOnClick.mockClear()
  })

  describe('Rendering', () => {
    it('renders button with correct text', () => {
      render(<Button value="5" onClick={mockOnClick} />)
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('renders button with custom className', () => {
      render(<Button value="+" className="custom-class" onClick={mockOnClick} />)
      const button = screen.getByText('+')
      expect(button).toHaveClass('custom-class')
    })

    it('renders as button element', () => {
      render(<Button value="0" onClick={mockOnClick} />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
    })
  })

  describe('Button Types and Styling', () => {
    it('applies default button class for default type', () => {
      render(<Button value="5" onClick={mockOnClick} />)
      const button = screen.getByText('5')
      expect(button).toHaveClass('button')
      expect(button).not.toHaveClass('button-operator')
    })

    it('applies operator class for operator type', () => {
      render(<Button value="+" type="operator" onClick={mockOnClick} />)
      const button = screen.getByText('+')
      expect(button).toHaveClass('button', 'button-operator')
    })

    it('applies clear class for clear type', () => {
      render(<Button value="C" type="clear" onClick={mockOnClick} />)
      const button = screen.getByText('C')
      expect(button).toHaveClass('button', 'button-clear')
    })

    it('applies equals class for equals type', () => {
      render(<Button value="=" type="equals" onClick={mockOnClick} />)
      const button = screen.getByText('=')
      expect(button).toHaveClass('button', 'button-equals')
    })

    it('applies zero class for zero type', () => {
      render(<Button value="0" type="zero" onClick={mockOnClick} />)
      const button = screen.getByText('0')
      expect(button).toHaveClass('button', 'button-zero')
    })
  })

  describe('Click Interactions', () => {
    it('calls onClick with correct value when clicked', () => {
      render(<Button value="7" onClick={mockOnClick} />)
      const button = screen.getByText('7')
      
      fireEvent.click(button)
      
      expect(mockOnClick).toHaveBeenCalledTimes(1)
      expect(mockOnClick).toHaveBeenCalledWith('7')
    })

    it('calls onClick with operator value', () => {
      render(<Button value="+" type="operator" onClick={mockOnClick} />)
      const button = screen.getByText('+')
      
      fireEvent.click(button)
      
      expect(mockOnClick).toHaveBeenCalledWith('+')
    })

    it('handles multiple clicks correctly', () => {
      render(<Button value="3" onClick={mockOnClick} />)
      const button = screen.getByText('3')
      
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)
      
      expect(mockOnClick).toHaveBeenCalledTimes(3)
      expect(mockOnClick).toHaveBeenNthCalledWith(1, '3')
      expect(mockOnClick).toHaveBeenNthCalledWith(2, '3')
      expect(mockOnClick).toHaveBeenNthCalledWith(3, '3')
    })
  })

  describe('User Interactions', () => {
    it('handles user click events', async () => {
      const user = userEvent.setup()
      render(<Button value="9" onClick={mockOnClick} />)
      const button = screen.getByText('9')
      
      await user.click(button)
      
      expect(mockOnClick).toHaveBeenCalledWith('9')
    })

    it('handles keyboard interactions (Enter)', async () => {
      const user = userEvent.setup()
      render(<Button value="=" onClick={mockOnClick} />)
      const button = screen.getByText('=')
      
      button.focus()
      await user.keyboard('{Enter}')
      
      expect(mockOnClick).toHaveBeenCalledWith('=')
    })

    it('handles keyboard interactions (Space)', async () => {
      const user = userEvent.setup()
      render(<Button value="C" onClick={mockOnClick} />)
      const button = screen.getByText('C')
      
      button.focus()
      await user.keyboard(' ')
      
      expect(mockOnClick).toHaveBeenCalledWith('C')
    })
  })

  describe('Accessibility', () => {
    it('has correct button role', () => {
      render(<Button value="4" onClick={mockOnClick} />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('is focusable', () => {
      render(<Button value="6" onClick={mockOnClick} />)
      const button = screen.getByText('6')
      
      button.focus()
      expect(button).toHaveFocus()
    })

    it('has correct button type attribute', () => {
      render(<Button value="8" onClick={mockOnClick} />)
      const button = screen.getByText('8')
      expect(button).toHaveAttribute('type', 'button')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty value', () => {
      render(<Button value="" onClick={mockOnClick} />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      
      fireEvent.click(button)
      expect(mockOnClick).toHaveBeenCalledWith('')
    })

    it('handles special characters', () => {
      render(<Button value="±" onClick={mockOnClick} />)
      const button = screen.getByText('±')
      
      fireEvent.click(button)
      expect(mockOnClick).toHaveBeenCalledWith('±')
    })

    it('handles undefined type gracefully', () => {
      render(<Button value="2" type={undefined} onClick={mockOnClick} />)
      const button = screen.getByText('2')
      expect(button).toHaveClass('button')
      expect(button).not.toHaveClass('button-undefined')
    })

    it('handles null onClick gracefully', () => {
      expect(() => {
        render(<Button value="1" onClick={null} />)
      }).not.toThrow()
    })
  })
})
