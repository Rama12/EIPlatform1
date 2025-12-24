---
name: Electronics Repair Platform
overview: Build a scalable electronics repair platform connecting customers, retailers, and OEMs with technicians through an operations-managed workflow. The MVP delivers core call logging, auto-allocation with override, and real-time tracking in 4-6 weeks using React, Node.js, TypeScript, and PostgreSQL as a PWA.
todos:
  - id: mockups
    content: Create UI mockups for all user portals (Customer, Technician, Operations, Admin)
    status: completed
  - id: project-setup
    content: Initialize monorepo with Turborepo, configure TypeScript, ESLint, Docker
    status: pending
    dependencies:
      - mockups
  - id: db-schema
    content: Design and implement PostgreSQL schema with PostGIS extension
    status: pending
    dependencies:
      - project-setup
  - id: auth-system
    content: Implement JWT authentication with role-based access control
    status: pending
    dependencies:
      - db-schema
  - id: call-management
    content: Build call CRUD API and customer portal call logging flow
    status: pending
    dependencies:
      - auth-system
  - id: technician-module
    content: Implement technician registration, skills, and availability management
    status: pending
    dependencies:
      - auth-system
  - id: allocation-engine
    content: Build auto-allocation algorithm with operations override capability
    status: pending
    dependencies:
      - call-management
      - technician-module
  - id: realtime-updates
    content: Implement WebSocket layer for live status updates
    status: pending
    dependencies:
      - allocation-engine
  - id: operations-dashboard
    content: Build operations management dashboard with call queue and assignment UI
    status: pending
    dependencies:
      - realtime-updates
  - id: rating-system
    content: Implement post-completion rating and feedback flow
    status: pending
    dependencies:
      - call-management
  - id: inventory-system
    content: Build spare parts inventory with warehouses, stock management, and low-stock alerts
    status: pending
    dependencies:
      - db-schema
      - operations-dashboard
  - id: tech-parts-usage
    content: Implement technician parts pickup and usage logging on repair calls
    status: pending
    dependencies:
      - inventory-system
      - call-management
  - id: pwa-setup
    content: Configure service workers, offline support, and installability
    status: pending
    dependencies:
      - call-management
  - id: testing-qa
    content: Write unit, integration, and E2E tests for critical paths
    status: pending
  - id: deployment
    content: Set up AWS infrastructure and CI/CD pipeline
    status: pending
    dependencies:
      - project-setup
---

#Electronics Repair Platform (EIPlatform)

## System Architecture Overview

```mermaid
flowchart TB
    subgraph clients [Client Applications - PWA]
        CustomerApp[Customer Portal]
        RetailerApp[Retailer Portal]
        OEMApp[OEM Portal]
        TechApp[Technician App]
        OpsApp[Operations Dashboard]
        AdminApp[Admin Panel]
    end

    subgraph api_gateway [API Layer]
        Gateway[API Gateway / Load Balancer]
        AuthService[Auth Service]
    end

    subgraph services [Backend Services]
        CallService[Call Management Service]
        AllocationService[Allocation Engine]
        TechnicianService[Technician Service]
        InventoryService[Inventory Service]
        NotificationService[Notification Service]
        ChatService[Chat Service]
        GeoService[Geolocation Service]
    end

    subgraph data [Data Layer]
        PostgreSQL[(PostgreSQL)]
        Redis[(Redis Cache)]
        S3[Object Storage]
    end

    subgraph realtime [Real-time Layer]
        WebSocket[WebSocket Server]
        PushService[Push Notification Service]
    end

    clients --> Gateway
    Gateway --> AuthService
    Gateway --> services
    services --> data
    services --> realtime
    realtime --> clients
```

---

## Phase 1: MVP (Weeks 1-6) - Core Platform

### 1.1 UI/UX Mockups and Design System (Week 1)

Create interactive mockups for all user portals before development begins:**Customer/Retailer/OEM Portal Screens:**

- Landing page with login/register
- Dashboard (active calls, recent history, quick actions)
- New repair call form (device type, issue description, photos, location)
- Call tracking view (status timeline, assigned technician, ETA)
- Rating and feedback modal
- Call history with filtering

