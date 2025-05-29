import { useState, useEffect } from 'react'
import Display from './Display'
import ButtonGrid from './ButtonGrid'
import '../styles/Calculator.css'

const Calculator = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [expression, setExpression] = useState('')

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
      // Update expression with the new number
      if (operation && previousValue !== null) {
        setExpression(`${previousValue} ${operation} ${num}`)
      }
    } else {
      const newDisplay = display === '0' ? String(num) : display + num
      setDisplay(newDisplay)
      // Update expression if we're building on an existing operation
      if (operation && previousValue !== null) {
        setExpression(`${previousValue} ${operation} ${newDisplay}`)
      }
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
      if (operation && previousValue !== null) {
        setExpression(`${previousValue} ${operation} 0.`)
      }
    } else if (display.indexOf('.') === -1) {
      const newDisplay = display + '.'
      setDisplay(newDisplay)
      if (operation && previousValue !== null) {
        setExpression(`${previousValue} ${operation} ${newDisplay}`)
      }
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
    setExpression('')
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
      if (nextOperation !== '=') {
        setExpression(`${inputValue} ${nextOperation}`)
      }
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)

      if (nextOperation === '=') {
        setExpression(`${currentValue} ${operation} ${inputValue} =`)
      } else {
        setExpression(`${newValue} ${nextOperation}`)
      }
    }

    setWaitingForOperand(true)
    setOperation(nextOperation === '=' ? null : nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const handleButtonClick = (value) => {
    if (value >= '0' && value <= '9') {
      inputNumber(parseInt(value))
    } else if (value === '.') {
      inputDecimal()
    } else if (value === 'C') {
      clear()
    } else if (value === 'CE') {
      setDisplay('0')
      // Keep the expression but reset current input
      if (operation && previousValue !== null) {
        setExpression(`${previousValue} ${operation}`)
      }
    } else if (value === '±') {
      const newDisplay = String(parseFloat(display) * -1)
      setDisplay(newDisplay)
      // Update expression if we're in the middle of an operation
      if (operation && previousValue !== null) {
        setExpression(`${previousValue} ${operation} ${newDisplay}`)
      }
    } else if (['+', '-', '×', '÷', '='].includes(value)) {
      performOperation(value)
    }
  }

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event

      if (key >= '0' && key <= '9') {
        inputNumber(parseInt(key))
      } else if (key === '.') {
        inputDecimal()
      } else if (key === 'Enter' || key === '=') {
        performOperation('=')
      } else if (key === '+') {
        performOperation('+')
      } else if (key === '-') {
        performOperation('-')
      } else if (key === '*') {
        performOperation('×')
      } else if (key === '/') {
        event.preventDefault()
        performOperation('÷')
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear()
      } else if (key === 'Backspace') {
        if (display.length > 1) {
          setDisplay(display.slice(0, -1))
        } else {
          setDisplay('0')
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [display, previousValue, operation, waitingForOperand])

  return (
    <div className="calculator">
      <Display value={display} expression={expression} />
      <ButtonGrid onButtonClick={handleButtonClick} />
    </div>
  )
}

export default Calculator
