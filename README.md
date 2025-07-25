# Torre Genome Searcher and data visualization

A simple full-stack app built with Next.js and TypeScript to search and display profiles using the [Torre API](https://torre.ai/), featuring a custom proxy server to handle CORS restrictions.

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Technology Stack](#technology-stack)
- [API Endpoints](#api-endpoints)
- [Demo](#demo-video)
- [Planning & Goals](#planning--goals)
- [MVP Features](#mvp-features)
- [Roadmap](#roadmap)
- [Challenges & Solutions](#challenges--solutions)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)

## About the Project

This project was built as part of a technical assessment. The goal was to consume the Torre API and create a minimal search experience that allows users to find and view public profiles.

While working on the app, I encountered several real-world technical obstacles (like CORS errors) and took the opportunity to solve them using a full-stack approach.

## Technology Stack

### Frontend Core

- NextJs
- TypeScript
- TailwindCSS
- Shadcn UI

## API Endpoints

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| `GET`  | `/genome/[username]`          | Retrieve Genome Data JSON         |
| `POST` | `/torre-seatch-stream`           | Search from API user info  |

## Demo Video

<https://www.loom.com/share/14e52d95484c4612ab743503e8a635db?sid=1d6534b2-6c83-4137-91be-7b358fa0bfd0>

## Planning & Goals

The core goals I set before starting the challenge:

- [x] Create a searchable interface for Torre profiles
- [x] Design a reusable profile card component
- [x] Handle API integration securely and efficiently
- [x] Write modular, maintainable code with TypeScript
- [x] Learn from and document any blockers I hit

## MVP Features

- ✅ Search input with real data
- ✅ Custom hooks for fetching user data
- ✅ Proxy server for secure API integration
- ✅ Typed response models with TypeScript

## Roadmap

Status ----- Feature

✅    Proxy server to handle CORS

✅    Profile search input

✅    Typed API response

🟡    Better loading and error states

🔲    Filter by skills/location/better profile

🔲    Caching or local search history

🔲    Unit testing

## Project Structure

```sh
│
├── src/
│   ├──app
│   │  ├────appi
│   │  │────genome
│   └──components
│      └──ui
│   └──components
│   ├──context
│   └──hooks
│   ├──lib
│   └──types
│
├── vercel.json
├── README.md
├── package.json
```

## Challenges & Solutions

### Challenge: CORS error when calling the Torre API from the frontend

 One of the main challenges I faced during this project was integrating an external API that did not support CORS.

 To solve it, I implemented a proxy server using Next.js API routes. The proxy handled forwarding the request, adding the necessary CORS headers, and returning the data back to the client safely.

 This took considerable time during the assessment, but it taught me how to solve a real-world problem where frontend-only solutions fall short — and how to bridge the gap using backend logic effectively.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
