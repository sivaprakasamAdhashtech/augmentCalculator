import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Display from '../Display'

describe('Display Component', () => {
  describe('Rendering', () => {
    it('renders display container', () => {
      render(<Display value="0" />)
      const display = screen.getByText('0').closest('.display')
      expect(display).toBeInTheDocument()
    })

    it('renders result value correctly', () => {
      render(<Display value="123" />)
      expect(screen.getByText('123')).toBeInTheDocument()
    })

    it('renders expression when provided', () => {
      render(<Display value="85" expression="80 + 5 =" />)
      expect(screen.getByText('85')).toBeInTheDocument()
      expect(screen.getByText('80 + 5 =')).toBeInTheDocument()
    })

    it('renders without expression when not provided', () => {
      render(<Display value="42" />)
      expect(screen.getByText('42')).toBeInTheDocument()
      // Expression should be empty but container should exist
      const expressionElement = document.querySelector('.display-expression')
      expect(expressionElement).toBeInTheDocument()
      expect(expressionElement).toHaveTextContent('')
    })
  })

  describe('Number Formatting', () => {
    it('formats integer numbers correctly', () => {
      render(<Display value="42" />)
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('formats decimal numbers correctly', () => {
      render(<Display value="3.14159" />)
      expect(screen.getByText('3.14159')).toBeInTheDocument()
    })

    it('formats zero correctly', () => {
      render(<Display value="0" />)
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('formats negative numbers correctly', () => {
      render(<Display value="-25" />)
      expect(screen.getByText('-25')).toBeInTheDocument()
    })

    it('formats large numbers in scientific notation', () => {
      render(<Display value="1234567890123" />)
      const displayText = screen.getByText(/1\.23457e\+12/i)
      expect(displayText).toBeInTheDocument()
    })

    it('formats very small numbers in scientific notation', () => {
      render(<Display value="0.0000001" />)
      const displayText = screen.getByText(/1\.00000e-7/i)
      expect(displayText).toBeInTheDocument()
    })

    it('handles string numbers correctly', () => {
      render(<Display value="456.789" />)
      expect(screen.getByText('456.789')).toBeInTheDocument()
    })
  })

  describe('Expression Display', () => {
    it('shows simple expression', () => {
      render(<Display value="8" expression="5 + 3" />)
      expect(screen.getByText('5 + 3')).toBeInTheDocument()
      expect(screen.getByText('8')).toBeInTheDocument()
    })

    it('shows complex expression', () => {
      render(<Display value="20" expression="100 ÷ 5" />)
      expect(screen.getByText('100 ÷ 5')).toBeInTheDocument()
      expect(screen.getByText('20')).toBeInTheDocument()
    })

    it('shows expression with equals sign', () => {
      render(<Display value="15" expression="10 + 5 =" />)
      expect(screen.getByText('10 + 5 =')).toBeInTheDocument()
      expect(screen.getByText('15')).toBeInTheDocument()
    })

    it('handles empty expression', () => {
      render(<Display value="7" expression="" />)
      expect(screen.getByText('7')).toBeInTheDocument()
      const expressionElement = document.querySelector('.display-expression')
      expect(expressionElement).toHaveTextContent('')
    })

    it('handles undefined expression', () => {
      render(<Display value="9" expression={undefined} />)
      expect(screen.getByText('9')).toBeInTheDocument()
      const expressionElement = document.querySelector('.display-expression')
      expect(expressionElement).toHaveTextContent('')
    })
  })

  describe('CSS Classes', () => {
    it('has correct CSS classes for display container', () => {
      render(<Display value="123" />)
      const display = screen.getByText('123').closest('.display')
      expect(display).toHaveClass('display')
    })

    it('has correct CSS classes for expression', () => {
      render(<Display value="10" expression="5 + 5" />)
      const expression = screen.getByText('5 + 5')
      expect(expression).toHaveClass('display-expression')
    })

    it('has correct CSS classes for value', () => {
      render(<Display value="25" />)
      const value = screen.getByText('25')
      expect(value).toHaveClass('display-value')
    })
  })

  describe('Edge Cases', () => {
    it('handles very long numbers', () => {
      const longNumber = '123456789012345678901234567890'
      render(<Display value={longNumber} />)
      // Should be formatted in scientific notation
      const displayElement = document.querySelector('.display-value')
      expect(displayElement).toBeInTheDocument()
    })

    it('handles very long expressions', () => {
      const longExpression = '123456789 + 987654321 × 555555555'
      render(<Display value="100" expression={longExpression} />)
      expect(screen.getByText(longExpression)).toBeInTheDocument()
    })

    it('handles special number values', () => {
      render(<Display value="Infinity" />)
      expect(screen.getByText('Infinity')).toBeInTheDocument()
    })

    it('handles NaN values', () => {
      render(<Display value="NaN" />)
      expect(screen.getByText('NaN')).toBeInTheDocument()
    })

    it('handles decimal with trailing zeros', () => {
      render(<Display value="5.00" />)
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('handles negative zero', () => {
      render(<Display value="-0" />)
      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has readable text content', () => {
      render(<Display value="42" expression="40 + 2" />)
      expect(screen.getByText('42')).toBeVisible()
      expect(screen.getByText('40 + 2')).toBeVisible()
    })

    it('maintains proper text hierarchy', () => {
      render(<Display value="100" expression="50 × 2" />)
      const expression = screen.getByText('50 × 2')
      const value = screen.getByText('100')
      
      // Expression should be smaller/secondary
      expect(expression).toHaveClass('display-expression')
      // Value should be primary/larger
      expect(value).toHaveClass('display-value')
    })
  })

  describe('Performance', () => {
    it('renders quickly with normal values', () => {
      const startTime = performance.now()
      render(<Display value="123" expression="100 + 23" />)
      const endTime = performance.now()
      
      expect(endTime - startTime).toBeLessThan(100) // Should render in less than 100ms
    })

    it('handles rapid re-renders', () => {
      const { rerender } = render(<Display value="1" />)
      
      for (let i = 2; i <= 10; i++) {
        rerender(<Display value={i.toString()} />)
      }
      
      expect(screen.getByText('10')).toBeInTheDocument()
    })
  })
})
