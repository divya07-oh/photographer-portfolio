# Project Documentation

## Project Overview
The Marvelous Photography is a professional portfolio and project management web application built for Murali Ragavan. It features a public-facing showcase of photography projects (Weddings, Engagements, Maternity, etc.) and a secure administrative dashboard for managing content.

## System Architecture
The application follows a client-server architecture using a Single Page Application (SPA) approach:
- **Frontend:** React.js powered by Vite, utilizing React Router for navigation and Tailwind CSS for styling.
- **Backend/BaaS:** Supabase provides PostgreSQL database, Authentication, and Object Storage.
- **Data Flow:** The frontend communicates directly with Supabase via the `@supabase/supabase-js` client for database operations, file uploads, and user authentication.

## Public Portfolio
The public-facing side of the website is accessible to all visitors and includes:
- **Home:** Landing page with featured projects and services overview.
- **Portfolio:** A gallery of all photography projects, filterable by category.
- **Project Details:** Detailed view of a specific project, including a full image gallery and description.
- **About:** Information about the photographer, Murali Ragavan.
- **Services:** Detailed offerings such as Traditional, Candid Photography, and Album creation.
- **Contact:** Contact form and information.

## Project Management
The admin management side is restricted to authenticated users:
- **Dashboard:** Overview of the portfolio.
- **Projects List:** Table/Grid view to manage existing projects.
- **Add Project:** Interface to create a new project and upload images.
- **Edit Project:** Interface to modify project details, reorder images, and manage cover photos.
- **Admin Login:** Secure login portal to access the `/manage` routes.

## Supabase Authentication
Supabase Auth is utilized to secure the administrative area. The `ProtectedRoute` component wraps the `/manage` routes, checking the current session state via the Supabase client. Unauthenticated users are redirected to the `/admin-login` page.

## Database Schema

### `projects` Table
Stores the primary details of each photography project.
- `id`: Unique identifier (UUID).
- `title`: Project title.
- `category`: Category (e.g., WEDDING, ENGAGEMENT).
- `year`: Year of the project.
- `description`: Detailed text description.
- `cover_image`: URL to the cover image stored in Supabase Storage.
- `created_at`: Timestamp.

### `project_images` Table
Stores the gallery images associated with a project.
- `id`: Unique identifier.
- `project_id`: Foreign key referencing `projects.id`.
- `image_url`: URL to the image stored in Supabase Storage.
- `display_order`: Integer representing the order in which images are displayed.

## Storage
- **`photography` Storage bucket:** A Supabase Storage bucket used to store all uploaded images. Cover images are stored with a `cover-` prefix.

## Workflows

### Image Upload Flow
1. Admin selects files via the Add/Edit Project UI.
2. The `projectService` generates a unique filename and uploads the file to the `photography` bucket (`{projectId}/{uniqueName}`).
3. Supabase returns the public URL for the uploaded file.
4. The public URL is saved to the `projects` or `project_images` table.

### Image Display Flow
1. The frontend fetches project data, which includes the `image_url`.
2. The UI directly uses these public URLs in `<img>` tags.
3. If an image path is not a full HTTP URL, the system dynamically resolves it using `supabase.storage.from(BUCKET_NAME).getPublicUrl()`.

### Project CRUD Flow
- **Create:** Inserts the project record, uploads the cover image, updates the project with the cover URL, uploads gallery images, and inserts records into `project_images`.
- **Read:** `getProjects` fetches all projects and associated images. `getProjectById` fetches a single project and sorts images by `display_order`.
- **Update:** Deletes removed images from storage and DB, uploads new cover/gallery images, updates project details, and updates the `display_order` of existing images.
- **Delete:** Retrieves the project, deletes the project record (cascading deletes `project_images`), and removes the entire project folder from the `photography` bucket.

## Existing Routes
**Public Routes:**
- `/` - Home
- `/portfolio` - Portfolio Gallery
- `/portfolio/:projectId` - Project Details
- `/about` - About Page
- `/services` - Services Page
- `/contact` - Contact Page
- `/admin-login` - Authentication Portal

**Protected Routes (Management):**
- `/manage` - Dashboard
- `/manage/projects` - Project Management
- `/manage/projects/new` - Create Project
- `/manage/projects/:id/edit` - Edit Project

## Important Components & Services
- `src/services/supabase.js`: Initializes and exports the Supabase client.
- `src/services/projectService.js`: Contains all CRUD operations and storage logic.
- `src/components/Navbar.jsx` & `src/components/manage/Sidebar.jsx`: Main navigation components.
- `src/components/manage/ProtectedRoute.jsx`: Authentication wrapper for management routes.

## Technology Stack
- **Frontend Framework:** React 19
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4, clsx, tailwind-merge
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend/DB:** Supabase (supabase-js)
- **Build Tool:** Vite
- **Email Service:** EmailJS

## Development Setup
Ensure Node.js is installed.
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`

## Deployment
1. Build the production bundle: `npm run build`
2. The output will be generated in the `dist` directory, which can be deployed to static hosting providers like Vercel, Netlify, or similar platforms. Ensure environment variables are configured in the deployment environment.

## Future Improvements
- Implement pagination or infinite scrolling for the portfolio gallery.
- Add image optimization and compression before uploading to Supabase Storage.
- Introduce draft modes for projects before publishing.
- Enhance analytics tracking for portfolio views.
