import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../../services/projectService';
import ImageUploader from './ImageUploader';
import ImagePreviewGrid from './ImagePreviewGrid';

const CATEGORIES = ['Wedding', 'Engagement', 'Maternity', 'Birthday Celebration'];

const ProjectForm = ({ initialData, isEdit = false }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    category: CATEGORIES[0],
    year: new Date().getFullYear().toString(),
    description: '',
    coverImage: null,
    coverImageFile: null,
    oldCoverImage: null,
    images: [],
    deletedImages: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category: initialData.category || CATEGORIES[0],
        year: initialData.year || new Date().getFullYear().toString(),
        description: initialData.description || '',
        coverImage: initialData.coverImage || null,
        coverImageFile: null,
        oldCoverImage: initialData.coverImage || null,
        images: initialData.images || [],
        deletedImages: []
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Project title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.year.trim()) newErrors.year = 'Year is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleCoverUpload = (newImages) => {
    if (newImages.length > 0) {
      setFormData(prev => ({ 
        ...prev, 
        coverImage: newImages[0].url,
        coverImageFile: newImages[0].file
      }));
    }
  };

  const handlePhotosUpload = (newImages) => {
    setFormData(prev => ({ 
      ...prev, 
      images: [...prev.images, ...newImages] 
    }));
  };

  const handleRemoveCover = () => {
    setFormData(prev => ({ ...prev, coverImage: null, coverImageFile: null }));
  };

  const handleRemovePhoto = (img, idx) => {
    setFormData(prev => {
      // If it's an existing image (no 'file' property), we track it for deletion
      const newDeletedImages = [...prev.deletedImages];
      if (!img.file) {
        newDeletedImages.push(img.url);
      }
      return {
        ...prev,
        images: prev.images.filter((_, i) => i !== idx),
        deletedImages: newDeletedImages
      };
    });
  };

  const handleReorderPhotos = (sourceIdx, targetIdx) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      const [movedItem] = newImages.splice(sourceIdx, 1);
      newImages.splice(targetIdx, 0, movedItem);
      return { ...prev, images: newImages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      if (isEdit) {
        await projectService.updateProject(initialData.id, formData);
        setSuccessMessage('Project updated successfully!');
      } else {
        await projectService.createProject(formData);
        setSuccessMessage('Project created successfully!');
        // Redirect after short delay on create
        setTimeout(() => navigate('/manage/projects'), 1500);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'An error occurred while saving the project.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/50 border border-dark/10 rounded-lg shadow-sm p-6 md:p-8">
      
      {successMessage && (
        <div className="mb-6 bg-green-100 text-green-800 p-4 rounded border border-green-200">
          {successMessage}
        </div>
      )}
      
      {errors.submit && (
        <div className="mb-6 bg-red-100 text-red-800 p-4 rounded border border-red-200">
          {errors.submit}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block font-sans text-xs tracking-widest text-dark/70 uppercase mb-2">Project Title *</label>
          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-3 border rounded bg-white/50 focus:outline-none focus:border-primary font-light ${errors.title ? 'border-red-500' : 'border-dark/20'}`}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block font-sans text-xs tracking-widest text-dark/70 uppercase mb-2">Category *</label>
          <select 
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-dark/20 rounded bg-white/50 focus:outline-none focus:border-primary font-light appearance-none"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-sans text-xs tracking-widest text-dark/70 uppercase mb-2">Year *</label>
          <input 
            type="text" 
            name="year"
            value={formData.year}
            onChange={handleChange}
            className={`w-full p-3 border rounded bg-white/50 focus:outline-none focus:border-primary font-light ${errors.year ? 'border-red-500' : 'border-dark/20'}`}
          />
          {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
        </div>
      </div>

      <div className="mb-8">
        <label className="block font-sans text-xs tracking-widest text-dark/70 uppercase mb-2">Description</label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 border border-dark/20 rounded bg-white/50 focus:outline-none focus:border-primary font-light"
        ></textarea>
      </div>

      <div className="border-t border-dark/10 pt-8 mb-8">
        <h3 className="font-serif text-2xl text-dark mb-6">Cover Image</h3>
        {!formData.coverImage ? (
          <ImageUploader label="Upload Cover Image" multiple={false} onUpload={handleCoverUpload} />
        ) : (
          <ImagePreviewGrid 
            images={[formData.coverImage]} 
            onRemove={handleRemoveCover} 
            isCover={true} 
          />
        )}
      </div>

      <div className="border-t border-dark/10 pt-8 mb-8">
        <h3 className="font-serif text-2xl text-dark mb-6">Project Photos</h3>
        
        {formData.images.length > 0 && (
          <div className="mb-6">
            <h4 className="font-sans text-xs tracking-widest text-dark/70 uppercase mb-2">Existing Photos (Drag to Reorder)</h4>
            <ImagePreviewGrid 
              images={formData.images} 
              onRemove={handleRemovePhoto} 
              onReorder={handleReorderPhotos}
            />
          </div>
        )}
        
        <div className="mt-4">
          <ImageUploader label="Upload New Photos" multiple={true} onUpload={handlePhotosUpload} />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-dark/10">
        <button 
          type="button" 
          onClick={() => navigate('/manage/projects')}
          className="px-6 py-3 border border-dark/20 text-dark hover:bg-dark/5 transition-colors uppercase tracking-widest text-xs font-sans rounded"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="px-8 py-3 bg-primary text-cream hover:bg-dark transition-colors uppercase tracking-widest text-xs font-sans rounded disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : (isEdit ? 'Update Project' : 'Save Project')}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
