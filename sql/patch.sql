-- ============================================================
-- Zoo Management – Database Patch
-- Run this file once against your existing zoo_management DB.
-- Safe to re-run on any MySQL version.
-- ============================================================

USE zoo_management;

-- 1. Add 'source' column to employee_earnings if it doesn't exist
SET @exist := (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = 'zoo_management'
    AND TABLE_NAME   = 'employee_earnings'
    AND COLUMN_NAME  = 'source'
);
SET @sql := IF(
  @exist = 0,
  'ALTER TABLE employee_earnings ADD COLUMN source VARCHAR(50) DEFAULT ''commission'' AFTER amount',
  'SELECT ''source column already exists'''
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 2. Create contact_requests table if it doesn't already exist
CREATE TABLE IF NOT EXISTS contact_requests (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  issue_type VARCHAR(100) NOT NULL,
  message    TEXT NOT NULL,
  status     ENUM('pending', 'resolved') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Confirm final structure
DESCRIBE employee_earnings;
DESCRIBE contact_requests;