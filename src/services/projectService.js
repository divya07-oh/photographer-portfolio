import { supabase } from './supabase';

const BUCKET_NAME = 'photography';

// Helper to map DB snake_case to UI camelCase
const mapToUI = (dbProject, dbImages = []) => {
  if (!dbProject) return null;
  
  // Format images array for the UI
  const images = dbImages.map(img => ({
    id: img.id,
    url: img.image_url,
    // We don't have the File object since it's already uploaded
  }));

  return {
    id: dbProject.id,
    title: dbProject.title || '',
    category: dbProject.category || '',
    year: dbProject.year || '',
    description: dbProject.description || '',
    coverImage: dbProject.cover_image || null,
    images: images
  };
};

// Helper to map UI camelCase to DB snake_case (ignoring images/cover image which are handled separately)
const mapToDB = (uiProject) => {
  const { title, category, year, description } = uiProject;
  return {
    title,
    category,
    year,
    description
  };
};

// Helper to upload a single file
const uploadFile = async (projectId, file, isCover = false) => {
  const fileExt = file.name.split('.').pop();
  const uniqueName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  
  // As requested: photography/{projectId}/cover-{uniqueName} or {projectId}/{uniqueName}
  const filePath = isCover 
    ? `${projectId}/cover-${uniqueName}`
    : `${projectId}/${uniqueName}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file);

  if (error) {
    console.error('Storage upload error:', error);
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return publicUrl;
};

// Extract storage path from public URL to delete the file
const getStoragePathFromUrl = (url) => {
  if (!url) return null;
  try {
    // URL format: https://[project].supabase.co/storage/v1/object/public/photography/[path]
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split(`/public/${BUCKET_NAME}/`);
    if (pathParts.length > 1) {
      return pathParts[1];
    }
  } catch (e) {
    console.error('Error parsing URL for deletion:', e);
  }
  return null;
};

export const projectService = {
  // Get all projects
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase getProjects error:', error);
      throw error;
    }
    return (data || []).map(p => mapToUI(p, []));
  },

  // Get project by ID (includes fetching project_images)
  async getProjectById(id) {
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (projectError) {
      console.error('Supabase getProjectById error:', projectError);
      throw projectError;
    }

    const { data: images, error: imagesError } = await supabase
      .from('project_images')
      .select('*')
      .eq('project_id', id)
      .order('display_order', { ascending: true });

    if (imagesError) {
      console.error('Supabase getProjectImages error:', imagesError);
      throw imagesError;
    }

    return mapToUI(project, images || []);
  },

  // Create a new project
  async createProject(projectData) {
    // 1. Insert Project Record
    const dbPayload = mapToDB(projectData);
    const { data: newProject, error: projectError } = await supabase
      .from('projects')
      .insert([dbPayload])
      .select()
      .single();

    if (projectError) {
      console.error('Supabase createProject error:', projectError);
      throw projectError;
    }

    const projectId = newProject.id;
    let coverUrl = null;

    // 2. Upload Cover Image (if selected)
    if (projectData.coverImageFile) {
      coverUrl = await uploadFile(projectId, projectData.coverImageFile, true);
    }

    // Update project with cover_image URL
    if (coverUrl) {
      await supabase
        .from('projects')
        .update({ cover_image: coverUrl })
        .eq('id', projectId);
      
      newProject.cover_image = coverUrl;
    }

    // 3. Upload Project Images & Insert to project_images
    if (projectData.images && projectData.images.length > 0) {
      const imageRecords = [];
      
      for (let i = 0; i < projectData.images.length; i++) {
        const imgObj = projectData.images[i];
        if (imgObj.file) {
          const publicUrl = await uploadFile(projectId, imgObj.file, false);
          imageRecords.push({
            project_id: projectId,
            image_url: publicUrl,
            display_order: i
          });
        }
      }

      if (imageRecords.length > 0) {
        const { error: insertImagesError } = await supabase
          .from('project_images')
          .insert(imageRecords);
          
        if (insertImagesError) {
          console.error('Supabase insert project_images error:', insertImagesError);
          // Note: we don't fail the whole project creation here, but we log the error
        }
      }
    }

    return mapToUI(newProject, []); // Returning without full images array as it typically navigates away anyway
  },

  // Update an existing project
  async updateProject(id, updateData) {
    // 1. Process deletions
    if (updateData.deletedImages && updateData.deletedImages.length > 0) {
      for (const imgUrl of updateData.deletedImages) {
        // Delete from project_images
        await supabase
          .from('project_images')
          .delete()
          .eq('project_id', id)
          .eq('image_url', imgUrl);

        // Delete from Storage
        const filePath = getStoragePathFromUrl(imgUrl);
        if (filePath) {
          await supabase.storage.from(BUCKET_NAME).remove([filePath]);
        }
      }
    }

    // 2. Upload new cover image if changed
    let coverUrl = updateData.coverImage;
    if (updateData.coverImageFile) {
      // Delete old cover image from storage if it exists
      if (updateData.oldCoverImage) {
        const oldFilePath = getStoragePathFromUrl(updateData.oldCoverImage);
        if (oldFilePath) {
          await supabase.storage.from(BUCKET_NAME).remove([oldFilePath]);
        }
      }
      coverUrl = await uploadFile(id, updateData.coverImageFile, true);
    }

    // 3. Update Project Record
    const dbPayload = {
      ...mapToDB(updateData),
      cover_image: coverUrl || null
    };

    const { data: updatedProject, error: projectError } = await supabase
      .from('projects')
      .update(dbPayload)
      .eq('id', id)
      .select()
      .single();

    if (projectError) {
      console.error('Supabase updateProject error:', projectError);
      throw projectError;
    }

    // 4. Handle new images and reordering
    if (updateData.images) {
      // First, get all current project_images for this project to map IDs
      const { data: existingImages } = await supabase
        .from('project_images')
        .select('*')
        .eq('project_id', id);
        
      const existingImagesMap = {};
      if (existingImages) {
        existingImages.forEach(img => {
          existingImagesMap[img.image_url] = img.id;
        });
      }

      for (let i = 0; i < updateData.images.length; i++) {
        const imgObj = updateData.images[i];
        
        if (imgObj.file) {
          // This is a NEW image
          const publicUrl = await uploadFile(id, imgObj.file, false);
          await supabase
            .from('project_images')
            .insert([{
              project_id: id,
              image_url: publicUrl,
              display_order: i
            }]);
        } else {
          // This is an EXISTING image, just update its display_order if needed
          const recordId = existingImagesMap[imgObj.url];
          if (recordId) {
            await supabase
              .from('project_images')
              .update({ display_order: i })
              .eq('id', recordId);
          }
        }
      }
    }

    return mapToUI(updatedProject, []);
  },

  // Delete a project
  async deleteProject(id) {
    // Get project first to get cover image url
    const { data: project } = await supabase
      .from('projects')
      .select('cover_image')
      .eq('id', id)
      .single();

    // The ON DELETE CASCADE constraint will automatically delete project_images rows
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase deleteProject error:', error);
      throw error;
    }

    // Clean up Storage
    try {
      // Delete the whole folder by listing all files in it first
      const { data: files } = await supabase.storage.from(BUCKET_NAME).list(id);
      if (files && files.length > 0) {
        const filesToRemove = files.map(x => `${id}/${x.name}`);
        await supabase.storage.from(BUCKET_NAME).remove(filesToRemove);
      }
    } catch (e) {
      console.error('Failed to cleanup storage folder:', e);
    }

    return true;
  }
};
