# Authentication Setup Guide

## Prerequisites
- Node.js and npm installed
- PostgreSQL database running
- Prisma CLI installed globally: `npm install -g prisma`

## Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ibyiwacu?schema=public"
JWT_SECRET="your-super-secret-jwt-key-here-change-this-in-production"
```

## Database Setup
1. Update the DATABASE_URL in your `.env` file with your actual database credentials
2. Run the database migration:
   ```bash
   npx prisma migrate dev
   ```
3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

## Running the Application
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run start:dev
   ```

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `GET /auth/profile` - Get current user profile (protected)

### Request Examples

#### Signup
```json
POST /auth/signup
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "StrongPassword123!"
}
```

#### Signin
```json
POST /auth/signin
{
  "email": "john@example.com",
  "password": "StrongPassword123!"
}
```

#### Protected Route
```bash
GET /auth/profile
Authorization: Bearer <your-jwt-token>
```

## Features
- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Protected routes with guards
- ✅ Input validation with class-validator
- ✅ Database integration with Prisma
- ✅ Environment configuration
- ✅ Error handling

## Security Features
- Password hashing with salt rounds
- JWT token expiration (24 hours)
- Input validation and sanitization
- Protected route guards
- User existence validation
- Conflict handling for duplicate users 