# E-Commerce Application

A modern, full-featured e-commerce application built with Nuxt 3, Vue.js, TailwindCSS, Inspira UI, and Supabase.

## Features

### Customer Store
- **Homepage** with hero section, featured categories, and products
- **Product Catalog** with advanced filtering and search
- **Product Details** with image gallery, variants, reviews, and ratings
- **Shopping Cart** with quantity management and order summary
- **Checkout Process** with shipping address and payment integration
- **User Authentication** (login, register, password reset)
- **User Profile** and order history
- **Product Reviews** and ratings system

### Admin Panel
- **Dashboard** with sales analytics, charts, and key metrics
- **Product Management** with CRUD operations, variants, and attributes
- **Order Management** with status tracking and fulfillment
- **Category Management** with hierarchical structure
- **User Management** with role-based access control
- **Coupon Management** for discounts and promotions
- **Analytics** with sales reports and insights
- **Rich Text Editor** for product descriptions
- **Image Upload** and management

### Technical Features
- **Responsive Design** with TailwindCSS
- **Component Library** using Inspira UI
- **Real-time Data** with Supabase
- **Authentication** with JWT and role-based access
- **File Storage** with Supabase Storage
- **Charts** using Chart.js for analytics
- **SEO Optimized** with Nuxt 3
- **Type Safety** with TypeScript

## Tech Stack

- **Frontend**: Nuxt 3, Vue.js 3, TailwindCSS
- **UI Components**: Inspira UI
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Charts**: Chart.js, Vue-ChartJS
- **Rich Text**: TipTap Editor
- **Styling**: TailwindCSS
- **Type Safety**: TypeScript

## Database Schema

The application uses the following Supabase tables:

- `auth.users` - User authentication (Supabase built-in)
- `addresses` - User shipping/billing addresses
- `brands` - Product brands
- `categories` - Product categories (hierarchical)
- `products` - Main product information
- `product_images` - Product image gallery
- `product_variants` - Product variations (size, color, etc.)
- `product_attributes` - Product specifications
- `reviews` - Product reviews and ratings
- `cart_items` - Shopping cart items
- `orders` - Customer orders
- `order_items` - Order line items
- `coupons` - Discount coupons
- `notifications` - User notifications
- `sales_reports` - Analytics data
- `user_activity_logs` - User activity tracking

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Add your Supabase project URL and anon key:
     ```
     SUPABASE_URL=your_supabase_project_url
     SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Database Setup**
   - Create a new Supabase project
   - Run the SQL schema provided in the requirements
   - Enable Row Level Security (RLS) policies
   - Set up storage buckets for images

5. **Run the application**
   ```bash
   npm run dev
   ```

6. **Admin Access**
   - Create a user account
   - Update the user's metadata in Supabase Auth to include `role: 'admin'`
   - Access admin panel at `/admin`

## Project Structure

```
├── assets/
│   └── css/
├── components/
│   ├── Admin/
│   ├── App/
│   ├── Cart/
│   ├── Product/
│   └── UI/
├── composables/
├── layouts/
├── middleware/
├── pages/
│   ├── admin/
│   ├── auth/
│   └── products/
├── plugins/
└── public/
```

## Key Features Implementation

### Authentication & Authorization
- JWT-based authentication with Supabase Auth
- Role-based access control (customer vs admin)
- Protected routes with middleware
- User profile management

### Product Management
- Complete CRUD operations
- Image upload and gallery
- Product variants (size, color, etc.)
- Product attributes and specifications
- Category and brand associations

### Shopping Experience
- Advanced product filtering and search
- Shopping cart with persistent storage
- Checkout process with address management
- Order tracking and history
- Product reviews and ratings

### Admin Dashboard
- Sales analytics with charts
- Real-time metrics and KPIs
- Order management and fulfillment
- Inventory tracking and alerts
- User and content management

### Performance & SEO
- Server-side rendering with Nuxt 3
- Optimized images and lazy loading
- SEO meta tags and structured data
- Responsive design for all devices

## Deployment

The application can be deployed to various platforms:

- **Vercel**: `npm run build` and deploy
- **Netlify**: Configure build settings
- **AWS/GCP**: Use Docker or static hosting
- **Supabase**: Database and storage are cloud-hosted

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.