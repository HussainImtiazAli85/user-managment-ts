# User Management TS

A user management frontend built with Vite, React, and TypeScript. The app provides a clean admin-style interface for viewing, filtering, creating, editing, and deleting users.

## Tech Stack

- React 18
- TypeScript
- Vite
- Ant Design
- Tailwind CSS
- ESLint

## Features

- View a list of users
- Search users by name, email, or phone number
- Filter users by role and status
- Create new users
- Edit existing users
- Delete users
- View summary statistics for total users, active users, and administrators
- Uses a mock in-memory API for local development

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

The app will start on the local Vite development server.

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Environment Variables

You can control the simulated API latency with the following variable:

```env
VITE_API_DELAY=1000
```

If this variable is not set, the app uses a default delay of 1000 milliseconds.

## Project Structure

```text
src/
  components/
    UserFilters.tsx
    UserForm.tsx
    UserList.tsx
    UserManagement.tsx
  hooks/
    useUsers.ts
  services/
    userApi.ts
  types/
    User.ts
  App.tsx
  index.css
  main.tsx
```

## Notes

- User data is stored in memory inside the mock API service.
- Any changes made while the app is running are reset when the page reloads.
- This project is intended for frontend development and UI demonstration.

## Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` folder.