import { UploadCloud, X } from 'lucide-react';
import { useCallback } from 'react';

const ImageUploader = ({ 
  label = "Upload Image", 
  multiple = false, 
  onUpload, 
  accept = "image/*"
}) => {

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newImages = newFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file), // Using local object URL as requested
        file: file
      }));
      onUpload(newImages);
    }
    // reset input so the same file can be selected again if removed
    e.target.value = null; 
  };

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      const newImages = newFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file),
        file: file
      }));
      onUpload(newImages);
    }
  }, [onUpload]);

  return (
    <div className="w-full">
      <label className="block font-sans text-xs tracking-widest text-dark/70 uppercase mb-2">
        {label}
      </label>
      <div 
        onDragOver={onDragOver}
        onDrop={onDrop}
        className="border-2 border-dashed border-dark/20 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-dark/5 transition-colors cursor-pointer group relative"
      >
        <UploadCloud size={32} className="text-dark/40 mb-3 group-hover:text-primary transition-colors" />
        <p className="text-sm text-dark/60 font-light mb-1">
          <span className="text-primary font-medium">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-dark/40 font-light">
          {multiple ? 'Support multiple images (JPEG, PNG, WEBP)' : 'Support single image (JPEG, PNG, WEBP)'}
        </p>
        <input 
          type="file" 
          accept={accept} 
          multiple={multiple} 
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
        />
      </div>
    </div>
  );
};

export default ImageUploader;
