# Aithertech ServiceOps — Full Project Plan

**Project:** Electronics Repair Platform (ERP) / ServiceOps
**Client:** Aithertech
**Vendor:** Varuni Systems Inc
**Date:** 7 February 2026
**Status:** DRAFT — For Review

---

## 1. Executive Summary

This project plan covers the **complete** development of the Aithertech ServiceOps platform — a unified web and mobile system for consumer-electronics repair call management. The platform streamlines the entire service call lifecycle from customer/dealer booking through field execution by service engineers, with administrative oversight, inventory management, and financial reconciliation.

The project is structured in **six phases** spanning approximately **32 calendar weeks (~8 months)**, with 2-week ramp-up/re-prioritisation gaps between post-MVP phases. The total project cost is **₹13,50,000** (exclusive of GST and third-party service costs).

### Platform at a Glance

| Dimension | Detail |
|-----------|--------|
| **Web Application** | React 18 PWA (Customer, Technician, Operations, Admin portals) |
| **Mobile Applications** | Flutter (Engineer app — Android + iOS; Customer/Dealer app — Android + iOS) |
| **Backend** | Go (Golang) REST API + WebSocket |
| **Database** | PostgreSQL with PostGIS |
| **Messaging** | RabbitMQ for async jobs and notification workflows |
| **File Storage** | S3-compatible object storage (MinIO/S3) |
| **Roles** | Admin, Operations, Customer, Dealer (Customer variant), Technician/Engineer, Inventory (within Operations) |

---

## 2. Service Call Lifecycle (State Machine)

The core business flow that all phases build upon:

```
Created → Verified → Assigned → Accepted → Engineer En Route → In Progress → Parts Required* → Completed → Closed
```

\* *Parts Required is a conditional branch — returns to In Progress after parts are sourced.*

### Priority Levels
- **Normal** — Standard SLA
- **Urgent** — Elevated priority
- **Emergency** — Immediate dispatch

---

## 3. Calendar Timeline Overview

| Phase | Description | Dev Weeks | Calendar Weeks | Start | End |
|-------|-------------|-----------|----------------|-------|-----|
| **Phase 0** | Discovery & Design | 1 | Week 1 | Week 1 | Week 1 |
| **Phase 1** | MVP — Core Platform (PWA + Simple Android) | 6 | Week 2–7 | Week 2 | Week 7 |
| *Gap 1* | *Ramp-up, UAT feedback, re-prioritisation* | — | Week 8–9 | | |
| **Phase 2** | Billing, Reports & Dealer Features | 3 | Week 10–12 | Week 10 | Week 12 |
| *Gap 2* | *Ramp-up & re-prioritisation* | — | Week 13–14 | | |
| **Phase 3** | Payment Integration & Advanced Notifications | 3 | Week 15–17 | Week 15 | Week 17 |
| *Gap 3* | *Ramp-up & re-prioritisation* | — | Week 18–19 | | |
| **Phase 4** | Advanced Features & Optimisation | 3 | Week 20–22 | Week 20 | Week 22 |
| *Gap 4* | *Ramp-up & re-prioritisation* | — | Week 23–24 | | |
| **Phase 5** | Native Mobile Apps, Allocation Engine & Chat | 8 | Week 25–32 | Week 25 | Week 32 |
| | **TOTAL** | **24 dev** | **32 calendar** | | |

---

## 4. Payment Schedule

**Total Project Cost: ₹13,50,000** (exclusive of applicable GST @ 18%)

| Phase | % | Amount (₹) | Payment Trigger |
|-------|---|------------|-----------------|
| **Phase 0** — Discovery & Design | 25% | 3,37,500 | **Upfront** — upon contract execution |
| **Phase 1** — MVP Core Platform | 25% | 3,37,500 | Per milestone acceptance (see §5.1 below) |
| **Phase 2** — Billing, Reports & Dealer | 12.5% | 1,68,750 | Upon phase acceptance |
| **Phase 3** — Payments & Notifications | 12.5% | 1,68,750 | Upon phase acceptance |
| **Phase 4** — Advanced Features | 12.5% | 1,68,750 | Upon phase acceptance |
| **Phase 5** — Native Mobile Apps, Allocation & Chat | 12.5% | 1,68,750 | Upon phase acceptance |
| **TOTAL** | **100%** | **₹13,50,000** | |

### Phase 1 Internal Milestones

| Milestone | Description | Week | Amount (₹) |
|-----------|-------------|------|------------|
| M1.1 | UI/UX Implementation & Design System | Week 2 | 67,500 |
| M1.2 | Database & Core Backend APIs | Week 3–4 | 90,000 |
| M1.3 | Customer & Technician Portals (PWA) | Week 4–5 | 90,000 |
| M1.4 | Operations Dashboard | Week 5–6 | 45,000 |
| M1.5 | Inventory, GPS, Android App & Final Integration | Week 7 | 45,000 |
| | **Phase 1 Total** | | **3,37,500** |

