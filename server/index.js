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