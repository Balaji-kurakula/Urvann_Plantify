# 🌱 Urvann Plant Store - Frontend

A modern, responsive React application for browsing and purchasing plants online. Built with React, Vite, and Tailwind CSS.

## 🚀 Live Demo

- **Production:** [https://urvannplantify.vercel.app](https://urvannplantify.vercel.app)
- **Backend API:** [https://your-backend.up.railway.app/api](https://your-backend.up.railway.app/api)
-  **Backend Repo** : [ https://github.com/Balaji-kurakula/MiniPlantStore_Backend ]
## ✨ Features

- 🛍️ **Plant Catalog** - Browse plants with search and filtering
- ❤️ **Wishlist Management** - Save favorite plants for later
- 🛒 **Shopping Cart** - Add/remove plants with quantity control
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🔍 **Advanced Search** - Filter by category, availability, and price
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations
- ⚡ **Fast Performance** - Optimized with Vite and React 18
- 🌐 **Real-time Updates** - Dynamic cart and wishlist counters

## 🛠️ Tech Stack

- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM v6
- **State Management:** Context API + Custom Hooks
- **HTTP Client:** Fetch API
- **Icons:** Lucide React
- **Notifications:** React Toastify
- **Deployment:** Vercel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🚀 Getting Started

### 1. Clone the Repository

git clone https://github.com/yourusername/plant-store-frontend.git
cd plant-store-fronten

text

### 2. Install Dependencies

npm install

text

### 3. Environment Variables

Create a `.env.local` file in the root directory:

API Configuration
VITE_API_URL=http://localhost:5000/api

Environment
VITE_NODE_ENV=development

text

### 4. Start Development Server

npm run dev

text

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |

## 🏗️ Project Structure

frontend/
├── public/
│ ├── vite.svg
│ └── index.html
├── src/
│ ├── components/
│ │ ├── AddPlantForm.jsx
│ │ ├── CartPage.jsx
│ │ ├── NotFoundPage.jsx
│ │ ├── PlantCard.jsx
│ │ ├── PlantCatalog.jsx
│ │ └── WishlistPage.jsx
│ ├── context/
│ │ └── CartContext.js
│ ├── hooks/
│ │ └── useWishlist.js
│ ├── App.jsx
│ ├── App.css
│ └── main.jsx
├── vercel.json
├── package.json
├── tailwind.config.js
├── vite.config.js
text

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |
| `VITE_NODE_ENV` | Environment mode | `development` |

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard:**
   - `VITE_API_URL`: Your Railway backend URL
3. **Deploy automatically on every push to main branch**

### Manual Deployment

Build the project
npm run build

The dist/ folder contains the production build
text

## 🔧 Configuration

### Vite Configuration

The project uses a custom Vite configuration for React and development features:

// vite.config.js
export default defineConfig({
plugins: [react()
, serve
: { por
: 5173,

text

### Tailwind CSS

Custom Tailwind configuration with design system colors and utilities.

## 📱 Features Overview

### Plant Catalog
- Grid/list view toggle
- Search by name or scientific name
- Filter by categories (Indoor, Outdoor, Succulent, etc.)
- Filter by availability (In Stock Only)
- Sort by price, name, or date added

### Shopping Cart
- Add/remove plants
- Update quantities
- Persistent storage (survives page refresh)
- Real-time total calculation
- Checkout flow (placeholder)

### Wishlist
- Save favorite plants
- Remove from wishlist
- Add all wishlist items to the cart
- Persistent storage with backend sync

## 🐛 Troubleshooting

### Common Issues

**Build Errors:**
Clear node_modules and reinstall
rm -rf node_modules
np

text

**API Connection Issues:**
- Verify `VITE_API_URL` in environment variables
- Check if the backend server is running
- Verify CORS settings in backend

**Routing Issues on Deployment:**
- Ensure `vercel.json` is properly configured
- Check browser console for errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


Made with ❤️ and 🌱 by Balaji Kurakula
