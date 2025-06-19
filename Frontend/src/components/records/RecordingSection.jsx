import { useState, useEffect, useRef } from 'react';
import { Mic, Play, Check, Trash2 } from 'lucide-react';

// 🔁 Compatibilité navigateur
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export default function RecordingSection({
  isRecording,
  setIsRecording,
  recordingTime,
  setRecordingTime,
  onTranscriptionUpdate,
  hasTranscription,
  setAudioBlob
}) {
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const recognitionRef = useRef(null);


  // ⏱️ Timer
  const timerRef = useRef(null);

  useEffect(() => {
    if (!SpeechRecognition) {
      alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
    } else {
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = false;
      recog.lang = 'fr-FR';
    }

    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream?.getTracks().forEach(track => track.stop());
      }
      clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = e => audioChunksRef.current.push(e.data);

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      setAudioBlob(audioBlob);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    };

    mediaRecorderRef.current.start();

    // ✅ Initialiser et configurer SpeechRecognition ici
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("SpeechRecognition non supporté.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'fr-FR';

    recognition.onresult = (event) => {
      const result = Array.from(event.results)
        .map(r => r[0].transcript)
        .join(' ');
      console.log('Résultat brut:', result);
      onTranscriptionUpdate(result);
    };

    recognition.onerror = (event) => {
      console.error('Erreur recognition:', event.error);
    };

    recognition.start();

    // ✅ Sauvegarder la référence pour pouvoir le stopper plus tard
    recognitionRef.current = recognition;

    setIsRecording(true);
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  } catch (err) {
    console.error("Erreur micro :", err);
    alert("Micro non disponible.");
  }
};


  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    recognitionRef.current?.stop();

    mediaRecorderRef.current?.stream.getTracks().forEach(t => t.stop());

    setIsRecording(false);
    clearInterval(timerRef.current);
  };

  const handleReplay = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play();
    }
  };

  const handleDelete = () => {
    if (window.confirm("Supprimer l'enregistrement ?")) {
      onTranscriptionUpdate('');
      setRecordingTime(0);
      setAudioUrl(null);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mb-8">
      {audioUrl && <audio ref={audioRef} src={audioUrl} controls className="hidden" />}
      
      <div className="flex flex-col items-center justify-center mb-6">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
            isRecording 
              ? 'bg-red-100 text-red-600 animate-pulse' 
              : 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white'
          }`}
        >
          <Mic className="w-8 h-8" />
        </button>
        <p className="mt-3 text-sm text-gray-500">
          {isRecording ? `Enregistrement... ${formatTime(recordingTime)}` : 'Toucher pour parler'}
        </p>
      </div>

      <div className="flex justify-center space-x-6">
        <button 
          onClick={handleReplay}
          className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center disabled:opacity-50"
          disabled={!audioUrl}
        >
          <Play className="w-5 h-5" />
        </button>
        <button 
          onClick={stopRecording}
          className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center"
        >
          <Check className="w-5 h-5" />
        </button>
        <button 
          onClick={handleDelete}
          className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center"
          disabled={!audioUrl}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
