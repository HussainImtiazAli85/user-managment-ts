# User Management Dashboard

A responsive user management application built with React and TypeScript.
It allows you to view, add, edit, and delete users through a clean dashboard UI.

## Live Demo

[View Live ->](https://user-management-theta-rust.vercel.app)

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Ant Design

## Features

- View users in a clean dashboard layout
- Add new users through a form
- Edit existing user details
- Delete users
- Search users by name, email, or phone
- Filter users by role and status
- View summary statistics for users and administrators
- Responsive interface for desktop and mobile

## Getting Started

```bash
# Clone the repo
git clone https://github.com/HussainImtiazAli85/user-managment-ts.git

# Install dependencies
npm install

# Start the dev server
npm run dev
```

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Environment Variables

The project supports a configurable mock API delay:

```env
VITE_API_DELAY=1000
```

If this variable is not set, the app defaults to 1000 milliseconds.

## Project Structure

```text
src/
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── services/      # Mock API layer
├── types/         # TypeScript interfaces
├── App.tsx        # Root component
└── main.tsx       # Application entry point
```

## Notes

- This project currently uses a mock in-memory API for local development.
- Changes are reset when the page reloads.
- The live demo is deployed on Vercel.

## GitHub Repo Setup

The GitHub About section is managed on GitHub, not from this repository. To complete the repo presentation, add these manually on the repo page:

- Description: User management dashboard built with React, TypeScript, Tailwind CSS, and Vite
- Topics: react, typescript, tailwind, vite