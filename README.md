# WildTrails Zoo Management System

A comprehensive Next.js 14 application for managing a modern zoo, featuring an interactive visitor portal and a robust administrative backend.

## Tech Stack
- **Next.js 14** (App Router)
- **React** & **TypeScript**
- **Tailwind CSS** (Styling)
- **Lucide React** (Icons)
- **Leaflet & React-Leaflet** (Interactive Map)
- **Recharts** (Admin Dashboards & Payroll)
- **MySQL2** (Database)
- **jose** (JWT Authentication via cookies)
- **bcryptjs** (Password Hashing)

## Setup Instructions

1. **Clone the repository** and navigate to the project folder.
2. **Install Dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=zoo_management
   JWT_SECRET=supersecretjwtkey
   NEXTAUTH_SECRET=supersecretnextauth
   ```
4. **Setup the Database**:
   Open MySQL Workbench (or your preferred SQL client) and run the scripts in this order:
   - Execute `sql/schema.sql` to create the tables.
   - Execute `sql/seed.sql` to populate the database with zones, animals, users, and employees.
5. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:3000`.

## Default Login Credentials
These are populated from the seed script:

- **Admin Account**: 
  - Email: `admin@zoo.com` 
  - Password: `password`
- **Visitor Account**: 
  - Email: `visitor@example.com` 
  - Password: `password`

## Folder Structure Overview
- `/app` - Next.js App Router pages and API routes.
  - `/api` - Backend API endpoints (auth, admin, zones, tickets, etc.).
  - `/admin` - Secure admin dashboard pages.
  - `/visitor` - Secure visitor portal pages.
- `/components` - Reusable React components (Navbar, Sidebar, Map).
- `/lib` - Core utilities (DB connection, Auth middleware).
- `/sql` - Database schema and seed scripts.
- `/public` - Static assets and animal images.

## Managing Animal Images
To add or update animal images:
1. Place the image file in the `/public/animal_images/` directory.
2. Update the `image_filename` column in the `animals` database table to match the exact filename (e.g., `lion.jpg`).
