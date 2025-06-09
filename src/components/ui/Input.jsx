import { forwardRef } from 'react'

const Input = forwardRef(({ 
  label, 
  error, 
  className = '', 
  prefix,
  suffix,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm font-medium">
              {prefix}
            </span>
          </div>
        )}
        
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-all duration-200 ease-in-out
            placeholder-gray-400 text-gray-900
            ${prefix ? 'pl-20' : ''}
            ${suffix ? 'pr-12' : ''}
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {suffix}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 animate-slide-up">
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
