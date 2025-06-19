import { Plus, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const tagColors = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-yellow-100 text-yellow-800',
  'bg-red-100 text-red-800',
  'bg-purple-100 text-purple-800',
];

export default function TagsSection({ tags, setTags }) {
  const [newTag, setNewTag] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputVisible]);

  const addTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setNewTag('');
    }
    setInputVisible(false);
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTag();
    } else if (e.key === 'Escape') {
      setInputVisible(false);
      setNewTag('');
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span 
            key={tag}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              tagColors[index % tagColors.length]
            } flex items-center`}
          >
            {tag}
            <button 
              onClick={() => removeTag(tag)}
              className="ml-1.5 hover:scale-125 transition-transform"
              aria-label={`Supprimer le tag ${tag}`}
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
        
        {inputVisible ? (
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={addTag}
              className="text-sm border border-gray-300 rounded-full px-3 py-1 w-24 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Nouveau tag"
              maxLength={20}
            />
          </div>
        ) : (
          <button
            onClick={() => setInputVisible(true)}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Ajouter un tag"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}