---

## 5. Detailed Phase Scope

---

### 5.0 Phase 0 — Discovery & Design (Week 1)

**Objective:** Establish the foundation for development in one focused week — finalise the process model, produce wireframe-level mockups, design the core database schema, and set up project scaffolding. Detailed design (polished mockups, full API spec, design system) evolves iteratively during Phase 1, with the designer working one sprint ahead of frontend development.

#### Completed in Week 1

| # | Deliverable | Details |
|---|-------------|---------|
| 0.1 | Process Mapping & State Machine | Service call lifecycle definition, role-based workflows, priority rules, business rules documentation |
| 0.2 | Wireframe Mockups — All Portals | Wireframe-level screens for Customer, Technician, Operations, and Admin portals — sufficient to begin development (not pixel-perfect) |
| 0.3 | Core Database Schema | ER diagram and PostgreSQL + PostGIS schema for core entities: users/roles/auth, technicians/skills/availability, service calls/logs/ratings, warehouses/parts/inventory |
| 0.4 | Architecture Document | System architecture, deployment topology, tech stack decisions, infrastructure requirements |
| 0.5 | Project Scaffolding | Repository setup, CI/CD pipeline, dev environment configuration, code structure for frontend and backend |
| 0.6 | WhatsApp Template Drafts | Draft WhatsApp message templates submitted to Meta for approval (approval has lead time) |
| 0.7 | Simple Android App Wireframe | Login screen, on-duty toggle, location consent flow (3 screens) |

#### Evolves During Phase 1 (designer works 1 sprint ahead of frontend)

| # | Deliverable | Details |
|---|-------------|---------|
| 0.8 | Polished UI/UX Mockups | Interactive, high-fidelity mockups delivered per-portal ahead of frontend implementation |
| 0.9 | Design System | Component library, colour palette, typography, responsive patterns — builds organically as portal screens are designed and coded |
| 0.10 | API Specification | Module-by-module OpenAPI/Swagger contracts defined as each backend module is built |
| 0.11 | Notification & Invoice Templates | Email templates, invoice/receipt PDF layouts (with GST) — designed alongside the relevant features |

**Exit Criteria:** Client sign-off on wireframe mockups, core database schema, and architecture document. WhatsApp templates submitted for approval.

---

### 5.1 Phase 1 — MVP Core Platform (Weeks 2–7)

**Objective:** Deliver a fully functional PWA enabling all stakeholders to commence business operations, plus a simple Flutter-based Android app for engineer location tracking.

**Tech Stack:**
- Frontend: React 18, TypeScript, Vite, TanStack Query, Zustand, Socket.io-client, Tailwind CSS
- Backend: Go (Golang), Gin/Echo framework, JWT authentication
- Database: PostgreSQL 14+ with PostGIS
- Messaging: RabbitMQ
- File Storage: S3-compatible (MinIO)
- Real-time: WebSocket (Socket.io-compatible)
- Mobile: Flutter (Android-only, minimal engineer app)

---

#### 5.1.1 Authentication & RBAC

| # | Feature | Details |
|---|---------|---------|
| 1.01 | OTP-based registration | Phone-based OTP authentication for all user roles |
| 1.02 | Login / logout | JWT access + refresh token flow |
| 1.03 | Password reset | OTP-based password reset |
| 1.04 | Role-based access control | Roles: Admin, Operations, Customer (includes Dealer variant), Technician |
| 1.05 | Session management | Token refresh, device tracking, forced logout |

#### 5.1.2 Call Management

| # | Feature | Details |
|---|---------|---------|
| 1.06 | Service call creation | Single service call with photos, appliance details (category: Home/Kitchen/IT, brand), preferred time slots |
| 1.07 | Service call state machine | Full lifecycle: Created → Verified → Assigned → Accepted → En Route → In Progress → Parts Required → Completed → Closed |
| 1.08 | Priority management | Normal / Urgent / Emergency — set by Admin/Operations |
| 1.09 | Status tracking | Real-time status updates visible to customer, operations, and technician |
| 1.10 | Call reference ID | Auto-generated unique reference for each service call |
| 1.11 | Status logs | Full audit trail of all status changes with timestamps and actors |

#### 5.1.3 Manual Assignment (MVP)

In the MVP, service call assignment is **manual only** — Operations staff assign engineers to calls through the Operations Dashboard. The automated allocation engine (auto-assignment with weighted scoring, geo-fencing, skill matching, and auto-reassignment) is delivered in **Phase 5**.

