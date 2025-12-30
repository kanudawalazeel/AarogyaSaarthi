**AarogyaSaarthi – Healthcare Equity for Everyone**

    AarogyaSaarthi is a web-App based healthcare platform designed to streamline interactions between patients, doctors, administrators, and pharmacies. The application focuses on improving healthcare accessibility, appointment management, and role-based dashboards through a modern and scalable web architecture.

    This project was developed as part of a hackathon with an emphasis on usability, modular UI design, and real-world healthcare workflows.

**Features**
    
    Multi-Role Access
       *Patient Dashboard
          -View personal details
          -Request doctor access
          -Track appointments
        
       *Doctor Dashboard
          -View assigned patients
          -Handle access requests
          -Manage appointments

       *Pharmacy Dashboard
          -Access prescription-related views

       *Admin Dashboard
          -System-level monitoring
          -User management overview

    Appointments Management
        -Book and view appointments
        -Role-based appointment access     
    
    Authentication UI
        -Login & authentication screens
        -Role-based navigation (UI-level)

    Modular & Scalable UI
        -Reusable components
        -Strong TypeScript typing
        -Clean separation of pages and dashboards

**TechStack**

    -React
    -Vite
    -TypeScript
    -shadcn-ui
    -Tailwind CSS
    
**Project Structure**

src/
├── pages/
│   ├── Auth.tsx
│   ├── Welcome.tsx
│   ├── AppointmentsPage.tsx
│   ├── PharmaciesPage.tsx
│   └── dashboards/
│       ├── AdminDashboard.tsx
│       ├── DoctorDashboard.tsx
│       ├── PatientDashboard.tsx
│       ├── PharmacyDashboard.tsx
│       └── DoctorPendingRequests.tsx
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx

**Installation & Setup**

    Prerequisites
        -Node.js (v16 or above)
        -npm or yarn

    Steps
        -npm install
        -npm run dev
    
    The Web-App will be available at:
        http://localhost:5173

**OR Simply tap on the link below to view our Project**
    https://stately-tartufo-dee5ee.netlify.app/


**Note**
    This project is a frontend prototype.
    For real-world deployement, backend services, authentication, and secure data storage would be required.
