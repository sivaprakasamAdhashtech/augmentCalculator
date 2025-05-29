# 🚀 Deployment Guide

## 📋 Deployment Options

This guide covers multiple deployment strategies for the React Calculator application.

---

## 🌐 Vercel Deployment (Recommended)

### Why Vercel?
- **Zero Configuration**: Works out of the box with Vite
- **Automatic Deployments**: Deploy on every Git push
- **Global CDN**: Fast loading worldwide
- **Free Tier**: Perfect for personal projects

### Step-by-Step Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Project Directory**
   ```bash
   cd calculator-app
   vercel
   ```

4. **Follow the Prompts**
   ```
   ? Set up and deploy "calculator-app"? [Y/n] y
   ? Which scope do you want to deploy to? Your Account
   ? Link to existing project? [y/N] n
   ? What's your project's name? react-calculator
   ? In which directory is your code located? ./
   ```

5. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Automatic Deployments
Connect your GitHub repository for automatic deployments:

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub account
4. Select your repository
5. Configure build settings (auto-detected for Vite)

---

## 📦 Netlify Deployment

### Manual Deployment

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Your site is live!

### Git-based Deployment

1. **Connect Repository**
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Environment Variables** (if needed)
   ```
   NODE_VERSION=18
   ```

---

## 🐙 GitHub Pages

### Setup GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://sivaprakasamAdhashtech.github.io/augmentCalculator",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Configure Repository**
   - Go to repository Settings
   - Scroll to Pages section
   - Select "gh-pages" branch as source

---

## ☁️ AWS S3 + CloudFront

### S3 Static Website Hosting

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://your-calculator-app
   ```

3. **Upload Files**
   ```bash
   aws s3 sync dist/ s3://your-calculator-app --delete
   ```

4. **Configure Bucket for Website**
   ```bash
   aws s3 website s3://your-calculator-app \
     --index-document index.html \
     --error-document index.html
   ```

### CloudFront Distribution

1. **Create Distribution**
   - Origin: Your S3 bucket
   - Default Root Object: index.html
   - Error Pages: 404 → /index.html (for SPA routing)

2. **Custom Domain** (Optional)
   - Add CNAME record
   - Configure SSL certificate

---

## 🔧 Build Optimization

### Vite Build Configuration

**File:** `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  },
  base: './' // For relative paths
})
```

### Performance Optimizations

1. **Code Splitting**
   ```javascript
   // Lazy load components
   const Calculator = lazy(() => import('./components/Calculator'))
   ```

2. **Asset Optimization**
   ```javascript
   // Optimize images
   import logo from './assets/logo.svg?inline'
   ```

3. **Bundle Analysis**
   ```bash
   npm run build -- --analyze
   ```

---

## 🌍 Environment Configuration

### Environment Variables

**File:** `.env.production`
```
VITE_APP_NAME=React Calculator
VITE_API_URL=https://api.example.com
VITE_ENVIRONMENT=production
```

### Build-time Configuration
```javascript
// vite.config.js
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString())
  }
})
```

---

## 🔒 Security Considerations

### Content Security Policy
```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               script-src 'self';">
```

### HTTPS Configuration
```javascript
// Redirect HTTP to HTTPS
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`)
}
```

---

## 📊 Monitoring and Analytics

### Performance Monitoring
```javascript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

### Error Tracking
```javascript
// Error boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to monitoring service
    console.error('Calculator Error:', error, errorInfo)
  }
}
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

**File:** `.github/workflows/deploy.yml`
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

---

## 🧪 Pre-deployment Checklist

### Testing
- [ ] All unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing on different devices
- [ ] Cross-browser compatibility check
- [ ] Performance audit (Lighthouse)

### Security
- [ ] No sensitive data in code
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Security headers configured

### Performance
- [ ] Bundle size optimized
- [ ] Images compressed
- [ ] Lazy loading implemented
- [ ] Caching configured

### SEO & Accessibility
- [ ] Meta tags configured
- [ ] Accessibility audit passed
- [ ] Semantic HTML structure
- [ ] Keyboard navigation works

---

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Routing Issues (SPA)**
   ```javascript
   // Configure server for SPA
   // Redirect all routes to index.html
   ```

3. **Environment Variables Not Working**
   ```bash
   # Ensure variables start with VITE_
   VITE_API_URL=https://api.example.com
   ```

4. **Large Bundle Size**
   ```bash
   # Analyze bundle
   npm run build -- --analyze
   
   # Implement code splitting
   const Component = lazy(() => import('./Component'))
   ```

---

## 📈 Post-deployment

### Monitoring
- Set up uptime monitoring
- Configure error tracking
- Monitor performance metrics
- Track user analytics

### Maintenance
- Regular dependency updates
- Security patches
- Performance optimizations
- Feature updates

This deployment guide provides comprehensive instructions for deploying your React Calculator to various platforms with best practices for security, performance, and monitoring.
