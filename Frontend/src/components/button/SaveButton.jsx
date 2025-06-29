import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

export default function SaveButton({ onClick }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleClick = async () => {
    setIsSaving(true);
    try {
      await onClick();
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isSaving}
      className={`w-full py-3 px-4 text-white font-medium rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isSaving ? 'bg-blue-400' : isSaved ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
      } flex items-center justify-center gap-2`}
    >
      {isSaving ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Enregistrement...
        </>
      ) : isSaved ? (
        <>
          <Check className="w-5 h-5" />
          Sauvegardé !
        </>
      ) : (
        'Enregistrer la note'
      )}
    </button>
  );
}