// On importe les outils nécessaires
import React from 'react'
import { useSidebarStore } from '../../Store/useSideBarStore'
import { AudioLines, UserRoundCog } from 'lucide-react'; // Icône d'utilisateur

export const TopBar = () => {
    // On vérifie si la barre latérale est ouverte
    const isOpen = useSidebarStore(state => state.isOpen);

    return (
        <nav className={`
            bg-secondary py-2 
            ${isOpen ? "pl-[265px]" : "pl-16"} // Si ouvert, on décale à droite
            px-6 w-full flex justify-between items-center
        `}>
            <div>
                <h3 className="text-gray-100 flex items-center gap-2">
                    <AudioLines className="size-5" />
                    <span className="hidden md:inline lg:inline">Sound</span>
                </h3>
            </div>

            <div className="flex flex-row gap-4 items-center">
                {/* Bouton des paramètres utilisateur */}
                <div className="p-2 rounded-full cursor-pointer hover:scale-105">
                    <UserRoundCog className="size-5 text-gray-100" />
                </div>
            </div>
        </nav>
    )
}
