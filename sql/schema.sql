CREATE DATABASE IF NOT EXISTS employee_directory;
USE employee_directory;

DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  empId VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  department VARCHAR(50) NOT NULL,
  position VARCHAR(100) NOT NULL,
  hireDate DATE NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO employees 
(empId, name, email, department, position, hireDate, salary, active)
VALUES
('EMP001', 'Aina Rahman', 'aina.rahman@company.com', 'HR', 'HR Executive', '2021-03-15', 3500.00, TRUE),
('EMP002', 'Daniel Tan', 'daniel.tan@company.com', 'IT', 'Software Developer', '2022-07-01', 5200.00, TRUE),
('EMP003', 'Siti Aminah', 'siti.aminah@company.com', 'Finance', 'Account Officer', '2020-01-20', 4300.00, TRUE),
('EMP004', 'Ravi Kumar', 'ravi.kumar@company.com', 'Operations', 'Operations Supervisor', '2019-11-10', 4800.00, FALSE),
('EMP005', 'Mei Ling', 'mei.ling@company.com', 'Marketing', 'Marketing Executive', '2023-04-12', 3900.00, TRUE),
('EMP006', 'Farhan Ismail', 'farhan.ismail@company.com', 'IT', 'System Analyst', '2018-09-05', 6800.00, TRUE),
('EMP007', 'Nur Izzati', 'nur.izzati@company.com', 'HR', 'Recruitment Officer', '2024-02-01', 3200.00, TRUE);