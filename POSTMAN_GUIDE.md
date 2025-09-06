# Postman Collection Guide

## 📦 Files Included
- `postman-collection.json` - Complete API collection with all endpoints
- `postman-environment.json` - Environment variables for development

## 🚀 Setup Instructions

### 1. Import Collection
1. Open Postman
2. Click "Import" button
3. Select `postman-collection.json`
4. Collection "Katch Service - User Expense API" will be added

### 2. Import Environment
1. In Postman, go to "Environments" tab
2. Click "Import" 
3. Select `postman-environment.json`
4. Select "Katch Service - Development" environment from dropdown

### 3. Start Your Server
```bash
npm run dev
```
Server should be running on http://localhost:3001

## 🔧 Variables
- `baseUrl`: Server URL (default: http://localhost:3001)
- `userId`: Default user ID for testing (default: 1)
- `expenseId`: Auto-populated after creating an expense

## 📋 Available Endpoints

### 1. **Create User Expense** (POST)
- Creates new expense
- Auto-saves expense ID to `expenseId` variable for subsequent tests
- **Body**: JSON with userId, amount, description, category, date

### 2. **Get All User Expenses** (GET)
- Paginated list of all expenses
- **Query params**: page, limit
- **Tests**: Validates pagination metadata

### 3. **Get Expenses by User ID** (GET)
- All expenses for specific user
- Uses `userId` variable

### 4. **Get Expenses with Filters** (GET)
- Advanced filtering options
- **Filters**: userId, category, startDate, endDate, description
- Some filters disabled by default (can be enabled)

### 5. **Get Specific Expense** (GET)
- Single expense by UUID
- Uses auto-populated `expenseId`

### 6. **Get Total Expense by User** (GET)
- Total amount for user
- **Tests**: Validates response structure

### 7. **Get Total with Date Range** (GET)
- Total amount within date range
- **Query params**: startDate, endDate

### 8. **Get Expenses by Category** (GET)
- Breakdown by category with totals and counts
- **Tests**: Validates array structure

### 9. **Update User Expense** (PATCH)
- Partial update of expense
- Uses auto-populated `expenseId`
- **Tests**: Validates updated values

### 10. **Delete User Expense** (DELETE)
- Removes expense by UUID
- **Tests**: Validates 204 status code

## 🧪 Testing Features

### Automatic Tests
Each request includes automatic tests that validate:
- Response status codes
- Response structure
- Data integrity
- Response time (< 5 seconds)

### Variable Management
- `expenseId` is automatically captured after creating an expense
- All subsequent requests use this ID
- No manual copy-paste needed

### Global Tests
- All responses checked for non-500 status
- Response time validation
- Consistent error handling

## 📋 Test Categories Available
- Food
- Transport  
- Entertainment
- Shopping
- Healthcare
- Education
- Utilities
- Other

## 🔄 Recommended Test Flow
1. **Create User Expense** - Creates expense and saves ID
2. **Get All User Expenses** - Verify it appears in list
3. **Get Specific Expense** - Test single expense retrieval
4. **Get Total Expense** - Check analytics
5. **Get by Category** - Test breakdown
6. **Update User Expense** - Modify the expense
7. **Get Expenses with Filters** - Test filtering
8. **Delete User Expense** - Clean up (optional)

## 🔧 Customization
- Change `baseUrl` for different environments (staging, production)
- Modify `userId` to test different users
- Add authentication headers when auth is implemented
- Adjust test assertions based on your needs

## 🐛 Troubleshooting
- Ensure server is running on correct port
- Check environment is selected
- Verify database connection is working
- Check console for detailed error messages
