import { PanelLeft, FolderPlus, FilePlus } from 'lucide-react';
import { useSidebarStore } from '../../Store/useSideBarStore';
import { useState } from 'react';

const SideBar = () => {
  const isOpen = useSidebarStore(state => state.isOpen);
  const toggleIsOpen = useSidebarStore(state => state.toggleIsOpen);
  const folders = useSidebarStore(state => state.folders);
  const addFolder = useSidebarStore(state => state.addFolder);
  const addNoteToFolder = useSidebarStore(state => state.addNoteToFolder);

  const [newFolderName, setNewFolderName] = useState('');
  const [newNotes, setNewNotes] = useState({});

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName);
      setNewFolderName('');
    }
  };

  const handleNoteChange = (folderId, value) => {
    setNewNotes(prev => ({ ...prev, [folderId]: value }));
  };

  const handleAddNote = (folderId) => {
    const noteText = newNotes[folderId]?.trim();
    if (noteText) {
      const note = {
        id: Date.now(),
        title: noteText,
        date: new Date().toLocaleDateString(),
      };
      addNoteToFolder(folderId, note);
      setNewNotes(prev => ({ ...prev, [folderId]: '' }));
    }
  };

  return (
    <div className="text-white relative">
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-primary z-40 shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="px-4 py-3 flex justify-between items-center bg-gray-800">
          <h3 className="text-white font-semibold">QuickNote</h3>
          <PanelLeft className="cursor-pointer" onClick={toggleIsOpen} />
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
          {/* Nouveau dossier */}
          <div className="mb-4">
            <input 
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddFolder()}
              placeholder="Nouveau dossier"
              className="w-full px-2 py-1 text-black rounded"
            />
            <button 
              onClick={handleAddFolder}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
            >
              <FolderPlus className="w-4 h-4" />
              Ajouter
            </button>
          </div>

          {/* Liste des dossiers + fichiers */}
          {folders.map(folder => (
            <div key={folder.id} className="mb-4">
              <h4 className="px-2 py-1 bg-gray-700 rounded">{folder.name}</h4>
              
              {/* Input ajout de fichier */}
              <div className="flex mt-1">
                <input 
                  value={newNotes[folder.id] || ''}
                  onChange={(e) => handleNoteChange(folder.id, e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNote(folder.id)}
                  placeholder="Nouveau fichier"
                  className="flex-1 text-black text-sm px-2 py-1 rounded-l"
                />
                <button 
                  onClick={() => handleAddNote(folder.id)}
                  className="bg-green-600 hover:bg-green-700 px-2 rounded-r"
                >
                  <FilePlus className="w-4 h-4" />
                </button>
              </div>

              {/* Liste des notes */}
              <ul className="mt-2 ml-2 space-y-1 text-sm">
                {folder.notes.map(note => (
                  <li key={note.id} className="pl-2 py-1 bg-gray-600 rounded">
                    📝 {note.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {!isOpen && (
        <span onClick={toggleIsOpen} className="fixed top-4 left-5 z-50 cursor-pointer">
          <PanelLeft className="size-5 text-gray-100" />
        </span>
      )}
    </div>
  );
};

export default SideBar;
