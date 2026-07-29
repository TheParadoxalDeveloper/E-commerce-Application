# E-Commerce Application

A full-stack e-commerce REST API built with Express and Mongoose — products, categories, sub-categories, brands, carts, orders, wishlists, coupons, reviews, and Stripe checkout integration.

## Features

- JWT authentication with role-based access control
- Product catalog: categories, sub-categories, brands
- Cart and order management
- Coupons, reviews, and wishlists
- Stripe Checkout with webhook-based order fulfillment
- Image uploads (Multer)

## Tech Stack

- Node.js / Express
- MongoDB / Mongoose
- JSON Web Tokens
- Stripe

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the example environment file and fill in your own values:
   ```bash
   cp .env.example .env
   ```
3. Start the server:
   ```bash
   npm start
   ```

> If deploying to Vercel or another host, set `MONGODB_URI`, `SECRET_KEY`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET` in that platform's environment variable settings.
