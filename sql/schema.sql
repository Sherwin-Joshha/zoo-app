DROP DATABASE IF EXISTS zoo_management;
CREATE DATABASE IF NOT EXISTS zoo_management;
USE zoo_management;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('visitor','admin') NOT NULL DEFAULT 'visitor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ticket_id CHAR(36) NOT NULL, -- UUID
  user_id INT,
  visitor_name VARCHAR(255),
  adult_count INT NOT NULL DEFAULT 0,
  child_count INT NOT NULL DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL,
  visit_date DATE NOT NULL,
  qr_code TEXT,
  status VARCHAR(50) DEFAULT 'valid',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE animals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  species VARCHAR(255) NOT NULL,
  category ENUM('bird','mammal','reptile') NOT NULL,
  habitat VARCHAR(255),
  lifespan INT,
  diet VARCHAR(255),
  zone VARCHAR(255),
  image_filename VARCHAR(255),
  fun_fact TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE zones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  zone_name VARCHAR(255) NOT NULL,
  description TEXT,
  lat DECIMAL(10,8),
  lng DECIMAL(11,8)
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(255) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  date_of_joining DATE NOT NULL,
  current_task VARCHAR(255),
  status ENUM('available','on_task','off_duty') NOT NULL DEFAULT 'available'
);

CREATE TABLE employee_earnings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  ticket_id INT,
  amount DECIMAL(10,2) NOT NULL,
  source VARCHAR(50) DEFAULT 'commission',
  date DATE NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

CREATE TABLE contact_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  issue_type VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('pending', 'resolved') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  login_time DATETIME NOT NULL,
  logout_time DATETIME,
  date DATE NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);
