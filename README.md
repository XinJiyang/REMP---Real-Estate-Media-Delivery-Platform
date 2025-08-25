# RECAM - Real Estate Media Delivery Platform  

## Overview  
RECAM is a real estate media delivery platform designed for **Photography Companies (Admin)** and **Real Estate Agents (Agent)**.  
- **Admin**: Create and manage listing cases, upload and distribute media, configure final showcase pages.  
- **Agent**: Select display media, edit showcase pages, preview and share the final property presentation.  

The goal is to improve the efficiency and quality of real estate media delivery.  

---

## Features  
- **Property Listings**: Create, edit, and manage property cases with status flow (Created → Pending → Delivered)  
- **Media Management**: Upload and manage photos, videos, floor plans, VR tours  
- **Agent Selection**: Agents can select final showcase media from uploaded assets  
- **Page Editor**: Visual editor for property description, images, floor plans, and agent contact info  
- **Preview & Sharing**: Generate preview pages, shareable links, and packaged downloads  
- **Role-Based Access Control**: Admin vs. Agent permissions  

---

## Tech Stack  

### Frontend  
- **React 19 + TypeScript + Vite**  
- **UI Frameworks**:  
  - Material UI (`@mui/material`)  
  - Radix UI (Dropdown, HoverCard, Toast)  
  - Tailwind CSS + tailwind-merge + tailwindcss-animate  
- **Routing & State**: `react-router-dom`  
- **Utilities**: Axios, js-cookie, lucide-react (icons)  

### Backend  
- **ASP.NET Core 7 Web API**  
- **Databases**:  
  - SQL Server with Entity Framework Core  
- **Security & Auth**: JWT + ASP.NET Identity  
- **Tools**: AutoMapper, FluentValidation, Swagger (OpenAPI)  

### Deployment  
- **Backend**: AWS Elastic Beanstalk (API hosting)  
- **Database**: AWS RDS (SQL Server)  
- **Frontend**: AWS S3 (static website hosting)  
- **Storage**: AWS S3 for frontend build assets + Azure Blob Storage for media  

---

## 📁 Project Structure

```bash
REMP/
└── src/
    ├── apis/                      # API wrappers
    ├── components/                # Reusable components
    │   ├── AgentContactComponents/
    │   ├── AgentPropertyComponents/
    │   ├── DashboardComponents/
    │   ├── EditPopupComponents/
    │   ├── ListingCaseComponents/
    │   └── PhotographyCompanyComponents/
    ├── ui/                        # UI elements (login, navbar, preview)
    ├── config/                    # Config files
    ├── hooks/                     # Custom React hooks
    ├── interface/                 # TypeScript interfaces
    ├── utils/                     # Utility functions
    ├── App.tsx / main.tsx         # Entry points
    └── Pages (Home, Dashboard, Preview, etc.)
```
```bash
REMP-API/
├── src/
├── Controllers/               # API controllers
├── Services/                  # Business logic layer
├── Repository/                # Data access layer
├── Domain/                    # Domain models
├── Data/                      # EF Core DbContext
├── Collection/                # MongoDB collections
├── DTOs/                      # Data Transfer Objects
├── Validators/                # FluentValidation rules
├── Mappers/                   # AutoMapper profiles
├── Exceptions/ Middlewares/   # Exception handling middleware
├── Common/ (Constants, Enums, Utilities)
├── Migrations/                # EF Core migrations
└── Tests/                     # Unit tests
```

---


