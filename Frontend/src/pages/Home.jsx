import { useState, useEffect } from 'react';
import RecordingSection from '../components/records/RecordingSection';
import TranscriptionSection from '../components/transcription/TranscriptionSection';
import TagsSection from '../components/tags/TagsSection';
import SaveButton from '../components/button/SaveButton';
import SideBar from '../components/SideBar/SideBar';

export default function Home() {
  const [transcription, setTranscription] = useState('');
  const [tags, setTags] = useState(['#Urgent', '#Idées']);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null); // 🆕
  const [notes, setNotes] = useState([]); // 🆕

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('quicknote-notes')) || [];
    setNotes(savedNotes);
  }, []);

  const handleSaveNote = async () => {
    const newNote = {
      id: Date.now(),
      transcription,
      tags,
      date: new Date().toLocaleString(),
      audioUrl: audioBlob ? URL.createObjectURL(audioBlob) : null
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('quicknote-notes', JSON.stringify(updatedNotes));

    setTranscription('');
    setRecordingTime(0);
    setAudioBlob(null);
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar/>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <RecordingSection 
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          recordingTime={recordingTime}
          setRecordingTime={setRecordingTime}
          onTranscriptionUpdate={setTranscription}
          hasTranscription={!!transcription}
          setAudioBlob={setAudioBlob} // 🆕
        />

        <TranscriptionSection 
          transcription={transcription} 
          onTranscriptionUpdate={setTranscription} 
        />

        <TagsSection tags={tags} setTags={setTags} />

        <SaveButton onClick={handleSaveNote} disabled={!transcription} />

        {/* Affichage historique */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Notes enregistrées</h3>
          {notes.length === 0 && <p className="text-gray-500">Aucune note enregistrée.</p>}
          {notes.map(note => (
            <div key={note.id} className="bg-white p-4 rounded-md shadow mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{note.date}</span>
                {note.audioUrl && (
                  <audio controls src={note.audioUrl} className="h-8" />
                )}
              </div>
              <p className="text-gray-800 whitespace-pre-wrap">{note.transcription}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {note.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-200 px-2 py-1 rounded-full text-xs text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
