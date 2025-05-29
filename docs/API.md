# 📡 API Documentation

## 🔐 Authentication API

### Login Function

```javascript
const handleLogin = async (userData) => {
  // Simulates authentication process
  // In production, this would call a real API
}
```

#### Parameters
- `userData` (Object): User credentials
  - `mobileNumber` (string): 10-digit mobile number
  - `password` (string): User password (min 6 characters)

#### Returns
- `Promise<Object>`: Authentication result
  - `mobileNumber` (string): Validated mobile number
  - `isAuthenticated` (boolean): Authentication status

#### Example
```javascript
const loginData = {
  mobileNumber: "9876543210",
  password: "password123"
}

const result = await handleLogin(loginData)
// Returns: { mobileNumber: "9876543210", isAuthenticated: true }
```

---

## 🧮 Calculator API

### Calculator State Management

```javascript
const [display, setDisplay] = useState('0')
const [previousValue, setPreviousValue] = useState(null)
const [operation, setOperation] = useState(null)
const [waitingForOperand, setWaitingForOperand] = useState(false)
const [expression, setExpression] = useState('')
```

### Core Functions

#### `inputNumber(num)`
Handles numeric input from buttons or keyboard.

**Parameters:**
- `num` (number): The digit to input (0-9)

**Behavior:**
- Replaces display if waiting for operand
- Appends to current display otherwise
- Updates expression display

#### `inputDecimal()`
Adds decimal point to current number.

**Behavior:**
- Adds "0." if waiting for operand
- Adds "." if no decimal point exists
- Updates expression display

#### `performOperation(nextOperation)`
Executes arithmetic operations.

**Parameters:**
- `nextOperation` (string): Operation symbol (+, -, ×, ÷, =)

**Behavior:**
- Calculates result if previous operation exists
- Sets up for next operation
- Updates both displays

#### `calculate(firstValue, secondValue, operation)`
Performs the actual calculation.

**Parameters:**
- `firstValue` (number): First operand
- `secondValue` (number): Second operand  
- `operation` (string): Operation to perform

**Returns:**
- `number`: Calculation result

**Supported Operations:**
```javascript
switch (operation) {
  case '+': return firstValue + secondValue
  case '-': return firstValue - secondValue
  case '×': return firstValue * secondValue
  case '÷': return secondValue !== 0 ? firstValue / secondValue : 0
  case '=': return secondValue
  default: return secondValue
}
```

#### `clear()`
Resets calculator to initial state.

**Behavior:**
- Sets display to '0'
- Clears all state variables
- Resets expression display

---

## 🎨 Component API

### Login Component

```javascript
<Login onLogin={handleLogin} />
```

**Props:**
- `onLogin` (function): Callback when login succeeds

**State:**
- `formData`: Form input values
- `errors`: Validation error messages
- `isLoading`: Loading state during authentication

### Calculator Component

```javascript
<Calculator />
```

**Internal State:**
- `display`: Current number display
- `previousValue`: Previous calculation value
- `operation`: Current operation
- `waitingForOperand`: Input state flag
- `expression`: Expression display text

### Display Component

```javascript
<Display value={display} expression={expression} />
```

**Props:**
- `value` (string): Current result to display
- `expression` (string): Current expression to display

### Button Component

```javascript
<Button 
  value={buttonValue} 
  onClick={handleClick} 
  type={buttonType} 
/>
```

**Props:**
- `value` (string): Button display text
- `onClick` (function): Click handler
- `type` (string): Button type for styling
  - `'default'`: Regular number buttons
  - `'operator'`: Operation buttons (+, -, ×, ÷)
  - `'clear'`: Clear buttons (C, CE)
  - `'equals'`: Equals button (=)
  - `'zero'`: Zero button (spans 2 columns)

### ButtonGrid Component

```javascript
<ButtonGrid onButtonClick={handleButtonClick} />
```

**Props:**
- `onButtonClick` (function): Handler for all button clicks

**Button Layout:**
```
[C ] [CE] [±] [÷]
[7 ] [8 ] [9] [×]
[4 ] [5 ] [6] [-]
[1 ] [2 ] [3] [+]
[0      ] [.] [=]
```

---

## ⌨️ Keyboard Event API

### Event Handlers

```javascript
useEffect(() => {
  const handleKeyPress = (event) => {
    const { key } = event
    // Handle keyboard input
  }
  
  document.addEventListener('keydown', handleKeyPress)
  return () => document.removeEventListener('keydown', handleKeyPress)
}, [dependencies])
```

### Supported Keys

| Key | Action | Function Called |
|-----|--------|----------------|
| `0-9` | Number input | `inputNumber(parseInt(key))` |
| `.` | Decimal point | `inputDecimal()` |
| `+` | Addition | `performOperation('+')` |
| `-` | Subtraction | `performOperation('-')` |
| `*` | Multiplication | `performOperation('×')` |
| `/` | Division | `performOperation('÷')` |
| `Enter`, `=` | Calculate | `performOperation('=')` |
| `Escape`, `c`, `C` | Clear | `clear()` |
| `Backspace` | Delete digit | Custom backspace logic |

---

## 🔄 State Flow

### Authentication Flow
```
1. User enters credentials
2. Validation occurs
3. Login simulation
4. State update (setUser)
5. Calculator component renders
```

### Calculation Flow
```
1. User input (button/keyboard)
2. Input validation
3. State updates
4. Display updates
5. Expression updates
```

### Error Handling
```javascript
// Division by zero
if (operation === '÷' && secondValue === 0) {
  return 0 // or display "Error"
}

// Invalid input
if (!validateMobileNumber(mobile)) {
  setErrors({ mobileNumber: 'Invalid mobile number' })
}
```

---

## 🧪 Testing API

### Component Testing
```javascript
// Test button click
fireEvent.click(getByText('+'))
expect(mockOnClick).toHaveBeenCalledWith('+')

// Test keyboard input
fireEvent.keyDown(document, { key: '5' })
expect(display).toBe('5')
```

### State Testing
```javascript
// Test calculation
const result = calculate(5, 3, '+')
expect(result).toBe(8)

// Test validation
const isValid = validateMobileNumber('1234567890')
expect(isValid).toBe(true)
```

---

## 📱 Responsive API

### Breakpoint Detection
```javascript
// CSS Media Queries
@media (max-width: 480px) {
  .calculator { /* Mobile styles */ }
}

@media (max-width: 320px) {
  .calculator { /* Small mobile styles */ }
}
```

### Touch Event Handling
```javascript
// Touch-friendly button sizing
.button {
  min-height: 44px; /* iOS recommended touch target */
  min-width: 44px;
}
```

This API documentation provides a comprehensive reference for developers working with the calculator application.
