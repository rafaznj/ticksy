<p align="center">
  <a href="https://github.com/rafaznj/ticksy/blob/main/README-pt-br.md">Português</a> | <b>English</b>
</p>

# Ticksy

A help desk system to create, assign and track support tickets, with a metrics dashboard and notifications.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="frontend/src/assets/images/black-theme/home.gif">
    <img src="frontend/src/assets/images/light-theme/home.gif" width="100%" alt="Ticksy home screen">
  </picture>
</p>

## About

Ticksy is a full-stack help desk system that covers the whole ticket lifecycle: creation, assignment and status changes. Every step generates notifications for the people involved, and access to screens and actions varies according to the user's profile.

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=flat-square">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square">
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white&style=flat-square">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=flat-square">
  <img alt="Drizzle ORM" src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?logo=drizzle&logoColor=black&style=flat-square">
</p>

## How the idea came about

Ticksy started as a personal project to build a complete application end to end: authentication, a relational data model, a typed API, a modern frontend and a real deployment. A help desk was a great fit because it naturally brings together user profiles, state changes, dashboards and notifications.

## User profiles

| Profile | What it does |
| --- | --- |
| `employee` | Opens tickets and follows the progress of their own requests |
| `technical_assistance` | Receives the tickets assigned to them and marks them as resolved |
| `admin` | Manages users, assigns tickets and follows the system's metrics |

## Features

### Home

Every profile sees cards with the number of tickets per status and a list of the tickets the user created in the last seven days.

On the admin dashboard, Home also shows charts with the distribution of tickets by status and a list of all tickets created in the last seven days.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="frontend/src/assets/images/black-theme/home.gif">
    <img src="frontend/src/assets/images/light-theme/home.gif" width="100%" alt="Home">
  </picture><br>
  <sub><b>Home</b></sub>
</p>

### Create ticket

A form to open a new request, available to the `employee` profile.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="frontend/src/assets/images/black-theme/create-ticket.gif">
    <img src="frontend/src/assets/images/light-theme/create-ticket.gif" width="100%" alt="Create ticket">
  </picture><br>
  <sub><b>Create ticket</b></sub>
</p>

### Tickets

A paginated list of tickets, with assignment to technicians, unassignment, editing, deletion and resolution, according to each user's profile.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="frontend/src/assets/images/black-theme/tickets.gif">
    <img src="frontend/src/assets/images/light-theme/tickets.gif" width="100%" alt="Tickets">
  </picture><br>
  <sub><b>Tickets</b></sub>
</p>

### Users

Admin area to list, activate, deactivate and view the system's users.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="frontend/src/assets/images/black-theme/users.gif">
    <img src="frontend/src/assets/images/light-theme/users.gif" width="100%" alt="Users">
  </picture><br>
  <sub><b>Users</b></sub>
</p>

### Notifications

Notifications are typed (`ticket_created`, `ticket_assigned`, `ticket_unassigned`, `ticket_status_changed`), delivered individually to recipients in real time via SSE (Server-Sent Events), and tracked as read or unread per user.

- **Admin:** is notified when a ticket is created and when it is resolved.
- **Technical assistance:** is notified when a ticket is assigned to them.
- **Employee:** is notified when the status of their ticket changes and when it is resolved.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="frontend/src/assets/images/black-theme/notifications.gif">
    <img src="frontend/src/assets/images/light-theme/notifications.gif" width="100%" alt="Notifications">
  </picture><br>
  <sub><b>Notifications</b></sub>
</p>

### Sidebar

Lets users edit their profile and switch between the light and dark themes and between Portuguese and English.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="frontend/src/assets/images/black-theme/sidebar.gif">
    <img src="frontend/src/assets/images/light-theme/sidebar.gif" width="100%" alt="Sidebar">
  </picture><br>
  <sub><b>Sidebar</b></sub>
</p>

## How to access