| # | Feature | Details |
|---|---------|---------|
| 1.12 | Manual assignment | Operations can assign/reassign engineers to service calls via the Operations Dashboard |
| 1.13 | Accept/decline workflow | Engineer can accept or decline an assigned call; Operations is notified of declines for manual reassignment |

#### 5.1.4 Customer Portal (PWA)

| # | Screen / Feature | Details |
|---|------------------|---------|
| 1.18 | Registration & login | OTP-based, profile setup |
| 1.19 | Dashboard | Active calls, recent history, quick actions |
| 1.20 | New repair call form | Device type, brand, issue description, photos upload, location (auto-detect + manual), preferred slot |
| 1.21 | Call tracking view | Status timeline, assigned technician details, ETA display |
| 1.22 | Rating & feedback | Post-completion star rating and comments |
| 1.23 | Call history | Filterable list of past service calls with status |
| 1.24 | Saved appliances | Manage registered devices (for future quick-booking) |

#### 5.1.5 Technician Portal (PWA)

| # | Screen / Feature | Details |
|---|------------------|---------|
| 1.25 | Dashboard | Available jobs nearby, active job summary, start-of-day job list |
| 1.26 | Start-of-day call sheet | List of day's assigned jobs with times, locations, and Google Maps links |
| 1.27 | Job detail | Customer info, device details, issue description, navigation link |
| 1.28 | Work log entry | Status updates (En Route → Arrived → In Progress → Completed), notes, parts used |
| 1.29 | Photo uploads | Model number photos, damage photos, other relevant photos — **with image compression before upload** |
| 1.30 | Fault code entry | Add fault codes during diagnosis |
| 1.31 | Job completion | Summary screen, signature or OTP capture from customer |
| 1.32 | Profile & skills | Manage certifications, brands, appliance types |
| 1.33 | Availability calendar | Set available days/hours |
| 1.34 | Nearby warehouses | View warehouses with parts availability |
| 1.35 | Parts pickup logging | Record parts collected from warehouse |
| 1.36 | Parts usage logging | Record parts used per repair call |

#### 5.1.6 Operations Dashboard (PWA)

| # | Screen / Feature | Details |
|---|------------------|---------|
| 1.37 | Real-time call queue | All active calls with status, priority, age — sortable and filterable |
| 1.38 | Start-of-day job overview | List view of all day's jobs grouped by engineer |
| 1.39 | Technician availability grid | Real-time grid showing engineer status, current job, availability |
| 1.40 | Manual assignment interface | Search/filter engineers by skills/availability/location, assign to calls |
| 1.41 | Call detail view | Full service call history, status log, photos, notes |
| 1.42 | Engineer map view | Real-time map showing engineer locations (updated from GPS pings) |
| 1.43 | Escalation management | Alerts for overdue calls, unresponsive engineers |
| 1.44 | Warehouse management | CRUD for warehouses, location/coverage areas |
| 1.45 | Spare parts catalog | SKU management, part categories, pricing |
| 1.46 | Inventory management | Stock levels per warehouse, stock in/out, adjustments |
| 1.47 | Low-stock alerts | Configurable threshold alerts per part per warehouse |
| 1.48 | Parts pickup tracking | View engineer pickup logs |
| 1.49 | Parts usage tracking | View parts consumed per call with cost tracking |

#### 5.1.7 Admin Panel (PWA)

| # | Screen / Feature | Details |
|---|------------------|---------|
| 1.50 | User management | CRUD for all user roles |
| 1.51 | Technician verification | Approval/rejection workflow for new engineer registrations |
| 1.52 | Skills & device categories | Manage brand list, appliance types, skill certifications |
| 1.53 | System configuration | Business rules, timeouts, radius settings, priority rules |

#### 5.1.8 Invoicing (MVP)

| # | Feature | Details |
|---|---------|---------|
| 1.54 | Invoice generation | PDF invoice generation on job completion |
| 1.55 | GST handling | Configurable GST rates (12%, 18%, 28%) per service/part category |
| 1.56 | Invoice line items | Service charges + parts used with individual pricing and GST |

#### 5.1.9 Simple Engineer Android App (Flutter)

