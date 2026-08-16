import { AlertTriangle } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/50">
      <div className="bg-cream rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertTriangle className="text-red-600" size={24} />
          </div>
          <h3 className="text-xl font-serif text-dark mb-2">DELETE PROJECT?</h3>
          <p className="text-dark/70 font-light mb-6">
            "Are you sure you want to delete {title ? `"${title}"` : 'this project'}? This action cannot be undone."
          </p>
          <div className="flex flex-col-reverse sm:flex-row gap-4 w-full">
            <button 
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-dark/20 text-dark hover:bg-dark/5 transition-colors uppercase tracking-widest text-xs font-sans rounded"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-3 px-4 bg-red-600 text-white hover:bg-red-700 transition-colors uppercase tracking-widest text-xs font-sans rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
