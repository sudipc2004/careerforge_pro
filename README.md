# CareerForge Pro — AI-Powered ATS Resume Builder

CareerForge Pro is a modern, premium Next.js application that enables job seekers to construct ATS-optimized resumes. By utilizing Google Gemini AI, users can analyze job descriptions, get real-time ATS compatibility scores, and leverage AI agents to rewrite resume bullet points with high-impact keywords.

---

## 🚀 Key Features

* **JD Analysis Agent**: Dynamically extracts and prioritizes critical keywords from any job posting.
* **AI Bullet Rewriter**: Rephrases weak bullet points into keyword-rich, action-oriented achievements.
* **Live ATS Scorer**: Provides real-time compatibility scores and concrete suggestions for improvements.
* **Pixel-Perfect PDF Generation**: Uses headless Puppeteer (Chrome) to generate professionally formatted, ATS-compliant PDF resumes.
* **Stripe Subscriptions**: Seamlessly integrated tier-based billing (Free vs. Pro Plans) with Customer Portal management.
* **Next-Auth Integration**: Secure user authentication for saving resumes and tracking progress.
* **Projects & Certifications Forms**: Full developer support for adding, updating, and dynamically rendering projects and certification lists.
* **AI Cover Letter Writer**: Personalized, tone-controlled cover letter draft generator that automatically references your loaded resume context.
* **Cover Letter PDF Export**: High-quality printable A4 exports using headless Puppeteer styled matching active templates.
* **Custom Theme Color Palette**: Integrated HTML5 pickers to customize primary and accent styling colors.
* **Demo Resume Templates Loader**: One-click mock resume creators in dashboard and builder workspace.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 16 (App Router)
* **Styling**: Tailwind CSS 4, Vanilla CSS variables, Glassmorphism design tokens
* **AI Model**: Google Gemini AI (`@google/generative-ai`)
* **Payments**: Stripe (`stripe`, `@stripe/stripe-js`)
* **Auth**: NextAuth.js
* **PDF Engine**: Puppeteer & PDF-Parse

---

## 📁 Directory Structure

```text
├── app/                  # Next.js App Router pages and API routes
├── components/           # UI elements, form components, and resume previewers
│   ├── layout/           # Shared layout components (Navbar, etc.)
│   ├── resume-form/      # Resume builder form sections
│   ├── resume-preview/   # Real-time PDF rendering templates
│   └── ui/               # Reusable premium styled UI components
├── data/                 # Static data and developer mock templates
├── lib/                  # State stores, AI scorers, auth handlers, and Stripe helpers
└── public/               # Public assets and icons
```

---

## ⚙️ Environment Configuration

To run the application locally, create a `.env.local` file in the root directory and define the following environment variables:

```env
# Next Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Stripe Integration
STRIPE_API_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=your_stripe_pro_price_id_here
```

---

## 💻 Getting Started

First, install the package dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience CareerForge Pro locally.
