## 🛒 Factorial RH Tech Challenge – Bicycle Shop

This is a full-stack project I built for a technical challenge from Factorial RH.

It's an online shop where people can customize a bike and add it to their cart. I tried to keep the app simple but clean, and also easy to grow if needed later.

---

### 🚀 Tech Stack

- **Backend**: Ruby on Rails (API-only)
- **Frontend**: React + TypeScript (Vite)
- **Database**: PostgreSQL
- **State Management**: `useState` + `useContext`
- **Ruby**: 3.2.3
- **Rails**: 7.2.2

> I choose recent versions because I’m familiar with them and they have good features and performance. Also, I kept in mind tools like **Packwerk** and **Sorbet**, even if they’re not included directly in the project yet.

---

### 📊 Database Design

The DB is designed to support more products in the future, not just bikes. (skis, surfboards... etc.)

#### Main Tables

- `products`: like a bike, has name and category.
- `option_categories`: like "frame", "wheels", "brakes"...
- `options`: specific option like "Disc brake" or "Drop bar". Belongs to a category. Has stock.
- `product_options`: connects which options go with which product.
- `invalid_combinations`: stores 2 options that shouldn't be selected together.
- `carts`: user shopping cart.
- `cart_items`: each item has a product and customization (as JSON)

I'm using `jsonb` in the `customization` column cause it’s more flexible and avoids creating tons of extra fields. I read some blogposts (from Percona and Medium) explaining why this is a good idea for dynamic stuff.

The `invalid_combinations` table helps to control rules like “don’t mix red rims with mountain wheels”. This way, I don’t need to hardcode logic and can just update the DB.

Each option has a `stock` so unavailable parts can be hidden from the frontend.

---

### 💡 App Structure & Clean Code

I split the code by responsibilities, using models, services, serializers, etc.

It’s structured in a modular way, which makes it easier to scale and maybe use **Packwerk** later.

Even tho **Sorbet** isn’t installed, I wrote code that could be typed if needed.

I also tried to follow **SOLID**:

- **S**: logic is in service objects
- **O**: easy to add new stuff without breaking old code
- **L / I / D**: kept things simple and loosely coupled

---

### 🚫 Invalid Option Combos

Some parts don’t make sense together (like `Mountain wheels` and `Red rims`). I use an `invalid_combinations` table to store those pairs.

Each row links two options from the `options` table (`option_1` and `option_2` both point to options).

This way, I can change or add rules without changing code. It also makes things cleaner and easy to maintain.

---

### 🔗 Inspiration

I watched a talk by **Genar Trias**, a Staff Engineer from Factorial, where he shared how they scaled their Rails app to 600k+ lines of code.

What really stood out to me was how they kept things under control even as the system got big. That inspired me to think ahead and try to build this project in a clean, organized way too.

---

### ⚙️ How to Run the App (WIP)

## Backend

bundle install
rails db:create db:migrate db:seed
rails s

## Frontend
npm install
npm run dev
