import { PanelLeft } from 'lucide-react'; // Icône de menu
import { useSidebarStore } from '../../Store/useSideBarStore';

const SideBar = () => {
  // On récupère l'état et la fonction pour ouvrir/fermer
  const isOpen = useSidebarStore(state => state.isOpen);
  const toggleIsOpen = useSidebarStore(state => state.toggleIsOpen);

  return (
    <div className="flex h-screen bg-secondary text-white relative">
      {/* La barre latérale principale */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-primary shadow-lg z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} // Animation
      `}>
        <div className="px-5 py-4 flex flex-row justify-between items-center">
          <h3 className="text-gray-100">Reco Sound</h3>
          {/* Bouton pour fermer */}
          <span onClick={toggleIsOpen} className="text-gray-100 cursor-pointer">
            <PanelLeft className="size-5" />
          </span>
        </div>
      </div>

      {/* Bouton pour rouvrir si la barre est fermée */}
      {!isOpen && (
        <span onClick={toggleIsOpen} className="fixed top-4 left-5 z-50 cursor-pointer">
          <PanelLeft className="size-5 text-gray-100" />
        </span>
      )}
    </div>
  );
};

export default SideBar;


