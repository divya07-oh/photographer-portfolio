# THE MARVELOUS PHOTOGRAPHY

## Project Overview
The Marvelous Photography is a professional, dynamic portfolio and content management system for Murali Ragavan. It serves both as a beautiful public-facing showcase of photography work and as a secure administrative dashboard for managing projects, images, and content.

## Main Features
### Public Portfolio Features
- **Responsive Design:** Fully responsive layout optimized for all devices.
- **Dynamic Gallery:** Filterable portfolio showcasing projects across various categories (Wedding, Engagement, Maternity, etc.).
- **Project Details:** Immersive project views with high-quality image galleries.
- **Smooth Animations:** Integrated page transitions and interactions using Framer Motion.
- **Contact Integration:** Direct contact form capabilities.

### Project Management Features
- **Secure Dashboard:** Authenticated administrative area for content management.
- **Project CRUD:** Full Create, Read, Update, and Delete capabilities for photography projects.
- **Image Management:** Upload, reorder, and manage project cover photos and gallery images.
- **Real-time Storage:** Direct integration with Supabase Storage for seamless media handling.

## Supabase Integration
The project relies on Supabase as its backend-as-a-service (BaaS) provider:
- **Database:** PostgreSQL database storing project metadata (`projects` table) and image relations (`project_images` table).
- **Authentication:** Secures the `/manage` routes, allowing only authorized access to the CMS.
- **Storage:** The `photography` bucket stores all uploaded cover images and gallery photos.

### Image Upload Flow
Images are uploaded directly from the client to the Supabase `photography` bucket. Once uploaded, the public URLs are retrieved and stored in the database, allowing for fast and direct rendering on the frontend.

## Technology Stack
- **Framework:** React 19
- **Build Tool:** Vite
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **Backend & Database:** Supabase (`@supabase/supabase-js`)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Email:** EmailJS

## Project Structure
```
├── frontend/
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable UI components (Public & Manage)
│   │   ├── data/         # Mock data and portfolio service adapters
│   │   ├── pages/        # Public and Management page components
│   │   ├── services/     # Supabase client and CRUD operations
│   │   ├── App.jsx       # Main application routing
│   │   └── main.jsx      # Entry point
│   ├── package.json      # Project dependencies
│   └── vite.config.js    # Vite configuration
└── PROJECT_DOCUMENTATION.md # Detailed implementation docs
```

## Installation
1. Clone the repository.
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Environment Variables
Create a `.env.local` file in the `frontend` directory with the following variables. (Do not use real keys in public repositories):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## Running the Project
To start the development server:
```bash
npm run dev
```

## Production Build
To create an optimized production build:
```bash
npm run build
```

## Author
Murali Raghavan / The Marvelous Photography