**Technician Portal Screens:**

- Dashboard (available jobs nearby, active job, earnings summary)
- Job detail view (customer info, device details, navigation)
- Work log entry (status updates, notes, parts used, photos)
- Job completion form (summary, signature capture)
- Profile/skills management
- Availability calendar
- Nearby warehouses view (map with stock availability)
- Parts pickup form (select warehouse, log parts taken)
- Parts usage log (record parts used per repair call with quantity)

**Operations Dashboard Screens:**

- Real-time call queue with map view
- Technician availability grid
- Manual assignment interface (drag-and-drop or modal)
- Call detail with full history
- Escalation management
- Basic analytics widgets
- Warehouse management (CRUD, locations by zip code)
- Spare parts catalog management (SKU, name, cost price)
- Inventory levels per warehouse (stock in/out, adjustments)
- Low stock alerts dashboard with configurable thresholds

**Admin Panel Screens:**

- User management (CRUD for all user types)
- Technician verification/approval workflow
- Skills and device categories management
- System configuration

### 1.2 Database Schema Design

```mermaid
erDiagram
    users ||--o{ repair_calls : creates
    users ||--o{ user_roles : has
    technicians ||--o{ technician_skills : has
    technicians ||--o{ repair_calls : assigned_to
    repair_calls ||--o{ call_logs : contains
    repair_calls ||--o{ call_ratings : receives
    repair_calls ||--o{ chat_messages : has
    skills ||--o{ technician_skills : references

    users {
        uuid id PK
        string email
        string password_hash
        string name
        string phone
        jsonb address
        point location
        enum user_type
        timestamp created_at
    }

    technicians {
        uuid id PK
        uuid user_id FK
        string status
        point current_location
        float rating_avg
        int total_jobs
        boolean is_verified
        jsonb service_area
    }

    repair_calls {
        uuid id PK
        uuid customer_id FK
        uuid technician_id FK
        string device_type
        string device_brand
        text issue_description
        jsonb photos
        enum status
        enum priority
        point location
        timestamp scheduled_at
        timestamp completed_at
    }

    call_logs {
        uuid id PK
        uuid call_id FK
        uuid user_id FK
        enum action_type
        text notes
        jsonb metadata
        timestamp created_at
    }

    warehouses ||--o{ warehouse_inventory : stocks
    spare_parts ||--o{ warehouse_inventory : stored_in
    spare_parts ||--o{ part_usage : used
    repair_calls ||--o{ part_usage : consumes
    technicians ||--o{ part_pickups : picks_up
    warehouses ||--o{ part_pickups : from

    warehouses {
        uuid id PK
        string name
        string zip_code
        jsonb address
        point location
        string phone
        boolean is_active
        timestamp created_at
    }

    spare_parts {
        uuid id PK
        string sku UK
        string name
        text description
        string category
        decimal cost_price
        int low_stock_threshold
        boolean is_active
        timestamp created_at
    }

    warehouse_inventory {
        uuid id PK
        uuid warehouse_id FK
        uuid part_id FK
        int quantity_on_hand
        int quantity_reserved
        timestamp last_restocked
        timestamp updated_at
    }

    part_pickups {
        uuid id PK
        uuid technician_id FK
        uuid warehouse_id FK
        uuid part_id FK
        int quantity
        timestamp pickup_time
        text notes
    }

    part_usage {
        uuid id PK
        uuid repair_call_id FK
        uuid part_id FK
        uuid technician_id FK
        int quantity_used
        decimal unit_cost
        timestamp used_at
        text notes
    }
```



### 1.3 Backend Architecture

**Tech Stack:**

- Node.js with NestJS framework (TypeScript)
- PostgreSQL with PostGIS extension (geospatial queries)
- Redis for caching and session management
- Socket.io for real-time WebSocket connections
- Bull for job queues (notifications, allocation)
- JWT with refresh tokens for authentication

**Core API Modules:**

| Module | Endpoints | Description |

|-------------|------------------|-------------------|

