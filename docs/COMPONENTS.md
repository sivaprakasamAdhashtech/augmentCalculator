# 🧩 Component Documentation

## 📋 Component Overview

The React Calculator application is built using a modular component architecture. Each component has a specific responsibility and can be reused or modified independently.

---

## 🏠 App Component

**File:** `src/App.jsx`

### Purpose
Root component that manages authentication state and renders either the Login or Calculator interface.

### State
```javascript
const [user, setUser] = useState(null)
```

### Props
None (root component)

### Key Features
- **Authentication Management**: Controls login/logout flow
- **Conditional Rendering**: Shows Login or Calculator based on auth state
- **User Session**: Maintains user information during session

### Code Structure
```javascript
function App() {
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>React Calculator</h1>
        <div className="user-info">
          <span>Welcome, +91 {user.mobileNumber}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <Calculator />
    </div>
  )
}
```

---

## 🔐 Login Component

**File:** `src/components/Login.jsx`

### Purpose
Handles user authentication with mobile number and password validation.

### Props
```javascript
{
  onLogin: function // Callback when login succeeds
}
```

### State
```javascript
const [formData, setFormData] = useState({
  mobileNumber: '',
  password: ''
})
const [errors, setErrors] = useState({})
const [isLoading, setIsLoading] = useState(false)
```

### Key Features
- **Real-time Validation**: Validates input as user types
- **Mobile Number Formatting**: Restricts to 10 digits
- **Password Security**: Minimum 6 characters
- **Loading States**: Visual feedback during authentication
- **Error Handling**: Clear error messages

### Validation Rules
```javascript
// Mobile number: exactly 10 digits
const validateMobileNumber = (mobile) => {
  const mobileRegex = /^[0-9]{10}$/
  return mobileRegex.test(mobile)
}

// Password: minimum 6 characters
const validatePassword = (password) => {
  return password.length >= 6
}
```

### Usage Example
```javascript
<Login onLogin={(userData) => setUser(userData)} />
```

---

## 🧮 Calculator Component

**File:** `src/components/Calculator.jsx`

### Purpose
Main calculator logic and state management. Handles all arithmetic operations and user interactions.

### Props
None

### State
```javascript
const [display, setDisplay] = useState('0')
const [previousValue, setPreviousValue] = useState(null)
const [operation, setOperation] = useState(null)
const [waitingForOperand, setWaitingForOperand] = useState(false)
const [expression, setExpression] = useState('')
```

### Key Features
- **Arithmetic Operations**: +, -, ×, ÷
- **Dual Display**: Expression and result
- **Keyboard Support**: Full keyboard integration
- **Error Handling**: Division by zero protection
- **State Management**: Complex calculation state

### Core Methods
```javascript
const inputNumber = (num) => { /* Handle number input */ }
const inputDecimal = () => { /* Handle decimal point */ }
const performOperation = (nextOperation) => { /* Execute operations */ }
const calculate = (firstValue, secondValue, operation) => { /* Perform calculation */ }
const clear = () => { /* Reset calculator */ }
```

### Usage Example
```javascript
<Calculator />
```

---

## 📺 Display Component

**File:** `src/components/Display.jsx`

### Purpose
Shows the dual display system with expression and result.

### Props
```javascript
{
  value: string,      // Current result to display
  expression: string  // Current expression to display
}
```

### Key Features
- **Dual Display**: Expression (top) and result (bottom)
- **Number Formatting**: Handles large/small numbers
- **Responsive Text**: Adapts to different screen sizes
- **Overflow Handling**: Manages long numbers

### Display Logic
```javascript
const formatDisplay = (value) => {
  // Handle very large numbers
  if (Math.abs(parseFloat(value)) > 999999999) {
    return parseFloat(value).toExponential(5)
  }
  
  // Handle very small numbers
  if (Math.abs(parseFloat(value)) < 0.000001 && parseFloat(value) !== 0) {
    return parseFloat(value).toExponential(5)
  }
  
  // Format regular numbers
  const num = parseFloat(value)
  if (num === Math.floor(num)) {
    return num.toString()
  }
  
  return parseFloat(value).toString()
}
```

### Usage Example
```javascript
<Display value="85" expression="80 + 5 =" />
```

---

## 🔘 Button Component

**File:** `src/components/Button.jsx`

### Purpose
Reusable button component with different styling based on button type.

### Props
```javascript
{
  value: string,           // Button display text
  onClick: function,       // Click handler
  className: string,       // Additional CSS classes
  type: string            // Button type for styling
}
```

### Button Types
- `'default'`: Regular number buttons (0-9, .)
- `'operator'`: Operation buttons (+, -, ×, ÷, ±)
- `'clear'`: Clear buttons (C, CE)
- `'equals'`: Equals button (=)
- `'zero'`: Zero button (spans 2 columns)

### Styling Logic
```javascript
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
```

### Usage Example
```javascript
<Button 
  value="+" 
  type="operator" 
  onClick={(value) => handleOperation(value)} 
/>
```

---

## 🔢 ButtonGrid Component

**File:** `src/components/ButtonGrid.jsx`

### Purpose
Manages the layout and organization of all calculator buttons.

### Props
```javascript
{
  onButtonClick: function  // Handler for all button clicks
}
```

### Button Configuration
```javascript
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
```

### Grid Layout
```css
.button-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 12px;
}
```

### Usage Example
```javascript
<ButtonGrid onButtonClick={(value) => handleInput(value)} />
```

---

## 🎨 Styling Architecture

### CSS Organization
```
src/styles/
├── Calculator.css    # Calculator and button styles
└── Login.css        # Login form styles

src/
├── App.css          # Global app styles
└── index.css        # Base styles and resets
```

### Design Tokens
```css
/* Colors */
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--calculator-bg: linear-gradient(145deg, #2c3e50, #34495e);
--display-bg: linear-gradient(145deg, #1a1a1a, #2d2d2d);

/* Typography */
--font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
--display-font-size: 2.5rem;
--button-font-size: 1.4rem;

/* Spacing */
--container-padding: 20px;
--button-gap: 12px;
--border-radius: 12px;
```

---

## 🔄 Component Lifecycle

### Mounting Order
1. **App** component mounts
2. **Login** component renders (if not authenticated)
3. User authenticates
4. **Calculator** component mounts
5. **Display** and **ButtonGrid** components mount
6. Individual **Button** components mount

### State Flow
```
User Input → ButtonGrid → Calculator → Display
     ↓
Keyboard Input → Calculator → Display
```

### Event Propagation
```
Button Click → ButtonGrid.onButtonClick → Calculator.handleButtonClick → State Update → Display Update
```

---

## 🧪 Testing Components

### Unit Testing Example
```javascript
import { render, fireEvent } from '@testing-library/react'
import Button from './Button'

test('button calls onClick with correct value', () => {
  const mockOnClick = jest.fn()
  const { getByText } = render(
    <Button value="5" onClick={mockOnClick} />
  )
  
  fireEvent.click(getByText('5'))
  expect(mockOnClick).toHaveBeenCalledWith('5')
})
```

### Integration Testing
```javascript
test('calculator performs addition correctly', () => {
  const { getByText } = render(<Calculator />)
  
  fireEvent.click(getByText('5'))
  fireEvent.click(getByText('+'))
  fireEvent.click(getByText('3'))
  fireEvent.click(getByText('='))
  
  expect(getByText('8')).toBeInTheDocument()
})
```

This component documentation provides detailed information about each component's purpose, props, state, and usage patterns.
