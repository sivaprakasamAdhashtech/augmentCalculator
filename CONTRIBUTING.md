# 🤝 Contributing to React Calculator

Thank you for your interest in contributing to the React Calculator project! This guide will help you get started with contributing to our codebase.

---

## 📋 Table of Contents

- [🚀 Getting Started](#-getting-started)
- [🔧 Development Setup](#-development-setup)
- [📝 Code Style](#-code-style)
- [🧪 Testing](#-testing)
- [📦 Pull Request Process](#-pull-request-process)
- [🐛 Bug Reports](#-bug-reports)
- [✨ Feature Requests](#-feature-requests)
- [📚 Documentation](#-documentation)
- [🎯 Project Goals](#-project-goals)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 14.0 or higher
- npm 6.0 or higher
- Git
- Code editor (VS Code recommended)

### Fork and Clone
1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/augmentCalculator.git
   cd augmentCalculator
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/sivaprakasamAdhashtech/augmentCalculator.git
   ```

---

## 🔧 Development Setup

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173/
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm test             # Run tests (when implemented)
```

### Project Structure
```
src/
├── components/      # React components
├── styles/         # CSS stylesheets
├── assets/         # Images and static files
├── App.jsx         # Main app component
└── main.jsx        # Entry point
```

---

## 📝 Code Style

### JavaScript/React Guidelines

1. **Use functional components** with hooks
   ```javascript
   // ✅ Good
   const Calculator = () => {
     const [display, setDisplay] = useState('0')
     return <div>{display}</div>
   }
   
   // ❌ Avoid
   class Calculator extends Component {
     // class component
   }
   ```

2. **Use descriptive variable names**
   ```javascript
   // ✅ Good
   const [isLoading, setIsLoading] = useState(false)
   const [mobileNumber, setMobileNumber] = useState('')
   
   // ❌ Avoid
   const [loading, setLoading] = useState(false)
   const [mobile, setMobile] = useState('')
   ```

3. **Destructure props and state**
   ```javascript
   // ✅ Good
   const Button = ({ value, onClick, type }) => {
     return <button onClick={() => onClick(value)}>{value}</button>
   }
   
   // ❌ Avoid
   const Button = (props) => {
     return <button onClick={() => props.onClick(props.value)}>{props.value}</button>
   }
   ```

### CSS Guidelines

1. **Use BEM-like naming convention**
   ```css
   /* ✅ Good */
   .calculator {}
   .calculator__display {}
   .calculator__button {}
   .calculator__button--operator {}
   
   /* ❌ Avoid */
   .calc {}
   .display {}
   .btn {}
   ```

2. **Group related properties**
   ```css
   /* ✅ Good */
   .button {
     /* Layout */
     display: flex;
     align-items: center;
     justify-content: center;
     
     /* Appearance */
     background: linear-gradient(145deg, #3498db, #2980b9);
     border: none;
     border-radius: 12px;
     
     /* Typography */
     font-size: 1.4rem;
     font-weight: 500;
     color: white;
     
     /* Interaction */
     cursor: pointer;
     transition: all 0.3s ease;
   }
   ```

3. **Use CSS custom properties for consistency**
   ```css
   :root {
     --primary-color: #3498db;
     --border-radius: 12px;
     --transition: all 0.3s ease;
   }
   ```

---

## 🧪 Testing

### Writing Tests
```javascript
// Example test structure
import { render, fireEvent, screen } from '@testing-library/react'
import Button from '../components/Button'

describe('Button Component', () => {
  test('renders button with correct text', () => {
    render(<Button value="5" onClick={() => {}} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })
  
  test('calls onClick when clicked', () => {
    const mockOnClick = jest.fn()
    render(<Button value="5" onClick={mockOnClick} />)
    
    fireEvent.click(screen.getByText('5'))
    expect(mockOnClick).toHaveBeenCalledWith('5')
  })
})
```

### Test Coverage
- Aim for 80%+ test coverage
- Test user interactions
- Test edge cases
- Test error conditions

---

## 📦 Pull Request Process

### Before Submitting

1. **Update your fork**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** following the code style guidelines

4. **Test your changes**:
   ```bash
   npm run lint
   npm run build
   npm test  # when tests are available
   ```

5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add memory functions to calculator"
   ```

### Commit Message Format
Use conventional commits format:
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(calculator): add memory functions (M+, M-, MR, MC)
fix(login): resolve mobile number validation issue
docs(readme): update installation instructions
style(button): improve hover animations
```

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Tested manually
- [ ] Added unit tests
- [ ] All tests pass

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

---

## 🐛 Bug Reports

### Before Reporting
1. **Search existing issues** to avoid duplicates
2. **Test with latest version**
3. **Try to reproduce** the issue

### Bug Report Template
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Enter '...'
4. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- Browser: [e.g., Chrome 91]
- Device: [e.g., iPhone 12, Desktop]
- Screen size: [e.g., 1920x1080]

**Screenshots**
Add screenshots if applicable

**Additional Context**
Any other relevant information
```

---

## ✨ Feature Requests

### Feature Request Template
```markdown
**Feature Description**
Clear description of the feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Other solutions you've considered

**Additional Context**
Mockups, examples, or references
```

### Feature Ideas
- Scientific calculator mode
- History of calculations
- Themes and customization
- Keyboard shortcuts help
- Unit conversions
- Memory functions
- Copy/paste support

---

## 📚 Documentation

### Documentation Standards
- Use clear, concise language
- Include code examples
- Add screenshots for UI features
- Keep documentation up-to-date
- Use proper markdown formatting

### Documentation Types
- **README.md**: Project overview
- **API.md**: Component and function documentation
- **COMPONENTS.md**: Detailed component guide
- **DEPLOYMENT.md**: Deployment instructions
- **CONTRIBUTING.md**: This file

---

## 🎯 Project Goals

### Current Priorities
1. **Stability**: Ensure all features work reliably
2. **Performance**: Optimize for speed and efficiency
3. **Accessibility**: Make the app usable for everyone
4. **Mobile Experience**: Perfect mobile responsiveness
5. **Code Quality**: Maintain clean, readable code

### Future Roadmap
- Scientific calculator functions
- Calculation history
- Themes and customization
- PWA capabilities
- Offline support
- Unit tests implementation

---

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes for significant contributions

---

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: For private inquiries

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to React Calculator! 🎉
