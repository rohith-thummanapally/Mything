-- =============================================
-- MyThing Database Setup Script
-- Database: mything
-- =============================================

-- 1. USERS TABLE
-- Referenced in: login.model.js (createAccount), myfunctions.js (validateuser)
CREATE TABLE IF NOT EXISTS `jos_users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `encryptedurl` VARCHAR(50) NOT NULL,
  `createdon` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 2. CATEGORIES TABLE
-- Referenced in: expenses.model.js (getcategories, joins in expense queries)
CREATE TABLE IF NOT EXISTS `base_categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NOT NULL,
  `userid` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 3. TAGS TABLE
-- Referenced in: expenses.model.js (gettags, joins in expense queries)
CREATE TABLE IF NOT EXISTS `base_tags` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tag_name` VARCHAR(255) NOT NULL,
  `userid` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 4. EXPENSES TABLE
-- Referenced in: expenses.model.js (addExpense, getuserExpenses, etc.)
-- Note: `tags` stores comma-separated tag IDs (used with FIND_IN_SET)
CREATE TABLE IF NOT EXISTS `base_expenses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userid` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `amount` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `category` INT NOT NULL,
  `tags` VARCHAR(255) DEFAULT NULL,
  `date` DATETIME DEFAULT NULL,
  `createdon` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedon` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_expenses_userid` (`userid`),
  KEY `idx_expenses_category` (`category`),
  KEY `idx_expenses_date` (`date`),
  CONSTRAINT `fk_expenses_userid` FOREIGN KEY (`userid`) REFERENCES `jos_users` (`id`),
  CONSTRAINT `fk_expenses_category` FOREIGN KEY (`category`) REFERENCES `base_categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- =============================================
-- SEED DATA (optional default categories & tags with userid=0)
-- Your code queries with `userid in (0, ?)` so userid=0 = global/default
-- =============================================

INSERT INTO `base_categories` (`category_name`, `userid`) VALUES
  ('Food', 0),
  ('Travel', 0),
  ('Shopping', 0),
  ('Bills', 0),
  ('Entertainment', 0),
  ('Others', 0);

INSERT INTO `base_tags` (`tag_name`, `userid`) VALUES
  ('Essential', 0),
  ('Luxury', 0),
  ('Recurring', 0),
  ('One-time', 0);
