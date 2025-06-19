import { create } from 'zustand';

export const useSidebarStore = create((set) => ({
  isOpen: true,
  toggleIsOpen: () => set(state => ({ isOpen: !state.isOpen })),

  folders: [
    { id: 'aujourdhui', name: "Aujourd'hui", notes: [] },
  ],

  addFolder: (name) =>
    set(state => ({
      folders: [...state.folders, { id: Date.now(), name, notes: [] }],
    })),

  addNoteToFolder: (folderId, note) =>
    set(state => ({
      folders: state.folders.map(f =>
        f.id === folderId ? { ...f, notes: [...f.notes, note] } : f
      ),
    })),
}));
