import '../styles/Calculator.css'

const Display = ({ value, expression }) => {
  const formatDisplay = (value) => {
    // Handle very large numbers
    if (Math.abs(parseFloat(value)) > 999999999) {
      return parseFloat(value).toExponential(5)
    }

    // Handle very small numbers
    if (Math.abs(parseFloat(value)) < 0.000001 && parseFloat(value) !== 0) {
      return parseFloat(value).toExponential(5)
    }

    // Format regular numbers with appropriate decimal places
    const num = parseFloat(value)
    if (num === Math.floor(num)) {
      return num.toString()
    }

    return parseFloat(value).toString()
  }

  return (
    <div className="display">
      <div className="display-expression">
        {expression || ''}
      </div>
      <div className="display-value">
        {formatDisplay(value)}
      </div>
    </div>
  )
}

export default Display
