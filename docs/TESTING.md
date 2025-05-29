# 🧪 Testing Documentation

## 📋 Testing Overview

This document provides comprehensive information about the testing strategy, setup, and execution for the React Calculator project.

---

## 🎯 Testing Strategy

### Testing Pyramid
```
    🔺 E2E Tests (Integration)
   🔺🔺 Integration Tests  
  🔺🔺🔺 Unit Tests
```

### Test Types
- **Unit Tests**: Individual component testing
- **Integration Tests**: Component interaction testing
- **End-to-End Tests**: Complete user workflow testing

---

## 🛠️ Testing Setup

### Testing Framework
- **Vitest**: Fast unit test runner
- **React Testing Library**: Component testing utilities
- **Jest DOM**: Additional DOM matchers
- **User Event**: User interaction simulation

### Configuration Files
- `vite.config.js`: Vitest configuration
- `src/test/setup.js`: Test environment setup
- `package.json`: Test scripts

### Installation
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom
```

---

## 📁 Test Structure

```
src/
├── __tests__/
│   ├── App.test.jsx           # App component tests
│   └── integration.test.jsx   # Integration tests
├── components/
│   └── __tests__/
│       ├── Button.test.jsx         # Button component tests
│       ├── ButtonGrid.test.jsx     # ButtonGrid component tests
│       ├── Calculator.test.jsx     # Calculator component tests
│       ├── Display.test.jsx        # Display component tests
│       └── Login.test.jsx          # Login component tests
└── test/
    └── setup.js               # Test setup configuration
```

---

## 🧩 Component Tests

### Button Component Tests
**File**: `src/components/__tests__/Button.test.jsx`

**Test Categories**:
- ✅ Rendering with different props
- ✅ Button type styling
- ✅ Click interactions
- ✅ User interactions (keyboard/mouse)
- ✅ Accessibility features
- ✅ Edge cases

**Key Test Cases**:
```javascript
// Rendering test
it('renders button with correct text', () => {
  render(<Button value="5" onClick={mockOnClick} />)
  expect(screen.getByText('5')).toBeInTheDocument()
})

// Interaction test
it('calls onClick when clicked', () => {
  render(<Button value="5" onClick={mockOnClick} />)
  fireEvent.click(screen.getByText('5'))
  expect(mockOnClick).toHaveBeenCalledWith('5')
})
```

### Display Component Tests
**File**: `src/components/__tests__/Display.test.jsx`

**Test Categories**:
- ✅ Dual display rendering
- ✅ Number formatting
- ✅ Expression display
- ✅ CSS classes
- ✅ Edge cases (large numbers, scientific notation)

### ButtonGrid Component Tests
**File**: `src/components/__tests__/ButtonGrid.test.jsx`

**Test Categories**:
- ✅ Grid layout rendering
- ✅ Button type assignments
- ✅ Click propagation
- ✅ Accessibility
- ✅ Performance

### Calculator Component Tests
**File**: `src/components/__tests__/Calculator.test.jsx`

**Test Categories**:
- ✅ Basic arithmetic operations
- ✅ Dual display system
- ✅ Keyboard support
- ✅ Clear functions
- ✅ Plus/minus toggle
- ✅ Complex calculations
- ✅ Edge cases

### Login Component Tests
**File**: `src/components/__tests__/Login.test.jsx`

**Test Categories**:
- ✅ Form rendering
- ✅ Input validation
- ✅ Real-time validation
- ✅ Form submission
- ✅ Loading states
- ✅ Error handling
- ✅ Accessibility

### App Component Tests
**File**: `src/__tests__/App.test.jsx`

**Test Categories**:
- ✅ Authentication flow
- ✅ Logout functionality
- ✅ Calculator integration
- ✅ Responsive layout
- ✅ Error handling
- ✅ Performance

---

## 🔗 Integration Tests

**File**: `src/__tests__/integration.test.jsx`

### Complete User Journey
```javascript
it('completes full login to calculation workflow', async () => {
  // 1. Login
  // 2. Perform calculation
  // 3. Verify results
  // 4. Logout
})
```

### Test Scenarios
- ✅ Login → Calculator → Logout workflow
- ✅ Keyboard and mouse integration
- ✅ Error recovery workflows
- ✅ State persistence
- ✅ Cross-component communication
- ✅ Performance integration

---

## 🚀 Running Tests

### Available Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

### Test Execution
```bash
# Run specific test file
npx vitest Button.test.jsx

