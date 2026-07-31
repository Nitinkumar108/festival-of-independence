# Festival of Independence — IYF Kolkata Website

Full-stack scaffold: React (Vite + Tailwind) frontend + Node.js (Express + Sequelize/PostgreSQL) backend.

```
festival-of-independence/
├── backend/                   Express API
│   ├── server.js              App entry point
│   ├── .env.example           Copy to .env and fill in real values
│   └── src/
│       ├── config/
│       │   ├── db.js          Sequelize/PostgreSQL connection
│       │   └── syncDb.js      Creates tables + seeds first admin (npm run db:sync)
│       ├── models/            Student, Admin, College, Payment, Event, ContactMessage
│       ├── controllers/       Business logic per resource
│       ├── routes/            Express routers, mounted in server.js
│       ├── middleware/        JWT auth (protect / requireRole) + error handler
│       └── utils/             generateToken.js, excelExport.js
│
└── frontend/                  React app
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── .env.example           Copy to .env
    └── src/
        ├── main.jsx           App bootstrap (Router + AuthProvider)
        ├── App.jsx            Route definitions
        ├── api/axios.js       Axios instance, attaches JWT automatically
        ├── context/AuthContext.jsx
        ├── components/        Navbar, Footer, ProtectedRoute
        └── pages/              Home, AboutUs, UpcomingEvents, SupportUs, Gallery,
                                 ContactUs, FAQ, Register, Login, StudentDashboard,
                                 AdminDashboard
```

## 1. Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+ running locally or in the cloud
- A Razorpay account (test mode keys are fine to start: https://dashboard.razorpay.com)
- An SMTP account for sending emails (Gmail app password, SendGrid, etc.) — optional at first

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in:
- `DB_NAME`, `DB_USER`, `DB_PASSWORD` — your local/cloud PostgreSQL credentials
- `JWT_SECRET` — any long random string
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` — from the Razorpay dashboard (test mode)
- `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` — credentials for your first admin login

Create the database (one time), then create tables and the first admin account:

```bash
# In psql or any Postgres client:
CREATE DATABASE festival_of_independence;

# Then, from the backend/ folder:
npm run db:sync
```

Start the API:

```bash
npm run dev        # nodemon, auto-restarts on changes
# or
npm start
```

The API runs at `http://localhost:5000/api` — check `http://localhost:5000/api/health`.

## 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The site runs at `http://localhost:5173`.

## 4. Razorpay webhook (for reliable payment confirmation)

In the Razorpay Dashboard → Webhooks, add:
- URL: `https://<your-deployed-backend>/api/payments/webhook`
- Event: `payment.captured`
- Copy the generated webhook secret into `RAZORPAY_WEBHOOK_SECRET` in `.env`

Locally, use a tool like `ngrok` to expose your backend for webhook testing.

## 5. First login

- Visit `/login` → "Login as Admin" tab → use the `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` from your `.env`.
- Add a few colleges via a quick API call or a small admin form (see `POST /api/colleges`) so the registration dropdown isn't empty.
- Visit `/register` to test the student sign-up + payment flow (use Razorpay test card numbers from their docs).

## 6. What's stubbed vs. what's wired up

**Fully wired:** registration, two-tab login (student/admin), JWT auth with role separation, Razorpay order creation + verification + webhook, student dashboard (profile, schedule, pay now), admin dashboard (search/filter registrations, Excel export), events API, colleges API, contact form.

**Left as TODOs for your team to fill in:** About Us / Gallery / Support Us copy and images, admin UI for managing events/colleges/contact inbox (APIs already exist — just needs screens), password-reset flow, admin 2FA/OTP, production deployment config.

## 7. Security checklist before going live

- Set `NODE_ENV=production` and use real, non-default secrets
- Serve everything over HTTPS
- Turn off `sequelize.sync({ alter: true })` in favor of proper migrations
- Enable Razorpay webhook signature checks (already coded — just set the secret)
- Review CORS `origin` in `server.js` to your real domain
