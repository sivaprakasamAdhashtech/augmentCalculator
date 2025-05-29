import '../styles/Calculator.css'

const Button = ({ value, onClick, className = '', type = 'default' }) => {
  const handleClick = () => {
    onClick(value)
  }

  const getButtonClass = () => {
    let baseClass = 'button'
    
    if (type === 'operator') {
      baseClass += ' button-operator'
    } else if (type === 'clear') {
      baseClass += ' button-clear'
    } else if (type === 'equals') {
      baseClass += ' button-equals'
    } else if (type === 'zero') {
      baseClass += ' button-zero'
    }
    
    return `${baseClass} ${className}`.trim()
  }

  return (
    <button 
      className={getButtonClass()}
      onClick={handleClick}
      type="button"
    >
      {value}
    </button>
  )
}

export default Button