| Auth | `/auth/*` | Register, login, refresh, password reset |

| Users | `/users/*` | Profile management, preferences |

| Calls | `/calls/*` | CRUD, status updates, assignment |

| Technicians | `/technicians/*` | Availability, skills, location updates |

| Allocation | `/allocation/*` | Auto-assign, manual override, queue |

| Ratings | `/ratings/*` | Submit and view ratings |

| Warehouses | `/warehouses/*` | CRUD, location search by zip code |

| Parts | `/parts/*` | Spare parts catalog CRUD |

| Inventory | `/inventory/*` | Stock levels, adjustments, low-stock alerts |

| Pickups | `/pickups/*` | Technician part pickups from warehouses |

| PartUsage | `/calls/:id/parts/*` | Log parts used on repair calls |

### 1.4 Frontend Architecture

**Tech Stack:**

- React 18 with TypeScript
- Vite for build tooling
- TanStack Query for server state
- Zustand for client state
- Socket.io-client for real-time
- Workbox for PWA/offline support
- Tailwind CSS with a custom design system
- React Router for navigation
- React Hook Form + Zod for forms

**Project Structure:**

```javascript
src/
  components/       # Shared UI components
  features/         # Feature-based modules
    auth/
    calls/
    technicians/
    operations/
    admin/
    inventory/      # Warehouses, parts, stock management
  hooks/            # Custom hooks
  services/         # API clients
  stores/           # State management
  utils/            # Helpers
```



### 1.5 Allocation Engine Logic

```mermaid
flowchart TD
    NewCall[New Repair Call] --> ParseLocation[Parse Customer Location]
    ParseLocation --> FindTechs[Query Available Technicians]
    FindTechs --> FilterSkills[Filter by Required Skills]
    FilterSkills --> FilterDistance[Filter by Service Area - 25km radius]
    FilterDistance --> ScoreTechs[Score Technicians]
    
    ScoreTechs --> CalcScore[Calculate Score]
    CalcScore --> |"Rating Weight: 40%"| RatingScore[Rating Score]
    CalcScore --> |"Distance Weight: 35%"| DistScore[Distance Score]
    CalcScore --> |"Workload Weight: 25%"| LoadScore[Current Load Score]
    
    RatingScore --> FinalScore[Combined Score]
    DistScore --> FinalScore
    LoadScore --> FinalScore
    
    FinalScore --> AutoAssign{Auto-Assign Enabled?}
    AutoAssign --> |Yes| AssignTop[Assign Top Scored Tech]
    AutoAssign --> |No| QueueOps[Queue for Ops Review]
    
    AssignTop --> NotifyTech[Notify Technician]
    QueueOps --> OpsDecision[Operations Dashboard]
    OpsDecision --> |Override| ManualAssign[Manual Assignment]
    OpsDecision --> |Approve| NotifyTech
    
    NotifyTech --> TechResponse{Technician Response}
    TechResponse --> |Accept| UpdateStatus[Update Call Status]
    TechResponse --> |Decline| FindNext[Try Next Technician]
    FindNext --> ScoreTechs
```



### 1.6 Spare Parts Inventory System

**Multi-Warehouse Architecture:**

- Multiple warehouses per zip code for geographic coverage
- Each warehouse maintains independent stock levels
- Technicians pick up parts from nearest warehouse before jobs
- Parts usage logged against each repair call for cost tracking
```mermaid
flowchart TD
    subgraph ops [Operations Management]
        ManageWH[Manage Warehouses]
        ManageParts[Manage Parts Catalog]
        ManageStock[Adjust Stock Levels]
        ViewAlerts[View Low Stock Alerts]
    end

    subgraph tech [Technician Workflow]
        ViewNearby[View Nearby Warehouses]
        CheckStock[Check Part Availability]
        LogPickup[Log Parts Pickup]
        LogUsage[Log Parts Used on Job]
    end

    subgraph system [System Automation]
        StockCheck[Stock Level Monitor]
        AlertGen[Generate Low Stock Alerts]
        CostCalc[Calculate Job Parts Cost]
    end

    ManageWH --> WHTable[(warehouses)]
    ManageParts --> PartsTable[(spare_parts)]
    ManageStock --> InvTable[(warehouse_inventory)]
    
    ViewNearby --> WHTable
    CheckStock --> InvTable
    LogPickup --> PickupsTable[(part_pickups)]
    LogPickup --> |Decrement| InvTable
    LogUsage --> UsageTable[(part_usage)]
    
    StockCheck --> InvTable
    StockCheck --> |Below Threshold| AlertGen
    AlertGen --> ViewAlerts
    
    UsageTable --> CostCalc
    CostCalc --> |Job Cost Report| RepairCall[(repair_calls)]
```


