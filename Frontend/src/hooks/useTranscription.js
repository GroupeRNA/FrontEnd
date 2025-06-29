import { useState } from 'react'

export function useTranscription() {
  const [transcription, setTranscription] = useState('')
  
  const updateTranscription = (text) => {
    setTranscription(text)
  }
  
  const clearTranscription = () => {
    setTranscription('')
  }
  
  return {
    transcription,
    updateTranscription,
    clearTranscription
  }
}