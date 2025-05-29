import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from '../Calculator'

describe('Calculator Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders calculator container', () => {
      render(<Calculator />)
      const calculator = document.querySelector('.calculator')
      expect(calculator).toBeInTheDocument()
    })

    it('renders display component', () => {
      render(<Calculator />)
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('renders button grid', () => {
      render(<Calculator />)
      expect(screen.getByText('+')).toBeInTheDocument()
      expect(screen.getByText('=')).toBeInTheDocument()
      expect(screen.getByText('C')).toBeInTheDocument()
    })

    it('starts with initial state', () => {
      render(<Calculator />)
      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  describe('Number Input', () => {
    it('displays single digit input', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('5'))
      
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('displays multiple digit input', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('1'))
      fireEvent.click(screen.getByText('2'))
      fireEvent.click(screen.getByText('3'))
      
      expect(screen.getByText('123')).toBeInTheDocument()
    })

    it('replaces zero with first digit', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('7'))
      
      expect(screen.getByText('7')).toBeInTheDocument()
      expect(screen.queryByText('07')).not.toBeInTheDocument()
    })

    it('handles decimal input', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('3'))
      fireEvent.click(screen.getByText('.'))
      fireEvent.click(screen.getByText('1'))
      fireEvent.click(screen.getByText('4'))
      
      expect(screen.getByText('3.14')).toBeInTheDocument()
    })

    it('prevents multiple decimal points', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('3'))
      fireEvent.click(screen.getByText('.'))
      fireEvent.click(screen.getByText('1'))
      fireEvent.click(screen.getByText('.')) // Second decimal should be ignored
      fireEvent.click(screen.getByText('4'))
      
      expect(screen.getByText('3.14')).toBeInTheDocument()
    })
  })

  describe('Basic Arithmetic Operations', () => {
    it('performs addition correctly', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('5'))
      fireEvent.click(screen.getByText('+'))
      fireEvent.click(screen.getByText('3'))
      fireEvent.click(screen.getByText('='))
      
      expect(screen.getByText('8')).toBeInTheDocument()
    })

    it('performs subtraction correctly', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('1'))
      fireEvent.click(screen.getByText('0'))
      fireEvent.click(screen.getByText('-'))
      fireEvent.click(screen.getByText('3'))
      fireEvent.click(screen.getByText('='))
      
      expect(screen.getByText('7')).toBeInTheDocument()
    })

    it('performs multiplication correctly', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('6'))
      fireEvent.click(screen.getByText('×'))
      fireEvent.click(screen.getByText('7'))
      fireEvent.click(screen.getByText('='))
      
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('performs division correctly', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('1'))
      fireEvent.click(screen.getByText('5'))
      fireEvent.click(screen.getByText('÷'))
      fireEvent.click(screen.getByText('3'))
      fireEvent.click(screen.getByText('='))
      
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('handles division by zero', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('5'))
      fireEvent.click(screen.getByText('÷'))
      fireEvent.click(screen.getByText('0'))
      fireEvent.click(screen.getByText('='))
      
      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  describe('Dual Display System', () => {
    it('shows expression during calculation', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('8'))
      fireEvent.click(screen.getByText('0'))
      fireEvent.click(screen.getByText('+'))
      
      expect(screen.getByText('80 +')).toBeInTheDocument()
      expect(screen.getByText('80')).toBeInTheDocument()
    })

    it('updates expression as numbers are entered', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('8'))
      fireEvent.click(screen.getByText('0'))
      fireEvent.click(screen.getByText('+'))
      fireEvent.click(screen.getByText('5'))
      
      expect(screen.getByText('80 + 5')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('shows complete expression with equals', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('8'))
      fireEvent.click(screen.getByText('0'))
      fireEvent.click(screen.getByText('+'))
      fireEvent.click(screen.getByText('5'))
      fireEvent.click(screen.getByText('='))
      
      expect(screen.getByText('80 + 5 =')).toBeInTheDocument()
      expect(screen.getByText('85')).toBeInTheDocument()
    })
  })

  describe('Clear Functions', () => {
    it('clears everything with C button', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('1'))
      fireEvent.click(screen.getByText('2'))
      fireEvent.click(screen.getByText('+'))
      fireEvent.click(screen.getByText('3'))
      fireEvent.click(screen.getByText('C'))
      
      expect(screen.getByText('0')).toBeInTheDocument()
      // Expression should be cleared
      const expressionElement = document.querySelector('.display-expression')
      expect(expressionElement).toHaveTextContent('')
    })

    it('clears current entry with CE button', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('1'))
      fireEvent.click(screen.getByText('2'))
      fireEvent.click(screen.getByText('+'))
      fireEvent.click(screen.getByText('3'))
      fireEvent.click(screen.getByText('4'))
      fireEvent.click(screen.getByText('CE'))
      
      expect(screen.getByText('0')).toBeInTheDocument()
      expect(screen.getByText('12 +')).toBeInTheDocument()
    })
  })

  describe('Plus/Minus Toggle', () => {
    it('toggles positive number to negative', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('5'))
      fireEvent.click(screen.getByText('±'))
      
      expect(screen.getByText('-5')).toBeInTheDocument()
    })

    it('toggles negative number to positive', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('5'))
      fireEvent.click(screen.getByText('±'))
      fireEvent.click(screen.getByText('±'))
      
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('updates expression when toggling sign', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('1'))
      fireEvent.click(screen.getByText('0'))
      fireEvent.click(screen.getByText('+'))
      fireEvent.click(screen.getByText('5'))
      fireEvent.click(screen.getByText('±'))
      
      expect(screen.getByText('10 + -5')).toBeInTheDocument()
    })
  })

  describe('Keyboard Support', () => {
    it('handles number key input', () => {
      render(<Calculator />)
      
      fireEvent.keyDown(document, { key: '5' })
      
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('handles operator key input', () => {
      render(<Calculator />)
      
      fireEvent.keyDown(document, { key: '5' })
      fireEvent.keyDown(document, { key: '+' })
      fireEvent.keyDown(document, { key: '3' })
      fireEvent.keyDown(document, { key: 'Enter' })
      
      expect(screen.getByText('8')).toBeInTheDocument()
    })

    it('handles escape key for clear', () => {
      render(<Calculator />)
      
      fireEvent.keyDown(document, { key: '1' })
      fireEvent.keyDown(document, { key: '2' })
      fireEvent.keyDown(document, { key: '3' })
      fireEvent.keyDown(document, { key: 'Escape' })
      
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('handles backspace for digit deletion', () => {
      render(<Calculator />)
      
      fireEvent.keyDown(document, { key: '1' })
      fireEvent.keyDown(document, { key: '2' })
      fireEvent.keyDown(document, { key: '3' })
      fireEvent.keyDown(document, { key: 'Backspace' })
      
      expect(screen.getByText('12')).toBeInTheDocument()
    })

    it('handles backspace on single digit', () => {
      render(<Calculator />)
      
      fireEvent.keyDown(document, { key: '5' })
      fireEvent.keyDown(document, { key: 'Backspace' })
      
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('handles multiplication with asterisk', () => {
      render(<Calculator />)
      
      fireEvent.keyDown(document, { key: '4' })
      fireEvent.keyDown(document, { key: '*' })
      fireEvent.keyDown(document, { key: '3' })
      fireEvent.keyDown(document, { key: '=' })
      
      expect(screen.getByText('12')).toBeInTheDocument()
    })

    it('handles division with slash', () => {
      render(<Calculator />)
      
      fireEvent.keyDown(document, { key: '1' })
      fireEvent.keyDown(document, { key: '2' })
      fireEvent.keyDown(document, { key: '/' })
      fireEvent.keyDown(document, { key: '3' })
      fireEvent.keyDown(document, { key: '=' })
      
      expect(screen.getByText('4')).toBeInTheDocument()
    })
  })

  describe('Complex Calculations', () => {
    it('handles chained operations', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('5'))
      fireEvent.click(screen.getByText('+'))
      fireEvent.click(screen.getByText('3'))
      fireEvent.click(screen.getByText('×'))
      fireEvent.click(screen.getByText('2'))
      fireEvent.click(screen.getByText('='))
      
      expect(screen.getByText('16')).toBeInTheDocument()
    })

    it('handles decimal calculations', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('2'))
      fireEvent.click(screen.getByText('.'))
      fireEvent.click(screen.getByText('5'))
      fireEvent.click(screen.getByText('+'))
      fireEvent.click(screen.getByText('1'))
      fireEvent.click(screen.getByText('.'))
      fireEvent.click(screen.getByText('5'))
      fireEvent.click(screen.getByText('='))
      
      expect(screen.getByText('4')).toBeInTheDocument()
    })

    it('handles operations with zero', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('5'))
      fireEvent.click(screen.getByText('+'))
      fireEvent.click(screen.getByText('0'))
      fireEvent.click(screen.getByText('='))
      
      expect(screen.getByText('5')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles rapid button clicks', () => {
      render(<Calculator />)
      
      for (let i = 0; i < 10; i++) {
        fireEvent.click(screen.getByText('1'))
      }
      
      expect(screen.getByText('1111111111')).toBeInTheDocument()
    })

    it('handles operation without second operand', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('5'))
      fireEvent.click(screen.getByText('+'))
      fireEvent.click(screen.getByText('='))
      
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('handles multiple equals presses', () => {
      render(<Calculator />)
      
      fireEvent.click(screen.getByText('5'))
      fireEvent.click(screen.getByText('+'))
      fireEvent.click(screen.getByText('3'))
      fireEvent.click(screen.getByText('='))
      fireEvent.click(screen.getByText('='))
      
      expect(screen.getByText('8')).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('renders efficiently', () => {
      const startTime = performance.now()
      render(<Calculator />)
      const endTime = performance.now()
      
      expect(endTime - startTime).toBeLessThan(100)
    })

    it('handles rapid state updates', () => {
      render(<Calculator />)
      
      const startTime = performance.now()
      
      for (let i = 0; i < 100; i++) {
        fireEvent.click(screen.getByText('1'))
        fireEvent.click(screen.getByText('C'))
      }
      
      const endTime = performance.now()
      expect(endTime - startTime).toBeLessThan(1000)
    })
  })
})
