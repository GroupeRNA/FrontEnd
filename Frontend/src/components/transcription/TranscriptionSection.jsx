import { useState, useRef, useEffect } from 'react';
import { Edit2, Save } from 'lucide-react';

export default function TranscriptionSection({ transcription, onTranscriptionUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(transcription);
  const textareaRef = useRef(null);

  useEffect(() => {
    setEditedText(transcription);
  }, [transcription]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.value.length;
    }
  }, [isEditing]);

  const handleSaveEdit = () => {
    onTranscriptionUpdate(editedText);
    setIsEditing(false);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium text-gray-900">Transcription</h2>
        {transcription && !isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Éditer la transcription"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        )}
        {isEditing && (
          <button 
            onClick={handleSaveEdit}
            className="text-green-600 hover:text-green-800"
            aria-label="Sauvegarder les modifications"
          >
            <Save className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <div
        className={`bg-white p-4 rounded-lg shadow-sm border ${
          isEditing ? 'border-blue-300' : 'border-gray-200'
        } min-h-32`}
      >
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full h-32 p-2 text-gray-800 focus:outline-none resize-none"
          />
        ) : transcription ? (
          <p className="text-gray-800 whitespace-pre-line">{transcription}</p>
        ) : (
          <p className="text-gray-400">Votre transcription apparaîtra ici...</p>
        )}
      </div>
    </div>
  );
}