import { X, GripVertical } from 'lucide-react';
import { useState } from 'react';

const ImagePreviewGrid = ({ images, onRemove, onReorder, isCover = false }) => {
  const [draggedIdx, setDraggedIdx] = useState(null);

  if (!images || images.length === 0) return null;

  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires setting data
    e.dataTransfer.setData('text/html', e.target);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIdx) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) return;
    
    if (onReorder) {
      onReorder(draggedIdx, targetIdx);
    }
    setDraggedIdx(null);
  };

  return (
    <div className={`grid gap-4 mt-4 ${isCover ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
      {images.map((img, idx) => (
        <div 
          key={img.id || idx} 
          className="relative group bg-dark/5 rounded-lg overflow-hidden aspect-square border border-dark/10"
          draggable={!isCover}
          onDragStart={(e) => handleDragStart(e, idx)}
          onDragOver={(e) => handleDragOver(e, idx)}
          onDrop={(e) => handleDrop(e, idx)}
        >
          <img 
            src={img.url || img} 
            alt="Preview" 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-2">
            <div className="flex justify-end">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  onRemove(img, idx);
                }}
                className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                title="Remove image"
              >
                <X size={14} />
              </button>
            </div>
            
            {!isCover && (
              <div className="flex justify-center text-white pb-2 cursor-move opacity-70 hover:opacity-100">
                <GripVertical size={20} />
              </div>
            )}
          </div>
          
          {isCover && (
            <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-cream text-[10px] uppercase tracking-widest text-center py-1 font-sans">
              Cover Image
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewGrid;
