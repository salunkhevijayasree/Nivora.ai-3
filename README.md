# 🏥 NIVORA AI — AI Smart Automation Hospital Workflow Platform

NIVORA AI is an enterprise-grade, end-to-end intelligent hospital workflow automation and patient care management platform. Designed to eliminate administrative bottlenecks, automate routine hospital tasks across the patient lifecycle, and provide a seamless mobile-first patient experience.

---

## 🌟 Key Features & Workflow Integration

### 1. 📲 Mobile-First Patient Portal
- **10-Tile Quick Access Home Screen**: Appointment booking, doctor directory, medical records, lab reports, medicine refill reminders, emergency SOS, digital bill payments, hospital map, health tips, and ABHA profile management.
- **📅 Doctor Appointment Booking**: Search by specialty, view real-time available time slots, book/reschedule appointments.
- **⏳ Live Queue & Token Tracker**: Real-time progress ring showing current token, estimated wait time, OPD location, and notification alerts.
- **📋 Electronic Medical Records**: ABHA-linked secure access to prescriptions, lab reports, X-rays/scans, and discharge summaries.
- **💊 Pharmacy & Dosage Reminders**: Daily medication schedule tracking, low-stock warnings, and one-tap refill requests.
- **🚑 One-Tap Emergency SOS**: High-priority ambulance dispatch with live GPS location sharing and ER bed pre-booking.
- **🗺️ Interactive Hospital Navigation**: Indoor department finder, floor plans, and QR-based routing.
- **🤖 Telemedicine & AI Assistant**: Symptom guidance, triage recommendations, secure chat, and video consultation.

### 2. ⚡ AI & Workflow Automation Engine
- **Intelligent Intake & OCR**: Document scanner redacting sensitive National ID numbers while outputting unique `MED-XXXXX` patient IDs.
- **AI Symptom Analysis & Smart Triage**: Powered by **Google Gemini 2.5 Flash SDK** for priority assessment (`Emergency`, `High`, `Medium`, `Low`).
- **AI Insurance Verification**: Instant coverage eligibility checks with automated confidence scoring.
- **Automated Itemized Billing**: Real-time aggregation of consultation fees, lab tests, pharmacy items, and copay deductions.
- **One-Click AI Discharge Summary**: E-signature signoff and automated post-care follow-up bot.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide React Icons, React Router v7
- **Backend:** Node.js, Express.js, TypeScript, Socket.io (Realtime Queue & SOS)
- **Database:** PostgreSQL / Supabase with Row Level Security (RLS)
- **AI SDK:** `@google/genai` (Google Gemini 2.5 Flash / Pro)
- **Validation & Security:** Zod schemas, CORS, JWT Auth, Dotenv

---

## 📁 Repository Structure

```
Nivora.AI/
├── client/                     # React + TypeScript Vite Frontend
│   ├── src/
│   │   ├── components/         # Layout, Navbar, Common UI components
│   │   ├── context/            # Theme & State Management
│   │   ├── pages/              # 10 Patient Portal Screens + Role Dashboards
│   │   ├── services/           # Supabase & Axios API Client
│   │   └── index.css           # Tailwind v4 Theme & Custom Animations
│   ├── .env.example
│   └── package.json
├── server/                     # Node.js + Express TypeScript Backend
│   ├── src/
│   │   ├── config/             # Supabase Admin & Environment setup
│   │   ├── services/           # Gemini AI SDK & State Machine Engine
│   │   └── index.ts            # Express & Socket.io entrypoint
│   ├── .env.example
│   └── package.json
└── supabase/                   # Database DDL & Seed Data
    ├── schema.sql              # 24 PostgreSQL Tables + RLS Policies
    └── seed.sql                # Complete Demo Hospital Dataset
```

---

## 🚀 Quick Start Guide

### 1. Clone the repository
```bash
git clone https://github.com/salunkhevijayasree/Nivora.ai.git
cd Nivora.ai
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` in both `client` and `server` folders and fill in your Supabase & Gemini API keys.

```bash
# Server (.env)
cp server/.env.example server/.env

# Client (.env)
cp client/.env.example client/.env
```

### 3. Install Dependencies
```bash
# Install Server Dependencies
cd server && npm install

# Install Client Dependencies
cd ../client && npm install
```

### 4. Run Development Servers
```bash
# Start Backend API Server (Port 5000)
cd server && npm run dev

# Start Frontend App (Port 5173)
cd client && npm run dev
```

---

## 🔒 Security & Privacy
- **National ID Redaction**: Sensitive government ID numbers are redacted prior to storage.
- **Row Level Security (RLS)**: Enforced across all 24 PostgreSQL tables in Supabase.
- **Environment Protection**: `.env` files are strictly excluded via `.gitignore`.
