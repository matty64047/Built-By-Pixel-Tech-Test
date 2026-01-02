# Task App

A **Next.js** application for managing user tasks and public tasks, powered by a **GraphQL** backend. The GraphQL endpoint can be configured via environment variables.

---

## Table of Contents

- [Features](#features)  
- [Demo](#demo)  
- [Prerequisites](#prerequisites)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [Available Scripts](#available-scripts)  
- [Project Structure](#project-structure)  
- [Technologies](#technologies)  
- [License](#license)  

---

## Features

- View tasks assigned to a user.  
- View public tasks.  
- Dynamic task filtering and searching.  
- Server-side rendering for faster page loads.  
- Modern React + Next.js stack with GraphQL integration.  

---

## Demo

> Add a link or screenshot of the app here once deployed.

---

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js >= 18  
- npm >= 9 or yarn  
- Git  

---

## Getting Started

1. **Clone the repository**  

```bash
git clone https://github.com/matty64047/Built-By-Pixel-Tech-Test.git
cd Built-By-Pixel-Tech-Test
````

2. **Install dependencies**

```bash
npm install
# or
yarn
```

3. **Configure environment variables**

Change the Graphql Endpoint using the `.env` file in the root directory:

```env
GRAPHQL_ENDPOINT=https://your-graphql-api.com/graphql
```

> Replace the URL with your GraphQL endpoint.

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

5. **Build for production**

```bash
npm run build
npm start
# or
yarn build
yarn start
```

---

## Environment Variables

| Variable               | Description                       |
| ---------------------- | --------------------------------- |
| `GRAPHQL_ENDPOINT`     | URL of the GraphQL API backend    |

---

## Available Scripts

* `dev` – Run the app in development mode
* `build` – Build the app for production
* `start` – Start the production server
* `lint` – Run Biome check
* `format` – Format code using Biome
* `codegen` – Use Codegen to generate Types from your Graphql queries for type safety
---

## Project Structure

```
.
├── app/                # Next.js app directory
├── components/         # Shadcn components
├── graphql/            # GraphQL queries & mutations
├── actions/            # Server actions
├── hooks/              # Hooks
├── lib/                # Helper functions
├── .env                # Environment variables
└── package.json
```

---

## Technologies

* Next.js 14+
* React 18+
* TypeScript
* GraphQL & Apollo Client

---

> Built with ❤️ using Next.js and GraphQL