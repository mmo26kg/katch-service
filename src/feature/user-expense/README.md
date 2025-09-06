# User Expense Module

## Overview
Complete NestJS module for managing user expenses with TypeORM and PostgreSQL.

## Features
- ✅ CRUD operations for user expenses
- ✅ Pagination and filtering
- ✅ Input validation with class-validator
- ✅ Expense categorization with enum
- ✅ Analytics endpoints (total, by category)
- ✅ Date range filtering
- ✅ Global exception handling

## Module Structure
```
src/feature/user-expense/
├── dto/
│   ├── create-user-expense.dto.ts    # Validation for creating expenses
│   ├── update-user-expense.dto.ts    # Validation for updating expenses
│   ├── get-user-expenses.dto.ts      # Query parameters for filtering
│   └── index.ts                      # Export all DTOs
├── user-expense.controller.ts        # REST API endpoints
├── user-expense.service.ts           # Business logic and database operations
├── user-expense.schema.ts            # TypeORM entity with enum categories
└── user-expense.module.ts            # Module configuration
```

## Expense Categories
- Food
- Transport  
- Entertainment
- Shopping
- Healthcare
- Education
- Utilities
- Other

## API Endpoints

### Base URL: `/user-expenses`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create new expense |
| GET | `/` | Get expenses with pagination/filters |
| GET | `/:id` | Get expense by ID |
| GET | `/user/:userId` | Get all expenses for a user |
| GET | `/user/:userId/total` | Get total expense amount for user |
| GET | `/user/:userId/categories` | Get expense breakdown by category |
| PATCH | `/:id` | Update expense |
| DELETE | `/:id` | Delete expense |

## Database Schema
- Table: `user_expenses`
- Primary Key: UUID
- Columns: id, user_id, amount, description, category, date, created_at, updated_at
- Category: Enum constraint

## Usage
1. Start application: `npm run dev`
2. Test with provided curl commands in `api-test.md`
3. Database tables created automatically in development mode
