import { useState, useEffect, useRef } from 'react'

export const useTimer = (initialTime = 30) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false)
            return 0
          }
          return time - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isActive, timeLeft])

  const startTimer = (time = initialTime) => {
    setTimeLeft(time)
    setIsActive(true)
  }

  const stopTimer = () => {
    setIsActive(false)
    clearInterval(intervalRef.current)
  }

  const resetTimer = (time = initialTime) => {
    setTimeLeft(time)
    setIsActive(false)
    clearInterval(intervalRef.current)
  }

  return {
    timeLeft,
    isActive,
    startTimer,
    stopTimer,
    resetTimer,
    isFinished: timeLeft === 0 && !isActive
  }
}
