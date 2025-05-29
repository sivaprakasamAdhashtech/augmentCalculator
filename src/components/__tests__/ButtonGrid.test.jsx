import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ButtonGrid from '../ButtonGrid'

describe('ButtonGrid Component', () => {
  const mockOnButtonClick = vi.fn()

  beforeEach(() => {
    mockOnButtonClick.mockClear()
  })

  describe('Rendering', () => {
    it('renders button grid container', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      const grid = document.querySelector('.button-grid')
      expect(grid).toBeInTheDocument()
    })

    it('renders all number buttons (0-9)', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      for (let i = 0; i <= 9; i++) {
        expect(screen.getByText(i.toString())).toBeInTheDocument()
      }
    })

    it('renders all operator buttons', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      expect(screen.getByText('+')).toBeInTheDocument()
      expect(screen.getByText('-')).toBeInTheDocument()
      expect(screen.getByText('×')).toBeInTheDocument()
      expect(screen.getByText('÷')).toBeInTheDocument()
      expect(screen.getByText('±')).toBeInTheDocument()
    })

    it('renders control buttons', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      expect(screen.getByText('C')).toBeInTheDocument()
      expect(screen.getByText('CE')).toBeInTheDocument()
      expect(screen.getByText('=')).toBeInTheDocument()
      expect(screen.getByText('.')).toBeInTheDocument()
    })

    it('renders correct total number of buttons', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(19) // Total buttons in the grid
    })
  })

  describe('Button Layout', () => {
    it('has correct CSS grid class', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      const grid = document.querySelector('.button-grid')
      expect(grid).toHaveClass('button-grid')
    })

    it('renders buttons in correct order', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      const buttons = screen.getAllByRole('button')
      
      // First row: C, CE, ±, ÷
      expect(buttons[0]).toHaveTextContent('C')
      expect(buttons[1]).toHaveTextContent('CE')
      expect(buttons[2]).toHaveTextContent('±')
      expect(buttons[3]).toHaveTextContent('÷')
      
      // Second row: 7, 8, 9, ×
      expect(buttons[4]).toHaveTextContent('7')
      expect(buttons[5]).toHaveTextContent('8')
      expect(buttons[6]).toHaveTextContent('9')
      expect(buttons[7]).toHaveTextContent('×')
    })
  })

  describe('Button Types', () => {
    it('assigns correct types to number buttons', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      const button1 = screen.getByText('1')
      const button5 = screen.getByText('5')
      const button9 = screen.getByText('9')
      
      expect(button1).toHaveClass('button')
      expect(button5).toHaveClass('button')
      expect(button9).toHaveClass('button')
    })

    it('assigns correct types to operator buttons', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      const plusButton = screen.getByText('+')
      const multiplyButton = screen.getByText('×')
      
      expect(plusButton).toHaveClass('button-operator')
      expect(multiplyButton).toHaveClass('button-operator')
    })

    it('assigns correct type to clear buttons', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      const clearButton = screen.getByText('C')
      const clearEntryButton = screen.getByText('CE')
      
      expect(clearButton).toHaveClass('button-clear')
      expect(clearEntryButton).toHaveClass('button-clear')
    })

    it('assigns correct type to equals button', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      const equalsButton = screen.getByText('=')
      expect(equalsButton).toHaveClass('button-equals')
    })

    it('assigns correct type to zero button', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      const zeroButton = screen.getByText('0')
      expect(zeroButton).toHaveClass('button-zero')
    })
  })

  describe('Click Interactions', () => {
    it('calls onButtonClick when number button is clicked', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      fireEvent.click(screen.getByText('5'))
      
      expect(mockOnButtonClick).toHaveBeenCalledTimes(1)
      expect(mockOnButtonClick).toHaveBeenCalledWith('5')
    })

    it('calls onButtonClick when operator button is clicked', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      fireEvent.click(screen.getByText('+'))
      
      expect(mockOnButtonClick).toHaveBeenCalledWith('+')
    })

    it('calls onButtonClick when equals button is clicked', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      fireEvent.click(screen.getByText('='))
      
      expect(mockOnButtonClick).toHaveBeenCalledWith('=')
    })

    it('calls onButtonClick when clear button is clicked', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      fireEvent.click(screen.getByText('C'))
      
      expect(mockOnButtonClick).toHaveBeenCalledWith('C')
    })

    it('handles multiple button clicks in sequence', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      fireEvent.click(screen.getByText('1'))
      fireEvent.click(screen.getByText('+'))
      fireEvent.click(screen.getByText('2'))
      fireEvent.click(screen.getByText('='))
      
      expect(mockOnButtonClick).toHaveBeenCalledTimes(4)
      expect(mockOnButtonClick).toHaveBeenNthCalledWith(1, '1')
      expect(mockOnButtonClick).toHaveBeenNthCalledWith(2, '+')
      expect(mockOnButtonClick).toHaveBeenNthCalledWith(3, '2')
      expect(mockOnButtonClick).toHaveBeenNthCalledWith(4, '=')
    })
  })

  describe('User Interactions', () => {
    it('handles user clicks on all buttons', async () => {
      const user = userEvent.setup()
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      await user.click(screen.getByText('7'))
      await user.click(screen.getByText('×'))
      await user.click(screen.getByText('8'))
      
      expect(mockOnButtonClick).toHaveBeenCalledTimes(3)
      expect(mockOnButtonClick).toHaveBeenNthCalledWith(1, '7')
      expect(mockOnButtonClick).toHaveBeenNthCalledWith(2, '×')
      expect(mockOnButtonClick).toHaveBeenNthCalledWith(3, '8')
    })

    it('handles rapid clicking', async () => {
      const user = userEvent.setup()
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      const button = screen.getByText('3')
      await user.click(button)
      await user.click(button)
      await user.click(button)
      
      expect(mockOnButtonClick).toHaveBeenCalledTimes(3)
    })
  })

  describe('Accessibility', () => {
    it('all buttons are focusable', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      const buttons = screen.getAllByRole('button')
      
      buttons.forEach(button => {
        button.focus()
        expect(button).toHaveFocus()
      })
    })

    it('buttons have correct button role', () => {
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      const buttons = screen.getAllByRole('button')
      
      expect(buttons).toHaveLength(19)
      buttons.forEach(button => {
        expect(button).toHaveAttribute('type', 'button')
      })
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      const firstButton = screen.getByText('C')
      firstButton.focus()
      
      await user.keyboard('{Enter}')
      expect(mockOnButtonClick).toHaveBeenCalledWith('C')
    })
  })

  describe('Edge Cases', () => {
    it('handles undefined onButtonClick gracefully', () => {
      expect(() => {
        render(<ButtonGrid onButtonClick={undefined} />)
      }).not.toThrow()
    })

    it('handles null onButtonClick gracefully', () => {
      expect(() => {
        render(<ButtonGrid onButtonClick={null} />)
      }).not.toThrow()
    })

    it('renders consistently on multiple renders', () => {
      const { rerender } = render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      const initialButtons = screen.getAllByRole('button')
      expect(initialButtons).toHaveLength(19)
      
      rerender(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      const rerenderedButtons = screen.getAllByRole('button')
      expect(rerenderedButtons).toHaveLength(19)
    })
  })

  describe('Performance', () => {
    it('renders efficiently', () => {
      const startTime = performance.now()
      render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      const endTime = performance.now()
      
      expect(endTime - startTime).toBeLessThan(100)
    })

    it('handles rapid re-renders', () => {
      const { rerender } = render(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      
      for (let i = 0; i < 10; i++) {
        rerender(<ButtonGrid onButtonClick={mockOnButtonClick} />)
      }
      
      expect(screen.getAllByRole('button')).toHaveLength(19)
    })
  })
})
