# 🧮 React Calculator Web Application

<div align="center">

![Calculator Demo](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.0+-blue)
![Vite](https://img.shields.io/badge/Vite-5.0+-purple)
![License](https://img.shields.io/badge/License-MIT-green)

**A modern, responsive calculator built with React.js featuring authentication, dual display system, and comprehensive keyboard support.**

[🚀 Live Demo](#getting-started) • [📖 Documentation](#documentation) • [🐛 Report Bug](#contributing) • [✨ Request Feature](#contributing)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🔐 Authentication](#-authentication)
- [🧮 Calculator Features](#-calculator-features)
- [⌨️ Keyboard Shortcuts](#️-keyboard-shortcuts)
- [📱 Responsive Design](#-responsive-design)
- [🎨 UI/UX Design](#-uiux-design)
- [🔧 Development](#-development)
- [📚 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🔐 **Authentication System**
- **Secure Login**: Mobile number and password authentication
- **Input Validation**: Real-time validation with user feedback
- **Mobile Number**: 10-digit Indian mobile number format (+91)
- **Password Security**: Minimum 6 characters requirement
- **Session Management**: Login/logout functionality
- **Responsive Design**: Works seamlessly on all devices

### 🧮 **Calculator Features**
- **Basic Arithmetic**: Addition (+), Subtraction (-), Multiplication (×), Division (÷)
- **Dual Display System**:
  - **Expression Display**: Shows calculation being built (e.g., "80 + 5")
  - **Result Display**: Shows current number or final result (e.g., "85")
- **Advanced Functions**:
  - Clear (C) - Reset everything
  - Clear Entry (CE) - Clear current input only
  - Plus/minus toggle (±) - Change number sign
  - Decimal point support with validation
- **Input Methods**:
  - Mouse/touch button clicks
  - Complete keyboard support
  - Touch-friendly mobile interface

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Modern translucent login interface
- **Gradient Backgrounds**: Professional blue-purple gradients
- **3D Button Effects**: Subtle shadows and hover animations
- **Responsive Layout**: Adapts to desktop, tablet, and mobile
- **Accessibility**: High contrast colors and keyboard navigation
- **Loading States**: Visual feedback during operations

## 🛠️ Technology Stack

<table>
<tr>
<td><strong>Frontend</strong></td>
<td>React.js 18+ with Hooks, JSX</td>
</tr>
<tr>
<td><strong>Build Tool</strong></td>
<td>Vite 5+ (Fast HMR, ES modules)</td>
</tr>
<tr>
<td><strong>Styling</strong></td>
<td>CSS3, CSS Grid, Flexbox, Glassmorphism</td>
</tr>
<tr>
<td><strong>JavaScript</strong></td>
<td>ES6+, Async/Await, Destructuring</td>
</tr>
<tr>
<td><strong>State Management</strong></td>
<td>React useState Hook</td>
</tr>
<tr>
<td><strong>Version Control</strong></td>
<td>Git with GitHub integration</td>
</tr>
<tr>
<td><strong>Architecture</strong></td>
<td>Component-based, Modular design</td>
</tr>
</table>

---

## 🚀 Getting Started

### 📋 **Prerequisites**

- **Node.js**: Version 14.0 or higher
- **npm**: Version 6.0 or higher (or yarn)
- **Git**: For version control
- **Modern Browser**: Chrome, Firefox, Safari, Edge

### 🔧 **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/sivaprakasamAdhashtech/augmentCalculator.git
   cd augmentCalculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173/
   ```

### 🏗️ **Build for Production**

```bash
# Build the project
npm run build

# Preview production build
npm run preview

# Deploy to your hosting service
```

---

## 📁 Project Structure

```
calculator-app/
├── 📁 public/                 # Static assets
│   └── vite.svg
├── 📁 src/                    # Source code
│   ├── 📁 components/         # React components
│   │   ├── Calculator.jsx     # 🧮 Main calculator logic
│   │   ├── Display.jsx        # 📺 Dual display component
│   │   ├── Button.jsx         # 🔘 Reusable button component
│   │   ├── ButtonGrid.jsx     # 🔢 Button layout grid
│   │   └── Login.jsx          # 🔐 Authentication component
│   ├── 📁 styles/             # CSS stylesheets
│   │   ├── Calculator.css     # 🎨 Calculator styling
│   │   └── Login.css          # 🎨 Login styling
│   ├── 📁 assets/             # Images and icons
│   ├── App.jsx                # 🏠 Main application component
│   ├── App.css                # 🎨 Global app styles
│   ├── main.jsx               # ⚡ Application entry point
│   └── index.css              # 🎨 Global base styles
├── 📁 docs/                   # Documentation
├── 📄 package.json            # Dependencies and scripts
├── 📄 vite.config.js          # Vite configuration
├── 📄 README.md               # Project documentation
├── 📄 JIRA_INTEGRATION.md     # Jira integration guide
├── 📄 ROLLBACK_GUIDE.md       # Git rollback instructions
└── 📄 TODO.md.txt             # Task tracking
```

---

## 🔐 Authentication

### 🚪 **Login Process**

1. **Enter Mobile Number**: 10-digit Indian mobile number
2. **Enter Password**: Minimum 6 characters
3. **Validation**: Real-time input validation
4. **Login**: Secure authentication process

### 📱 **Demo Credentials**
```
Mobile Number: Any 10-digit number (e.g., 9876543210)
Password: Any password with 6+ characters (e.g., password123)
```

### ✅ **Validation Rules**
- **Mobile Number**: Exactly 10 digits, numbers only
- **Password**: Minimum 6 characters
- **Real-time Feedback**: Instant validation messages
- **Error Handling**: Clear error messages for invalid inputs

---

## 🧮 Calculator Features

### 🎯 **Usage Example**

<table>
<tr>
<th>Step</th>
<th>Action</th>
<th>Expression Display</th>
<th>Result Display</th>
</tr>
<tr>
<td>1</td>
<td>Type "80"</td>
<td><em>empty</em></td>
<td><code>80</code></td>
</tr>
<tr>
<td>2</td>
<td>Click "+"</td>
<td><code>80 +</code></td>
<td><code>80</code></td>
</tr>
<tr>
<td>3</td>
<td>Type "5"</td>
<td><code>80 + 5</code></td>
<td><code>5</code></td>
</tr>
<tr>
<td>4</td>
<td>Click "="</td>
<td><code>80 + 5 =</code></td>
<td><code>85</code></td>
</tr>
</table>

### 🔢 **Supported Operations**

| Operation | Symbol | Description | Example |
|-----------|--------|-------------|---------|
| Addition | `+` | Add two numbers | `5 + 3 = 8` |
| Subtraction | `-` | Subtract second from first | `8 - 3 = 5` |
| Multiplication | `×` | Multiply two numbers | `4 × 3 = 12` |
| Division | `÷` | Divide first by second | `12 ÷ 3 = 4` |
| Plus/Minus | `±` | Toggle number sign | `5 → -5` |
| Decimal | `.` | Add decimal point | `5.25` |
| Clear | `C` | Reset everything | `Clear all` |
| Clear Entry | `CE` | Clear current input | `Clear current` |

---

## ⌨️ Keyboard Shortcuts

<table>
<tr>
<th>Key</th>
<th>Action</th>
<th>Description</th>
</tr>
<tr>
<td><code>0-9</code></td>
<td>Input numbers</td>
<td>Enter numeric digits</td>
</tr>
<tr>
<td><code>+</code></td>
<td>Addition</td>
<td>Add operation</td>
</tr>
<tr>
<td><code>-</code></td>
<td>Subtraction</td>
<td>Subtract operation</td>
</tr>
<tr>
<td><code>*</code></td>
<td>Multiplication</td>
<td>Multiply operation</td>
</tr>
<tr>
<td><code>/</code></td>
<td>Division</td>
<td>Divide operation</td>
</tr>
<tr>
<td><code>Enter</code> or <code>=</code></td>
<td>Calculate</td>
<td>Execute calculation</td>
</tr>
<tr>
<td><code>Escape</code> or <code>C</code></td>
<td>Clear All</td>
<td>Reset calculator</td>
</tr>
<tr>
<td><code>Backspace</code></td>
<td>Delete</td>
<td>Remove last digit</td>
</tr>
<tr>
<td><code>.</code></td>
<td>Decimal</td>
<td>Add decimal point</td>
</tr>
</table>

---

## 📱 Responsive Design

### 📐 **Breakpoints**

<table>
<tr>
<th>Device</th>
<th>Screen Size</th>
<th>Layout</th>
<th>Features</th>
</tr>
<tr>
<td>🖥️ Desktop</td>
<td>1024px+</td>
<td>Full layout</td>
<td>All features, hover effects</td>
</tr>
<tr>
<td>💻 Laptop</td>
<td>768px - 1023px</td>
<td>Optimized layout</td>
<td>All features, responsive grid</td>
</tr>
<tr>
<td>📱 Tablet</td>
<td>481px - 767px</td>
<td>Touch-optimized</td>
<td>Larger buttons, touch-friendly</td>
</tr>
<tr>
<td>📱 Mobile</td>
<td>320px - 480px</td>
<td>Mobile-first</td>
<td>Compact layout, large touch targets</td>
</tr>
</table>

### 🎯 **Mobile Optimizations**
- **Touch-Friendly Buttons**: Minimum 44px touch targets
- **Readable Text**: Optimized font sizes for mobile
- **Gesture Support**: Touch and swipe interactions
- **Performance**: Optimized for mobile browsers

---

## 🎨 UI/UX Design

### 🎭 **Design System**

#### **Colors**
```css
Primary Gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Calculator Background: linear-gradient(145deg, #2c3e50, #34495e)
Display Background: linear-gradient(145deg, #1a1a1a, #2d2d2d)
Button Colors: Various gradients for different button types
```

#### **Typography**
```css
Font Family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
Display Font Size: 2.5rem (desktop), 2rem (mobile)
Button Font Size: 1.4rem (desktop), 1.2rem (mobile)
```

#### **Spacing**
```css
Container Padding: 20px (desktop), 15px (mobile)
Button Gap: 12px (desktop), 8px (mobile)
Border Radius: 12px (buttons), 20px (containers)
```

### 🎪 **Animations**
- **Button Hover**: Transform and shadow effects
- **Loading States**: Spinner animations
- **Transitions**: Smooth 0.3s ease transitions
- **Focus States**: Accessibility-friendly focus indicators

---

## 🔧 Development

### 🏗️ **Architecture**

```
App.jsx (Root Component)
├── Login.jsx (Authentication)
└── Calculator.jsx (Main Calculator)
    ├── Display.jsx (Dual Display)
    └── ButtonGrid.jsx (Button Layout)
        └── Button.jsx (Individual Buttons)
```

### 🔄 **State Management**

```javascript
// Authentication State
const [user, setUser] = useState(null)

// Calculator State
const [display, setDisplay] = useState('0')
const [previousValue, setPreviousValue] = useState(null)
const [operation, setOperation] = useState(null)
const [waitingForOperand, setWaitingForOperand] = useState(false)
const [expression, setExpression] = useState('')
```

### 🧪 **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### 🔍 **Code Quality**
- **ESLint**: Code linting and formatting
- **Component Structure**: Modular, reusable components
- **CSS Organization**: Separate stylesheets for each component
- **Error Handling**: Comprehensive error management

---

## 📚 Documentation

### 📖 **Available Documentation**

- **[README.md](README.md)**: Main project documentation
- **[JIRA_INTEGRATION.md](JIRA_INTEGRATION.md)**: Jira integration guide
- **[ROLLBACK_GUIDE.md](ROLLBACK_GUIDE.md)**: Git rollback instructions
- **[TODO.md.txt](TODO.md.txt)**: Task tracking and completion

### 🔗 **Related Links**

- **Repository**: [GitHub - augmentCalculator](https://github.com/sivaprakasamAdhashtech/augmentCalculator)
- **Issues**: [Report bugs or request features](https://github.com/sivaprakasamAdhashtech/augmentCalculator/issues)
- **Releases**: [View project releases](https://github.com/sivaprakasamAdhashtech/augmentCalculator/releases)

---

## 🤝 Contributing

### 🐛 **Bug Reports**
1. Check existing issues first
2. Create detailed bug report with steps to reproduce
3. Include browser/device information
4. Add screenshots if applicable

### ✨ **Feature Requests**
1. Search existing feature requests
2. Describe the feature and use case
3. Explain why it would be valuable
4. Consider implementation complexity

### 🔧 **Development Contributions**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### 📋 **License Summary**
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

---

## 🙏 Acknowledgments

- **React Team**: For the amazing React framework
- **Vite Team**: For the lightning-fast build tool
- **Augment Code**: For development assistance and guidance
- **Open Source Community**: For inspiration and best practices

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

**Made with ❤️ by [Adhash Tech](https://github.com/sivaprakasamAdhashtech)**

**Powered by [Augment Code](https://www.augmentcode.com)**

</div>
