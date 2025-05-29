import Button from './Button'
import '../styles/Calculator.css'

const ButtonGrid = ({ onButtonClick }) => {
  const buttons = [
    { value: 'C', type: 'clear' },
    { value: 'CE', type: 'clear' },
    { value: '±', type: 'operator' },
    { value: '÷', type: 'operator' },
    
    { value: '7', type: 'number' },
    { value: '8', type: 'number' },
    { value: '9', type: 'number' },
    { value: '×', type: 'operator' },
    
    { value: '4', type: 'number' },
    { value: '5', type: 'number' },
    { value: '6', type: 'number' },
    { value: '-', type: 'operator' },
    
    { value: '1', type: 'number' },
    { value: '2', type: 'number' },
    { value: '3', type: 'number' },
    { value: '+', type: 'operator' },
    
    { value: '0', type: 'zero' },
    { value: '.', type: 'number' },
    { value: '=', type: 'equals' }
  ]

  return (
    <div className="button-grid">
      {buttons.map((button, index) => (
        <Button
          key={index}
          value={button.value}
          type={button.type}
          onClick={onButtonClick}
        />
      ))}
    </div>
  )
}

export default ButtonGrid
