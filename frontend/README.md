# Murali Ragavan | The Marvelous Photography

A premium, modern photographer portfolio website built to showcase luxury, cinematic, editorial, and artistic photography. 

## 🚀 Tech Stack

- **Framework**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (v4)
- **Animations**: Framer Motion
- **Routing**: React Router DOM
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

## ✨ Core Features Implemented

1. **Cinematic Hero Section** 
   - A full-screen, high-resolution photography background.
   - Elegant burgundy gradient overlay ensuring the bold "THE MARVELOUS PHOTOGRAPHY" branding pops effortlessly.
2. **Project Portfolio Gallery**
   - Dynamic category filtering (`ALL`, `WEDDING`, `ENGAGEMENT`, `MATERNITY`, `BIRTHDAY CELEBRATION`).
   - Custom-built accessible lightbox component for viewing high-res project images.
3. **Services & Offerings**
   - Premium horizontal layout for services (Traditional Photography, Candid Photography, Candid Videography, Album).
   - Rich micro-interactions: arrow movement, typography transitions, and a cinematic image reveal on hover.
4. **About Page**
   - Deep dive into the photographer's philosophy, biography, and experience with a sophisticated editorial layout.
5. **Contact Integration**
   - Premium form interface structurally integrated with **EmailJS** allowing seamless inquiry capturing (awaiting the user's API credentials).
6. **Smooth Animations**
   - Framer Motion integrated across the entire app for page transitions, scroll-triggered reveals, and hover micro-animations.

## 📂 Project Architecture

```text
frontend/
├── public/                # Static assets (hero image, favicon, icons)
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx     # Master wrapper with ScrollToTop behavior
│   │   └── Navbar.jsx     # Responsive sticky navigation
│   ├── data/              
│   │   └── portfolioService.js # Centralized mock database for projects & services
│   ├── pages/             # Page components
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Portfolio.jsx  # Project listing page
│   │   ├── ProjectDetails.jsx
│   │   └── Services.jsx
│   ├── App.jsx            # Application routing setup
│   ├── index.css          # Tailwind base configuration
│   └── main.jsx           # React entry point
├── .gitignore             # Ignored build & credential files
├── package.json           # Dependencies
├── postcss.config.js      # PostCSS config
├── tailwind.config.js     # Tailwind design tokens
└── vite.config.js         # Vite bundler configuration
```

## 🛠 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Run Development Server**
   ```bash
   npm run dev
   ```
3. **Build for Production**
   ```bash
   npm run build
   ```
