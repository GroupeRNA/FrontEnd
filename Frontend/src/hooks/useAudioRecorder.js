import { useState, useEffect } from 'react'

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  
  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
    
    return () => clearInterval(interval)
  }, [isRecording])
  
  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    // Actual recording implementation would go here
  }
  
  const stopRecording = () => {
    setIsRecording(false)
    // Stop recording implementation
  }
  
  return {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording
  }
}