| # | Feature | Details |
|---|---------|---------|
| 1.57 | Phone-native authentication | Biometric / device credential sign-in (uses phone's auth mechanism) |
| 1.58 | On-duty status toggle | Set status to "On Duty" / "Off Duty" |
| 1.59 | Background location ping | GPS location sent to backend every 1–3 minutes while on duty |
| 1.60 | Location consent | Proper Android permission flow with rationale |
| 1.61 | Minimal UI | Status indicator, last ping timestamp, connection status |

#### 5.1.10 Notifications (Basic — MVP)

| # | Feature | Details |
|---|---------|---------|
| 1.62 | WhatsApp integration (basic) | Key status notifications: call registered, engineer assigned, job closed |
| 1.63 | RabbitMQ notification queue | Async notification processing pipeline (extensible for future channels) |
| 1.64 | Notification templates | Pre-approved WhatsApp templates for MVP status events |

#### 5.1.11 File Handling & Infrastructure

| # | Feature | Details |
|---|---------|---------|
| 1.65 | Photo upload service | S3-compatible storage with image compression/resizing |
| 1.66 | WebSocket real-time updates | Live status changes pushed to connected clients via Socket.io |
| 1.67 | Staging environment | Deployed environment for UAT |
| 1.68 | PWA setup | Workbox offline support, service worker, installable PWA |

**Phase 1 Exit Criteria:**
- All 4 PWA portals functional and deployed to staging
- Simple Android engineer app functional on staging backend
- Manual assignment workflow operational (Operations assigns engineers via dashboard)
- Inventory management operational within Operations dashboard
- Basic WhatsApp notifications sending
- Invoice PDF generation with GST working
- All Critical and Major defects resolved

---

### 5.2 Phase 2 — Billing, Reports & Dealer Features (Weeks 10–12)

**Objective:** Implement full financial tracking, reporting capabilities, and dealer-specific bulk operations.

#### 5.2.1 Full Billing System

| # | Feature | Details |
|---|---------|---------|
| 2.01 | Billing — Inwards | (a) Payouts based on engineer ratings (b) Spares issued to engineer → payment from engineer (c) Engineer collects repair payment → reconciliation (d) Dealer servicing fees |
| 2.02 | Billing — Outwards | On completion of job, post rating, generate invoice and pay engineer |
| 2.03 | Service charges management | Configurable service charge schedules per category/brand |
| 2.04 | Part cost tracking | Cost of spares per job, margins, warehouse-level costing |
| 2.05 | Payment status tracking | Track pending/received/overdue payments across all parties |
| 2.06 | Financial reconciliation | Dashboard showing inflows vs outflows, outstanding amounts |

#### 5.2.2 Reporting

| # | Feature | Details |
|---|---------|---------|
| 2.07 | Call reports | Call volume, resolution times, status distribution, SLA compliance |
| 2.08 | Engineer performance | Jobs completed, ratings, response times, parts usage |
| 2.09 | Inventory reports | Stock levels, consumption trends, reorder alerts, cost analysis |
| 2.10 | Revenue reports | Admin-level financial overview: revenue by category, engineer, dealer |
| 2.11 | Exportable reports | CSV/Excel export for all report types |

#### 5.2.3 Dealer Features

| # | Feature | Details |
|---|---------|---------|
| 2.12 | Dealer registration | Dedicated dealer registration with business details |
| 2.13 | Bulk service call upload | Excel file upload for multiple service calls (open-box/refurbisher/warehouse repairs) |
| 2.14 | Bulk tracking | Dashboard view of all dealer-submitted service calls with batch status |
| 2.15 | Bulk invoice viewing | Consolidated invoice views per upload batch / time period |
| 2.16 | Dealer payments | View and track payments due to/from dealer |

#### 5.2.4 Enhanced Notifications & Alerts

| # | Feature | Details |
|---|---------|---------|
| 2.17 | Email notifications | Email templates for all status change events |
| 2.18 | SMS notifications | SMS integration for critical status updates |
| 2.19 | Alert: Engineer non-response | Auto-alert if engineer doesn't respond within 5–10 minutes |
| 2.20 | Alert: Spares issued | Notification when spares are dispatched/issued |
| 2.21 | Alert: Unpaid job closure | Alert if engineer hasn't paid on closure of job |
| 2.22 | Configurable alert rules | Admin-configurable alert thresholds and recipients |

**Phase 2 Exit Criteria:**
- Full billing inwards/outwards operational
- All report types generating correctly with export
- Dealer bulk upload and tracking functional
- Email and SMS notification channels active
- All alerts configured and triggering correctly

---

### 5.3 Phase 3 — Payment Integration & Advanced Notifications (Weeks 15–17)

**Objective:** Enable online payment collection, automated engineer payouts, and complete the omnichannel notification system.

#### 5.3.1 Payment Gateway Integration

| # | Feature | Details |
|---|---------|---------|
| 3.01 | Razorpay/UPI integration | Customer-facing online payment for repair services |
| 3.02 | QR code payment | QR codes for field payment collection (linked to Aithertech account) |
| 3.03 | Cash payment logging | Manual cash payment recording by engineer |
| 3.04 | Engineer payouts | Automated payout processing post-rating and job closure |
| 3.05 | Dealer payment processing | Online payment for dealer servicing fees |
| 3.06 | Payment reconciliation | Automated matching of payments received vs invoiced |
| 3.07 | Payment receipts | Auto-generated receipts for all payment types |

#### 5.3.2 Advanced Notifications

| # | Feature | Details |
|---|---------|---------|
| 3.08 | Full omnichannel triggers | Notification at every status change to relevant parties (WhatsApp + Email + SMS) |
| 3.09 | Advanced WhatsApp | Marketing messages, utility messages, authentication messages |
| 3.10 | Push notifications (FCM/APNs) | Server-side push notification infrastructure for mobile apps |
| 3.11 | Notification preferences | User-configurable channel preferences (WhatsApp / Email / SMS / Push) |
| 3.12 | Notification status | Delivery tracking, retry logic, failure alerts |

**Omnichannel Notification Events (full list):**

| Event | Recipient | Channels |
|-------|-----------|----------|
| Service call registered | Customer / Dealer | WhatsApp, Email, SMS |
| Engineer assigned | Customer / Dealer | WhatsApp, Email |
| Engineer en route | Customer / Dealer | WhatsApp |
| Engineer delayed / rescheduled | Customer / Dealer | WhatsApp, Email, SMS |
| Spares issued | Engineer, Operations | WhatsApp, Email |
| Job accepted (by engineer) | Customer / Dealer | WhatsApp |
| Job closed | Customer / Dealer | WhatsApp, Email |
| Payment received | Customer / Dealer, Engineer | WhatsApp, Email |
| Rating request | Customer / Dealer | WhatsApp, Email |

**Phase 3 Exit Criteria:**
- Customer can pay online via Razorpay/UPI
- QR code payment collection working in field
- Engineer payouts processing automatically
- All notification channels (WhatsApp + Email + SMS + Push) operational
- All status change events triggering correct omnichannel notifications

---

### 5.4 Phase 4 — Advanced Features & Optimisation (Weeks 20–22)

**Objective:** Enhance the platform with advanced operational capabilities, analytics, and system optimisation.

#### 5.4.1 Advanced Operations

| # | Feature | Details |
|---|---------|---------|
| 4.01 | Start-of-day call sheet (enhanced) | Detailed daily schedule with optimised routing suggestions, printable format |
| 4.02 | Call time management | Fixed post-call times by engineers, with Google Maps links for next-job navigation |
| 4.03 | Advanced GPS tracking | Historical location replay, route visualisation, time-at-location analytics |
| 4.04 | Photo gallery view | Operations can view all photos uploaded by engineers — organised by job, with model numbers, damage, and other categories |
| 4.05 | Live dashboard enhancements | Real-time map with moving engineer markers, call density heat map |

#### 5.4.2 Analytics & Intelligence

| # | Feature | Details |
|---|---------|---------|
| 4.06 | Call trend analytics | Volume trends, seasonal patterns, category breakdowns |
| 4.07 | Engineer utilisation | Capacity planning, idle time analysis, geographic coverage gaps |
| 4.08 | Customer insights | Repeat customers, satisfaction trends, churn risk |
| 4.09 | Inventory intelligence | Demand forecasting, auto-reorder suggestions, warehouse coverage analysis |
| 4.10 | SLA compliance dashboard | Real-time SLA tracking with breach alerts and historical compliance rates |

#### 5.4.3 Platform Enhancements

| # | Feature | Details |
|---|---------|---------|
| 4.11 | KYC document management | Engineer/dealer document upload, verification workflow, secure storage |
| 4.12 | OEM-specific customisations | Brand-specific workflows, SLA rules, pricing schedules |
| 4.13 | Performance optimisation | Database query optimisation, API response time improvements, caching enhancements, CDN for static assets |
| 4.14 | Advanced push notifications | Smart scheduling, batching, quiet hours, user preferences |
| 4.15 | Audit logging | Comprehensive audit trail for all admin/operations actions |

*Note: In-app chat has been moved to Phase 5 to be delivered alongside the native mobile applications.*

**Phase 4 Exit Criteria:**
- All advanced operations features deployed
- Analytics dashboards operational with accurate data
- Performance benchmarks met (API < 500ms, page load < 3s)
- OEM customisation framework in place

---

### 5.5 Phase 5 — Native Mobile Apps, Allocation Engine & Chat (Weeks 25–32)

**Objective:** Deliver full-featured native mobile applications using Flutter for both Android and iOS, implement the automated allocation engine, and add in-app chat. This phase replaces/supplements the PWA for mobile users, expands on the simple Android app from Phase 1, and upgrades the manual assignment workflow to intelligent auto-assignment.

**Tech Stack:** Flutter (single codebase → Android + iOS), Go backend extensions

#### 5.5.1 Allocation Engine

| # | Feature | Details |
|---|---------|---------|
| 5.A1 | Auto-assignment algorithm | Weighted scoring: Skills match → Geographic proximity (25km radius, 35% weight) + Technician rating (40%) + Current workload (25%) |
| 5.A2 | Geo-fencing filter | PostGIS-based radius filtering using engineer GPS coordinates |
| 5.A3 | Skill matching | Match technician certifications to brands (Samsung, LG, etc.) and appliance types |
| 5.A4 | Auto-reassignment | Automatic reassignment if engineer fails to accept within 5–10 minutes |
| 5.A5 | Operations Dashboard update | Add auto-assign toggle, allocation queue view, and manual override alongside auto-assignment in the PWA Operations Dashboard |

#### 5.5.2 In-App Chat

| # | Feature | Details |
|---|---------|---------|
| 5.B1 | Chat backend | Real-time messaging infrastructure (WebSocket-based), message persistence, file attachment storage |
| 5.B2 | Chat — Web (PWA) | Customer ↔ Engineer / Operations messaging with file sharing in the web portal |
| 5.B3 | Chat — Mobile | In-app chat integrated into both Flutter apps (engineer and customer/dealer) |

#### 5.5.3 Engineer App (Flutter — Android first, then iOS)

| # | Feature | Details |
|---|---------|---------|
| 5.01 | Authentication | Phone-native biometric + OTP login, session management |
| 5.02 | Job list & management | See list of calls with times, pending/active, accept/decline |
| 5.03 | Job detail & navigation | Full customer/device details, integrated Google Maps navigation |
| 5.04 | Status updates | Toggle through job statuses (En Route → Arrived → In Progress → Completed) |
| 5.05 | Job start OTP | Verify arrival with customer OTP |
| 5.06 | Fault code entry | Add fault codes during diagnosis |
| 5.07 | Photo capture & upload | In-app camera for model numbers, damage, relevant photos — with compression |
| 5.08 | Spares invoice upload | Upload parts invoices from camera or gallery |
| 5.09 | Parts management | Log parts picked up from warehouse and parts used per job |
| 5.10 | Payment collection | Record received payments (cash, UPI, QR) |
| 5.11 | Customer rating prompt | Request and capture customer rating at job completion |
| 5.12 | Signature/OTP capture | Job completion confirmation from customer |
| 5.13 | Availability & profile | Set availability, manage skills/certifications |
| 5.14 | GPS tracking | Consent-based foreground/background location ping (1–3 min) |
| 5.15 | Push notifications | All engineer-relevant alerts (new job, reassignment, alerts) |
| 5.16 | Offline support | Queue status updates and sync when connectivity returns |
| 5.17 | Call sheet | Start-of-day job list with times and navigation |

#### 5.5.4 Customer / Dealer App (Flutter — Android first, then iOS)

| # | Feature | Details |
|---|---------|---------|
| 5.18 | Registration & login | OTP-based registration, profile management |
| 5.19 | Service call booking | Register calls with device details, photos, location, preferred slot |
| 5.20 | Job start OTP | Provide OTP for engineer to start work |
| 5.21 | Real-time tracking | Engineer location on map, live ETA |
| 5.22 | Status timeline | Visual timeline of service call progress |
| 5.23 | Rating & feedback | Post-completion rating and review |
| 5.24 | Saved appliances | Manage registered devices for quick rebooking |
| 5.25 | Call history | Browse and filter past service calls |
| 5.26 | In-app payments | Integrated Razorpay/UPI payment |
| 5.27 | In-app chat | Message engineer or operations |
| 5.28 | Push notifications | All customer-relevant alerts (status changes, payment confirmations) |
| 5.29 | Dealer mode | Bulk service call visibility, batch status tracking (within same app, role-switched) |

#### 5.5.5 App Store Deployment

| # | Feature | Details |
|---|---------|---------|
| 5.30 | Google Play Store | Engineer app + Customer/Dealer app — Android release |
| 5.31 | Apple App Store | Engineer app + Customer/Dealer app — iOS release |
| 5.32 | App signing & CI/CD | Automated build pipelines for both platforms |

**Phase 5 Exit Criteria:**
- Allocation engine operational with auto-assign, geo-fencing, skill matching, and auto-reassignment
- Operations Dashboard updated with auto-assign toggle and manual override
- In-app chat functional across web (PWA) and both mobile apps
- Engineer app published on Google Play Store, submitted to Apple App Store
- Customer/Dealer app published on Google Play Store, submitted to Apple App Store
- All features from PWA replicated in native apps with enhanced mobile experience
- Background GPS tracking operational on Android and iOS
- Push notifications working on both platforms
- Offline capability verified for engineer app

---

## 6. Tech Stack Summary

| Layer | Technology | Phase Introduced |
|-------|------------|------------------|
| **Frontend (Web)** | React 18, TypeScript, Vite, Tailwind CSS, TanStack Query, Zustand, React Hook Form + Zod, Socket.io-client | Phase 1 |
| **PWA** | Workbox for offline support and caching | Phase 1 |
| **Backend** | Go (Golang), Gin or Echo framework | Phase 1 |
| **Database** | PostgreSQL 14+ with PostGIS | Phase 1 |
| **Caching** | PostgreSQL materialized views + in-process cache (no Redis) | Phase 1 |
| **Messaging** | RabbitMQ | Phase 1 |
| **Auth** | JWT (access + refresh tokens), OTP via third-party provider | Phase 1 |
| **Real-time** | WebSocket via Socket.io | Phase 1 |
| **File Storage** | S3-compatible (MinIO or AWS S3) | Phase 1 |
| **Mobile** | Flutter (Dart) — Android + iOS | Phase 1 (simple), Phase 5 (full) |
| **Maps** | Google Maps API (geocoding, directions, static/dynamic maps) | Phase 1 |
| **Notifications — WhatsApp** | WhatsApp Business API | Phase 1 (basic), Phase 3 (full) |
| **Notifications — Email** | Zoho ZeptoMail | Phase 2 |
| **Notifications — SMS** | Third-party SMS gateway | Phase 2 |
| **Notifications — Push** | FCM (Android) / APNs (iOS) | Phase 3 |
| **Payments** | Razorpay / UPI | Phase 3 |
| **Testing** | Jest, React Testing Library, Supertest, Playwright | Phase 1 |

---

## 7. External Services & Estimated Running Costs

*These costs are borne by the Client (Aithertech) and are separate from the project development cost.*

| Service | Provider | Estimated Monthly Cost | Notes |
|---------|----------|----------------------|-------|
| Cloud Servers (2×) | Linode / DigitalOcean | $20 (~₹1,700) + GST | 1 app server + 1 database server; scale as needed |
| Block Storage (250GB) | Linode / DigitalOcean | $5 (~₹425) + GST | S3-compatible for photos, KYC documents |
| WhatsApp Business | Meta | ~₹1,200/month | ~10,000 messages/month; first 1,000 service conversations free |
| Email | Zoho ZeptoMail | ₹150 per 10,000 emails | |
| Google Maps | Google | Free initially | $200/month free credit; pricing varies by API |
| Google Play Store | Google | $25 one-time | |
| Apple App Store | Apple | $99/year (~₹8,300) | |
| Domain | — | Provided by Aithertech | |
| Payments | Razorpay | 2% per transaction | Negotiable |
| **Estimated Monthly Total** | | **~₹4,000–5,000 + GST** | *Excluding Maps and payment transaction fees* |

---

## 8. Roles & Permissions Matrix

| Capability | Admin | Operations | Customer | Dealer | Technician |
|------------|:-----:|:----------:|:--------:|:------:|:----------:|
| User/engineer management | ✅ | — | — | — | — |
| System configuration | ✅ | — | — | — | — |
| Technician verification | ✅ | ✅ | — | — | — |
| View all service calls | ✅ | ✅ | — | — | — |
| Assign engineers (manual; auto from Phase 5) | ✅ | ✅ | — | — | — |
| Revenue / financial reports | ✅ | ✅ | — | — | — |
| Inventory management | ✅ | ✅ | — | — | — |
| Warehouse management | ✅ | ✅ | — | — | — |
| GPS map tracking | ✅ | ✅ | — | — | — |
| View engineer photos | ✅ | ✅ | — | — | — |
| Escalation management | ✅ | ✅ | — | — | — |
| Create service call (single) | — | ✅ | ✅ | ✅ | — |
| Create service call (bulk) | — | — | — | ✅ | — |
| Track own service calls | — | — | ✅ | ✅ | — |
| Rate service | — | — | ✅ | ✅ | — |
| Manage saved appliances | — | — | ✅ | — | — |
| View/accept assigned jobs | — | — | — | — | ✅ |
| Decline jobs | — | — | — | — | ✅ |
| Update job status | — | — | — | — | ✅ |
| Upload photos | — | — | ✅* | — | ✅ |
| Log parts pickup/usage | — | — | — | — | ✅ |
| Upload spares invoice | — | — | — | — | ✅ |
| Record payments received | — | — | — | — | ✅ |
| Set availability | — | — | — | — | ✅ |
| Manage own profile/skills | — | — | ✅ | ✅ | ✅ |

*\* Customer uploads photos only during service call creation.*

---

## 9. Key Dependencies & Assumptions

### Dependencies

| # | Dependency | Owner | Impact if Delayed |
|---|-----------|-------|-------------------|
| D1 | WhatsApp Business API account setup and template approval | Client | Delays MVP notification feature |
| D2 | Google Maps API key and billing setup | Client | Delays map/GPS features |
| D3 | Razorpay/UPI merchant account | Client | Blocks Phase 3 payment integration |
| D4 | Google Play developer account ($25) | Client | Blocks Phase 1 Android app distribution |
| D5 | Apple Developer account ($99/yr) | Client | Blocks Phase 5 iOS app distribution |
| D6 | Domain and DNS access | Client | Delays staging/production deployment |
| D7 | Cloud server provisioning | Client | Delays deployment |
| D8 | Zoho ZeptoMail account | Client | Delays Phase 2 email notifications |
| D9 | SMS gateway account | Client | Delays Phase 2 SMS notifications |

### Assumptions

1. Client will provide feedback on each milestone within 5 business days.
2. No legacy data migration is required — the platform starts fresh.
3. Dealer functionality in MVP is limited to the customer portal experience.
4. The simple Android engineer app (Phase 1) is the foundation for the full Flutter app (Phase 5).
5. The 2-week gaps between phases may be used for UAT, feedback, and scope refinement for the next phase.
6. Production infrastructure costs are borne by the Client.
7. The Phase 2–5 scope and priority may be adjusted during inter-phase gaps based on business needs.

---

## 10. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|:----------:|:------:|------------|
| R1 | WhatsApp template approval delays | Medium | Medium | Submit templates in Phase 0; have email fallback ready |
| R2 | PostGIS geospatial query performance at scale | Low | High | Performance test with realistic data in Phase 1; index optimisation |
| R3 | Flutter background location drains battery | Medium | Medium | Configurable ping interval (1–3 min); optimise with geofencing |
| R4 | Google Maps API costs exceed free tier | Medium | Low | Monitor usage; implement server-side caching for geocoding results |
| R5 | Payment gateway onboarding delays (KYC) | Medium | Medium | Start Razorpay onboarding at Phase 1 kickoff |
| R6 | Scope creep between phases | High | High | Formal change request process; scope frozen per phase; gaps for re-prioritisation |
| R7 | Client feedback delays | Medium | High | Deemed-accepted clauses per agreement; regular standups |
| R8 | Engineer app background tracking permissions (Android 14+) | Medium | Medium | Early testing on target Android versions; comply with latest permission model |

---

## 11. Deliverables Summary by Phase

| Phase | Key Deliverables |
|-------|-----------------|
| **Phase 0** | Process maps, wireframe mockups (all portals), core DB schema, architecture doc, project scaffolding, WhatsApp template drafts. *Design system, polished mockups, API spec, and templates evolve during Phase 1.* |
| **Phase 1** | Functional PWA (4 portals), Go backend + APIs, PostgreSQL database, manual assignment workflow, inventory system, GPS tracking, simple Flutter Android app, basic WhatsApp notifications, invoice generation with GST, staging deployment |
| **Phase 2** | Full billing system (inwards/outwards), reporting dashboards, dealer bulk features, email + SMS notifications, enhanced alerts |
| **Phase 3** | Razorpay/UPI payment integration, QR payments, automated payouts, full omnichannel notifications, push notification infrastructure |
| **Phase 4** | Advanced operations tools, analytics dashboards, OEM customisations, performance optimisation, KYC management |
| **Phase 5** | Allocation engine (auto-assignment, geo-fencing, skill matching), in-app chat, Flutter Engineer app (Android + iOS), Flutter Customer/Dealer app (Android + iOS), app store deployment, offline support |

---

## 12. Documentation Deliverables

Delivered incrementally per phase:

| Document | Scope |
|----------|-------|
| Technical Architecture | System design, component diagrams, data flow |
| API Documentation | OpenAPI/Swagger with request/response examples |
| Database Schema Documentation | ER diagrams, table descriptions, migration guide |
| Deployment & Infrastructure Guide | Server setup, environment variables, CI/CD |
| User Guide — Customer Portal | End-user documentation |
| User Guide — Technician Portal | End-user documentation |
| User Guide — Operations Dashboard | End-user documentation |
| User Guide — Admin Panel | End-user documentation |
| Development Setup Guide | Local dev environment setup for future maintenance |

---

## 13. AMC (Annual Maintenance Contract)

Post-project, as per the proposal:

| Parameter | Details |
|-----------|---------|
| AMC Rate | 8% of project cost annually = ₹1,08,000/year |
| Coverage | Bug fixes, minor enhancements, security patches |
| Commencement | After warranty period (90 days post final acceptance) |
| Change Management | Additional feature requests priced separately by mutual agreement |

---

*This document is a working draft and should be reviewed by both parties. Phase scope and priorities may be adjusted during the inter-phase gaps based on business feedback and operational learnings.*