**Try it online:** [https://ticksy.rafaelsena.dev](https://ticksy.rafaelsena.dev)

Or run it locally following the instructions below.

## Running it locally

The project is a pnpm monorepo: dependencies are installed once, at the root.

```bash
# 1. Clone the repository
git clone https://github.com/rafaznj/ticksy.git

# 2. Enter the project folder
cd ticksy

# 3. Install dependencies (at the monorepo root)
pnpm install

# 4. Set up the environment variables (see the .env.example files)

# 5. Run the migrations (inside the backend folder)
cd backend
pnpm migrate
cd ..

# 6. Run the frontend and the backend together (at the root)
pnpm dev
```

The frontend will be available at `http://localhost:5173` (Vite's default port).

To run each part separately, you can use the root scripts:

```bash
pnpm dev:frontend
pnpm dev:backend
```

Or enter each folder (`frontend/` or `backend/`) and run `pnpm dev`.

## Test users (seed)

The system automatically creates three seed users, one for each profile, so you can explore the app without having to sign up:

| Profile | Name | E-mail | Password |
| --- | --- | --- | --- |
| `employee` | Employee | `employee@email.com` | `@Aa12345` |
| `technical_assistance` | Technical Assistance | `technical_assistance@email.com` | `@Aa12345` |
| `admin` | Administrator | `admin@email.com` | `@Aa12345` |

## API documentation (Swagger)

The backend API is documented with Swagger, and you can explore and test the endpoints straight from the browser:

- **Local:** open `/docs` at the address where the backend is running (for example, `http://localhost:4002/docs`)
- **Production:** [https://ticksy-backend-sapr.onrender.com/docs](https://ticksy-backend-sapr.onrender.com/docs)

## Structure

```
.
├── frontend/
│   └── src/
│       ├── assets/
│       │   └── images/
│       │       ├── light-theme/                            # README GIFs (light theme)
│       │       └── black-theme/                            # README GIFs (dark theme)
│       ├── components/
│       │   ├── auth/                                       # AuthCarousel
│       │   ├── dashboard/                                  # Admin, Employee and Technical Assistance metrics
│       │   ├── form/                                       # Form fields (TanStack Form)
│       │   ├── layouts/                                    # Sidebar
│       │   ├── preferences/                                # Theme and language toggles
│       │   ├── tables/                                     # Infinite list, paged table and the users, tickets and notifications tables
│       │   └── ui/                                         # shadcn/ui primitive components
│       ├── forms/                                          # All the system's forms
│       │   ├── auth/
│       │   ├── tickets/
│       │   └── users/
│       ├── hooks/
│       ├── infrastructure/                                 # Interceptors
│       ├── lib/                                            # Definitions, typings and dependency injection container (Inversify) for the libraries in use
│       ├── modules/                                        # Services, repositories, query hooks, enums, DTOs and entity typings
│       │   ├── auth/
│       │   ├── tickets/
│       │   ├── users/
│       │   └── notifications/
│       ├── pages/                                          # All the system's pages
│       ├── routes/                                         # System routes
│       └── shared/                                         # Shared files
|
|
├── backend/
│   ├── .env.example                                        # Example of how the environment variables should look
│   ├── setup.ts                                            # Project setup script
│   └── src/
│       ├── database/
│       │   ├── config.ts                                   # Database connection configuration
│       │   ├── tokens.ts                                   # Database injection tokens
│       │   └── drizzle/
│       │       ├── migrations/                             # SQL migrations and metadata
│       │       ├── schema/                                 # Tables: users, tickets, notifications, notification-recipients and refresh-tokens
│       │       └── utils/                                  # Utilities (e.g. to-pg-enum)
│       ├── modules/
│       │   ├── auth/                                       # JWT authentication: login, register, refresh and logout
│       │   ├── ticket/                                     # Ticket creation, assignment, resolution and queries
│       │   ├── user/                                       # User management: creation, activation, deactivation and invitation
│       │   └── notification/                               # Notifications: creation, listing, unread count and mark as read
│       └── shared/                                         # Code shared between modules
│           ├── base/                                       # Generic repositories and services reused by the modules
│           ├── config/                                     # JWT and Swagger configuration
│           ├── di/                                         # Dependency injection tokens for repositories and services
│           ├── exceptions/                                 # Custom application exception
│           ├── filters/                                    # Global exception filter
│           ├── interfaces/                                 # Shared types (responses, errors, pagination and query options)
│           └── utils/                                      # Helpers for pagination, ordering, filters, responses, refresh cookie and password generation
|
├── eslint.config.js                                        # ESLint (flat config) at the monorepo root
```

## Ideas for improvement

- [ ] Workspaces: an isolated space for each organization, with its own users, tickets and metrics
- [ ] Comments and change history on each ticket
- [ ] Image and file attachments on tickets
