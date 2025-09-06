# User Expense API Test Commands

## 1. Create a new expense
curl -X POST http://localhost:3001/user-expenses \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "amount": 25.50,
    "description": "Lunch at restaurant",
    "category": "Food",
    "date": "2025-09-06T12:00:00Z"
  }'

## 2. Get all expenses with pagination
curl -X GET "http://localhost:3001/user-expenses?page=1&limit=10"

## 3. Get expenses by user ID
curl -X GET http://localhost:3001/user-expenses/user/1

## 4. Get expenses with filters
curl -X GET "http://localhost:3001/user-expenses?userId=1&category=Food&page=1&limit=5"

## 5. Get total expense by user
curl -X GET http://localhost:3001/user-expenses/user/1/total

## 6. Get expenses by category for user
curl -X GET http://localhost:3001/user-expenses/user/1/categories

## 7. Update an expense (replace {id} with actual UUID)
curl -X PATCH http://localhost:3001/user-expenses/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 30.00,
    "description": "Updated lunch expense"
  }'

## 8. Delete an expense (replace {id} with actual UUID)
curl -X DELETE http://localhost:3001/user-expenses/{id}

## 9. Get specific expense by ID (replace {id} with actual UUID)
curl -X GET http://localhost:3001/user-expenses/{id}

## Available Categories:
# Food, Transport, Entertainment, Shopping, Healthcare, Education, Utilities, Other
