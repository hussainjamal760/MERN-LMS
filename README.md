# 📚 MERN Stack Learning Management System (LMS)
# Sheep Academy

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)]([https://your-live-demo-link.com](https://sheep-academy-v1.onrender.com/))

A comprehensive and scalable **Learning Management System** built with the **MERN stack** (MongoDB, Express.js, React/Next.js, Node.js). This platform offers a robust environment for instructors to publish courses and for students to purchase and consume content seamlessly.

## 🔗 Live Demo
Check out the live application here: **[Sheep Academy Live Demo]([https://sheep-academy-v1.onrender.com/])**
## 🚀 Key Features

* **Modern Frontend:** Built with **Next.js 16 (App Router)** and **React 19** for server-side rendering and high performance.
* **Secure Authentication:** Full authentication system using **NextAuth.js** and **JWT**, supporting Social Auth (Google/GitHub) and manual login.
* **State Management:** Utilizes **Redux Toolkit** for efficient global state management.
* **Real-time Communication:** Integrated **Socket.io** for real-time notifications, Q&A updates, and live interactions.
* **Video Streaming:** Optimized video player for course content consumption.
* **Payment Gateway:** Secure payment processing integrated with **Stripe**.
* **Advanced Analytics:** Interactive dashboards for administrators and instructors using **Recharts** to track user engagement and sales.
* **Caching & Performance:** Implements **Redis** for caching data to ensure low latency.
* **File Management:** Integration with **Cloudinary** for image and video storage.
* **Email Service:** Automated email notifications (account activation, order confirmation) using **Nodemailer** and **EJS** templates.
* **Security:** Enhanced security with standard practices including rate limiting and CORS configuration.

---

## 🛠️ Tech Stack

### Client-Side
* **Framework:** Next.js 16, React 19, TypeScript
* **Styling:** Tailwind CSS, Material UI (@mui/material), Emotion
* **State Management:** Redux Toolkit, React-Redux
* **Form Handling:** Formik, Yup
* **UI/UX:** Framer Motion, Lottie React, React Hot Toast

### Server-Side
* **Runtime:** Node.js
* **Framework:** Express.js, TypeScript
* **Database:** MongoDB (Mongoose)
* **Caching:** Redis (ioredis)
* **Real-Time Engine:** Socket.io
* **Storage:** Cloudinary
* **Payment:** Stripe
* **Templating:** EJS (for emails)

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally on your machine.

### Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (Latest LTS)
* [MongoDB](https://www.mongodb.com/) (Local or Atlas)
* [Redis](https://redis.io/)

### 1. Clone the Repository
```bash
git clone [https://github.com/hussainjamal760/mern-lms.git](https://github.com/hussainjamal760/mern-lms.git)
cd mern-lms 

2. Backend Configuration (Server)
Navigate to the server directory and install dependencies:

Bash
cd server
npm install

Here is the professional README.md file in English, tailored for your GitHub repository.

Markdown

# 📚 MERN Stack Learning Management System (LMS)

A comprehensive and scalable **Learning Management System** built with the **MERN stack** (MongoDB, Express.js, React/Next.js, Node.js). This platform offers a robust environment for instructors to publish courses and for students to purchase and consume content seamlessly.

## 🚀 Key Features

* **Modern Frontend:** Built with **Next.js 16 (App Router)** and **React 19** for server-side rendering and high performance.
* **Secure Authentication:** Full authentication system using **NextAuth.js** and **JWT**, supporting Social Auth (Google/GitHub) and manual login.
* **State Management:** Utilizes **Redux Toolkit** for efficient global state management.
* **Real-time Communication:** Integrated **Socket.io** for real-time notifications, Q&A updates, and live interactions.
* **Video Streaming:** Optimized video player for course content consumption.
* **Payment Gateway:** Secure payment processing integrated with **Stripe**.
* **Advanced Analytics:** Interactive dashboards for administrators and instructors using **Recharts** to track user engagement and sales.
* **Caching & Performance:** Implements **Redis** for caching data to ensure low latency.
* **File Management:** Integration with **Cloudinary** for image and video storage.
* **Email Service:** Automated email notifications (account activation, order confirmation) using **Nodemailer** and **EJS** templates.
* **Security:** Enhanced security with standard practices including rate limiting and CORS configuration.

---

## 🛠️ Tech Stack

### Client-Side
* **Framework:** Next.js 16, React 19, TypeScript
* **Styling:** Tailwind CSS, Material UI (@mui/material), Emotion
* **State Management:** Redux Toolkit, React-Redux
* **Form Handling:** Formik, Yup
* **UI/UX:** Framer Motion, Lottie React, React Hot Toast

### Server-Side
* **Runtime:** Node.js
* **Framework:** Express.js, TypeScript
* **Database:** MongoDB (Mongoose)
* **Caching:** Redis (ioredis)
* **Real-Time Engine:** Socket.io
* **Storage:** Cloudinary
* **Payment:** Stripe
* **Templating:** EJS (for emails)

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally on your machine.

### Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (Latest LTS)
* [MongoDB](https://www.mongodb.com/) (Local or Atlas)
* [Redis](https://redis.io/)

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/mern-lms.git](https://github.com/your-username/mern-lms.git)
cd mern-lms
2. Backend Configuration (Server)
Navigate to the server directory and install dependencies:

Bash

cd server
npm install
Environment Variables: Create a .env file in the server root directory and populate it with the following credentials:

Code snippet

PORT=8000
ORIGIN=["http://localhost:3000"]
DB_URL=mongodb+srv://<your-db-url>
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_SECRET_KEY=your_cloudinary_secret_key
REDIS_URL=your_redis_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
ACTIVATION_SECRET=your_activation_secret
ACCESS_TOKEN=your_access_token_secret
REFRESH_TOKEN=your_refresh_token_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_email_app_password
Start the Server:

Bash

npm run dev
3. Frontend Configuration (Client)
Open a new terminal, navigate to the client directory, and install dependencies:

Bash

cd client
npm install
Environment Variables: Create a .env.local file in the client root directory:

Code snippet

NEXT_PUBLIC_SERVER_URI=http://localhost:8000/api/v1
NEXT_PUBLIC_SOCKET_SERVER_URI=http://localhost:8000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
Start the Client:

Bash

npm run dev
Visit http://localhost:3000 in your browser to view the application.
