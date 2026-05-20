# Employee Directory

Name: LEE MAY YAN  
Matric Number: A24CS0101
## Project Overview

This project is an Employee Directory web application developed for the Chapter 8 Individual Assignment. The system allows HR staff to manage employee records using a Vue 3 frontend, an Express backend API and MySQL database.

The application supports full CRUD operations, server-side search, server-side sorting, form validation, Axios integration and employee data storage.

## Technologies Used

- Vue 3
- Vite
- Composition API
- Axios
- Node.js
- Express
- MySQL
- mysql2
- Laragon
- Thunder Client

## Setup Instructions

### 1. Install dependencies

Open terminal in the project root folder and run:

```bash
npm install
```

### 2. Start Laragon

Open Laragon and click:

```text
Start All
```

Make sure MySQL is running on port `3306`.

### 3. Import the database

Open HeidiSQL or phpMyAdmin from Laragon.

Run the SQL script located at:

```text
sql/schema.sql
```

This will create:

- `employee_directory` database
- `employees` table
- sample employee records

### 4. Start the application

Run:

```bash
npm run dev
```

This starts both servers:

```text
Frontend: http://localhost:5174
Backend:  http://localhost:3001
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/employees` | Get all employees |
| GET | `/employees?q=keyword` | Search employees |
| GET | `/employees?sortBy=empId&order=asc` | Sort employees |
| POST | `/employees` | Add employee |
| PUT | `/employees/:id` | Update employee |
| DELETE | `/employees/:id` | Delete employee |

## Main Features

- Add employee records
- View employee list
- Edit employee details
- Delete employee records
- Search employees by:
  - employee name
  - employee ID
  - email
- Sort employees by:
  - employee ID
  - name
  - hire date
  - salary
- Client-side form validation
- Inline validation error messages
- Axios request and response interceptors
- Loading and error states
- Active and inactive employee badges
- Salary formatting in Malaysian Ringgit
- Responsive layout for laptop and tablet screen sizes

## Validation Rules

The employee form validates the following:

- Employee ID must follow the format `EMP001`
- Name must be at least 3 characters
- Email must be valid
- Department must be selected
- Position is required
- Hire date cannot be in the future
- Salary must be between RM1,500 and RM50,000

## Notes on Implementation

The backend uses prepared statements with `?` placeholders through the `mysql2` promise pool to help prevent SQL injection.

Sorting is restricted to whitelisted columns:

```text
empId
name
hireDate
salary
```

The frontend uses a reusable Axios service module located in:

```text
src/services/api.js
```

## Folder Structure

```text
employee-directory/
├── src/
│   ├── components/
│   │   ├── EmployeeForm.vue
│   │   ├── EmployeeList.vue
│   │   └── SearchSortControls.vue
│   ├── services/
│   │   └── api.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── server/
│   ├── db.js
│   └── index.js
├── sql/
│   └── schema.sql
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Author

LEE MAY YAN  
A24CS0101
SECTION 04