**Stock Alert System:**

- Configurable low-stock threshold per part
- Background job checks inventory levels hourly
- Operations dashboard shows alert badge count
- Alerts auto-resolve when stock is replenished

**Parts Cost Tracking:**

- Cost price stored at time of usage (snapshot)
- Total parts cost calculated per repair call
- Reports available for cost analysis by technician, warehouse, and time period

---

## Phase 2: Enhanced Features (Weeks 7-10)

### 2.1 GPS Tracking System

- Real-time technician location updates (throttled to every 30 seconds)
- Customer-facing ETA and map view
- Geofencing for arrival detection

### 2.2 In-App Chat

- WebSocket-based messaging between customer and technician
- Message persistence in PostgreSQL
- File/image sharing capability
- Read receipts

### 2.3 Push Notifications

- Web Push API integration
- Service worker for background notifications
- Notification preferences per user
- Critical vs. informational notification types

### 2.4 Live Operations Dashboard

- Real-time metrics (calls in queue, avg response time, active technicians)
- Geographic heat map of demand
- Drag-and-drop call reassignment
- Alert system for SLA breaches

---

## Phase 3: Scale and Optimize (Weeks 11-14)

### 3.1 Advanced Analytics

- Call volume trends and forecasting
- Technician performance scorecards
- Customer satisfaction metrics
- Revenue analytics (preparation for payment phase)

### 3.2 Enhanced Marketplace Features

- Technician certification badges
- Skill verification process
- Customer reviews with photos
- Technician earnings dashboard

### 3.3 Performance Optimization

- Database query optimization
- CDN for static assets
- API response caching
- Load testing and horizontal scaling

---

## Quality Assurance Strategy

### Testing Pyramid

| Level | Tools | Coverage Target |

|-------|-------|-----------------|

| Unit Tests | Jest, React Testing Library | 80% for business logic |

| Integration Tests | Supertest, TestContainers | API endpoints, DB operations |

| E2E Tests | Playwright | Critical user journeys |

| Performance | k6, Lighthouse | API latency, PWA scores |

### QA Process

1. **PR Reviews**: All code requires review before merge
2. **Automated CI**: Tests run on every push
3. **Staging Environment**: Mirror of production for UAT
4. **Load Testing**: Simulate 1000 concurrent users before launch

---

## Deployment Architecture

```mermaid
flowchart TB
    subgraph cdn [CDN - CloudFront]
        Static[Static Assets]
        PWA[PWA Shell]
    end

    subgraph lb [Load Balancing]
        ALB[Application Load Balancer]
    end

    subgraph compute [Compute - ECS/Fargate]
        API1[API Container 1]
        API2[API Container 2]
        Worker[Background Worker]
    end

    subgraph data [Data Stores]
        RDS[(RDS PostgreSQL)]
        ElastiCache[(ElastiCache Redis)]
        S3Store[S3 Bucket]
    end

    subgraph monitoring [Observability]
        CloudWatch[CloudWatch Logs]
        Sentry[Sentry Error Tracking]
    end

    Users[Users] --> cdn
    Users --> ALB
    ALB --> compute
    compute --> data
    compute --> monitoring
```

**Recommended AWS Services:**

- **Compute**: ECS Fargate (auto-scaling containers)
- **Database**: RDS PostgreSQL with PostGIS
- **Cache**: ElastiCache Redis
- **Storage**: S3 for images/documents