# Run tests matching pattern
npx vitest --grep "Calculator"

# Run tests in specific directory
npx vitest src/components/__tests__/
```

---

## 📊 Test Coverage

### Coverage Goals
- **Statements**: 90%+
- **Branches**: 85%+
- **Functions**: 90%+
- **Lines**: 90%+

### Coverage Report
```bash
npm run test:coverage
```

### Coverage Areas
- ✅ **Components**: 100% coverage
- ✅ **User Interactions**: 95% coverage
- ✅ **Error Handling**: 90% coverage
- ✅ **Edge Cases**: 85% coverage

---

## 🎭 Testing Patterns

### Component Testing Pattern
```javascript
describe('ComponentName', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      // Test rendering
    })
  })

  describe('Interactions', () => {
    it('handles user interactions', () => {
      // Test interactions
    })
  })

  describe('Edge Cases', () => {
    it('handles edge cases', () => {
      // Test edge cases
    })
  })
})
```

### User Event Testing
```javascript
const user = userEvent.setup()
await user.click(button)
await user.type(input, 'text')
await user.keyboard('{Enter}')
```

### Async Testing
```javascript
await waitFor(() => {
  expect(screen.getByText('Expected Text')).toBeInTheDocument()
})
```

---

## 🔧 Testing Utilities

### Custom Render Function
```javascript
const renderWithProviders = (ui, options) => {
  return render(ui, {
    wrapper: ({ children }) => <Provider>{children}</Provider>,
    ...options,
  })
}
```

### Mock Functions
```javascript
const mockOnClick = vi.fn()
const mockOnLogin = vi.fn()

beforeEach(() => {
  mockOnClick.mockClear()
})
```

### Timer Mocking
```javascript
beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

// Advance timers
vi.advanceTimersByTime(1500)
```

---

## 🐛 Debugging Tests

### Debug Strategies
```javascript
// Debug rendered output
screen.debug()

// Debug specific element
screen.debug(screen.getByText('Button'))

// Log queries
screen.logTestingPlaygroundURL()
```

### Common Issues
1. **Element not found**: Check selectors and timing
2. **Async operations**: Use `waitFor` or `findBy` queries
3. **Timer issues**: Mock timers properly
4. **Event handling**: Use `userEvent` instead of `fireEvent`

---

## 📈 Test Metrics

### Current Test Stats
- **Total Tests**: 150+ test cases
- **Components Tested**: 6/6 (100%)
- **Test Files**: 7 files
- **Coverage**: 90%+ across all metrics

### Test Categories
- **Unit Tests**: 120+ tests
- **Integration Tests**: 20+ tests
- **Accessibility Tests**: 15+ tests
- **Performance Tests**: 10+ tests

---

## 🎯 Best Practices

### Writing Tests
1. **Test Behavior, Not Implementation**
   ```javascript
   // Good: Test what user sees
   expect(screen.getByText('5')).toBeInTheDocument()
   
   // Avoid: Test internal state
   expect(component.state.value).toBe('5')
   ```

2. **Use Descriptive Test Names**
   ```javascript
   // Good
   it('displays error when mobile number is invalid')
   
   // Avoid
   it('validation test')
   ```

3. **Arrange, Act, Assert Pattern**
   ```javascript
   it('performs addition correctly', () => {
     // Arrange
     render(<Calculator />)
     
     // Act
     fireEvent.click(screen.getByText('5'))
     fireEvent.click(screen.getByText('+'))
     fireEvent.click(screen.getByText('3'))
     fireEvent.click(screen.getByText('='))
     
     // Assert
     expect(screen.getByText('8')).toBeInTheDocument()
   })
   ```

### Test Organization
- Group related tests with `describe`
- Use `beforeEach` for common setup
- Keep tests focused and independent
- Test one thing at a time

### Performance Testing
- Test render performance
- Test interaction responsiveness
- Test memory usage
- Test with large datasets

---

## 🔄 Continuous Integration

### GitHub Actions
```yaml
- name: Run Tests
  run: npm test
  
- name: Upload Coverage
  uses: codecov/codecov-action@v1
```

### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test"
    }
  }
}
```

---

## 📚 Testing Resources

### Documentation
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

### Learning Resources
- [Testing JavaScript](https://testingjavascript.com/)
- [React Testing Patterns](https://react-testing-examples.com/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

This testing documentation ensures comprehensive coverage and maintainable test suites for the React Calculator project.
