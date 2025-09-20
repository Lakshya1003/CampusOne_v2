# Campus Bloom - College ERP System

Campus Bloom is a comprehensive, modern Enterprise Resource Planning (ERP) system designed to streamline the administrative and academic processes of educational institutions. This platform offers a unified solution for students, faculty, and administrators, covering various aspects from admissions and attendance to examinations and hostel management.

## Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## About The Project

This project aims to provide an efficient and user-friendly system for managing college operations. It consists of a web-based frontend for administrators and students, a robust backend server, and a native Android application for mobile access. The system is built with modern web technologies, ensuring scalability, security, and a rich user experience. For a detailed understanding of the system requirements, please refer to the `SRS/College ERP System.pdf` document.

## Features

### Admin Module
- **Admission Management:** Process and approve student admissions.
- **Analytics & Reporting:** Gain insights into college performance.
- **Attendance Tracking:** Monitor student and staff attendance.
- **Exam Management:** Schedule exams, upload results, and manage grades.
- **Fee Management:** Track and manage student fees and payments (integrated with Stripe).
- **Hostel Allocation:** Manage hostel rooms and student allocations.
- **Notifications:** Send important announcements and updates.
- **Settings:** Configure system-wide parameters.

### Student Module
- **Dashboard:** Personalized overview of academic progress, attendance, and fees.
- **Course Enrollment:** View and enroll in available courses.
- **Exam Results:** Access personal exam scores.
- **Fee Payment:** Make online fee payments.
- **Profile Management:** Update personal information.

### General Features
- **User Authentication:** Secure login and registration for different user roles (powered by Clerk).
- **Responsive Design:** Accessible across various devices.
- **Data Management:** Efficient storage and retrieval of institutional data using MongoDB.

## Tech Stack

### Frontend (Web)
- **Framework:** React.js
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui (Radix UI)
- **State Management:** React Query
- **Routing:** React Router DOM
- **Authentication:** Clerk
- **Payments:** Stripe (via `@stripe/react-stripe-js`)
- **Analytics:** Google Analytics 4 (react-ga4)

### Backend
- **Runtime:** Node.js (implied by `server/index.ts` and `package.json` dependencies)
- **Language:** TypeScript
- **Database Driver:** MongoDB

### Database
- **NoSQL Database:** MongoDB

### Mobile
- **Platform:** Android
- **Language:** Kotlin

### Tooling
- **Package Manager/Runtime:** Bun
- **Linting:** ESLint
- **Form Management:** React Hook Form, Zod
- **Date Handling:** date-fns

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed on your system:
- Git
- Bun (or Node.js and npm/yarn)
- MongoDB (running locally or accessible via a connection string)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/campus-bloom-16.git
    cd campus-bloom-16
    ```
2.  **Install dependencies:**
    ```bash
    bun install
    # or if using npm: npm install
    # or if using yarn: yarn install
    ```

### Environment Variables

Create a `.env.local` file in the root of the `campus-bloom-16` directory by copying the `.env` file and filling in the necessary details.

```
# Example .env.local content
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
MONGODB_URI=mongodb://localhost:27017/campusbloom
STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_GOOGLE_ANALYTICS_ID=your_ga4_id
# Add any other environment variables required by your backend or frontend
```

### Running the Application

1.  **Start the development server:**
    ```bash
    bun dev
    # or if using npm: npm run dev
    ```
    This will start the frontend application, usually accessible at `http://localhost:5173`.

2.  **Start the backend server:**
    (Instructions for starting the backend server would go here, assuming `server/index.ts` is the entry point. This might involve a separate `bun run start-server` command if defined in `package.json` or `ts-node server/index.ts`.)

3.  **Run the Android application:**
    Navigate to the `android_app` directory and follow standard Android development practices to build and run the app on an emulator or device.

## Project Structure

- `public/`: Static assets.
- `server/`: Backend server code (Node.js/TypeScript).
- `src/`: Frontend React application source code.
  - `src/assets/`: Images and other media.
  - `src/components/`: Reusable React components.
    - `src/components/admin/`: Components specific to the admin dashboard.
    - `src/components/ui/`: Shadcn/ui components.
  - `src/hooks/`: Custom React hooks.
  - `src/lib/`: Utility functions, API integrations (MongoDB, Stripe, AI).
  - `src/pages/`: Main application pages (AdminDashboard, StudentDashboard, etc.).
- `android_app/`: Native Android application source code (Kotlin).
- `SRS/`: Software Requirements Specification document.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
