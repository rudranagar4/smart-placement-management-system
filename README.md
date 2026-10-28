# Ascend — Student Placement Management System

> A modern, production-grade campus recruitment web application engineered with **React, Vite, Tailwind CSS, Framer Motion, Lenis Smooth Scroll, Recharts, and Canvas Confetti**.

---

## 🌟 Key Features

### 1. 🎓 Student Module
- **Dashboard**: Welcome banner, animated count-up KPI cards (Applied, Shortlisted, Interviews, Offers), upcoming drives calendar, application pipeline chart, and skill-matched job recommendations.
- **Profile Readiness & Completeness**: Live SVG radial completeness ring meter, academic transcripts (10th, 12th, CGPA, backlogs), technical skills, projects, and certifications.
- **Automated Resume Builder**: ATS-friendly live resume generator with printable/downloadable format and upload support.
- **Browse Job Drives**: Search, multi-filtering (branch, package, location, role), and **automated instant eligibility checking** (Min CGPA, Backlogs, Allowed Branches).
- **One-Click Apply**: Seamless application submission with instant status reflection.
- **Application Pipeline Tracker**: Visual timeline tracker (`Applied` ➔ `Shortlisted` ➔ `Test Scheduled` ➔ `Interview Scheduled` ➔ `Offered` / `Rejected`).
- **Interview & Test Calendar**: Unified schedule view with direct links (Google Meet, Microsoft Teams, Campus Boardroom).
- **Offers Center**: Full CTC breakdown (base, bonus, stock grants) with **celebration confetti animation** on acceptance.
- **Placement Prep Hub**: Company-wise technical question bank, interactive timed aptitude quiz with instant scoring, and interview reviews shared by placed seniors.

### 2. 🏢 Company / Recruiter Module
- **Executive Hiring Console**: Funnel conversion chart, applicant volume tracking, active drive statuses.
- **Post Campus Drives**: Rich drive creation form with package details, branch filters, CGPA criteria, and custom selection rounds builder.
- **My Drives Oversight**: Active/closed drive toggling and applicant metrics.
- **Applicants Manager**: Filter candidates by CGPA, branch, or stage; advance applicants through rounds; schedule interviews; release formal offer letters; and **export candidate rosters to CSV**.

### 3. 🛡️ Training & Placement Officer (Admin) Module
- **Directorate Dashboard**: Institutional placement rate, highest & average package metrics, department-wise comparative charts, and urgent pending approvals.
- **Student Roster Management**: Verify academic documents, block/unblock students from drives, enroll new candidates, and export roster to CSV.
- **Corporate Accreditation**: Review and approve/reject partner companies.
- **Drive Governance**: Oversight and closing controls for all active company drives.
- **Broadcast Announcements**: Campus-wide circulars targeting all batches or specific engineering departments.
- **Institutional Analytics**: Department-wise average packages, salary tier distribution, and dedicated **unplaced student cohort tracking with 1-click mentoring invites**.
- **Audit Trail & Activity Logs**: Real-time logging of all actions for regulatory compliance.

### 4. 📱 Mobile Phone View Optimization
- **Thumb-Friendly Bottom Navigation**: Dedicated mobile bottom navigation bar enabling one-handed navigation between core views on smartphones.
- **Responsive Drawer Menu**: Smooth slide-over navigation drawer.
- **Touch-Optimized Elements**: Large tap targets, swipeable tags, and responsive cards.

### 5. 🎨 Design & Motion Aesthetics
- **Smooth Scrolling**: Powered by [Lenis](https://github.com/darkroomengineering/lenis) with natural easing.
- **Glassmorphism**: Translucent panels with backdrop-blur, subtle gradients, and liquid glow blobs.
- **Celebration Confetti**: Full-screen particle bursts upon accepting employment offers.
- **Dark / Light Mode**: Instant smooth theme switching with persistent user preference.
- **Interactive Role Switcher**: Quick-switch between Student, Recruiter, Admin, and Public views from the top navigation bar.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### Installation & Run

```bash
# Clone the repository / navigate to project directory
cd "c:/Users/rudra/OneDrive/Desktop/java oots"

# Install dependencies (if not already installed)
npm install

# Start local Vite development server
npm run dev
```

Visit **`http://localhost:5173/`** in your browser.

### Deploy to Vercel

The application is pre-configured for instant deployment on [Vercel](https://vercel.com):

1. Push this repository to GitHub: `https://github.com/rudranagar4/smart-placement-management-system`
2. Import the project in Vercel.
3. Keep default settings (`Framework: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
4. Click **Deploy**. The included `vercel.json` automatically manages client-side SPA routing and asset caching.

---

## 🔑 Demo Access Roles

Use the **Role Switcher** pill in the top-right navbar to test each perspective:

| Role | Demo Identity | Sample Capabilities |
|---|---|---|
| **Student** | Rudra Nagar (8.92 CGPA) | Browse drives, 1-click apply, view timeline, accept Google offer with confetti, build resume |
| **Recruiter** | Priya Nair (Google HR) | View applicants, advance stages, schedule interviews, post drives |
| **Admin** | Dr. K. S. Verma (Head, T&P) | Approve recruiters, verify students, monitor placement analytics, broadcast notices |
| **Public** | Guest Visitor | Landing page, placement statistics, recruiters catalog, about, contact |

