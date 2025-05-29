# React Calculator Web Application

A modern, responsive calculator built with React.js featuring a dual display system and keyboard support.

## 🚀 Features

### ✅ Completed Features
- **Basic Arithmetic Operations**: Addition (+), Subtraction (-), Multiplication (×), Division (÷)
- **Dual Display System**:
  - Expression display (shows calculation being built)
  - Result display (shows current number or final result)
- **Input Methods**:
  - Mouse/touch button clicks
  - Full keyboard support
- **Calculator Functions**:
  - Clear (C) - Reset everything
  - Clear Entry (CE) - Clear current input
  - Plus/minus toggle (±)
  - Decimal point support
- **Modern UI/UX**:
  - Responsive design for mobile and desktop
  - Gradient backgrounds and modern styling
  - Hover and active button states
  - Professional color scheme

## 🛠️ Technology Stack

- **Frontend Framework**: React.js with Hooks
- **Build Tool**: Vite
- **Styling**: CSS3 with Grid and Flexbox
- **JavaScript**: Modern ES6+ features
- **Architecture**: Component-based design

## 📁 Project Structure

```
calculator-app/
├── src/
│   ├── components/
│   │   ├── Calculator.jsx      # Main calculator logic and state
│   │   ├── Display.jsx         # Dual display component
│   │   ├── Button.jsx          # Reusable button component
│   │   └── ButtonGrid.jsx      # Button layout grid
│   ├── styles/
│   │   └── Calculator.css      # Calculator-specific styles
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App-level styles
│   └── index.css               # Global styles
├── public/
├── package.json
└── README.md
```

## 🎯 Usage Example

1. **Type "80"** → Display shows: `80`
2. **Click "+"** → Expression shows: `80 +`, Display shows: `80`
3. **Type "5"** → Expression shows: `80 + 5`, Display shows: `5`
4. **Click "="** → Expression shows: `80 + 5 =`, Display shows: `85`

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Input numbers |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `Enter` or `=` | Calculate result |
| `Escape` or `C` | Clear calculator |
| `Backspace` | Delete last digit |
| `.` | Decimal point |

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone or navigate to project directory
cd calculator-app

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173/
```

### Build for Production
```bash
npm run build
```

## 🔗 Related Jira Tasks

This project can be connected to the following Jira tasks:

### Current Tasks
- **AE-178**: Runtime permission handling and play store build generation setup
  - *Potential mobile app conversion*
- **AE-168**: Product dashboard screen- New Image crop library Integration for OCR
  - *Shared UI/UX patterns and component architecture*

### Suggested New Task
**Project**: Auto eVantage (AE)
**Summary**: React Calculator Web Application Development
**Type**: Task
**Priority**: Medium

## 📱 Responsive Design

The calculator is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

## 🎨 Design Features

- **Modern Gradient Backgrounds**: Professional blue-purple gradient
- **3D Button Effects**: Subtle shadows and hover animations
- **Clean Typography**: Segoe UI font family
- **Accessible Colors**: High contrast for readability
- **Touch-Friendly**: Large buttons for mobile use

## 🔧 Development Notes

- Uses React functional components with hooks
- State management for calculator operations
- Event handling for both mouse and keyboard input
- CSS Grid for responsive button layout
- Error handling for edge cases (division by zero)
- Number formatting for large/small values

---

**Developed with Augment Code** - [Learn More](https://www.augmentcode.com)
