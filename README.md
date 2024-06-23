# Introduction

![Portfolio Avatar](./app/avatar-portfolio.jpg | width=100 height=100)

**This is Midori's online portfolio, Continuously updated.**

## Tech stack

| **Category**       | **Technology**                           |
|--------------------|------------------------------------------|
| Framework          | [Next.js](https://nextjs.org/)           |
| Database           | [Postgres](https://vercel.com/postgres)  |
| Authentication     | [NextAuth.js](https://next-auth.js.org)  |
| Deployment         | [Vercel](https://vercel.com)             |
| Styling            | [Tailwind CSS](https://tailwindcss.com)  |

## Running Locally

This application requires Node.js v18.17+.

```bash
git clone git@github.com:midori-profile/midori-portfolio.git
cd midori-portfolio
pnpm install
pnpm run start
```

Create a `.env.local` file similar to [`.env.example`](https://github.com/midori-profile/midori-portfolio/blob/master/.env.example)and follow the comments to set up your environment variables.

## Database Schema

```sql
CREATE TABLE redirects (
  id SERIAL PRIMARY KEY,
  source VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  permanent BOOLEAN NOT NULL
);

CREATE TABLE guestbook (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  url VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP
);

CREATE INDEX idx_comments_url ON comments (url);

CREATE TABLE views (
  slug VARCHAR(255) PRIMARY KEY,
  count INT NOT NULL
);
```

## Thanks

Feel free to use my portfolio as a template, but please remove my personal posts and content.

Thanks to https://github.com/leerob/leerob.io for the inspiration.

