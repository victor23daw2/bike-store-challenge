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

The `invalid_combinations` table helps to control rules like “don’t mix red rims with mountain wheels”. This way, I don’t need to hardcode logic and can just update the DB. Each row links two options from the `options` table (`option_1` and `option_2` both point to options).

This way, I can change or add rules without changing code. It also makes things cleaner and easy to maintain.

Each option has a `stock` so unavailable parts can be hidden from the frontend.

---

### 💡 App Structure & Clean Code

I split the code by responsibilities, using models, services, serializers, etc.

It’s structured in a modular way, which makes it easier to scale and maybe use **Packwerk** later.

Even tho **Sorbet** isn’t installed, I wrote code that could be typed if needed.

I also tried to follow **SOLID**.

---

### ✅ Things you can try

- Customize a bike (select a frame, brakes, wheels, and saddle).
- Try to add a combination that is invalid → you’ll get an error.
- Add items to the cart and see the total update.
- Remove items from the cart.
- Use the admin panel to:
  - Create new products and options
  - Associate options with products
- Options out of stock are disabled in the dropdown.

Everything works without login or accounts to keep the flow quick and simple.

---

### 🚫 Invalid Option Combinations

Some parts don’t make sense together (like `Mountain wheels` and `Rim brakes`).  
To handle this, I use an `invalid_combinations` table to store those pairs.

Each row links two records from the `options` table (`option_1` and `option_2` both reference options).

This makes it easy to add or modify rules without changing any code, keeping the system clean and maintainable.

You can test the following invalid combinations (preloaded in `seeds.rb`):

- ❌ "Mountain wheels" + "Rim brakes" → not safe
- ❌ "Step-through frame" + "Racing saddle" → not ergonomic
- ❌ "Disc brakes" + "Sport saddle" → incompatible configuration

This validation happens on the frontend before adding to the cart. No request is sent if the combination is invalid.

---

### 🔗 Inspiration

I watched a talk by **Genar Trias**, a Staff Engineer from Factorial, where he shared how they scaled their Rails app to 600k+ lines of code.

What really stood out to me was how they kept things under control even as the system got big. That inspired me to think ahead and try to build this project in a clean, organized way too.

---

## 🐳 Running the project with Docker

This project includes a full Docker setup to run the backend (Rails API), frontend (React with TypeScript), and PostgreSQL database.

### 🚀 Quick Start

1. Make sure you have Docker and Docker Compose installed
2. Clone this repository and navigate to the project root
3. Run the following command:

```bash
docker-compose up --build
```

4. Access the application:

Frontend: http://localhost:3001

Backend API: http://localhost:3000

