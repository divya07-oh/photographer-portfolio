# Murali Ragavan | The Marvelous Photography

A premium, modern photographer portfolio website built to showcase luxury, cinematic, editorial, and artistic photography. It serves both as a beautiful public-facing showcase of photography work and as a secure administrative dashboard for managing projects, images, and content.

## 🚀 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (v4)
- **Backend & Database**: Supabase (`@supabase/supabase-js`)
- **Animations**: Framer Motion
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **Email Service**: EmailJS

## 🎨 Design System & Aesthetics

The design communicates a **warm, elegant, cinematic, premium, editorial, and traditional** feel.

- **Primary Colors**: 
  - Deep Sandal Cream (`#E6D2B5`) - Main Background
  - Light Sandal (`#F0E2CC`)
  - Warm Beige (`#D4BFA0`)
  - Primary Burgundy (`#5A1F2B`) - Accents, Headings, Navigation
  - Deep Burgundy (`#3B111B`)
- **Typography**: 
  - *Serif*: Cormorant Garamond / Playfair Display (used for luxurious editorial headings)
  - *Sans-Serif*: Inter / DM Sans (used for clean body text and UI elements)

## ✨ Core Features

### Public Portfolio Features
1. **Cinematic Hero Section**: A full-screen, high-resolution photography background with an elegant burgundy gradient overlay ensuring the bold "THE MARVELOUS PHOTOGRAPHY" branding pops effortlessly.
2. **Project Portfolio Gallery**: Dynamic category filtering (`ALL`, `WEDDING`, `ENGAGEMENT`, `MATERNITY`, `BIRTHDAY CELEBRATION`).
3. **Project Details**: Custom-built accessible lightbox component for viewing high-res project images.
4. **Services & Offerings**: Premium horizontal layout for services with rich micro-interactions (arrow movement, typography transitions).
5. **About Page**: Deep dive into the photographer's philosophy, biography, and experience with a sophisticated editorial layout.
6. **Contact Integration**: Premium form interface structurally integrated with **EmailJS** allowing seamless inquiry capturing.
7. **Smooth Animations**: Framer Motion integrated across the entire app for page transitions, scroll-triggered reveals, and hover micro-animations.

### Project Management Features
- **Secure Dashboard:** Authenticated administrative area for content management.
- **Project CRUD:** Full Create, Read, Update, and Delete capabilities for photography projects.
- **Image Management:** Upload, reorder, and manage project cover photos and gallery images.
- **Real-time Storage:** Direct integration with Supabase Storage for seamless media handling.

## 💾 Supabase Integration
The project relies on Supabase as its backend-as-a-service (BaaS) provider:
- **Database:** PostgreSQL database storing project metadata (`projects` table) and image relations (`project_images` table).
- **Authentication:** Secures the `/manage` routes, allowing only authorized access to the CMS.
- **Storage:** The `photography` bucket stores all uploaded cover images and gallery photos.

### Image Upload Flow
Images are uploaded directly from the client to the Supabase `photography` bucket. Once uploaded, the public URLs are retrieved and stored in the database, allowing for fast and direct rendering on the frontend.

## 📂 Project Structure

```text
├── frontend/
│   ├── public/           # Static assets (hero image, favicon, icons, logo)
│   ├── src/
│   │   ├── components/   # Reusable UI components (Public & Manage)
│   │   ├── data/         # Mock data and portfolio service adapters
│   │   ├── pages/        # Public and Management page components
│   │   ├── services/     # Supabase client and CRUD operations
│   │   ├── App.jsx       # Main application routing
│   │   ├── index.css     # Tailwind base configuration
│   │   └── main.jsx      # React entry point
│   ├── .gitignore        # Ignored build & credential files
│   ├── package.json      # Project dependencies
│   └── vite.config.js    # Vite configuration
└── PROJECT_DOCUMENTATION.md # Detailed implementation docs
```

## 🛠 Getting Started

1. **Clone the repository** and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. **Install Dependencies**
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
