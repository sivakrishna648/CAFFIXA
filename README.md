# CAFFIXA Project Documentation

## Setup Instructions

### Backend
1. `cd server`
2. `npm install`
3. Create `.env` from the provided template and add your `STRIPE_SECRET_KEY` and `MONGODB_URI`.
4. Seed the database: `node seed.js`
5. Start server: `npm start` (or `npm run dev` with nodemon)

### Frontend
1. `cd client`
2. `npm install`
3. Start dev server: `npm run dev`

## API Endpoints
- **Auth**: `POST /api/v1/auth/signup`, `POST /api/v1/auth/login`
- **Products**: `GET /api/v1/products`, `GET /api/v1/products/:id`
- **Orders**: `POST /api/v1/orders/checkout` (Requires Auth)

## Design System
- **Colors**: Luxury Coffee (#4a2c1d, #c68369), Cream (#F5F5DC), Deep Black (#0c0c0c)
- **Typography**: Playfair Display (Serif), Inter (Sans)
- **Effects**: GSAP Parallax, Three.js Particle System, Framer Motion Drawer
