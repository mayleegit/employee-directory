import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Employee Directory API is running' });
});

app.get('/employees', async (req, res) => {
  try {
    const { q, sortBy = 'name', order = 'asc' } = req.query;

    const allowedSortColumns = ['name', 'hireDate', 'salary'];
    const safeSortBy = allowedSortColumns.includes(sortBy) ? sortBy : 'name';
    const safeOrder = order === 'desc' ? 'DESC' : 'ASC';

    let sql = 'SELECT * FROM employees';
    const params = [];

    if (q && q.trim() !== '') {
      sql += ' WHERE name LIKE ? OR empId LIKE ? OR email LIKE ?';
      const keyword = `%${q.trim()}%`;
      params.push(keyword, keyword, keyword);
    }

    sql += ` ORDER BY ${safeSortBy} ${safeOrder}`;

    const [rows] = await pool.execute(sql, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});

app.post('/employees', async (req, res) => {
  try {
    const { empId, name, email, department, position, hireDate, salary, active } = req.body;

    const sql = `
      INSERT INTO employees 
      (empId, name, email, department, position, hireDate, salary, active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
      empId,
      name,
      email,
      department,
      position,
      hireDate,
      salary,
      active
    ]);

    res.status(201).json({
      id: result.insertId,
      empId,
      name,
      email,
      department,
      position,
      hireDate,
      salary,
      active
    });
  } catch (error) {
    console.error(error);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        message: 'Employee ID or email already exists'
      });
    }

    res.status(500).json({ message: 'Failed to create employee' });
  }
});