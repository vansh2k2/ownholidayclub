# Own Holiday Club (OHC) - Luxury Travel Management System

Welcome to the official repository for **Own Holiday Club**, a comprehensive digital platform designed for luxury travel memberships, destination management, and administrative operations.

## 🚀 Project Overview

Own Holiday Club is a high-end travel platform that connects members with exclusive holiday packages and premium services. The system is built with a decoupled architecture consisting of a high-performance frontend, a robust Node.js backend, and a feature-rich administrative dashboard.

---

## 🛠️ Tech Stack

### Frontend & Admin Panel
*   **Framework**: React.js (Vite)
*   **Styling**: Tailwind CSS & Vanilla CSS (Luxury Branding)
*   **State Management**: React Hooks & Context API
*   **Icons**: Lucide React
*   **Animations**: Framer Motion & CSS3 Transitions
*   **UI Components**: Custom-built modular components with a focus on premium aesthetics.

### Backend (Core)
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (Mongoose ODM)
*   **File Storage**: Cloudinary (Cloud-based asset management)
*   **Authentication**: JWT-based secure session management

---

## 📂 Project Structure

### 1. `frontend/` (Main Website)
The public-facing portal where users can explore destinations, view membership plans, and read blogs.
*   **Key Features**: Dynamic Hero Slider, Membership Tiers, Destination Listings, SEO-optimized Blog pages.

### 2. `backend-new/` (API Server)
The engine of the application, handling data processing, security, and integration with 3rd party services.
*   **Key Features**: Activity Logging System, Middleware for Admin authentication, Image processing via Cloudinary.

### 3. `admin-new/` (Management Panel)
The central command center for administrators.
*   **Key Features**:
    *   **Activity Logs**: Real-time audit trail tracking all administrative changes (Create, Update, Delete) with field-level details.
    *   **CMS Management**: Full control over Blogs, SEO Meta tags, Services, and Destinations.
    *   **Membership Control**: Manage tiers, features, and pricing dynamically.
    *   **Security**: Role-based access control and admin session logs.

---

## ⚙️ Setup & Installation

### Prerequisites
*   Node.js (v16+)
*   MongoDB Instance
*   Cloudinary Account

### 1. Backend Setup
1. Navigate to `backend-new/`
2. Install dependencies: `npm install`
3. Configure `.env`:
    ```env
    PORT=8080
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    CLOUDINARY_CLOUD_NAME=xxx
    CLOUDINARY_API_KEY=xxx
    CLOUDINARY_API_SECRET=xxx
    ```
4. Run: `npm start` (or `npm run dev`)

### 2. Admin & Frontend Setup
1. Navigate to the respective folder (`admin-new/` or `frontend/`)
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`

---

## 🛡️ Administrative Audit Trail
The project features a built-in **Activity Logging** mechanism. Every time an admin modifies a slide, blog, or setting, the system records:
*   **Who** made the change (Admin user).
*   **What** specific fields were changed (e.g., Title, Description, Image).
*   **When** it happened (Local execution time).
*   **Source IP** and User Agent for security auditing.

---

## 📄 License
Internal use only for Own Holiday Club.
