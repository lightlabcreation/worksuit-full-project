-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 03, 2026 at 02:57 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crm_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `check_in` time DEFAULT NULL,
  `check_out` time DEFAULT NULL,
  `status` enum('Present','Absent','Late','Half Day') DEFAULT 'Absent',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `company_id`, `user_id`, `date`, `check_in`, `check_out`, `status`, `notes`, `created_at`, `updated_at`) VALUES
(1, 1, 13, '2025-12-23', '16:11:23', '14:26:53', 'Present', NULL, '2025-12-23 08:56:47', '2025-12-23 10:41:23'),
(3, 1, 19, '2025-12-27', '17:36:40', '11:03:22', 'Present', NULL, '2025-12-27 10:53:50', '2025-12-27 12:06:40'),
(6, 6, 27, '2026-01-01', '18:22:56', '12:53:06', 'Present', NULL, '2026-01-01 12:41:51', '2026-01-01 12:53:06');

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `action` varchar(100) NOT NULL,
  `module` varchar(50) NOT NULL,
  `record_id` int(10) UNSIGNED DEFAULT NULL,
  `old_values` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`old_values`)),
  `new_values` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`new_values`)),
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bank_accounts`
--

CREATE TABLE `bank_accounts` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL DEFAULT 1,
  `account_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(100) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `bank_code` varchar(50) DEFAULT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `branch_code` varchar(50) DEFAULT NULL,
  `swift_code` varchar(50) DEFAULT NULL,
  `iban` varchar(100) DEFAULT NULL,
  `account_type` varchar(50) DEFAULT NULL,
  `routing_number` varchar(50) DEFAULT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `opening_balance` decimal(15,2) DEFAULT 0.00,
  `current_balance` decimal(15,2) DEFAULT 0.00,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zip` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bank_accounts`
--

INSERT INTO `bank_accounts` (`id`, `company_id`, `account_name`, `account_number`, `bank_name`, `bank_code`, `branch_name`, `branch_code`, `swift_code`, `iban`, `account_type`, `routing_number`, `currency`, `opening_balance`, `current_balance`, `address`, `city`, `state`, `zip`, `country`, `contact_person`, `phone`, `email`, `notes`, `status`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 'sddsd', '45455', 'ggg', NULL, NULL, NULL, '6767', '6767', 'savings', 'g56776', 'INR', 676.00, 676.00, 'ghghj', 'demo', 'Madhya Pradesh', '556', 'India', 'demo dem,o', '04545454555', 'pankit1205@gmail.com', 'demo', 'Active', '2025-12-30 12:42:19', '2025-12-30 12:42:19', 0),
(2, 1, 'aas', '34344', 'sbi', NULL, NULL, NULL, '5665', '6566', 'savings', '656566', 'INR', 65656.00, 5656.00, 'demo', 'demo', 'Madhya Pradesh', '4545', 'India', 'demo dem,o', NULL, 'pankit1205@gmail.com', 'fggh', 'Active', '2025-12-30 12:42:54', '2025-12-30 12:43:05', 1),
(3, 6, 'bj', '787868', 'boi', NULL, NULL, NULL, '78788', '678678', 'checking', '768', 'INR', 50000.00, 200.00, 'AB road ,sarojni nagar', 'Delhi', 'MP', '45345', 'India', 'vinay', NULL, 'virat@gmail.com', 'okkk', 'Active', '2026-01-01 12:18:15', '2026-01-01 12:18:15', 0),
(4, 6, 'primary', '213123124', 'boi', NULL, NULL, NULL, '56456456', '546456', 'savings', '56546456', 'INR', 10000.00, 6998.00, 'sdfsdfsdfsdfs', 'sdfsdfs', 'sfsfsdf', '45345', 'United Kingdom', 'vinay', NULL, 'virat@gmail.com', 'okkkkk', 'Inactive', '2026-01-02 12:17:38', '2026-01-02 12:17:50', 0);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `owner_id` int(10) UNSIGNED NOT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zip` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT 'United States',
  `phone_country_code` varchar(10) DEFAULT '+1',
  `phone_number` varchar(50) DEFAULT NULL,
  `website` varchar(500) DEFAULT NULL,
  `vat_number` varchar(100) DEFAULT NULL,
  `gst_number` varchar(100) DEFAULT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `currency_symbol` varchar(10) DEFAULT '$',
  `disable_online_payment` tinyint(1) DEFAULT 0,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `company_id`, `company_name`, `owner_id`, `address`, `city`, `state`, `zip`, `country`, `phone_country_code`, `phone_number`, `website`, `vat_number`, `gst_number`, `currency`, `currency_symbol`, `disable_online_payment`, `status`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 'Tech Corp', 1, '123 Main St', 'New York', NULL, NULL, 'United States', '+1', '+1-234-567-8900', 'Google ads', NULL, NULL, 'USD', '$', 0, 'Inactive', '2025-12-22 08:56:15', '2025-12-22 08:56:50', 1),
(2, 1, 'Tech Corp', 1, '123 Main St', 'New York', 'NY', '10001', 'United States', '+1', '234-567-8900', 'https://techcorp.com', 'VAT123456', '', 'USD', '$', 0, 'Active', '2025-12-22 08:56:36', '2025-12-29 09:31:48', 1),
(3, 1, 'Tech Corp topp', 1, '123 Main St', 'New York', 'NY', '10001', 'United States', '+1', '234-567-8900', 'https://techcorp.com', 'VAT123456', '', 'USD', '$', 0, 'Active', '2025-12-22 08:57:14', '2025-12-29 09:32:36', 1),
(4, 1, 'Tech Corp topp', 1, '123 Main St', 'New York', 'NY', '10001', 'United States', '+1', '234-567-8900', 'https://techcorp.com', 'VAT123456', '', 'USD', '$', 0, 'Active', '2025-12-22 08:58:50', '2025-12-29 09:32:40', 1),
(8, 1, 'tech------', 2, 'sdfsdfsdfsdfs', 'sdfsdfs', 'sfsfsdf', '45345', 'United Kingdom', '+1', '54345345', 'wrerwerw', '5345345', '4534543', 'INR', '54435', 0, 'Active', '2025-12-22 13:07:53', '2025-12-29 09:32:43', 1),
(9, 1, 'tech------', 1, 'sdfsdfsdfsdfs', 'sdfsdfs', 'sfsfsdf', '45345', 'United Kingdom', '+1', '1234567895', 'dfsdf', '12', '132132', 'USD', '$', 1, 'Active', '2025-12-23 05:41:48', '2025-12-29 09:33:11', 1),
(14, 1, 'tech panda', 12, 'sdfsdfsdfsdfs', 'sdfsdfs', 'sfsfsdf', '45345', 'United Kingdom', '+1', '454656565', 'gffhg', 'ghghg', 'hghghgh', 'USD', 'nammeeeee', 1, 'Active', '2025-12-23 07:59:04', '2025-12-29 09:33:08', 1),
(15, 1, 'ishu', 20, 'indore,rajen nagar', 'indore', 'mp', '45345', 'India', '+1', '2342342342342', 'www.com', '324234234', '3423', 'INR', 'fdf', 0, 'Active', '2025-12-26 11:37:52', '2025-12-26 11:37:52', 0),
(16, 1, 'ishu2', 21, NULL, NULL, NULL, NULL, 'United States', '+1', NULL, NULL, '4543534', '4353453453455', 'USD', '$', 0, 'Active', '2025-12-26 12:34:36', '2025-12-29 09:33:06', 1),
(17, 1, 'Default Company', 13, 'ssdfdfadf', 'dfddf', NULL, NULL, 'United States', '+1', '21355688567', 'Email', NULL, NULL, 'USD', '$', 0, 'Active', '2025-12-27 07:17:46', '2025-12-27 07:17:46', 0),
(18, 1, 'Default Company', 22, 'sdsadsa', 'dasda', NULL, NULL, 'United States', '+1', '4234235', 'Call', NULL, NULL, 'USD', '$', 0, 'Active', '2025-12-27 07:18:20', '2025-12-27 07:18:20', 0),
(19, 1, 'Default Company', 22, 'sdsadsa', 'dasda', NULL, NULL, 'United States', '+1', '4234235', 'Call', NULL, NULL, 'USD', '$', 0, 'Active', '2025-12-27 07:19:09', '2025-12-29 09:33:01', 1),
(20, 1, 'Default Company', 22, 'sdsadsa', 'dasda', NULL, NULL, 'United States', '+1', '4234235', 'Call', NULL, NULL, 'USD', '$', 0, 'Active', '2025-12-27 07:20:23', '2025-12-29 09:32:58', 1),
(21, 1, 'demo client', 23, 'cxcc', 'xccc', 'xcc', 'zcc', 'India', '+91', '235353453456', 'www..com', '72742374', '32434', 'INR', '$', 0, 'Active', '2025-12-27 07:33:00', '2025-12-29 09:32:55', 1),
(22, 1, 'Default Company', 22, 'sdsadsa', 'dasda', NULL, NULL, 'United States', '+1', '4234235', 'Call', NULL, NULL, 'USD', '$', 0, 'Active', '2025-12-27 07:44:53', '2025-12-29 09:32:52', 1),
(23, 1, 'Default Company', 13, 'ssdfdfadf', 'dfddf', NULL, NULL, 'United States', '+1', '21355688567', 'Email', NULL, NULL, 'USD', '$', 0, 'Active', '2025-12-29 08:49:07', '2025-12-29 08:49:07', 0),
(24, 1, 'Default Company', 22, 'sdsadsa', 'dasda', NULL, NULL, 'United States', '+1', '4234235', 'Call', NULL, NULL, 'USD', '$', 0, 'Active', '2025-12-29 08:49:24', '2025-12-29 08:49:24', 0),
(25, 1, 'raj', 22, 'sdfsdfsdfsdfs', 'sdfsdfs', NULL, NULL, 'United States', '+1', '897898798', 'Call', NULL, NULL, 'USD', '$', 0, 'Active', '2025-12-29 10:36:07', '2025-12-29 10:36:07', 0),
(26, 1, 'raj', 22, 'sdfsdfsdfsdfs', 'sdfsdfs', NULL, NULL, 'United States', '+1', '897898798', 'Call', NULL, NULL, 'USD', '$', 0, 'Active', '2025-12-29 10:36:31', '2025-12-29 10:36:31', 0),
(27, 1, 'raj', 22, 'sdfsdfsdfsdfs', 'sdfsdfs', NULL, NULL, 'United States', '+1', '897898798', 'Call', NULL, NULL, 'USD', '$', 0, 'Active', '2025-12-29 10:39:58', '2025-12-29 10:39:58', 0),
(28, 1, 'asas', 24, 'sdsds', 'dsdsd', 'sddsd', '3434', 'India', '+1', '45454545', '4454', '4565', 'gfgfg', 'EUR', '$', 1, 'Active', '2025-12-30 11:28:00', '2025-12-30 11:28:00', 0),
(29, 6, 'vinay', 26, 'sdfsdfsdfsdfs', 'sdfsdfs', 'sfsfsdf', '45345', 'United Kingdom', '+1', '345345346', 'www.com', NULL, NULL, 'USD', '$', 0, 'Active', '2025-12-31 12:42:14', '2025-12-31 12:42:14', 0),
(30, 6, 'ronak', 28, 'ram nagar', 'dhar', NULL, NULL, 'United States', '+1', '453464564', 'Email', NULL, NULL, 'USD', '$', 0, 'Active', '2026-01-01 07:17:49', '2026-01-01 07:22:55', 1),
(31, 6, 'ronak', 28, 'ram nagar', 'dhar', NULL, NULL, 'United States', '+1', '453464564', 'Email', NULL, NULL, 'USD', '$', 0, 'Active', '2026-01-01 07:20:38', '2026-01-01 08:41:33', 1),
(32, 6, 'virat@gmail.com', 29, 'AB road ,sarojni nagar', 'Delhi', 'MP', '45345', 'United States', '+1', NULL, NULL, NULL, NULL, 'USD', '$', 0, 'Active', '2026-01-01 09:07:26', '2026-01-01 09:07:26', 0);

-- --------------------------------------------------------

--
-- Table structure for table `client_contacts`
--

CREATE TABLE `client_contacts` (
  `id` int(10) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `job_title` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `client_contacts`
--

INSERT INTO `client_contacts` (`id`, `client_id`, `name`, `job_title`, `email`, `phone`, `is_primary`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 'Ram', NULL, 'john@techcorp.com', '+1-234-567-8900', 1, '2025-12-22 08:56:15', '2025-12-22 08:56:15', 0),
(2, 17, 'shyam', NULL, 'fddsf@gmail.com', '21355688567', 1, '2025-12-27 07:17:46', '2025-12-27 07:17:46', 0),
(3, 18, 'test', NULL, 'test@gmail.com', '4234235', 1, '2025-12-27 07:18:20', '2025-12-27 07:18:20', 0),
(4, 19, 'test', NULL, 'test@gmail.com', '4234235', 1, '2025-12-27 07:19:09', '2025-12-27 07:19:09', 0),
(5, 20, 'test', NULL, 'test@gmail.com', '4234235', 1, '2025-12-27 07:20:23', '2025-12-27 07:20:23', 0),
(6, 22, 'test', NULL, 'test@gmail.com', '4234235', 1, '2025-12-27 07:44:53', '2025-12-27 07:44:53', 0),
(7, 23, 'shyam', NULL, 'fddsf@gmail.com', '21355688567', 1, '2025-12-29 08:49:07', '2025-12-29 08:49:07', 0),
(8, 24, 'test', NULL, 'test@gmail.com', '4234235', 1, '2025-12-29 08:49:24', '2025-12-29 08:49:24', 0),
(9, 25, 'raj', NULL, 'raj@gmail.com', '897898798', 1, '2025-12-29 10:36:07', '2025-12-29 10:36:07', 0),
(10, 26, 'raj', NULL, 'raj@gmail.com', '897898798', 1, '2025-12-29 10:36:31', '2025-12-29 10:36:31', 0),
(11, 27, 'raj', NULL, 'raj@gmail.com', '897898798', 1, '2025-12-29 10:39:58', '2025-12-29 10:39:58', 0),
(12, 27, 'demo dem,o', '45', 'a@gmail.com', '34343434', 0, '2025-12-30 11:27:42', '2025-12-30 11:27:42', 0),
(13, 32, 'vinaygfhgfhfghf', 'aaaaaaaaaaaaaaaaa', 'virat@gmail.com', 'zcxczxcz', 0, '2026-01-02 11:05:35', '2026-01-02 11:16:46', 0);

-- --------------------------------------------------------

--
-- Table structure for table `client_groups`
--

CREATE TABLE `client_groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `group_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `client_groups`
--

INSERT INTO `client_groups` (`id`, `client_id`, `group_name`, `created_at`) VALUES
(1, 8, 'Small Business', '2025-12-22 13:07:53'),
(2, 9, 'Enterprise', '2025-12-23 05:41:48'),
(13, 14, 'Enterprise', '2025-12-24 09:01:59'),
(14, 14, 'Small Business', '2025-12-24 09:01:59'),
(15, 15, 'Enterprise', '2025-12-26 11:37:52'),
(16, 16, 'Startup', '2025-12-26 12:34:36');

-- --------------------------------------------------------

--
-- Table structure for table `client_labels`
--

CREATE TABLE `client_labels` (
  `id` int(10) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `label` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `client_labels`
--

INSERT INTO `client_labels` (`id`, `client_id`, `label`, `created_at`) VALUES
(1, 2, 'VIP', '2025-12-22 08:56:37'),
(2, 2, 'Tech', '2025-12-22 08:56:37'),
(3, 3, 'VIP', '2025-12-22 08:57:14'),
(4, 3, 'Tech', '2025-12-22 08:57:14'),
(5, 4, 'VIP', '2025-12-22 08:58:50'),
(6, 4, 'Tech', '2025-12-22 08:58:50');

-- --------------------------------------------------------

--
-- Table structure for table `client_managers`
--

CREATE TABLE `client_managers` (
  `id` int(10) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `client_managers`
--

INSERT INTO `client_managers` (`id`, `client_id`, `user_id`, `created_at`) VALUES
(1, 2, 2, '2025-12-22 08:56:36'),
(2, 3, 2, '2025-12-22 08:57:14'),
(3, 4, 2, '2025-12-22 08:58:50'),
(4, 8, 1, '2025-12-22 13:07:53'),
(5, 9, 1, '2025-12-23 05:41:48'),
(6, 9, 2, '2025-12-23 05:41:48');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `industry` varchar(255) DEFAULT NULL,
  `website` varchar(500) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `logo` varchar(500) DEFAULT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `timezone` varchar(50) DEFAULT 'UTC',
  `package_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `industry`, `website`, `address`, `notes`, `logo`, `currency`, `timezone`, `package_id`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 'Default Company', NULL, NULL, NULL, NULL, NULL, 'USD', 'UTC', NULL, '2025-12-22 07:15:36', '2025-12-24 07:08:48', 1),
(2, 'tech panda', NULL, NULL, NULL, NULL, NULL, 'USD', 'UTC', NULL, '2025-12-23 07:17:31', '2025-12-23 07:17:31', 0),
(3, 'Kiaan tech', NULL, NULL, NULL, NULL, NULL, 'USD', 'UTC', NULL, '2025-12-23 13:01:58', '2025-12-23 13:01:58', 0),
(4, 'techno', 'dsaff', 'fsdfsdfs', 'sdfsfs', 'sdfsdfsf', NULL, 'USD', 'UTC', 2, '2025-12-24 07:17:51', '2025-12-24 07:19:33', 0),
(5, 'c122222222222222222', 'tech', 'sdfsdfsfs', 'sfsdfsdfs', 'sdfsdfsdf', NULL, 'USD', 'UTC', NULL, '2025-12-25 14:23:12', '2025-12-27 05:59:25', 1),
(6, 'tech mahindra', 'IT', 'www.techmahindra.com', 'indore', 'okkk', NULL, 'INR', 'UTC', NULL, '2025-12-26 07:56:52', '2025-12-26 07:56:52', 0),
(7, 'fre tech', '', '', '', 'jnkj', NULL, 'USD', 'UTC', 6, '2025-12-26 10:23:55', '2025-12-27 05:59:38', 0),
(8, 'tech panda ', 'healcare', 'asdasdasd', 'asdasdasd', 'asdasda', NULL, 'INR', 'UTC', 10, '2026-01-02 13:08:27', '2026-01-02 13:08:27', 0);

-- --------------------------------------------------------

--
-- Table structure for table `company_packages`
--

CREATE TABLE `company_packages` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED DEFAULT NULL,
  `package_name` varchar(255) NOT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `price` decimal(15,2) NOT NULL,
  `billing_cycle` enum('Monthly','Quarterly','Yearly') DEFAULT 'Monthly',
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `company_packages`
--

INSERT INTO `company_packages` (`id`, `company_id`, `package_name`, `features`, `price`, `billing_cycle`, `status`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 'pro', '[]', 2999.00, 'Yearly', 'Active', '2025-12-23 07:13:36', '2025-12-23 07:13:36', 0),
(2, 1, 'pro', '[]', 2990.00, 'Monthly', 'Active', '2025-12-23 13:04:07', '2025-12-24 07:21:13', 0),
(3, 1, 'pro', '[]', 999.00, 'Monthly', 'Active', '2025-12-24 07:24:46', '2025-12-24 07:24:46', 0),
(4, 1, 'pro', '[]', 1999.01, 'Monthly', 'Active', '2025-12-24 07:28:38', '2025-12-24 07:28:38', 0),
(5, 1, 'proooooooo', '[]', 99.00, 'Monthly', 'Active', '2025-12-24 07:34:27', '2025-12-25 12:55:10', 1),
(6, NULL, 'freee...............................', '[]', 2999.00, 'Monthly', 'Active', '2025-12-25 14:22:25', '2025-12-25 14:23:57', 0),
(7, NULL, 'Basic', '[\"Users\", \"Projects\", \"Tasks\"]', 0.00, 'Monthly', 'Active', '2025-12-26 06:10:42', '2025-12-26 06:10:42', 0),
(8, NULL, 'Pro', '[\"Users\", \"Projects\", \"Tasks\", \"Invoices\", \"Reports\"]', 99.00, 'Monthly', 'Active', '2025-12-26 06:10:42', '2025-12-26 06:10:42', 0),
(9, NULL, 'Enterprise', '[\"All Features\", \"Priority Support\", \"Custom Integrations\"]', 299.00, 'Monthly', 'Active', '2025-12-26 06:10:42', '2025-12-26 06:10:42', 0),
(10, NULL, 'dem', '[]', 56.00, 'Quarterly', 'Active', '2025-12-30 13:46:19', '2025-12-30 13:46:19', 0);

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `lead_id` int(10) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `contact_type` enum('Client','Vendor','Partner','Other') DEFAULT 'Client',
  `assigned_user_id` int(10) UNSIGNED DEFAULT NULL,
  `status` enum('Active','Inactive','Archived') DEFAULT 'Active',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `company_id`, `lead_id`, `name`, `company`, `email`, `phone`, `contact_type`, `assigned_user_id`, `status`, `notes`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, NULL, 'c1', 'Default Company', 'c11@gmail.com', '23213213', 'Client', 19, 'Active', 'okkkkkkkkkkkkkkk', '2025-12-26 11:23:05', '2025-12-26 11:23:30', 0),
(2, 1, 16, 'asdf', 'Default Company', 'asdf@gmail.com', '6874687468', 'Vendor', NULL, 'Active', 'vgjnghj', '2025-12-29 09:20:55', '2025-12-29 09:20:55', 0),
(3, 1, 16, 'demo dem,o', 'Default Company', 'sa@gmail.com', NULL, 'Vendor', NULL, 'Inactive', 'sasa', '2025-12-30 06:45:17', '2025-12-30 06:45:17', 0),
(4, 1, 16, 'sdsd', 'Default Company', 'asas@gmail.com', '04545454555', 'Vendor', NULL, 'Active', 'asas', '2025-12-30 06:45:49', '2025-12-30 06:45:49', 0),
(5, 1, 17, 'demo dem,o', 'Default Company', 'demo@gmail.com', '04545454555', 'Vendor', NULL, 'Inactive', 'demo', '2025-12-30 13:45:43', '2025-12-30 13:45:43', 0),
(6, 6, 23, 'rammmm', 'tech mahindra', 'infotech@gmail.com', '534534534', 'Vendor', NULL, 'Archived', 'okkk', '2026-01-01 06:42:35', '2026-01-01 06:42:35', 0),
(7, 6, 22, 'c1', 'tech mahindra', 'trch@gmail.com', '54234234', 'Client', NULL, 'Active', 'hfghfg', '2026-01-01 06:58:08', '2026-01-01 06:58:08', 0);

-- --------------------------------------------------------

--
-- Table structure for table `contracts`
--

CREATE TABLE `contracts` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `contract_number` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `contract_date` date NOT NULL,
  `valid_until` date NOT NULL,
  `client_id` int(10) UNSIGNED DEFAULT NULL,
  `lead_id` int(10) UNSIGNED DEFAULT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `tax` varchar(50) DEFAULT NULL,
  `second_tax` varchar(50) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT 0.00,
  `status` enum('Draft','Sent','Accepted','Rejected','Expired') DEFAULT 'Draft',
  `created_by` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contracts`
--

INSERT INTO `contracts` (`id`, `company_id`, `contract_number`, `title`, `contract_date`, `valid_until`, `client_id`, `lead_id`, `project_id`, `tax`, `second_tax`, `note`, `file_path`, `amount`, `status`, `created_by`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 'CONTRACT #1', 'Training and Workshop Services Contract', '2025-11-17', '2026-01-17', 1, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, 'Accepted', 1, '2025-12-22 10:20:19', '2025-12-22 10:23:38', 0),
(2, 1, 'CONTRACT #2', 'sddsss', '2025-12-25', '2025-12-24', NULL, 16, NULL, 'GST 10%', 'GST 10%', 'dfdf', NULL, 345.00, 'Sent', 1, '2025-12-30 06:40:05', '2025-12-30 06:40:05', 0),
(3, 1, 'CONTRACT #3', 'dd', '2025-12-30', '2026-01-01', 25, NULL, NULL, 'CGST 18%', 'CGST 18%', 'ff', NULL, 44.00, 'Sent', 1, '2025-12-30 07:54:48', '2025-12-30 07:54:48', 0),
(4, 1, 'CONTRACT #4', 'dsdd', '2025-12-30', '2026-01-01', NULL, 19, NULL, 'GST 10%', 'GST 10%', 'dfdf', NULL, 3434.00, 'Sent', 1, '2025-12-30 13:17:16', '2025-12-30 13:17:16', 0),
(5, 1, 'CONTRACT #5', 'ryrty', '2025-12-31', '2026-01-10', 25, NULL, NULL, 'CGST 18%', 'CGST 18%', 'okkkk', NULL, 0.00, 'Draft', 1, '2025-12-31 10:34:24', '2025-12-31 10:34:24', 0),
(6, 6, 'CONTRACT #1', 'first contarct', '2026-01-01', '2026-02-06', NULL, 22, NULL, 'GST 10%', 'CGST 18%', 'okkk', NULL, 4500000.00, 'Accepted', 1, '2026-01-01 06:39:53', '2026-01-02 12:11:46', 1),
(7, 6, 'CONTRACT #2', 'first contarct', '2026-01-01', '2026-02-06', NULL, 23, NULL, 'GST 10%', 'GST 10%', 'fghgfh', NULL, 3500.00, 'Draft', 1, '2026-01-01 12:04:25', '2026-01-02 12:11:50', 1),
(8, 6, 'CONTRACT #3', 'c111', '2026-01-02', '2026-01-21', NULL, 22, NULL, 'GST 10%', 'CGST 18%', 'fgdfgd', NULL, 300.00, 'Sent', 1, '2026-01-02 10:43:45', '2026-01-02 12:11:53', 1),
(9, 6, 'CONTRACT #4', 'asdasd', '2026-01-02', '2026-01-07', NULL, 23, NULL, 'CGST 18%', 'CGST 18%', 'vbcvbv', NULL, 50.00, 'Accepted', 1, '2026-01-02 10:50:37', '2026-01-02 10:50:37', 0),
(10, 6, 'CONTRACT #5', 'c1', '2026-01-02', '2026-02-06', 32, NULL, 18, 'GST 10%', 'VAT 10%', 'okkkk', NULL, 5000.00, 'Draft', 1, '2026-01-02 12:11:36', '2026-01-02 12:11:36', 0),
(11, 6, 'CONTRACT #6', 'c1 (Copy)', '2026-01-02', '2026-02-06', 32, NULL, 18, NULL, NULL, 'okk', NULL, 5000.00, 'Draft', 1, '2026-01-02 12:54:31', '2026-01-02 12:54:41', 0);

-- --------------------------------------------------------

--
-- Table structure for table `credit_notes`
--

CREATE TABLE `credit_notes` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `credit_note_number` varchar(50) NOT NULL,
  `invoice_id` int(10) UNSIGNED DEFAULT NULL,
  `client_id` int(10) UNSIGNED DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `status` enum('Pending','Approved','Applied') DEFAULT 'Pending',
  `created_by` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `credit_notes`
--

INSERT INTO `credit_notes` (`id`, `company_id`, `credit_note_number`, `invoice_id`, `client_id`, `amount`, `date`, `reason`, `status`, `created_by`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 'CN#001', NULL, NULL, 45.00, '2025-12-30', 'fgfg', 'Approved', 1, '2025-12-30 11:52:28', '2025-12-30 11:59:54', 1),
(9, 1, 'CN#002', 17, 28, 12.00, '2025-12-30', 'dfdf', 'Pending', 1, '2025-12-30 12:06:26', '2025-12-30 12:06:35', 1),
(10, 1, 'CN#003', 20, 28, 343.00, '2025-12-30', 'cvc', 'Pending', 1, '2025-12-30 12:27:09', '2025-12-30 12:27:09', 0),
(11, 1, 'CN#004', 23, 29, 800.00, '2025-12-31', 'yfghfh', 'Pending', 1, '2025-12-31 13:30:39', '2025-12-31 13:30:39', 0),
(20, 6, 'CN#005', 29, 32, 500.00, '2026-01-02', 'plllokkk okk', 'Approved', 1, '2026-01-02 13:19:28', '2026-01-03 12:54:47', 0);

-- --------------------------------------------------------

--
-- Table structure for table `custom_fields`
--

CREATE TABLE `custom_fields` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `label` varchar(255) NOT NULL,
  `type` enum('text','textarea','number','email','phone','date','datetime','dropdown','multiselect','checkbox','radio','file','url') NOT NULL,
  `module` varchar(50) NOT NULL,
  `required` tinyint(1) DEFAULT 0,
  `default_value` varchar(500) DEFAULT NULL,
  `placeholder` varchar(255) DEFAULT NULL,
  `help_text` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `custom_fields`
--

INSERT INTO `custom_fields` (`id`, `company_id`, `name`, `label`, `type`, `module`, `required`, `default_value`, `placeholder`, `help_text`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 'photoes', 'few filse photo', 'file', 'Tasks', 0, '1', 'select photo', 'sdadas', '2025-12-29 08:38:00', '2025-12-29 08:38:00', 0),
(2, 6, 'sdfsfs', 'fsdfsd', 'text', 'Leads', 0, '5', 'Enter Emailll', 'fdfdd', '2026-01-01 09:56:29', '2026-01-01 09:56:29', 0),
(3, 6, 'name', 'project name  neww', 'text', 'Clients', 0, '5', 'Enter Project name ', NULL, '2026-01-03 07:46:40', '2026-01-03 07:46:40', 0);

-- --------------------------------------------------------

--
-- Table structure for table `custom_field_enabled_in`
--

CREATE TABLE `custom_field_enabled_in` (
  `id` int(10) UNSIGNED NOT NULL,
  `custom_field_id` int(10) UNSIGNED NOT NULL,
  `enabled_in` enum('create','edit','table','filters','reports') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `custom_field_enabled_in`
--

INSERT INTO `custom_field_enabled_in` (`id`, `custom_field_id`, `enabled_in`, `created_at`) VALUES
(1, 1, 'create', '2025-12-29 08:38:00'),
(2, 1, 'edit', '2025-12-29 08:38:00'),
(3, 1, 'table', '2025-12-29 08:38:00'),
(4, 1, 'filters', '2025-12-29 08:38:00'),
(5, 2, 'create', '2026-01-01 09:56:29'),
(6, 2, 'edit', '2026-01-01 09:56:29'),
(7, 2, 'table', '2026-01-01 09:56:29'),
(8, 2, 'filters', '2026-01-01 09:56:29'),
(9, 3, 'create', '2026-01-03 07:46:40'),
(10, 3, 'edit', '2026-01-03 07:46:40'),
(11, 3, 'table', '2026-01-03 07:46:40'),
(12, 3, 'filters', '2026-01-03 07:46:40');

-- --------------------------------------------------------

--
-- Table structure for table `custom_field_options`
--

CREATE TABLE `custom_field_options` (
  `id` int(10) UNSIGNED NOT NULL,
  `custom_field_id` int(10) UNSIGNED NOT NULL,
  `option_value` varchar(255) NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `custom_field_visibility`
--

CREATE TABLE `custom_field_visibility` (
  `id` int(10) UNSIGNED NOT NULL,
  `custom_field_id` int(10) UNSIGNED NOT NULL,
  `visibility` enum('admin','employee','client','all') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `custom_field_visibility`
--

INSERT INTO `custom_field_visibility` (`id`, `custom_field_id`, `visibility`, `created_at`) VALUES
(1, 1, 'admin', '2025-12-29 08:38:00'),
(2, 2, 'all', '2026-01-01 09:56:29'),
(3, 3, 'all', '2026-01-03 07:46:40');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `head_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `company_id`, `name`, `head_id`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 'sales', 3, '2025-12-23 06:24:52', '2025-12-23 06:24:52', 0),
(2, 1, 'developer', 12, '2025-12-23 08:47:35', '2025-12-23 08:47:35', 0),
(3, 3, 'sales', NULL, '2025-12-24 07:46:57', '2025-12-24 07:46:57', 0),
(4, 4, 'd1', NULL, '2025-12-24 07:57:03', '2025-12-24 07:57:03', 0),
(5, 1, 'ui ux', NULL, '2025-12-26 10:39:36', '2025-12-26 10:39:36', 0),
(6, 1, 'It', NULL, '2025-12-27 06:45:10', '2025-12-27 06:48:45', 0),
(7, 6, 'IT', NULL, '2026-01-01 05:52:45', '2026-01-01 05:52:45', 0),
(8, 6, 'Sales', NULL, '2026-01-01 05:52:53', '2026-01-01 05:52:53', 0);

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_size` bigint(20) DEFAULT NULL,
  `file_type` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0,
  `client_id` int(11) DEFAULT NULL,
  `lead_id` int(10) UNSIGNED DEFAULT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `company_id`, `user_id`, `title`, `category`, `file_path`, `file_name`, `file_size`, `file_type`, `description`, `created_at`, `updated_at`, `is_deleted`, `client_id`, `lead_id`, `project_id`) VALUES
(1, 1, 1, 'd1', 'coantsct', 'uploads\\file-1766580888197-654159216.png', 'Screenshot (3).png', 440262, '.png', 'qedqweqw ', '2025-12-24 12:54:48', '2025-12-24 12:54:48', 0, NULL, NULL, NULL),
(2, 1, 19, 'is card', 'proof', 'uploads\\file-1766832085922-407135451.png', 'Screenshot (3).png', 440262, '.png', 'okkkk', '2025-12-27 10:41:25', '2025-12-27 10:41:25', 0, NULL, NULL, NULL),
(3, 1, 12, 'se1', NULL, 'uploads\\file-1766840142926-283645105.png', 'Screenshot (3).png', 440262, '.png', 'okkk', '2025-12-27 12:55:43', '2025-12-27 12:55:43', 0, NULL, NULL, NULL),
(4, 1, NULL, 'erere', 'erere', 'uploads\\file-1767076817718-975191557.png', 'Screenshot (1).png', 183151, '.png', 'rerer', '2025-12-30 06:40:17', '2025-12-30 06:40:17', 0, NULL, 16, NULL),
(5, 1, NULL, 'hjhj', 'jjhj', 'uploads\\file-1767079819826-706302022.png', 'Screenshot (1).png', 183151, '.png', 'jhjh', '2025-12-30 07:30:19', '2025-12-30 07:30:19', 0, 27, NULL, NULL),
(6, 1, NULL, 'dd', 'dd', 'uploads\\file-1767081268906-973248549.png', 'Screenshot (1).png', 183151, '.png', 'dd', '2025-12-30 07:54:28', '2025-12-30 07:54:28', 0, 25, NULL, NULL),
(7, 1, NULL, 'dfdf', 'dffdf', 'uploads\\file-1767100646826-847661314.png', 'Screenshot (1).png', 183151, '.png', 'dff', '2025-12-30 13:17:26', '2025-12-30 13:17:26', 0, NULL, 19, NULL),
(8, 6, NULL, 'pro file', 'png', 'uploads\\file-1767249621335-647180390.pdf', 'IN  SETTINGS.pdf', 382728, '.pdf', 'okkkk', '2026-01-01 06:40:21', '2026-01-01 06:40:21', 0, NULL, 22, NULL),
(9, 6, NULL, 'iD card', 'Contact', 'uploads\\file-1767261329654-548360427.pdf', 'IN  SETTINGS (2).pdf', 382728, '.pdf', 'dzxc', '2026-01-01 09:55:29', '2026-01-01 09:55:29', 0, 29, NULL, NULL),
(10, 6, 29, 'contract', NULL, 'uploads\\file-1767264895646-474007844.png', 'Screenshot (3).png', 440262, '.png', 'sddd', '2026-01-01 10:54:55', '2026-01-01 10:54:55', 0, NULL, NULL, NULL),
(11, 6, NULL, ' contract   file', 'pms', 'uploads\\file-1767268907266-317021727.png', 'Screenshot (3).png', 440262, '.png', 'xxhf', '2026-01-01 12:01:47', '2026-01-01 12:01:47', 0, 32, NULL, NULL),
(12, 6, NULL, '   PRD', ' Project ', 'uploads\\file-1767269088739-713964009.pdf', 'IN  SETTINGS (2).pdf', 382728, '.pdf', 'okkk', '2026-01-01 12:04:48', '2026-01-01 12:04:48', 0, NULL, 23, NULL),
(13, 6, 27, 'IN  SETTINGS (2).pdf', 'repotrsss', 'uploads\\file-1767271303289-113469078.pdf', 'IN  SETTINGS (2).pdf', 382728, '.pdf', 'okkk', '2026-01-01 12:41:43', '2026-01-01 12:41:43', 0, NULL, NULL, NULL),
(14, 6, NULL, 'dfgsd', 'fdf', 'uploads\\file-1767351109619-436708915.pdf', 'Receipt-2172-9945.pdf', 29964, '.pdf', 'sdfsdfs', '2026-01-02 10:51:49', '2026-01-03 13:04:13', 1, NULL, 23, NULL),
(15, 6, 27, 'marksheet', 'certificate', 'uploads\\file-1767420894126-751511387.png', 'Screenshot (3).png', 440262, '.png', 'okkk', '2026-01-03 06:14:54', '2026-01-03 06:15:06', 1, NULL, NULL, NULL),
(16, 6, NULL, 'Screenshot (3).png', NULL, '/uploads/file-1767439834101-802385832.png', 'Screenshot (3).png', 440262, '.png', 'okk', '2026-01-03 11:30:34', '2026-01-03 11:30:34', 0, NULL, NULL, NULL),
(17, 6, NULL, 'Screenshot (3).png', NULL, '/uploads/file-1767439850568-595818729.png', 'Screenshot (3).png', 440262, '.png', 'okk', '2026-01-03 11:30:50', '2026-01-03 11:30:50', 0, NULL, NULL, NULL),
(18, 6, NULL, 'Screenshot (3).png', NULL, '/uploads/file-1767441264938-331863404.png', 'Screenshot (3).png', 440262, '.png', 'okk', '2026-01-03 11:54:25', '2026-01-03 11:54:25', 0, NULL, NULL, 20);

-- --------------------------------------------------------

--
-- Table structure for table `email_templates`
--

CREATE TABLE `email_templates` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `subject` varchar(500) NOT NULL,
  `body` text NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `employee_number` varchar(50) DEFAULT NULL,
  `department_id` int(10) UNSIGNED DEFAULT NULL,
  `position_id` int(10) UNSIGNED DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `salary` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `user_id`, `employee_number`, `department_id`, `position_id`, `role`, `joining_date`, `salary`, `created_at`, `updated_at`) VALUES
(1, 13, 'EMP-0001', 2, NULL, 'EMPLOYEE', NULL, NULL, '2025-12-23 08:48:33', '2025-12-23 08:48:33'),
(2, 14, 'EMP-0002', 1, NULL, 'EMPLOYEE', NULL, NULL, '2025-12-23 13:20:18', '2025-12-26 10:51:26'),
(3, 16, '56', 4, 2, 'EMPLOYEE', '2025-12-24', 15000.00, '2025-12-24 08:43:42', '2025-12-24 08:43:42'),
(4, 19, '1', 2, 1, 'EMPLOYEE', '2025-12-26', 20000.00, '2025-12-26 10:48:31', '2025-12-26 10:48:31'),
(5, 22, '1', 2, 1, 'EMPLOYEE', '2025-12-27', 25000.00, '2025-12-27 06:55:08', '2025-12-27 06:55:52'),
(6, 25, '232', 2, 1, 'EMPLOYEE', '2025-12-11', 45.00, '2025-12-30 12:45:22', '2025-12-30 12:45:22'),
(7, 27, 'raja1001', 7, 5, 'EMPLOYEE', '2026-01-01', 25000.00, '2026-01-01 06:07:26', '2026-01-01 06:07:26'),
(8, 28, 'kavaya02', 8, 6, 'EMPLOYEE', '2026-01-01', 20000.00, '2026-01-01 06:08:32', '2026-01-01 06:08:32');

-- --------------------------------------------------------

--
-- Table structure for table `estimates`
--

CREATE TABLE `estimates` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `estimate_number` varchar(50) NOT NULL,
  `valid_till` date DEFAULT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `client_id` int(10) UNSIGNED DEFAULT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `lead_id` int(10) UNSIGNED DEFAULT NULL,
  `calculate_tax` enum('After Discount','Before Discount') DEFAULT 'After Discount',
  `description` text DEFAULT NULL,
  `note` text DEFAULT NULL,
  `terms` text DEFAULT 'Thank you for your business.',
  `discount` decimal(15,2) DEFAULT 0.00,
  `discount_type` enum('%','fixed') DEFAULT '%',
  `sub_total` decimal(15,2) DEFAULT 0.00,
  `discount_amount` decimal(15,2) DEFAULT 0.00,
  `tax_amount` decimal(15,2) DEFAULT 0.00,
  `total` decimal(15,2) DEFAULT 0.00,
  `estimate_request_number` varchar(50) DEFAULT NULL,
  `status` enum('Waiting','Accepted','Declined','Expired','Draft','Sent') DEFAULT 'Waiting',
  `created_by` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `estimates`
--

INSERT INTO `estimates` (`id`, `company_id`, `estimate_number`, `valid_till`, `currency`, `client_id`, `project_id`, `lead_id`, `calculate_tax`, `description`, `note`, `terms`, `discount`, `discount_type`, `sub_total`, `discount_amount`, `tax_amount`, `total`, `estimate_request_number`, `status`, `created_by`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 'EST#001', '2026-01-20', 'USD', 1, 1, NULL, 'After Discount', NULL, NULL, 'Thank you for your business.', 0.00, '%', 1000.00, 0.00, 0.00, 1000.00, NULL, 'Accepted', 1, '2025-12-22 09:55:10', '2025-12-22 10:10:28', 0),
(2, 1, 'EST#002', '2024-12-31', 'USD', 1, NULL, NULL, 'After Discount', NULL, NULL, 'Thank you for your business.', 0.00, '%', 1000.00, 0.00, 0.00, 1000.00, NULL, 'Waiting', 1, '2025-12-22 10:03:12', '2025-12-22 10:03:12', 0),
(6, 4, 'PROP#001', '2025-12-24', 'USD', 14, 3, NULL, 'After Discount', 'okkkk', 'dfgdfgfdg', 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Sent', 1, '2025-12-24 11:08:27', '2025-12-24 11:08:27', 0),
(7, 4, 'PROP#002', '2025-12-24', 'USD', 14, 3, NULL, 'After Discount', 'okkkk', 'dfgdfgfdg', 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Sent', 1, '2025-12-24 11:10:07', '2025-12-24 11:10:07', 0),
(8, 4, 'PROP#003', '2025-12-24', 'USD', 14, 3, NULL, 'After Discount', 'sdfsdf', 'sdfsdfs', 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Sent', 1, '2025-12-24 11:18:03', '2025-12-24 11:18:03', 0),
(10, 4, 'EST#003', '2026-01-20', 'USD ($)', 14, 3, NULL, 'After Discount', NULL, 'qw', 'qwThank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Waiting', 1, '2025-12-24 11:38:43', '2025-12-24 11:38:43', 0),
(11, 4, 'EST#004', '2026-01-20', 'USD ($)', 14, 3, NULL, 'After Discount', 'zxczxcz', 'czxczxczxc', 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Waiting', 1, '2025-12-24 11:41:50', '2025-12-24 11:41:50', 0),
(13, 1, 'PROP#004', '2025-12-29', 'USD', 14, 2, NULL, 'After Discount', 'okkk', 'okk', 'Thank you for your business.', 0.00, '%', 60.00, 0.00, 0.00, 60.00, NULL, 'Accepted', 1, '2025-12-29 09:04:43', '2025-12-29 09:04:43', 0),
(14, 1, 'PROP#005', '2025-12-31', 'USD', 24, 7, NULL, 'After Discount', 'okkkk', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Sent', 1, '2025-12-29 09:06:51', '2025-12-29 09:06:51', 0),
(15, 1, 'PROP#006', '2025-12-31', 'USD', 24, 7, NULL, 'After Discount', 'okkkk', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Draft', 1, '2025-12-29 09:12:12', '2025-12-29 09:12:12', 0),
(16, 1, 'EST#005', '2026-01-20', 'USD ($)', 14, 5, NULL, 'After Discount', 'okk', 'okkkk', 'Thank you for your business.', 0.00, '%', 2450.00, 0.00, 0.00, 2450.00, NULL, 'Waiting', 1, '2025-12-29 09:13:47', '2025-12-29 09:13:47', 0),
(17, 1, 'EST#006', '2026-01-20', 'EUR (€)', 24, 7, NULL, 'After Discount', 'rererr', 'erererre', 'Thank you for your business.', 0.00, '%', 2450.00, 0.00, 0.00, 2450.00, NULL, 'Waiting', 1, '2025-12-30 06:15:24', '2025-12-30 06:15:24', 0),
(18, 1, 'EST#007', '2025-12-25', 'GBP (£)', NULL, NULL, 16, 'Before Discount', 'dsfdf', 'dff', 'Thank you for your business.', 34.00, '', 0.00, 34.00, 0.00, -34.00, NULL, 'Sent', 1, '2025-12-30 06:27:20', '2025-12-30 06:53:03', 1),
(19, 1, 'PROP#007', '2025-12-24', 'EUR', NULL, NULL, 16, 'After Discount', 'dsdsd', 'sd', 'Thank you for your business.', 56.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Draft', 1, '2025-12-30 06:39:36', '2025-12-30 06:39:36', 0),
(20, 1, 'EST#008', '2026-01-01', 'USD', NULL, NULL, 16, 'After Discount', 'fdggf', NULL, 'Thank you for your business.', 45.00, '', 0.00, 45.00, 0.00, -45.00, NULL, 'Sent', 1, '2025-12-30 06:52:59', '2025-12-30 06:52:59', 0),
(21, 1, 'PROP#008', '2025-12-24', 'GBP', 25, NULL, NULL, 'After Discount', 'fgf', 'fg', 'Thank you for your business.', 45.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Sent', 1, '2025-12-30 07:55:04', '2025-12-30 07:55:04', 0),
(22, 1, 'PROP#009', '2025-12-06', 'EUR', 27, NULL, NULL, 'After Discount', 'fgf', 'fg', 'Thank you for your business.', 4.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Sent', 1, '2025-12-30 08:39:56', '2025-12-30 08:40:22', 1),
(23, 1, 'EST#009', '2025-12-31', 'EUR', 27, NULL, NULL, 'Before Discount', 'fg', 'fg', 'Thank you for your business.', 45.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Draft', 1, '2025-12-30 08:40:40', '2025-12-30 08:40:40', 0),
(24, 1, 'PROP#010', '2025-12-18', 'USD', 24, 7, NULL, 'After Discount', 'ssd', 'gghgh', 'Thank you for your business.', 0.01, 'fixed', 0.00, 0.01, 0.00, -0.01, NULL, 'Sent', 1, '2025-12-30 11:28:53', '2025-12-30 11:28:53', 0),
(25, 1, 'PROP#011', '2025-12-18', 'USD', 24, 7, NULL, 'After Discount', 'ssd', 'gghgh', 'Thank you for your business.', 0.01, 'fixed', 0.00, 0.01, 0.00, -0.01, NULL, 'Draft', 1, '2025-12-30 11:29:00', '2025-12-30 11:29:00', 0),
(26, 1, 'EST#010', '2026-01-20', 'USD ($)', 27, 9, NULL, 'After Discount', 'ghghg', 'ghghg', 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Waiting', 1, '2025-12-30 11:29:26', '2025-12-30 11:29:26', 0),
(27, 1, 'EST#011', '2025-12-25', 'EUR', NULL, NULL, 19, 'After Discount', 'dffgf', 'fggg', 'Thank you for your business.', 34.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Draft', 1, '2025-12-30 13:16:35', '2025-12-30 13:39:11', 1),
(28, 1, 'PROP#012', '2025-12-25', 'EUR', NULL, NULL, 19, 'After Discount', 'fgfgf', 'fgfgf', 'Thank you for your business.', 45.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Sent', 1, '2025-12-30 13:16:54', '2025-12-30 13:36:45', 1),
(29, 1, 'PROP#013', '2025-12-31', 'USD', 27, 10, NULL, 'After Discount', NULL, 'okkk', 'Thank you for your business.', 0.00, '%', 79.98, 0.00, 0.00, 79.98, NULL, 'Sent', 1, '2025-12-31 10:00:59', '2025-12-31 11:16:10', 0),
(30, 6, 'EST#012', '2026-02-07', 'INR', 32, 18, 22, 'After Discount', 'okkkk', 'pkkkk', 'Thank you for your business.', 10.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Waiting', 1, '2026-01-01 06:37:59', '2026-01-03 12:44:37', 0),
(31, 6, 'PROP#014', '2026-01-01', 'INR', NULL, NULL, 22, 'After Discount', 'okkkk', 'okkk', 'Thank you for your business.', 20.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Draft', 1, '2026-01-01 06:39:23', '2026-01-03 12:44:11', 1),
(32, 6, 'PROP#015', '2026-01-01', 'USD', 32, 16, NULL, 'After Discount', 'okkk', 'okkkk', 'Thank you for your business.', 0.00, '%', 9.99, 0.00, 0.00, 9.99, NULL, 'Sent', 1, '2026-01-01 10:53:10', '2026-01-03 12:44:06', 1),
(33, 6, 'EST#013', '2026-02-07', 'INR', NULL, NULL, 23, 'Before Discount', 'gjg', 'bmbm', 'Thank you for your business.', 20.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Draft', 1, '2026-01-01 12:03:19', '2026-01-03 12:44:48', 1),
(34, 6, 'PROP#016', NULL, 'USD', NULL, NULL, 23, 'After Discount', 'ghjj', 'bnmm', 'Thank you for your business.', 20.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Draft', 1, '2026-01-01 12:03:41', '2026-01-03 12:44:03', 1),
(35, 6, 'PROP#017', '2026-02-05', 'USD', 29, 20, NULL, 'After Discount', 'okk kkkkkkkkkkkkkkk', NULL, 'Thank you for your business.', 0.00, '%', 20.00, 0.00, 0.00, 20.00, NULL, 'Draft', 1, '2026-01-01 12:11:48', '2026-01-03 12:43:58', 0),
(36, 6, 'EST#014', '2026-01-20', 'USD ($)', 32, 16, NULL, 'After Discount', NULL, NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Waiting', 1, '2026-01-01 12:13:56', '2026-01-03 12:44:58', 1),
(37, 6, 'EST#015', '2026-01-20', 'USD ($)', 32, 16, NULL, 'After Discount', 'okkk', 'okkk  doneeee', 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Waiting', 1, '2026-01-02 07:05:31', '2026-01-02 07:05:47', 0),
(38, 6, 'EST#016', '2026-01-31', 'INR', NULL, NULL, 23, 'After Discount', 'pkkk', 'kkjhk', 'Thank you for your business.', 20.00, '%', 50000.00, 10000.00, 0.00, 50000.00, NULL, 'Accepted', 1, '2026-01-02 09:23:26', '2026-01-03 12:44:44', 1),
(39, 6, 'PROP#018', '2026-01-16', 'GBP', NULL, NULL, 23, 'After Discount', 'okkk', 'kkk', 'Thank you for your business.', 20.00, '%', 45000.00, 9000.00, 0.00, 45000.00, NULL, 'Sent', 1, '2026-01-02 09:24:26', '2026-01-03 12:43:49', 1),
(40, 6, 'PROP#019', '2026-01-23', 'INR', 32, 18, 23, 'After Discount', 'ghfh', 'hhfhooo', 'Thank you for your business.', 7.00, '%', 0.00, 0.00, 0.00, 0.00, NULL, 'Waiting', 1, '2026-01-02 09:59:30', '2026-01-03 13:42:21', 0),
(41, 6, 'PROP#020', '2026-01-23', 'INR', NULL, NULL, NULL, 'After Discount', 'ghfh', 'hhfh', 'Thank you for your business.', 7.00, '%', 79.97, 0.00, 0.00, 79.97, NULL, 'Draft', 1, '2026-01-03 12:35:41', '2026-01-03 12:35:47', 1);

-- --------------------------------------------------------

--
-- Table structure for table `estimate_items`
--

CREATE TABLE `estimate_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `estimate_id` int(10) UNSIGNED NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT 1.00,
  `unit` enum('Pcs','Kg','Hours','Days') DEFAULT 'Pcs',
  `unit_price` decimal(15,2) NOT NULL,
  `tax` varchar(50) DEFAULT NULL,
  `tax_rate` decimal(5,2) DEFAULT 0.00,
  `file_path` varchar(500) DEFAULT NULL,
  `amount` decimal(15,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `estimate_items`
--

INSERT INTO `estimate_items` (`id`, `estimate_id`, `item_name`, `description`, `quantity`, `unit`, `unit_price`, `tax`, `tax_rate`, `file_path`, `amount`, `created_at`, `updated_at`) VALUES
(1, 2, 'Service 1', NULL, 1.00, 'Pcs', 1000.00, NULL, 0.00, NULL, 1000.00, '2025-12-22 10:03:12', '2025-12-22 10:03:12'),
(3, 1, 'Service 1', NULL, 1.00, 'Pcs', 1000.00, NULL, 0.00, NULL, 1000.00, '2025-12-22 10:10:28', '2025-12-22 10:10:28'),
(4, 7, 'dfsdfs', 'd', 1.00, 'Pcs', 0.00, NULL, 0.00, NULL, 0.00, '2025-12-24 11:10:07', '2025-12-24 11:10:07'),
(5, 8, 'fsdfs', 'f', 1.00, 'Pcs', 0.00, NULL, 0.00, NULL, 0.00, '2025-12-24 11:18:03', '2025-12-24 11:18:03'),
(6, 10, 'wq', 'qw', 1.00, 'Pcs', 0.00, NULL, 0.00, NULL, 0.00, '2025-12-24 11:38:43', '2025-12-24 11:38:43'),
(7, 11, 'affff', NULL, 1.00, 'Pcs', 0.00, NULL, 0.00, NULL, 0.00, '2025-12-24 11:41:50', '2025-12-24 11:41:50'),
(8, 13, 'okkk', 'o', 1.00, 'Pcs', 60.00, NULL, 0.00, NULL, 60.00, '2025-12-29 09:04:43', '2025-12-29 09:04:43'),
(9, 14, 'okkkkkk', 'o', 1.00, 'Pcs', 0.00, NULL, 0.00, NULL, 0.00, '2025-12-29 09:06:51', '2025-12-29 09:06:51'),
(10, 15, 'okkkkkk', 'o', 1.00, 'Pcs', 0.00, NULL, 0.00, NULL, 0.00, '2025-12-29 09:12:12', '2025-12-29 09:12:12'),
(11, 16, 'Smart Camera', '4K Ultra HD security camera with night vision and motion detection.', 1.00, 'Pcs', 2450.00, NULL, 0.00, NULL, 2450.00, '2025-12-29 09:13:47', '2025-12-29 09:13:47'),
(12, 17, 'Smart Camera', '4K Ultra HD security camera with night vision and motion detection.', 1.00, 'Pcs', 2450.00, NULL, 0.00, NULL, 2450.00, '2025-12-30 06:15:24', '2025-12-30 06:15:24'),
(13, 24, 'sdd', 's', 1.00, 'Pcs', 0.00, NULL, 0.00, NULL, 0.00, '2025-12-30 11:28:53', '2025-12-30 11:28:53'),
(14, 25, 'sdd', 's', 1.00, 'Pcs', 0.00, NULL, 0.00, NULL, 0.00, '2025-12-30 11:29:00', '2025-12-30 11:29:00'),
(15, 26, 'ghgh', 'hghhh', 1.00, 'Pcs', 0.00, NULL, 0.00, NULL, 0.00, '2025-12-30 11:29:26', '2025-12-30 11:29:26'),
(16, 29, 'pen222', 'okkkkk', 1.00, 'Pcs', 79.98, NULL, 0.00, NULL, 79.98, '2025-12-31 10:00:59', '2025-12-31 10:00:59'),
(17, 32, ' SEO', 'SEO for your websites', 1.00, 'Pcs', 9.99, NULL, 0.00, NULL, 9.99, '2026-01-01 10:53:10', '2026-01-01 10:53:10'),
(19, 36, 'pennn', NULL, 1.00, 'Pcs', 0.00, NULL, 0.00, NULL, 0.00, '2026-01-01 12:13:56', '2026-01-01 12:13:56'),
(22, 41, 'logo', 'okkk', 1.00, 'Pcs', 79.97, NULL, 0.00, NULL, 79.97, '2026-01-03 12:35:41', '2026-01-03 12:35:41'),
(24, 35, 'Website Design', '	Custom website templates for your brand.', 1.00, 'Pcs', 20.00, NULL, 0.00, NULL, 20.00, '2026-01-03 12:43:58', '2026-01-03 12:43:58');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `label_color` varchar(7) DEFAULT '#FF0000',
  `where` varchar(500) NOT NULL,
  `description` text DEFAULT NULL,
  `starts_on_date` date NOT NULL,
  `starts_on_time` time NOT NULL,
  `ends_on_date` date NOT NULL,
  `ends_on_time` time NOT NULL,
  `host_id` int(10) UNSIGNED DEFAULT NULL,
  `lead_id` int(10) UNSIGNED DEFAULT NULL,
  `status` enum('Pending','Confirmed','Cancelled','Completed') DEFAULT NULL,
  `event_link` varchar(500) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `created_by` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `company_id`, `event_name`, `label_color`, `where`, `description`, `starts_on_date`, `starts_on_time`, `ends_on_date`, `ends_on_time`, `host_id`, `lead_id`, `status`, `event_link`, `file_path`, `created_by`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 'new year', '#FF0000', 'indore', 'okkk', '2025-12-25', '22:21:00', '2025-12-26', '16:16:00', 13, NULL, 'Confirmed', 'asdfsadff', NULL, 13, '2025-12-23 10:45:40', '2025-12-23 10:45:40', 0),
(4, 1, 'new year 2', '#007bff', 'bhopal', 'okkk', '2025-12-31', '16:54:00', '2026-01-01', '20:59:00', 19, NULL, 'Confirmed', 'rrwerwerwer', NULL, 19, '2025-12-27 10:25:00', '2025-12-27 10:25:00', 0),
(8, 1, 'Follow-up: raj', '#FF6B6B', 'Default Company', 'sdssd', '2026-01-01', '14:20:00', '2026-01-01', '15:20:00', 1, NULL, 'Pending', NULL, NULL, 1, '2025-12-30 06:48:55', '2025-12-30 06:48:55', 0),
(9, 1, 'Follow-up: raj', '#FF6B6B', 'Default Company', 'sdsdsd', '2025-12-31', '15:22:00', '2025-12-31', '16:22:00', 1, NULL, 'Pending', NULL, NULL, 1, '2025-12-30 06:49:23', '2025-12-30 06:49:23', 0),
(10, 1, 'Follow-up: raj', '#FF6B6B', 'Default Company', 'sssss', '2025-12-31', '15:22:00', '2025-12-31', '16:22:00', 1, NULL, 'Pending', NULL, NULL, 1, '2025-12-30 06:49:45', '2025-12-30 06:49:45', 0),
(17, 1, 'holi', '#FF0000', 'demo', 'demo', '2025-12-24', '16:00:00', '2025-12-17', '16:00:00', 1, NULL, 'Pending', 'htpps', NULL, 1, '2025-12-30 07:02:57', '2025-12-30 07:02:57', 0),
(18, 1, 'diwali', '#FF0000', 'indore', 'best', '2025-12-30', '18:01:00', '2025-12-31', '16:00:00', 1, NULL, 'Pending', 'demo', NULL, 1, '2025-12-30 07:03:58', '2025-12-30 07:03:58', 0),
(19, 1, 'sdsd', '#FF0000', 'sdsd', 'sdd', '2025-12-21', '16:00:00', '2025-12-21', '16:00:00', 1, NULL, 'Pending', 'hhhhhhh', NULL, 1, '2025-12-30 07:04:42', '2025-12-30 07:04:42', 0),
(20, 1, 'Follow-up: raj', '#FF6B6B', 'Default Company', 'demo', '2025-12-31', '14:37:00', '2025-12-31', '15:37:00', 1, NULL, 'Pending', NULL, NULL, 1, '2025-12-30 07:05:45', '2025-12-30 07:05:45', 0),
(21, 1, 'Follow-up: raj', '#FF6B6B', 'Default Company', 'sdsd', '2026-01-01', '20:47:00', '2026-01-01', '21:47:00', 1, NULL, 'Pending', NULL, NULL, 1, '2025-12-30 11:13:45', '2025-12-30 11:13:45', 0),
(22, 1, 'dff', '#FF0000', 'dfdf', 'dff', '2025-12-21', '16:00:00', '2025-12-21', '16:00:00', 1, NULL, 'Pending', 'dfdf', NULL, 1, '2025-12-30 12:45:52', '2025-12-30 12:45:52', 0),
(23, 6, 'Follow-up: Lead', '#FF6B6B', 'tech mahindra', 'okkkk', '2026-01-01', '12:27:00', '2026-01-01', '13:27:00', 18, NULL, 'Pending', NULL, NULL, 18, '2026-01-01 06:55:26', '2026-01-01 06:55:26', 0),
(24, 6, 'makar sakranti', '#004cff', 'bhopal ', 'enjoy ', '2026-01-15', '09:00:00', '2026-01-16', '00:00:00', 18, NULL, 'Confirmed', NULL, NULL, 18, '2026-01-01 07:16:24', '2026-01-01 07:16:24', 0),
(25, 6, 'e1', '#ff9500', 'pune', 'okkkk', '2026-01-16', '09:03:00', '2026-01-01', '10:02:00', 18, NULL, 'Cancelled', NULL, NULL, 18, '2026-01-01 07:56:56', '2026-01-01 07:56:56', 0),
(26, 6, 'e222', '#FF0000', 'dharr', 'fsdfs', '2026-01-12', '09:00:00', '2026-01-12', '10:00:00', 18, NULL, 'Pending', NULL, NULL, 18, '2026-01-01 07:57:25', '2026-01-01 07:57:25', 0),
(27, 6, 'party ', '#ff2600', 'mumbai', 'okkkkkk', '2026-01-20', '16:00:00', '2026-01-21', '16:00:00', 18, NULL, 'Confirmed', 'dzfvxcv', NULL, 18, '2026-01-01 10:00:42', '2026-01-01 10:00:42', 0),
(28, 6, 'Follow-up: Lead', '#FF6B6B', 'tech mahindra', 'okk', '2026-01-20', '17:38:00', '2026-01-20', '18:38:00', 18, NULL, 'Pending', NULL, NULL, 18, '2026-01-01 12:05:02', '2026-01-01 12:05:02', 0),
(29, 6, 'firstv 11', '#d4ff00', 'indore', 'dfsf', '2026-01-10', '09:00:00', '2026-01-10', '10:00:00', 18, NULL, 'Pending', NULL, NULL, 18, '2026-01-01 12:05:37', '2026-01-01 12:05:37', 0),
(30, 6, 'sdd', '#FF0000', 'indore', 'dffdf', '2026-01-24', '09:00:00', '2026-01-30', '10:00:00', 18, NULL, 'Completed', NULL, NULL, 18, '2026-01-02 10:54:40', '2026-01-02 10:54:40', 0),
(31, 6, 'sdfds', '#FF0000', 'sdfsdfs', 'sdfsdfs', '2026-01-02', '09:00:00', '2026-01-02', '10:00:00', 18, NULL, 'Pending', NULL, NULL, 18, '2026-01-02 11:00:53', '2026-01-02 11:00:53', 0),
(32, 6, 'party', '#14B8A6', 'indore', 'welcome', '2026-01-03', '16:00:00', '2026-01-03', '20:00:00', 18, NULL, 'Pending', 'wwwndsmf', NULL, 18, '2026-01-03 07:12:00', '2026-01-03 07:12:00', 0),
(33, 6, 'rrr', '#EC4899', 'indoreee', 'fffff', '2026-01-05', '22:00:00', '2026-01-03', '16:00:00', 18, NULL, 'Pending', 'sdsad', NULL, 18, '2026-01-03 07:37:08', '2026-01-03 07:37:08', 0),
(34, 6, 'Follow-up: Lead', '#FF6B6B', 'tech mahindra', 'okkk doneeee', '2026-01-22', '17:22:00', '2026-01-22', '18:22:00', 18, NULL, 'Pending', NULL, NULL, 18, '2026-01-03 11:48:25', '2026-01-03 11:48:25', 0);

-- --------------------------------------------------------

--
-- Table structure for table `event_clients`
--

CREATE TABLE `event_clients` (
  `id` int(10) UNSIGNED NOT NULL,
  `event_id` int(10) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `event_clients`
--

INSERT INTO `event_clients` (`id`, `event_id`, `client_id`, `created_at`) VALUES
(1, 17, 27, '2025-12-30 07:02:57'),
(2, 17, 26, '2025-12-30 07:02:57'),
(3, 18, 25, '2025-12-30 07:03:58'),
(4, 19, 24, '2025-12-30 07:04:42'),
(5, 22, 25, '2025-12-30 12:45:52'),
(6, 27, 32, '2026-01-01 10:00:42'),
(7, 27, 29, '2026-01-01 10:00:42'),
(8, 32, 32, '2026-01-03 07:12:00'),
(9, 33, 32, '2026-01-03 07:37:08');

-- --------------------------------------------------------

--
-- Table structure for table `event_departments`
--

CREATE TABLE `event_departments` (
  `id` int(10) UNSIGNED NOT NULL,
  `event_id` int(10) UNSIGNED NOT NULL,
  `department_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `event_departments`
--

INSERT INTO `event_departments` (`id`, `event_id`, `department_id`, `created_at`) VALUES
(16, 17, 2, '2025-12-30 07:02:57'),
(17, 17, 6, '2025-12-30 07:02:57'),
(18, 18, 2, '2025-12-30 07:03:58'),
(19, 19, 2, '2025-12-30 07:04:42'),
(20, 22, 1, '2025-12-30 12:45:52'),
(21, 27, 7, '2026-01-01 10:00:42'),
(22, 32, 7, '2026-01-03 07:12:00');

-- --------------------------------------------------------

--
-- Table structure for table `event_employees`
--

CREATE TABLE `event_employees` (
  `id` int(10) UNSIGNED NOT NULL,
  `event_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `event_employees`
--

INSERT INTO `event_employees` (`id`, `event_id`, `user_id`, `created_at`) VALUES
(1, 1, 13, '2025-12-23 10:45:40'),
(2, 4, 19, '2025-12-27 10:25:00'),
(6, 8, 1, '2025-12-30 06:48:55'),
(7, 9, 1, '2025-12-30 06:49:23'),
(8, 10, 1, '2025-12-30 06:49:45'),
(15, 17, 1, '2025-12-30 07:02:57'),
(16, 18, 1, '2025-12-30 07:03:58'),
(17, 19, 1, '2025-12-30 07:04:42'),
(18, 20, 1, '2025-12-30 07:05:45'),
(19, 21, 1, '2025-12-30 11:13:45'),
(20, 22, 1, '2025-12-30 12:45:52'),
(21, 23, 18, '2026-01-01 06:55:27'),
(22, 24, 18, '2026-01-01 07:16:24'),
(23, 25, 18, '2026-01-01 07:56:56'),
(24, 26, 18, '2026-01-01 07:57:25'),
(25, 27, 18, '2026-01-01 10:00:42'),
(26, 28, 18, '2026-01-01 12:05:02'),
(27, 29, 18, '2026-01-01 12:05:37'),
(28, 30, 18, '2026-01-02 10:54:40'),
(29, 31, 18, '2026-01-02 11:00:53'),
(30, 32, 18, '2026-01-03 07:12:00'),
(31, 33, 18, '2026-01-03 07:37:08'),
(32, 34, 18, '2026-01-03 11:48:25');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `expense_number` varchar(50) NOT NULL,
  `expense_date` date DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT 0.00,
  `title` varchar(255) DEFAULT NULL,
  `lead_id` int(10) UNSIGNED DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `deal_id` int(10) UNSIGNED DEFAULT NULL,
  `valid_till` date DEFAULT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `calculate_tax` enum('After Discount','Before Discount') DEFAULT 'After Discount',
  `description` text DEFAULT NULL,
  `tax` varchar(50) DEFAULT NULL,
  `second_tax` varchar(50) DEFAULT NULL,
  `is_recurring` tinyint(1) DEFAULT 0,
  `note` text DEFAULT NULL,
  `terms` text DEFAULT 'Thank you for your business.',
  `discount` decimal(15,2) DEFAULT 0.00,
  `discount_type` enum('%','fixed') DEFAULT '%',
  `sub_total` decimal(15,2) DEFAULT 0.00,
  `discount_amount` decimal(15,2) DEFAULT 0.00,
  `tax_amount` decimal(15,2) DEFAULT 0.00,
  `total` decimal(15,2) DEFAULT 0.00,
  `require_approval` tinyint(1) DEFAULT 1,
  `status` enum('Pending','Approved','Rejected','Paid') DEFAULT 'Pending',
  `created_by` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `company_id`, `expense_number`, `expense_date`, `category`, `amount`, `title`, `lead_id`, `client_id`, `project_id`, `employee_id`, `deal_id`, `valid_till`, `currency`, `calculate_tax`, `description`, `tax`, `second_tax`, `is_recurring`, `note`, `terms`, `discount`, `discount_type`, `sub_total`, `discount_amount`, `tax_amount`, `total`, `require_approval`, `status`, `created_by`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, '', NULL, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'USD', 'After Discount', 'Office supplies', NULL, NULL, 0, 'Budget exceeded', 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 1, 'Approved', 1, '2025-12-22 10:15:43', '2025-12-30 12:21:48', 1),
(2, 1, 'EXP#002', NULL, NULL, 0.00, NULL, 17, NULL, NULL, NULL, NULL, '2026-01-20', 'EUR', 'After Discount', NULL, NULL, NULL, 0, 'cccc', 'Thank you for your business.', 0.00, '%', 1.00, 0.00, 0.00, 1.00, 1, 'Pending', 1, '2025-12-30 12:19:11', '2025-12-30 12:22:43', 1),
(3, 1, 'EXP#003', NULL, NULL, 0.00, NULL, 17, NULL, NULL, NULL, NULL, '2026-01-20', 'EUR', 'After Discount', NULL, NULL, NULL, 0, 'dfdf', 'Thank you for your business.', 0.00, '%', 4.00, 0.00, 0.00, 4.00, 1, 'Pending', 1, '2025-12-30 12:23:42', '2025-12-30 12:26:30', 1),
(4, 1, 'EXP#004', NULL, NULL, 0.00, NULL, 17, NULL, NULL, NULL, NULL, '2026-01-20', 'EUR', 'After Discount', NULL, NULL, NULL, 0, 'sdsd', 'Thank you for your business.', 0.00, '%', -2.00, 0.00, 0.00, -2.00, 1, 'Pending', 1, '2025-12-30 12:26:54', '2025-12-30 12:26:54', 0),
(5, 1, 'EXP#005', NULL, NULL, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-31', 'USD', 'After Discount', 'expense', NULL, NULL, 0, 'okk', 'Thank you for your business.', 0.00, '%', 5000.00, 0.00, 0.00, 5000.00, 1, 'Pending', 1, '2025-12-31 11:37:02', '2025-12-31 11:37:02', 0),
(6, 6, 'EXP#001', '2026-01-01', 'Other', 0.00, 'N/A', NULL, NULL, NULL, NULL, NULL, '2026-01-01', 'USD', 'After Discount', 'okk', NULL, NULL, 0, 'okk', 'Thank you for your business.', 0.00, '%', 2999.00, 0.00, 0.00, 0.00, 1, 'Pending', 1, '2026-01-01 12:00:49', '2026-01-03 13:24:50', 0);

-- --------------------------------------------------------

--
-- Table structure for table `expense_items`
--

CREATE TABLE `expense_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `expense_id` int(10) UNSIGNED NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT 1.00,
  `unit` enum('Pcs','Kg','Hours','Days') DEFAULT 'Pcs',
  `unit_price` decimal(15,2) NOT NULL,
  `tax` varchar(50) DEFAULT NULL,
  `tax_rate` decimal(5,2) DEFAULT 0.00,
  `file_path` varchar(500) DEFAULT NULL,
  `amount` decimal(15,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expense_items`
--

INSERT INTO `expense_items` (`id`, `expense_id`, `item_name`, `description`, `quantity`, `unit`, `unit_price`, `tax`, `tax_rate`, `file_path`, `amount`, `created_at`, `updated_at`) VALUES
(1, 2, 'dsdsd', 'dsdsd', 1.00, 'Pcs', 1.00, NULL, 0.00, NULL, 1.00, '2025-12-30 12:19:11', '2025-12-30 12:19:11'),
(2, 3, 'sasa', 'sasa', 1.00, 'Pcs', 4.00, NULL, 0.00, NULL, 4.00, '2025-12-30 12:23:42', '2025-12-30 12:23:42'),
(3, 4, 'Expense Item', NULL, 1.00, 'Pcs', -2.00, NULL, 0.00, NULL, -2.00, '2025-12-30 12:26:54', '2025-12-30 12:26:54'),
(4, 5, 'expense', 'okk', 1.00, 'Pcs', 5000.00, NULL, 0.00, NULL, 5000.00, '2025-12-31 11:37:02', '2025-12-31 11:37:02'),
(6, 6, 'okk', 'okk', 1.00, 'Pcs', 0.00, NULL, 0.00, NULL, 2999.00, '2026-01-03 12:55:14', '2026-01-03 12:55:14');

-- --------------------------------------------------------

--
-- Table structure for table `finance_templates`
--

CREATE TABLE `finance_templates` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('invoice','estimate','expense') NOT NULL,
  `template_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`template_data`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `invoice_number` varchar(50) NOT NULL,
  `invoice_date` date NOT NULL,
  `due_date` date NOT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `exchange_rate` decimal(10,4) DEFAULT 1.0000,
  `client_id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `calculate_tax` enum('After Discount','Before Discount') DEFAULT 'After Discount',
  `bank_account` varchar(255) DEFAULT NULL,
  `payment_details` text DEFAULT NULL,
  `billing_address` text DEFAULT NULL,
  `shipping_address` text DEFAULT NULL,
  `generated_by` varchar(100) DEFAULT 'Worksuite',
  `note` text DEFAULT NULL,
  `terms` text DEFAULT 'Thank you for your business.',
  `discount` decimal(15,2) DEFAULT 0.00,
  `discount_type` enum('%','fixed') DEFAULT '%',
  `sub_total` decimal(15,2) DEFAULT 0.00,
  `discount_amount` decimal(15,2) DEFAULT 0.00,
  `tax_amount` decimal(15,2) DEFAULT 0.00,
  `total` decimal(15,2) DEFAULT 0.00,
  `paid` decimal(15,2) DEFAULT 0.00,
  `unpaid` decimal(15,2) DEFAULT 0.00,
  `status` enum('Paid','Unpaid','Partially Paid','Overdue','Cancelled') DEFAULT 'Unpaid',
  `is_recurring` tinyint(1) DEFAULT 0,
  `billing_frequency` enum('Monthly','Quarterly','Yearly') DEFAULT NULL,
  `recurring_start_date` date DEFAULT NULL,
  `recurring_total_count` int(11) DEFAULT NULL,
  `is_time_log_invoice` tinyint(1) DEFAULT 0,
  `time_log_from` date DEFAULT NULL,
  `time_log_to` date DEFAULT NULL,
  `created_by` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `company_id`, `invoice_number`, `invoice_date`, `due_date`, `currency`, `exchange_rate`, `client_id`, `project_id`, `calculate_tax`, `bank_account`, `payment_details`, `billing_address`, `shipping_address`, `generated_by`, `note`, `terms`, `discount`, `discount_type`, `sub_total`, `discount_amount`, `tax_amount`, `total`, `paid`, `unpaid`, `status`, `is_recurring`, `billing_frequency`, `recurring_start_date`, `recurring_total_count`, `is_time_log_invoice`, `time_log_from`, `time_log_to`, `created_by`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 'INV#001', '2025-10-29', '2025-11-29', 'USD', 1.0000, 1, 1, 'After Discount', 'Primary Account', 'Bank transfer', '123 Main St, New York', '', 'Worksuite', 'Thank you', 'Thank you for your business.', 0.00, '%', 1070.30, 0.00, 0.00, 1070.30, 3749.00, -2678.70, 'Paid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2025-12-22 09:51:36', '2025-12-22 10:15:04', 0),
(2, 1, 'INV#002', '2025-01-01', '2025-01-31', 'USD', 1.0000, 1, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 45846.00, -45846.00, 'Paid', 1, 'Monthly', '2025-01-01', 12, 0, NULL, NULL, 1, '2025-12-22 09:52:45', '2025-12-22 10:15:04', 0),
(3, 1, 'INV#003', '2025-01-01', '2025-01-31', 'USD', 1.0000, 1, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 1, 'Monthly', '2025-01-01', 12, 0, NULL, NULL, 1, '2025-12-22 09:54:16', '2025-12-22 09:54:16', 0),
(4, 1, 'INV#004', '2025-02-01', '2025-03-03', 'USD', 1.0000, 1, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 1, 'Monthly', '2025-01-01', 12, 0, NULL, NULL, 1, '2025-12-22 09:54:16', '2025-12-22 09:54:16', 0),
(5, 1, 'INV#005', '2025-03-01', '2025-03-31', 'USD', 1.0000, 1, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 1, 'Monthly', '2025-01-01', 12, 0, NULL, NULL, 1, '2025-12-22 09:54:16', '2025-12-22 09:54:16', 0),
(6, 1, 'INV#006', '2025-04-01', '2025-05-01', 'USD', 1.0000, 1, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 1, 'Monthly', '2025-01-01', 12, 0, NULL, NULL, 1, '2025-12-22 09:54:16', '2025-12-22 09:54:16', 0),
(7, 1, 'INV#007', '2025-05-01', '2025-05-31', 'USD', 1.0000, 1, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 1, 'Monthly', '2025-01-01', 12, 0, NULL, NULL, 1, '2025-12-22 09:54:16', '2025-12-22 09:54:16', 0),
(8, 1, 'INV#008', '2025-06-01', '2025-07-01', 'USD', 1.0000, 1, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 1, 'Monthly', '2025-01-01', 12, 0, NULL, NULL, 1, '2025-12-22 09:54:16', '2025-12-22 09:54:16', 0),
(9, 1, 'INV#009', '2025-07-01', '2025-07-31', 'USD', 1.0000, 1, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 1, 'Monthly', '2025-01-01', 12, 0, NULL, NULL, 1, '2025-12-22 09:54:17', '2025-12-22 09:54:17', 0),
(10, 1, 'INV#010', '2025-08-01', '2025-08-31', 'USD', 1.0000, 1, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 1, 'Monthly', '2025-01-01', 12, 0, NULL, NULL, 1, '2025-12-22 09:54:17', '2025-12-22 09:54:17', 0),
(11, 1, 'INV#011', '2025-09-01', '2025-10-01', 'USD', 1.0000, 1, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 1, 'Monthly', '2025-01-01', 12, 0, NULL, NULL, 1, '2025-12-22 09:54:17', '2025-12-22 09:54:17', 0),
(12, 1, 'INV#012', '2025-10-01', '2025-10-31', 'USD', 1.0000, 1, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 1, 'Monthly', '2025-01-01', 12, 0, NULL, NULL, 1, '2025-12-22 09:54:17', '2025-12-22 09:54:17', 0),
(13, 1, 'INV#013', '2025-11-01', '2025-12-01', 'USD', 1.0000, 1, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 1, 'Monthly', '2025-01-01', 12, 0, NULL, NULL, 1, '2025-12-22 09:54:17', '2025-12-22 09:54:17', 0),
(14, 1, 'INV#014', '2025-12-01', '2025-12-31', 'USD', 1.0000, 1, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 1, 'Monthly', '2025-01-01', 12, 0, NULL, NULL, 1, '2025-12-22 09:54:17', '2025-12-22 09:54:17', 0),
(15, 1, 'INV#015', '2024-01-15', '2024-02-15', 'USD', 1.0000, 1, 1, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 1000.00, 0.00, 0.00, 1000.00, 0.00, 1000.00, 'Unpaid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2025-12-22 10:09:45', '2025-12-22 10:09:45', 0),
(16, 1, 'INV#016', '2025-12-17', '2025-12-18', 'EUR', 1.0000, 27, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', '23', 'Thank you for your business.', 232.00, '', 234.00, 232.00, 0.00, 2.00, 0.00, 2.00, 'Unpaid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2025-12-30 08:45:33', '2025-12-30 08:45:33', 0),
(17, 1, 'INV#017', '2025-12-25', '2026-01-07', 'EUR', 1.0000, 27, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', 'dfgf', 'Thank you for your business.', 34.00, '', 34.00, 34.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2025-12-30 08:47:34', '2025-12-30 08:47:34', 0),
(18, 1, 'INV#018', '2025-12-25', '2026-01-07', 'EUR', 1.0000, 27, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', 'dfgf', 'Thank you for your business.', 34.00, '', 34.00, 34.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2025-12-30 08:48:01', '2025-12-30 08:48:01', 0),
(19, 1, 'INV#019', '2025-12-25', '2026-01-07', 'EUR', 1.0000, 27, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', 'dfgf', 'Thank you for your business.', 34.00, '', 34.00, 34.00, 0.00, 0.00, 234.00, -234.00, 'Paid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2025-12-30 08:51:00', '2025-12-30 11:02:18', 0),
(20, 1, 'INV#020', '2025-12-30', '2025-12-25', 'EUR', 1.0000, 27, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', 'dfdff', 'Thank you for your business.', 23.00, '%', 23.00, 5.29, 0.00, 17.71, 0.00, 17.71, 'Unpaid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2025-12-30 11:02:38', '2025-12-30 11:02:38', 0),
(21, 1, 'INV#021', '2025-12-30', '2026-01-01', 'USD ($)', 1.0000, 27, 8, 'After Discount', NULL, NULL, 'jojo, raghj', NULL, 'Worksuite', 'hghgh', 'Thank you for your business.', 0.00, '%', 1.00, 0.00, 0.00, 1.00, 344.00, 0.00, 'Paid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2025-12-30 11:30:17', '2025-12-30 13:45:01', 0),
(22, 1, 'INV#022', '2025-12-30', '2025-12-17', 'USD', 1.0000, 28, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', 'gfgf', 'Thank you for your business.', 45.00, '%', 45.00, 20.25, 0.00, 24.75, 0.00, 24.75, 'Unpaid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2025-12-30 13:33:06', '2025-12-30 13:33:06', 0),
(23, 1, 'INV#023', '2025-12-31', '2026-01-30', 'USD', 1.0000, 27, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 60000.00, -60000.00, 'Paid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2025-12-31 10:55:24', '2025-12-31 13:29:29', 0),
(24, 1, 'INV#024', '2025-12-31', '2026-01-30', 'USD', 1.0000, 27, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2025-12-31 11:00:07', '2025-12-31 11:00:07', 0),
(25, 1, 'INV#025', '2025-12-31', '2026-01-30', 'USD', 1.0000, 15, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 19.97, 0.00, 0.00, 19.97, 0.00, 19.97, 'Unpaid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2025-12-31 11:10:27', '2025-12-31 11:10:27', 0),
(28, 6, 'INV#026', '2026-01-01', '2026-02-07', 'INR', 1.0000, 32, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', 'okkk', 'Thank you for your business.', 0.00, '%', 50000.00, 0.00, 0.00, 50000.00, 500000.00, -450000.00, 'Paid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2026-01-01 09:26:51', '2026-01-01 09:27:16', 0),
(29, 6, 'INV#027', '2026-01-01', '2026-01-31', 'USD', 1.0000, 29, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 500000.00, -500000.00, 'Paid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2026-01-01 10:54:07', '2026-01-03 13:43:38', 0),
(30, 6, 'INV#028', '2026-01-03', '2026-02-02', 'USD', 1.0000, 29, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2026-01-03 09:52:25', '2026-01-03 09:52:25', 0),
(31, 6, 'INV#029', '2026-01-03', '2026-02-02', 'USD', 1.0000, 29, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2026-01-03 09:56:00', '2026-01-03 13:38:50', 1),
(32, 6, 'INV#030', '2026-01-03', '2026-02-02', 'USD', 1.0000, 29, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', 'okkkksdfsdf', 'Thank you for your business.', 0.00, '%', 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 'Unpaid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2026-01-03 10:13:24', '2026-01-03 13:43:27', 0),
(33, 6, 'INV#031', '2026-01-03', '2026-02-02', 'USD', 1.0000, 29, NULL, 'After Discount', NULL, NULL, NULL, NULL, 'Worksuite', NULL, 'Thank you for your business.', 0.00, '%', 9.99, 0.00, 0.00, 9.99, 0.00, 9.99, 'Unpaid', 0, NULL, NULL, NULL, 0, NULL, NULL, 1, '2026-01-03 10:14:49', '2026-01-03 13:29:20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `invoice_items`
--

CREATE TABLE `invoice_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `invoice_id` int(10) UNSIGNED NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT 1.00,
  `unit` enum('Pcs','Kg','Hours','Days') DEFAULT 'Pcs',
  `unit_price` decimal(15,2) NOT NULL,
  `tax` varchar(50) DEFAULT NULL,
  `tax_rate` decimal(5,2) DEFAULT 0.00,
  `file_path` varchar(500) DEFAULT NULL,
  `amount` decimal(15,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_items`
--

INSERT INTO `invoice_items` (`id`, `invoice_id`, `item_name`, `description`, `quantity`, `unit`, `unit_price`, `tax`, `tax_rate`, `file_path`, `amount`, `created_at`, `updated_at`) VALUES
(1, 1, 'Electric Toothbrush', 'Rechargeable electric toothbrush', 1.00, 'Pcs', 973.00, 'GST 10%', 0.00, NULL, 1070.30, '2025-12-22 09:51:36', '2025-12-22 09:51:36'),
(2, 3, 'Monthly Subscription', NULL, 1.00, 'Pcs', 1000.00, NULL, 0.00, NULL, 1000.00, '2025-12-22 09:54:16', '2025-12-22 09:54:16'),
(3, 4, 'Monthly Subscription', NULL, 1.00, 'Pcs', 1000.00, NULL, 0.00, NULL, 1000.00, '2025-12-22 09:54:16', '2025-12-22 09:54:16'),
(4, 5, 'Monthly Subscription', NULL, 1.00, 'Pcs', 1000.00, NULL, 0.00, NULL, 1000.00, '2025-12-22 09:54:16', '2025-12-22 09:54:16'),
(5, 6, 'Monthly Subscription', NULL, 1.00, 'Pcs', 1000.00, NULL, 0.00, NULL, 1000.00, '2025-12-22 09:54:16', '2025-12-22 09:54:16'),
(6, 7, 'Monthly Subscription', NULL, 1.00, 'Pcs', 1000.00, NULL, 0.00, NULL, 1000.00, '2025-12-22 09:54:16', '2025-12-22 09:54:16'),
(7, 8, 'Monthly Subscription', NULL, 1.00, 'Pcs', 1000.00, NULL, 0.00, NULL, 1000.00, '2025-12-22 09:54:16', '2025-12-22 09:54:16'),
(8, 9, 'Monthly Subscription', NULL, 1.00, 'Pcs', 1000.00, NULL, 0.00, NULL, 1000.00, '2025-12-22 09:54:17', '2025-12-22 09:54:17'),
(9, 10, 'Monthly Subscription', NULL, 1.00, 'Pcs', 1000.00, NULL, 0.00, NULL, 1000.00, '2025-12-22 09:54:17', '2025-12-22 09:54:17'),
(10, 11, 'Monthly Subscription', NULL, 1.00, 'Pcs', 1000.00, NULL, 0.00, NULL, 1000.00, '2025-12-22 09:54:17', '2025-12-22 09:54:17'),
(11, 12, 'Monthly Subscription', NULL, 1.00, 'Pcs', 1000.00, NULL, 0.00, NULL, 1000.00, '2025-12-22 09:54:17', '2025-12-22 09:54:17'),
(12, 13, 'Monthly Subscription', NULL, 1.00, 'Pcs', 1000.00, NULL, 0.00, NULL, 1000.00, '2025-12-22 09:54:17', '2025-12-22 09:54:17'),
(13, 14, 'Monthly Subscription', NULL, 1.00, 'Pcs', 1000.00, NULL, 0.00, NULL, 1000.00, '2025-12-22 09:54:17', '2025-12-22 09:54:17'),
(14, 15, 'Service 1', NULL, 1.00, 'Pcs', 1000.00, NULL, 0.00, NULL, 1000.00, '2025-12-22 10:09:45', '2025-12-22 10:09:45'),
(15, 19, 'Invoice Item', 'Invoice item', 1.00, 'Pcs', 34.00, NULL, 0.00, NULL, 34.00, '2025-12-30 08:51:00', '2025-12-30 08:51:00'),
(16, 20, 'Invoice Item', 'Invoice item', 1.00, 'Pcs', 23.00, NULL, 0.00, NULL, 23.00, '2025-12-30 11:02:38', '2025-12-30 11:02:38'),
(17, 21, 'ghgh', 'ghghghg', 1.00, 'Pcs', 1.00, NULL, 0.00, NULL, 1.00, '2025-12-30 11:30:17', '2025-12-30 11:30:17'),
(18, 22, 'Invoice Item', 'Invoice item', 1.00, 'Pcs', 45.00, NULL, 0.00, NULL, 45.00, '2025-12-30 13:33:06', '2025-12-30 13:33:06'),
(19, 25, ' Website Design', 'Custom website templates for your brand.', 1.00, 'Pcs', 19.97, NULL, 0.00, NULL, 19.97, '2025-12-31 11:10:27', '2025-12-31 11:10:27'),
(20, 28, 'Invoice Item', 'Invoice item', 1.00, 'Pcs', 50000.00, NULL, 0.00, NULL, 50000.00, '2026-01-01 09:26:51', '2026-01-01 09:26:51'),
(21, 29, 'Item #5', 'SEO for your websites', 1.00, 'Pcs', 0.00, NULL, 0.00, NULL, 0.00, '2026-01-01 10:54:07', '2026-01-01 10:54:07'),
(22, 30, 'Item #10', 'okkk', 1.00, 'Pcs', 0.00, NULL, 0.00, NULL, 0.00, '2026-01-03 09:52:25', '2026-01-03 09:52:25'),
(23, 31, 'Item #10', 'okkk', 1.00, 'Pcs', 0.00, NULL, 0.00, NULL, 0.00, '2026-01-03 09:56:00', '2026-01-03 09:56:00'),
(28, 33, 'SEO for your websites', 'SEO for your websites', 1.00, 'Pcs', 0.00, NULL, 0.00, NULL, 9.99, '2026-01-03 13:28:44', '2026-01-03 13:28:44'),
(30, 32, 'okkk', 'okkk', 1.00, 'Pcs', 0.00, NULL, 0.00, NULL, 0.00, '2026-01-03 13:43:27', '2026-01-03 13:43:27');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) NOT NULL,
  `unit_type` varchar(50) NOT NULL,
  `rate` decimal(10,2) NOT NULL,
  `show_in_client_portal` tinyint(1) NOT NULL DEFAULT 0,
  `image_path` varchar(500) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `company_id`, `title`, `description`, `category`, `unit_type`, `rate`, `show_in_client_portal`, `image_path`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 'pen222', 'okkkkk', 'Development', 'pc', 79.98, 1, NULL, 0, '2025-12-31 08:57:31', '2025-12-31 08:58:52'),
(2, 1, ' Website Design', 'Custom website templates for your brand.', 'Design', 'hours', 19.97, 1, NULL, 0, '2025-12-31 10:22:47', '2025-12-31 10:22:47'),
(3, 1, 'SEO', 'SEO for your websites', 'Marketing', 'Hours', 50.00, 1, NULL, 0, '2025-12-31 10:46:37', '2025-12-31 10:46:37'),
(4, 6, 'Website Design', '	Custom website templates for your brand.', 'Design', 'Hour', 20.00, 1, NULL, 0, '2026-01-01 09:28:28', '2026-01-01 09:28:28'),
(5, 6, ' SEO', 'SEO for your websites', 'Services', '	Hour', 9.99, 1, NULL, 1, '2026-01-01 09:34:57', '2026-01-02 12:18:54'),
(6, 6, 'sdfsdf', 'sdfsdfsdf', 'Development', 'sdfsdf', 5555.00, 1, NULL, 1, '2026-01-02 10:45:49', '2026-01-02 12:18:50'),
(7, 6, 'sdfsdf', 'sdfsdfsdf', 'Development', 'sdfsdf', 5555.00, 0, NULL, 1, '2026-01-02 12:18:34', '2026-01-02 12:18:44'),
(8, 6, ' SEO', 'SEO for your websites', 'Services', '	Hour', 9.99, 0, NULL, 0, '2026-01-02 12:18:35', '2026-01-02 12:18:35'),
(9, 6, 'Website Design', '	Custom website templates for your brand.', 'Design', 'Hour', 20.00, 0, NULL, 1, '2026-01-02 12:18:35', '2026-01-02 12:19:01'),
(10, 6, 'logo', 'okkk', 'Design', 'hourss', 79.97, 1, NULL, 0, '2026-01-02 12:19:59', '2026-01-02 12:19:59');

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `lead_type` enum('Organization','Person') NOT NULL DEFAULT 'Organization',
  `company_name` varchar(255) DEFAULT NULL,
  `person_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `owner_id` int(10) UNSIGNED DEFAULT NULL,
  `status` enum('New','Qualified','Discussion','Negotiation','Won','Lost') DEFAULT 'New',
  `source` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zip` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `value` decimal(15,2) DEFAULT NULL,
  `due_followup` date DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `probability` int(11) DEFAULT NULL CHECK (`probability` >= 0 and `probability` <= 100),
  `call_this_week` tinyint(1) DEFAULT 0,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `company_id`, `lead_type`, `company_name`, `person_name`, `email`, `phone`, `owner_id`, `status`, `source`, `address`, `city`, `state`, `zip`, `country`, `value`, `due_followup`, `notes`, `probability`, `call_this_week`, `created_by`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 'Organization', 'Tech Corp', 'John Doe', 'john@techcorp.com', '+1-234-567-8900', 1, 'Qualified', 'Google ads', '123 Main St', 'New York', NULL, NULL, NULL, 5000.00, '2024-02-20', 'Hot lead', 75, 0, 1, '2025-12-22 08:51:18', '2025-12-22 08:55:25', 1),
(2, 1, 'Organization', 'Tech Corp', 'John Doe', 'john@techcorp.com', '+1-234-567-8902', 1, 'Discussion', 'Google ads', '123 Main St', 'New York', NULL, NULL, NULL, 5000.00, '2024-02-20', NULL, 50, 0, 1, '2025-12-22 08:55:05', '2025-12-26 10:59:38', 1),
(3, 1, 'Organization', 'Tech Corp', 'John Doe', 'john@techcorp.com', '+1-234-567-8900', 1, 'New', 'Google ads', '123 Main St', 'New York', NULL, NULL, NULL, 5000.00, '2024-02-20', 'Hot lead', 50, 0, 1, '2025-12-22 08:55:30', '2025-12-26 10:59:44', 1),
(4, 1, 'Organization', 'Tech Corp', 'Ram', 'john@techcorp.com', '+1-234-567-8900', 1, 'Won', 'Google ads', '123 Main St', 'New York', NULL, NULL, NULL, 5000.00, '2024-02-20', 'Hot lead', 50, 0, 1, '2025-12-22 08:56:04', '2025-12-26 10:59:50', 1),
(9, 1, 'Person', NULL, 'ram', 'ram@gmail.com', '4253453', 2, 'Discussion', 'Email', '53retretgfg', 'gdfgf', NULL, NULL, NULL, 5.00, '2025-12-22', 'gffg', 90, 0, 1, '2025-12-22 12:45:31', '2025-12-26 10:59:52', 1),
(10, 1, 'Person', NULL, 'divya', 'divya@gmail.com', '12345678956', 1, 'Negotiation', 'Website', 'sdfsdfsdfsdfs', 'sdfsdfs', NULL, NULL, NULL, 10.00, '2025-12-23', 'fdgdfgf', 50, 1, 1, '2025-12-23 05:39:44', '2025-12-26 10:59:58', 1),
(11, 1, 'Person', 'techno', 'techno lead 2', 'technolead@gmail.com', '4235363', 16, 'Qualified', 'Youtube', 'qindorecsdsf', 'inodre', NULL, NULL, NULL, 5.00, '2025-12-24', 'fsdfsdfs', 50, 1, 1, '2025-12-24 08:59:10', '2025-12-24 09:00:30', 0),
(12, 1, 'Person', 'techno', 'p1', 'p@gmail.com', '423423434535', 16, 'Qualified', 'Call', 'eqweqweqwe', 'sdfsdfs', NULL, NULL, NULL, 4.00, '2025-12-25', 'eqweqeqweqweq', 50, 0, 1, '2025-12-25 14:35:23', '2025-12-26 11:08:26', 0),
(13, 1, 'Person', 'Default Company', 'shyam', 'fddsf@gmail.com', '21355688567', 13, 'Won', 'Email', 'ssdfdfadf', 'dfddf', NULL, NULL, NULL, 22.00, '2025-12-26', 'werewrwer', 50, 1, 1, '2025-12-26 09:52:34', '2025-12-29 08:49:07', 0),
(14, 1, 'Person', 'Default Company', 'lead 1', 'lead@gmail.com', '234234343', 19, 'Discussion', 'Call', 'indore,rajen nagar', 'indore', NULL, NULL, NULL, 4.00, '2025-12-28', 'okk lead created vvdoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\n\nFollow-up scheduled: 2025-12-28T17:14:00 -  nn', 50, 0, 1, '2025-12-26 10:55:22', '2025-12-30 07:49:41', 0),
(15, 1, 'Person', 'Default Company', 'test', 'test@gmail.com', '4234235', 22, 'Won', 'Call', 'sdsadsa', 'dasda', NULL, NULL, NULL, 3.00, '2025-12-27', 'adasdasdada', NULL, 0, 1, '2025-12-27 07:05:20', '2025-12-29 08:49:24', 0),
(16, 1, 'Person', NULL, 'raj', 'raj@gmail.com', '897898798', 22, 'Won', 'Call', 'sdfsdfsdfsdfs', 'sdfsdfs', NULL, NULL, NULL, 52.00, '2026-01-01', 'rthrth\n\nFollow-up scheduled: 2025-12-29T14:47:00 - fghfg h\n\nFollow-up scheduled: 2025-12-31T15:14:00 - dsff\n\nFollow-up scheduled: 2025-12-31T14:18:00 - asas\n\nFollow-up scheduled: 2026-01-01T14:20:00 - sdssd\n\nFollow-up scheduled: 2025-12-31T15:22:00 - sdsdsd\n\nFollow-up scheduled: 2025-12-31T15:22:00 - sssss\n\nFollow-up scheduled: 2025-12-31T14:37:00 - demo\n\nFollow-up scheduled: 2026-01-01T20:47:00 - sdsd', 50, 0, 1, '2025-12-29 09:16:17', '2025-12-30 11:13:45', 0),
(17, 1, 'Person', 'Default Company', 'aas', 'as@gmail.com', '234244', 22, 'Won', 'Call', 'dfff', 'fdfdf', NULL, NULL, NULL, -144.00, '2025-12-26', 'fdf', 50, 1, 1, '2025-12-30 11:14:37', '2025-12-30 11:14:37', 0),
(18, 1, 'Person', NULL, 'new lead', 'a@gmail.com', '04545454555345', 25, 'Qualified', 'Website', 'demo\ndemo', 'demo', NULL, NULL, NULL, 343.00, '2025-12-25', 'gfgf', 50, 1, 1, '2025-12-30 13:04:45', '2025-12-31 08:38:56', 0),
(19, 1, 'Organization', 'newww onee', NULL, 'a@gmail.com', '04545454555', 25, 'Qualified', 'Elsewhere', 'demo', 'demo', NULL, NULL, NULL, 34545.00, '2025-12-27', 'sds', 90, 0, 1, '2025-12-30 13:14:39', '2025-12-31 08:38:38', 0),
(20, 1, 'Person', NULL, 'asa', 'pankit1205@gmail.com', '04545454555', 22, 'Lost', 'Youtube', 'demo\ndemo', 'demo', NULL, NULL, NULL, 3434.00, '2026-01-01', 'df', 50, 1, 1, '2025-12-30 13:15:57', '2025-12-30 13:16:04', 1),
(21, 6, 'Person', NULL, 'personn', 'person@gmail.com', '345345345', 1, 'Qualified', 'Elsewhere', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 18, '2025-12-31 12:44:29', '2026-01-01 06:14:44', 1),
(22, 6, 'Organization', 'Ronak', NULL, 'ronak@gmail.com', '2324353467', 27, 'New', 'Call', 'indore', 'Indore', NULL, NULL, NULL, 6.00, '2026-01-01', 'okkk', 50, 0, 18, '2026-01-01 06:34:05', '2026-01-01 06:34:05', 0),
(23, 6, 'Organization', 'ronak', NULL, 'ronak@gmail.com', '453464564', 28, 'Discussion', 'Email', 'ram nagar', 'dhar', NULL, NULL, NULL, 7.00, '2026-01-22', 'okkkk\n\nFollow-up scheduled: 2026-01-01T12:27:00 - okkkk\n\nFollow-up scheduled: 2026-01-20T17:38:00 - okk\n\nFollow-up scheduled: 2026-01-22T17:22:00 - okkk doneeee', 90, 0, 18, '2026-01-01 06:35:42', '2026-01-03 11:48:25', 0);

-- --------------------------------------------------------

--
-- Table structure for table `lead_labels`
--

CREATE TABLE `lead_labels` (
  `id` int(10) UNSIGNED NOT NULL,
  `lead_id` int(10) UNSIGNED NOT NULL,
  `label` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lead_labels`
--

INSERT INTO `lead_labels` (`id`, `lead_id`, `label`, `created_at`) VALUES
(2, 3, 'Hot Lead', '2025-12-22 08:55:30'),
(3, 4, 'Hot Lead', '2025-12-22 08:56:04');

-- --------------------------------------------------------

--
-- Table structure for table `lead_managers`
--

CREATE TABLE `lead_managers` (
  `id` int(10) UNSIGNED NOT NULL,
  `lead_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lead_managers`
--

INSERT INTO `lead_managers` (`id`, `lead_id`, `user_id`) VALUES
(3, 3, 2),
(4, 3, 3),
(5, 4, 2),
(6, 4, 3),
(7, 1, 1),
(8, 9, 1),
(9, 2, 2),
(10, 2, 3),
(11, 10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `lead_status_history`
--

CREATE TABLE `lead_status_history` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `lead_id` int(10) UNSIGNED NOT NULL,
  `old_status` varchar(50) DEFAULT NULL,
  `new_status` varchar(50) NOT NULL,
  `changed_by` int(10) UNSIGNED DEFAULT NULL,
  `change_reason` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lead_status_history`
--

INSERT INTO `lead_status_history` (`id`, `company_id`, `lead_id`, `old_status`, `new_status`, `changed_by`, `change_reason`, `created_at`) VALUES
(1, 1, 12, 'Qualified', 'New', NULL, NULL, '2025-12-26 10:21:54'),
(2, 1, 12, 'New', 'Qualified', NULL, NULL, '2025-12-26 11:08:26'),
(3, 1, 13, 'Negotiation', 'Discussion', NULL, NULL, '2025-12-26 11:25:55'),
(4, 1, 13, 'Discussion', 'Negotiation', NULL, NULL, '2025-12-27 06:14:35'),
(5, 1, 14, 'New', 'Discussion', NULL, NULL, '2025-12-30 07:49:41'),
(6, 6, 23, 'Won', 'Negotiation', NULL, NULL, '2026-01-01 07:16:44'),
(7, 6, 23, 'Negotiation', 'Discussion', NULL, NULL, '2026-01-01 07:16:51'),
(8, 6, 23, 'Discussion', 'Qualified', NULL, NULL, '2026-01-01 07:16:54'),
(9, 6, 23, 'Won', 'Discussion', NULL, NULL, '2026-01-02 10:35:16');

-- --------------------------------------------------------

--
-- Table structure for table `leave_requests`
--

CREATE TABLE `leave_requests` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `leave_type` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `reason` text NOT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `applied_on` date NOT NULL,
  `approved_by` int(10) UNSIGNED DEFAULT NULL,
  `approved_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leave_requests`
--

INSERT INTO `leave_requests` (`id`, `company_id`, `user_id`, `leave_type`, `start_date`, `end_date`, `reason`, `status`, `applied_on`, `approved_by`, `approved_at`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 19, 'Sick Leave', '2025-12-27', '2025-12-30', 'doneeeee', 'Pending', '0000-00-00', NULL, NULL, '2025-12-27 11:13:10', '2025-12-27 12:07:39', 0),
(2, 1, 19, 'Sick Leave', '2025-12-07', '2025-12-17', 'acscsac', 'Pending', '0000-00-00', NULL, NULL, '2025-12-27 12:07:20', '2025-12-27 12:07:20', 0),
(3, 6, 27, 'Sick Leave', '2026-01-05', '2026-01-08', 'sick leave2222222222222222222222', 'Pending', '0000-00-00', NULL, NULL, '2026-01-01 12:54:07', '2026-01-01 12:54:19', 0);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `from_user_id` int(10) UNSIGNED NOT NULL,
  `to_user_id` int(10) UNSIGNED DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `read_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `company_id`, `from_user_id`, `to_user_id`, `subject`, `message`, `file_path`, `is_read`, `read_at`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 1, 19, 'Chat Message', 'hyy', NULL, 0, NULL, '2025-12-27 08:53:04', '2025-12-27 08:53:04', 0),
(2, 1, 1, 2, 'Chat Message', 'ppp', NULL, 0, NULL, '2025-12-27 08:57:28', '2025-12-27 08:57:28', 0),
(3, 1, 19, 1, 'Chat Message', 'hii', NULL, 0, NULL, '2025-12-27 08:58:06', '2025-12-27 08:58:06', 0),
(4, 1, 1, 19, 'Chat Message', 'hello', NULL, 0, NULL, '2025-12-27 09:02:23', '2025-12-27 09:02:23', 0),
(5, 1, 19, 1, 'Chat Message', 'how are you', NULL, 0, NULL, '2025-12-27 09:02:38', '2025-12-27 09:02:38', 0),
(6, 1, 1, 12, 'Chat Message', 'hii ankit', NULL, 0, NULL, '2025-12-27 09:03:18', '2025-12-27 09:03:18', 0),
(7, 1, 12, 1, 'Chat Message', 'hello', NULL, 0, NULL, '2025-12-27 09:08:08', '2025-12-27 09:08:08', 0),
(8, 1, 1, 12, 'Chat Message', 'how are yoy', NULL, 0, NULL, '2025-12-27 09:08:52', '2025-12-27 09:08:52', 0),
(9, 1, 19, 1, 'Chat Message', 'hyyyy', NULL, 0, NULL, '2025-12-27 10:53:37', '2025-12-27 10:53:37', 0),
(10, 6, 18, 26, 'Chat Message', 'heyyy vinayyy', NULL, 0, NULL, '2026-01-01 09:54:51', '2026-01-01 09:54:51', 0),
(11, 1, 19, 1, 'Chat Message', 'helooooo admin', NULL, 0, NULL, '2026-01-01 11:40:32', '2026-01-01 11:40:32', 0),
(12, 6, 27, 18, 'Chat Message', 'heyyyyyy admin', NULL, 0, NULL, '2026-01-01 12:54:33', '2026-01-01 12:54:33', 0),
(13, 6, 27, 18, 'Chat Message', 'how about you', NULL, 0, NULL, '2026-01-01 12:55:25', '2026-01-01 12:55:25', 0),
(14, 6, 29, 18, 'Chat Message', 'heyyyyy admin', NULL, 0, NULL, '2026-01-03 07:44:27', '2026-01-03 07:44:27', 0),
(15, 6, 18, 29, 'Chat Message', 'hey    virsat sir', NULL, 0, NULL, '2026-01-03 07:45:22', '2026-01-03 07:45:22', 0),
(16, 6, 29, 18, 'Chat Message', 'ertgdgdfgd', NULL, 0, NULL, '2026-01-03 10:07:26', '2026-01-03 10:07:26', 0);

-- --------------------------------------------------------

--
-- Table structure for table `message_recipients`
--

CREATE TABLE `message_recipients` (
  `id` int(10) UNSIGNED NOT NULL,
  `message_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `read_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `lead_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `company_id`, `user_id`, `client_id`, `lead_id`, `project_id`, `title`, `content`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, 27, NULL, NULL, NULL, 'ghj', 0, '2025-12-30 07:29:56', '2025-12-30 07:29:56'),
(2, 1, NULL, 25, NULL, NULL, NULL, 'demo', 1, '2025-12-30 07:53:52', '2025-12-30 07:53:57'),
(3, 1, NULL, 25, NULL, NULL, NULL, 'demo', 0, '2025-12-30 07:54:02', '2025-12-30 07:54:02'),
(4, 1, NULL, 28, NULL, NULL, NULL, 'okk', 0, '2025-12-31 11:32:40', '2025-12-31 11:32:40'),
(5, 1, 12, 12, NULL, NULL, 'topppp', 'nooooooo', 0, '2025-12-31 13:09:53', '2025-12-31 13:10:02'),
(6, 1, 1, NULL, NULL, 15, 'Comment', 'dfsdfsd', 0, '2025-12-31 13:42:41', '2025-12-31 13:42:41'),
(7, 6, NULL, 32, NULL, NULL, NULL, 'okk', 0, '2026-01-01 12:01:57', '2026-01-01 12:01:57'),
(8, 6, NULL, 29, NULL, NULL, NULL, '    ui notess', 0, '2026-01-01 12:02:31', '2026-01-01 12:02:31'),
(9, 6, 18, NULL, NULL, 18, 'pdf notes', 'sasaa', 0, '2026-01-01 12:10:23', '2026-01-02 11:59:12'),
(10, 6, 18, NULL, NULL, 18, 'cxzcxz', 'rrrrrrrrr', 1, '2026-01-02 11:32:27', '2026-01-02 11:32:39'),
(11, 6, 29, 29, NULL, NULL, 'api', 'okkkk', 0, '2026-01-03 10:00:10', '2026-01-03 10:00:10'),
(12, 6, 18, NULL, NULL, 20, 'okk', 'okkk', 0, '2026-01-03 11:30:12', '2026-01-03 11:30:12');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `type` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `link` varchar(500) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `read_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `company_id`, `user_id`, `type`, `title`, `message`, `link`, `is_read`, `read_at`, `created_at`) VALUES
(1, 6, 18, 'reminder', 'asas', 'qws\n\nDue: 02/01/2026 at 17:31', NULL, 0, NULL, '2026-01-02 11:57:22'),
(2, 6, 18, 'reminder', 'ok', 'okkk\n\nDue: 07/01/2026 at 17:05', NULL, 0, NULL, '2026-01-03 11:35:18');

-- --------------------------------------------------------

--
-- Table structure for table `offline_requests`
--

CREATE TABLE `offline_requests` (
  `id` int(11) NOT NULL,
  `company_id` int(10) UNSIGNED DEFAULT NULL,
  `package_id` int(10) UNSIGNED DEFAULT NULL,
  `company_name` varchar(255) NOT NULL,
  `request_type` varchar(50) NOT NULL DEFAULT 'Payment',
  `contact_name` varchar(255) NOT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(50) DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `payment_method` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `offline_requests`
--

INSERT INTO `offline_requests` (`id`, `company_id`, `package_id`, `company_name`, `request_type`, `contact_name`, `contact_email`, `contact_phone`, `amount`, `currency`, `payment_method`, `description`, `status`, `notes`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 3, NULL, 'Kiaan tech', 'Service', '€zx€x€', 's@gmail.com', '234234234', 35645.00, 'USD', NULL, 'xvxv', 'Pending', 'vxvxvxc', '2025-12-25 14:24:45', '2025-12-25 14:24:45', 0),
(2, 2, NULL, 'tech panda', 'Payment', 'xcxzczxc', 'q@gmail.com', '42342342345555', 543542.00, 'USD', '54535', '54345345', 'Pending', '5345345', '2025-12-25 14:29:51', '2025-12-25 14:30:16', 0),
(3, 7, 6, 'freeeee tech', 'Company Request', '32423423423432', 'free@gmail.com', '3123123123', NULL, 'USD', NULL, 'jnkj', 'Approved', NULL, '2025-12-26 10:23:20', '2025-12-26 10:23:55', 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED DEFAULT NULL,
  `invoice_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `status` enum('New','Pending','Processing','Completed','Cancelled','Shipped','Delivered') NOT NULL DEFAULT 'New',
  `order_date` date DEFAULT curdate(),
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `company_id`, `client_id`, `invoice_id`, `title`, `description`, `amount`, `status`, `order_date`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 25, NULL, 'Order - 12/31/2025', 'provide order', 19.97, 'New', '2025-12-31', 1, '2025-12-31 10:25:45', '2025-12-31 11:06:09'),
(2, 1, 27, NULL, 'Order - 12/31/2025', 'okkkkk', 50.00, 'New', '2025-12-31', 1, '2025-12-31 10:46:58', '2025-12-31 11:06:13'),
(3, 1, 27, NULL, 'Order - 12/31/2025 (Copy)', 'okkkkk', 50.00, 'New', '2025-12-31', 1, '2025-12-31 10:47:05', '2025-12-31 10:48:08'),
(4, 1, 27, NULL, 'Order - 12/31/2025 (Copy) (Copy)', 'okkkkk', 50.00, 'New', '2025-12-31', 1, '2025-12-31 10:48:00', '2025-12-31 10:48:12'),
(5, 1, 27, NULL, 'Order - 12/31/2025 (Copy)', 'okkkkk', 50.00, 'New', '2025-12-31', 1, '2025-12-31 10:51:57', '2025-12-31 11:06:16'),
(6, 1, 27, 24, 'Order - 12/31/2025 (Copy) (Copy)', 'okkkkk', 50.00, 'New', '2025-12-31', 0, '2025-12-31 10:55:09', '2025-12-31 11:00:08'),
(7, 1, 15, NULL, 'Order - 12/31/2025', 'okkkk', 69.97, 'New', '2025-12-31', 0, '2025-12-31 11:01:40', '2025-12-31 11:01:57'),
(8, 1, 15, NULL, 'Order - 12/31/2025', 'ishuu addd', 19.97, 'New', '2025-12-31', 1, '2025-12-31 11:03:07', '2025-12-31 11:04:50'),
(9, 1, 15, NULL, 'Order - 12/31/2025', 'okkkkkkk', 19.97, 'New', '2025-12-31', 0, '2025-12-31 11:07:10', '2025-12-31 11:07:10'),
(10, 1, 15, 25, 'Order - 12/31/2025', 'okkooooooooooooooooooooooo', 19.97, 'New', '2025-12-31', 0, '2025-12-31 11:10:06', '2025-12-31 11:15:03'),
(12, 1, NULL, NULL, 'Order - 12/31/2025', 'okkk', 0.00, 'New', '2025-12-31', 0, '2025-12-31 13:03:46', '2025-12-31 13:03:46'),
(13, 6, 32, NULL, 'Order - 1/1/2026', 'okkkkkk', 20.00, 'New', '2026-01-01', 0, '2026-01-01 09:28:51', '2026-01-01 09:28:51'),
(14, 6, 32, NULL, 'Order - 1/1/2026', 'okkkkkk', 9.99, 'New', '2026-01-01', 0, '2026-01-01 09:39:59', '2026-01-01 09:39:59'),
(15, 6, 29, 29, 'Order - 1/1/2026', 'okk yessss okkkk', 0.00, 'New', '2026-01-01', 0, '2026-01-01 10:53:58', '2026-01-02 12:07:38'),
(16, 6, 32, NULL, 'Order - 1/2/2026', NULL, 79.97, 'New', '2026-01-02', 0, '2026-01-02 12:20:12', '2026-01-02 12:20:12'),
(17, 6, 29, NULL, 'Item #10', 'okkk', 0.00, 'New', '2026-01-03', 0, '2026-01-03 08:50:48', '2026-01-03 08:50:48'),
(18, 6, 29, 31, 'Item #10', 'okkk', 0.00, 'New', '2026-01-03', 0, '2026-01-03 08:51:12', '2026-01-03 09:56:00'),
(19, 6, 29, 30, 'Order - 1/3/2026', 'Order with 1 item(s)', 0.00, 'New', '2026-01-03', 0, '2026-01-03 09:52:19', '2026-01-03 09:52:25'),
(20, 6, 29, 32, 'Order - 1/3/2026', 'Order with 1 item(s)', 0.00, 'New', '2026-01-03', 0, '2026-01-03 09:56:46', '2026-01-03 10:13:24'),
(21, 6, 29, 33, 'Order - 1/3/2026', 'Order with 1 item(s)', 9.99, 'New', '2026-01-03', 0, '2026-01-03 10:14:41', '2026-01-03 10:14:49');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_id` int(10) UNSIGNED NOT NULL,
  `item_id` int(10) UNSIGNED DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `quantity` decimal(10,2) NOT NULL DEFAULT 1.00,
  `unit` varchar(50) DEFAULT 'PC',
  `unit_price` decimal(15,2) NOT NULL DEFAULT 0.00,
  `amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `item_id`, `item_name`, `description`, `quantity`, `unit`, `unit_price`, `amount`, `created_at`) VALUES
(1, 1, 2, ' Website Design', 'Custom website templates for your brand.', 1.00, 'hours', 19.97, 19.97, '2025-12-31 10:25:45'),
(2, 2, 3, 'SEO', 'SEO for your websites', 1.00, 'Hours', 50.00, 50.00, '2025-12-31 10:46:58'),
(3, 7, 2, ' Website Design', 'Custom website templates for your brand.', 1.00, 'hours', 19.97, 19.97, '2025-12-31 11:01:40'),
(4, 8, 2, ' Website Design', 'Custom website templates for your brand.', 1.00, 'hours', 19.97, 19.97, '2025-12-31 11:03:07'),
(5, 9, 2, ' Website Design', 'Custom website templates for your brand.', 1.00, 'hours', 19.97, 19.97, '2025-12-31 11:07:10'),
(6, 10, 2, ' Website Design', 'Custom website templates for your brand.', 1.00, 'hours', 19.97, 19.97, '2025-12-31 11:10:06'),
(7, 12, 3, 'Item #3', 'SEO for your websites', 1.00, 'Pc', 0.00, 0.00, '2025-12-31 13:03:46'),
(8, 13, 4, 'Website Design', '	Custom website templates for your brand.', 1.00, 'Hour', 20.00, 20.00, '2026-01-01 09:28:51'),
(9, 14, 5, ' SEO', 'SEO for your websites', 1.00, '	Hour', 9.99, 9.99, '2026-01-01 09:39:59'),
(10, 15, 5, 'Item #5', 'SEO for your websites', 1.00, 'Pc', 0.00, 0.00, '2026-01-01 10:53:58'),
(11, 16, 10, 'logo', 'okkk', 1.00, 'hourss', 79.97, 79.97, '2026-01-02 12:20:12'),
(12, 17, 10, 'Item #10', 'okkk', 1.00, 'Pc', 0.00, 0.00, '2026-01-03 08:50:48'),
(13, 18, 10, 'Item #10', 'okkk', 1.00, 'Pc', 0.00, 0.00, '2026-01-03 08:51:12'),
(14, 19, 10, 'Item #10', 'okkk', 1.00, 'Pc', 0.00, 0.00, '2026-01-03 09:52:19'),
(15, 20, 10, 'Item #10', 'okkk', 1.00, 'Pc', 0.00, 0.00, '2026-01-03 09:56:46'),
(16, 21, 8, ' SEO', 'SEO for your websites', 1.00, '	Hour', 9.99, 9.99, '2026-01-03 10:14:41');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `invoice_id` int(10) UNSIGNED NOT NULL,
  `paid_on` date NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `exchange_rate` decimal(10,4) DEFAULT 1.0000,
  `transaction_id` varchar(255) DEFAULT NULL,
  `payment_gateway` varchar(100) DEFAULT NULL,
  `offline_payment_method` enum('Cash','Cheque','Bank Transfer') DEFAULT NULL,
  `bank_account` varchar(255) DEFAULT NULL,
  `receipt_path` varchar(500) DEFAULT NULL,
  `remark` text DEFAULT NULL,
  `status` enum('Complete','Pending','Failed') DEFAULT 'Complete',
  `order_number` varchar(100) DEFAULT NULL,
  `created_by` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `company_id`, `project_id`, `invoice_id`, `paid_on`, `amount`, `currency`, `exchange_rate`, `transaction_id`, `payment_gateway`, `offline_payment_method`, `bank_account`, `receipt_path`, `remark`, `status`, `order_number`, `created_by`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, NULL, 1, '2024-01-15', 1000.00, 'USD', 1.0000, 'TXN123456', 'Stripe', NULL, NULL, NULL, 'Payment received', 'Complete', NULL, 1, '2025-12-22 10:14:20', '2025-12-22 10:15:16', 0),
(2, 1, NULL, 1, '2025-12-21', 2749.00, 'USD', 1.0000, '', 'Offline Payment', 'Cash', 'Primary Account | ABC Ltd', NULL, NULL, 'Complete', NULL, 1, '2025-12-22 10:15:04', '2025-12-22 10:15:04', 0),
(3, 1, NULL, 2, '2025-12-21', 45846.00, 'USD', 1.0000, 'TXN789', 'Razorpay', NULL, 'Secondary Account | XYZ Inc', NULL, NULL, 'Complete', NULL, 1, '2025-12-22 10:15:04', '2025-12-22 10:15:04', 0),
(4, 1, NULL, 19, '2025-12-30', 234.00, 'USD', 1.0000, NULL, NULL, 'Bank Transfer', NULL, NULL, 'dfdf', 'Complete', NULL, 1, '2025-12-30 11:02:18', '2025-12-30 11:02:18', 0),
(5, 1, 9, 21, '2025-12-18', 344.00, 'INR', 13.0000, '34343', 'PayPal', NULL, 'Primary Account | McDermott, Mohr and Hodkiewicz', NULL, 'gfggfg', 'Complete', NULL, 1, '2025-12-30 11:39:17', '2025-12-30 11:39:17', 0),
(6, 1, 8, 21, '2025-12-21', 567.00, 'AED', 1.0000, '67677', 'Stripe', NULL, 'Primary Account | McDermott, Mohr and Hodkiewicz', NULL, 'jhhj', 'Complete', NULL, 1, '2025-12-30 11:39:45', '2025-12-30 13:45:01', 1),
(7, 1, 12, 23, '2025-12-21', 60000.00, 'AED', 16.0000, 'ee56456', 'Stripe', NULL, 'Secondary Account | Altenwerth PLC', NULL, 'oikkkkk', 'Complete', NULL, 1, '2025-12-31 13:29:29', '2025-12-31 13:29:29', 0),
(8, 6, NULL, 28, '2026-01-01', 500000.00, 'USD', 1.0000, NULL, NULL, 'Cash', NULL, NULL, 'fsersdfs', 'Complete', NULL, 1, '2026-01-01 09:27:16', '2026-01-01 09:27:16', 0),
(9, 6, NULL, 29, '2026-01-01', 500000.00, 'USD', 1.0000, NULL, NULL, NULL, NULL, NULL, 'gdfgolkkdafcasdfca', 'Complete', NULL, 1, '2026-01-01 11:59:58', '2026-01-03 13:43:38', 0);

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `module` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `department_id` int(10) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`id`, `company_id`, `department_id`, `name`, `description`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 2, 'full stack', NULL, '2025-12-23 13:30:03', '2025-12-26 10:47:15', 0),
(2, 4, 4, 'full stack', NULL, '2025-12-24 08:40:27', '2025-12-24 08:40:27', 0),
(3, 1, 5, 'full stack', 'designer', '2025-12-26 10:40:55', '2025-12-26 10:40:55', 0),
(4, 1, 6, 'frontend', 'okk', '2025-12-27 06:49:37', '2025-12-27 06:53:00', 1),
(5, 6, 7, 'Full Stack Developer', 'Developerssss Groups', '2026-01-01 05:54:15', '2026-01-01 05:54:15', 0),
(6, 6, 8, 'Sales Manager', 'Manager', '2026-01-01 05:56:18', '2026-01-01 05:56:18', 0);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `short_code` varchar(20) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `start_date` date NOT NULL,
  `deadline` date DEFAULT NULL,
  `no_deadline` tinyint(1) DEFAULT 0,
  `project_category` varchar(100) DEFAULT NULL,
  `project_sub_category` varchar(100) DEFAULT NULL,
  `department_id` int(10) UNSIGNED DEFAULT NULL,
  `project_manager_id` int(10) UNSIGNED DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `project_summary` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `public_gantt_chart` enum('enable','disable') DEFAULT 'enable',
  `public_task_board` enum('enable','disable') DEFAULT 'enable',
  `task_approval` enum('enable','disable') DEFAULT 'disable',
  `label` varchar(100) DEFAULT NULL,
  `create_public_project` tinyint(1) DEFAULT 0,
  `status` enum('in progress','completed','on hold','cancelled') DEFAULT 'in progress',
  `progress` int(11) DEFAULT 0 CHECK (`progress` >= 0 and `progress` <= 100),
  `budget` decimal(15,2) DEFAULT NULL,
  `created_by` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `company_id`, `short_code`, `project_name`, `description`, `start_date`, `deadline`, `no_deadline`, `project_category`, `project_sub_category`, `department_id`, `project_manager_id`, `client_id`, `project_summary`, `notes`, `public_gantt_chart`, `public_task_board`, `task_approval`, `label`, `create_public_project`, `status`, `progress`, `budget`, `created_by`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 'FVS', 'Fingerprint voting system', NULL, '2025-10-27', '2026-02-27', 0, 'Software Development', 'Web Application', 1, NULL, 1, 'A secure voting system', 'High priority project', 'enable', 'enable', 'disable', 'Urgent', 0, 'completed', 100, NULL, 1, '2025-12-22 09:00:00', '2025-12-22 09:00:11', 0),
(2, 1, '1001', 'CRM', NULL, '2025-12-23', '2026-01-10', 0, 'Web Development', NULL, 2, NULL, 14, 'demooo demooo', 'sdfsdfsdfsf', 'enable', 'enable', 'disable', 'High Priority', 0, 'in progress', 0, NULL, 1, '2025-12-23 10:23:50', '2025-12-23 10:23:50', 0),
(3, 4, '1001', 'pro tech no 1', 'okkk', '2025-12-24', '2026-10-24', 0, 'Web Development', NULL, 4, 16, 14, NULL, NULL, 'enable', 'enable', 'disable', NULL, 0, 'in progress', 0, 50000.00, 1, '2025-12-24 10:47:28', '2025-12-24 10:47:28', 0),
(5, 1, 'PRJ001', 'p', 's', '2025-12-27', '2025-12-27', 0, NULL, NULL, NULL, NULL, 14, NULL, 'd', 'enable', 'enable', 'disable', NULL, 0, 'in progress', 0, 5.00, 1, '2025-12-27 12:04:24', '2025-12-27 12:04:24', 0),
(6, 1, '12312312', 'p2222', '23213213', '2025-12-25', '2026-01-10', 0, 'Web Development', NULL, 2, 19, 20, 'okkkkkkk', 'okkkkkkk', 'enable', 'enable', 'disable', NULL, 0, 'in progress', 0, 5600000.00, 19, '2025-12-27 12:21:20', '2025-12-27 12:21:20', 0),
(7, 1, '234234', 'jojo p', 'okkkkk', '2025-12-29', '2026-01-03', 0, 'Web Development', NULL, 2, 22, 24, 'okkkk', 'pokkk', 'enable', 'enable', 'disable', NULL, 0, 'in progress', 0, 30000.00, 22, '2025-12-29 09:06:18', '2025-12-29 09:06:18', 0),
(8, 1, 'PRJ001', 'gfggg', 'fgfgf', '2025-12-30', '2025-12-20', 0, NULL, NULL, NULL, NULL, 27, NULL, NULL, 'enable', 'enable', 'disable', NULL, 0, 'in progress', 0, NULL, 1, '2025-12-30 11:03:36', '2025-12-30 11:03:36', 0),
(9, 1, 'PRJ002', 'dfdf', 'dfdfd', '2025-12-30', '2025-12-25', 0, 'dfd', NULL, NULL, NULL, 27, NULL, NULL, 'enable', 'enable', 'disable', NULL, 0, 'completed', 0, 34.00, 1, '2025-12-30 11:08:17', '2025-12-30 11:08:17', 0),
(10, 1, '454', 'sds', 'dfdff', '2025-12-19', '2026-01-01', 0, NULL, NULL, 2, 25, 27, 'dfd', 'dfdfd', 'enable', 'enable', 'disable', 'High Priority', 0, 'in progress', 0, 4545.00, 25, '2025-12-30 13:32:09', '2025-12-30 13:32:09', 0),
(11, 1, 'PRJ001', 'sds', 'dfdf', '2025-12-30', '2025-12-25', 0, '45', NULL, NULL, NULL, 28, NULL, NULL, 'enable', 'enable', 'disable', NULL, 0, 'in progress', 0, 4545.00, 1, '2025-12-30 13:32:30', '2025-12-30 13:32:37', 1),
(12, 1, 'PRJ001', 'p111', 'okkkk', '2026-01-01', '2026-01-10', 0, 'okkk', NULL, NULL, NULL, 28, NULL, NULL, 'enable', 'enable', 'disable', NULL, 0, 'completed', 0, 4998.00, 1, '2025-12-31 11:35:16', '2025-12-31 11:35:16', 0),
(13, 1, 'PRJ002', 'c', NULL, '2025-12-31', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'h', 'enable', 'enable', 'disable', NULL, 0, 'completed', 0, 5.00, 1, '2025-12-31 12:30:44', '2025-12-31 12:30:44', 0),
(14, 6, 'PRJ001', 'p', 'q', '2025-12-31', '2026-01-10', 0, NULL, NULL, NULL, NULL, 26, NULL, 'g', 'enable', 'enable', 'disable', NULL, 0, 'completed', 0, 5.00, 1, '2025-12-31 12:43:04', '2025-12-31 12:43:04', 0),
(15, 1, 'PRJ003', 'p', 'd', '2025-12-31', '2026-01-10', 0, NULL, NULL, NULL, NULL, 12, NULL, 'h', 'enable', 'enable', 'disable', NULL, 0, 'in progress', 0, 5.00, 12, '2025-12-31 12:59:42', '2025-12-31 12:59:42', 0),
(16, 6, 'PRJ002', 'virat project CRM', 'okkk', '2026-01-01', '2026-02-20', 0, 'yessss', NULL, NULL, NULL, 32, NULL, NULL, 'enable', 'enable', 'disable', NULL, 0, 'in progress', 0, 899998.00, 1, '2026-01-01 09:14:56', '2026-01-01 09:14:56', 0),
(17, 6, '3435', 'gym', 'cxxxc', '2026-01-01', '2026-01-31', 0, 'Web Development', NULL, 7, 28, 29, 'dfsfsdfs', 'sdfsdfsdfs', 'enable', 'enable', 'disable', 'Low Priority', 0, 'in progress', 0, 500000000.00, 28, '2026-01-01 10:36:11', '2026-01-01 10:36:11', 0),
(18, 6, 'WMS0001', 'WMS', 'okkk', '2026-01-01', '2026-02-05', 0, 'Web Development', NULL, 7, 27, 32, 'okkk', 'okkkk', 'disable', 'disable', 'enable', NULL, 0, 'completed', 0, 45000.00, 27, '2026-01-01 12:09:17', '2026-01-02 12:00:28', 0),
(19, 6, 'WMS0001-COPY', 'WMS (Copy)', 'okkk', '2026-01-02', '2026-02-05', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'enable', 'enable', 'disable', NULL, 0, 'completed', 0, 45000.00, 1, '2026-01-02 12:00:32', '2026-01-02 12:00:32', 0),
(20, 6, 'PRJ001', 'Payroll', 'payroll managmnet', '2026-01-03', '2026-02-20', 0, NULL, NULL, NULL, NULL, 29, NULL, 'okkkk', 'enable', 'enable', 'disable', NULL, 0, 'on hold', 0, 899999.99, 1, '2026-01-03 08:48:31', '2026-01-03 11:34:59', 0);

-- --------------------------------------------------------

--
-- Table structure for table `project_members`
--

CREATE TABLE `project_members` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project_members`
--

INSERT INTO `project_members` (`id`, `project_id`, `user_id`, `created_at`) VALUES
(1, 1, 1, '2025-12-22 09:00:00'),
(2, 1, 2, '2025-12-22 09:00:00'),
(3, 1, 3, '2025-12-22 09:00:00'),
(4, 2, 1, '2025-12-23 10:23:50'),
(5, 3, 16, '2025-12-24 10:47:29'),
(6, 6, 19, '2025-12-27 12:21:20'),
(7, 6, 22, '2025-12-27 12:21:20'),
(8, 6, 13, '2025-12-27 12:21:20'),
(9, 7, 22, '2025-12-29 09:06:18'),
(10, 7, 19, '2025-12-29 09:06:18'),
(11, 10, 25, '2025-12-30 13:32:09'),
(12, 10, 19, '2025-12-30 13:32:09'),
(13, 17, 28, '2026-01-01 10:36:11'),
(14, 18, 27, '2026-01-01 12:09:17'),
(15, 20, 27, '2026-01-03 11:25:45');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `role_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  `permission_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `social_leads`
--

CREATE TABLE `social_leads` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `platform` varchar(50) NOT NULL,
  `lead_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`lead_data`)),
  `status` varchar(50) DEFAULT 'New',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `social_media_integrations`
--

CREATE TABLE `social_media_integrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `platform` varchar(50) NOT NULL COMMENT 'Facebook, Instagram, LinkedIn',
  `name` varchar(255) NOT NULL COMMENT 'Integration name',
  `api_key` varchar(500) DEFAULT NULL COMMENT 'Encrypted API key',
  `api_secret` varchar(500) DEFAULT NULL COMMENT 'Encrypted API secret',
  `webhook_url` varchar(500) DEFAULT NULL COMMENT 'Webhook URL for receiving leads',
  `status` varchar(50) DEFAULT 'Disconnected' COMMENT 'Connected, Disconnected',
  `auto_create_lead` tinyint(1) DEFAULT 1 COMMENT 'Auto create lead when form submitted',
  `auto_assign_to` int(10) UNSIGNED DEFAULT NULL COMMENT 'User ID to auto assign leads',
  `auto_email_template` varchar(255) DEFAULT NULL COMMENT 'Email template to send',
  `auto_task_template` varchar(255) DEFAULT NULL COMMENT 'Task template to create',
  `last_sync` timestamp NULL DEFAULT NULL COMMENT 'Last synchronization time',
  `leads_captured` int(11) DEFAULT 0 COMMENT 'Total leads captured',
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `plan` varchar(100) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `billing_cycle` enum('Monthly','Quarterly','Yearly') DEFAULT 'Monthly',
  `status` enum('Active','Cancelled','Suspended') DEFAULT 'Active',
  `next_billing_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `company_id`, `client_id`, `plan`, `amount`, `billing_cycle`, `status`, `next_billing_date`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 1, 'Professional', 79.00, 'Monthly', 'Cancelled', '2024-02-15', '2025-12-22 10:26:54', '2025-12-22 10:31:34', 0),
(2, 1, 27, 'dfdf', 45.00, 'Quarterly', 'Active', '2025-12-20', '2025-12-30 11:02:49', '2025-12-30 11:02:49', 0),
(3, 1, 27, 'dsds', 34.00, 'Quarterly', 'Active', '2025-12-19', '2025-12-30 11:08:05', '2025-12-30 11:08:05', 0),
(4, 1, 27, 'dsd', 34.00, 'Quarterly', 'Active', '2025-12-26', '2025-12-30 11:12:29', '2025-12-30 11:12:29', 0),
(5, 1, 27, 'sdsd', 34.00, 'Quarterly', 'Active', '2025-12-02', '2025-12-30 11:15:36', '2025-12-30 11:15:36', 0),
(6, 1, 27, 'ss', 23.00, 'Yearly', 'Active', '2025-12-13', '2025-12-30 11:18:21', '2025-12-30 11:18:21', 0),
(7, 1, 28, 'fggf', 45.00, 'Quarterly', 'Active', '2025-12-19', '2025-12-30 13:32:56', '2025-12-30 13:32:56', 0),
(8, 6, 32, 'pro', 29999.00, 'Yearly', 'Active', '2026-01-01', '2026-01-01 09:26:26', '2026-01-01 09:26:26', 0),
(9, 6, 29, 'pro', 2999.00, 'Monthly', 'Active', '2026-02-07', '2026-01-01 11:59:39', '2026-01-01 11:59:39', 0);

-- --------------------------------------------------------

--
-- Table structure for table `system_settings`
--

CREATE TABLE `system_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED DEFAULT NULL,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL,
  `setting_type` varchar(50) DEFAULT 'string',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `system_settings`
--

INSERT INTO `system_settings` (`id`, `company_id`, `setting_key`, `setting_value`, `setting_type`, `created_at`, `updated_at`) VALUES
(1, 1, 'company_name', '', 'string', '2025-12-23 07:00:04', '2026-01-03 13:54:11'),
(2, 1, 'currency', 'USD', 'string', '2025-12-23 07:00:04', '2025-12-23 07:00:04'),
(3, 1, 'timezone', 'UTC', 'string', '2025-12-23 07:00:04', '2025-12-23 07:00:04'),
(4, 1, 'logo', '', 'string', '2025-12-23 07:00:04', '2025-12-23 07:00:04'),
(17, 1, 'theme_mode', 'light', 'string', '2025-12-23 07:25:12', '2025-12-24 12:33:34'),
(18, 1, 'font_family', 'Open Sans, sans-serif', 'string', '2025-12-23 07:25:12', '2025-12-23 09:21:25'),
(19, 1, 'primary_dark', '#0a8f8b', 'string', '2025-12-23 07:25:12', '2025-12-24 09:44:56'),
(20, 1, 'primary_accent', '#217E45', 'string', '2025-12-23 07:25:12', '2025-12-23 07:25:12'),
(21, 1, 'secondary_accent', '#17a644', 'string', '2025-12-23 07:25:12', '2025-12-23 07:25:12'),
(22, 1, 'main_bg', '#F0F1F1', 'string', '2025-12-23 07:25:12', '2025-12-23 07:25:12'),
(23, 1, 'primary_text', '#102D2C', 'string', '2025-12-23 07:25:12', '2025-12-23 07:25:12'),
(24, 1, 'secondary_text', '#767A78', 'string', '2025-12-23 07:25:12', '2025-12-23 07:25:12'),
(166, 6, 'company_name', '', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(167, 6, 'company_email', '', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(168, 6, 'company_phone', '', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(169, 6, 'company_address', '', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(170, 6, 'company_website', '', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(171, 6, 'company_logo', '', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(172, 6, 'system_name', 'Worksuite CRM', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(173, 6, 'default_currency', 'USD', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(174, 6, 'default_timezone', 'UTC', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(175, 6, 'date_format', 'Y-m-d', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(176, 6, 'time_format', 'H:i', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(177, 6, 'fiscal_year_start', '01-01', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(178, 6, 'session_timeout', '30', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(179, 6, 'max_file_size', '10', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(180, 6, 'allowed_file_types', 'pdf,doc,docx,xls,xlsx,jpg,jpeg,png', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(181, 6, 'default_language', 'fr', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:41'),
(182, 6, 'date_format_localization', 'Y-m-d', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(183, 6, 'time_format_localization', 'H:i', 'string', '2026-01-02 12:38:17', '2026-01-02 12:38:17'),
(223, 6, 'timezone_localization', 'UTC', 'string', '2026-01-02 12:38:41', '2026-01-02 12:38:41'),
(224, 6, 'currency_symbol_position', 'before', 'string', '2026-01-02 12:38:41', '2026-01-02 12:38:41'),
(225, 6, 'email_from', 'noreply@worksuite.com', 'string', '2026-01-02 12:38:45', '2026-01-02 12:38:45'),
(226, 6, 'email_from_name', 'Worksuite CRM', 'string', '2026-01-02 12:38:45', '2026-01-02 12:38:45'),
(227, 6, 'smtp_host', '', 'string', '2026-01-02 12:38:45', '2026-01-02 12:38:45'),
(228, 6, 'smtp_port', '587', 'string', '2026-01-02 12:38:45', '2026-01-02 12:38:45'),
(229, 6, 'smtp_username', 'techmahindraadmin@gmail.com', 'string', '2026-01-02 12:38:45', '2026-01-02 12:38:45'),
(230, 6, 'smtp_password', '123456', 'string', '2026-01-02 12:38:45', '2026-01-02 12:38:45'),
(231, 6, 'smtp_encryption', 'tls', 'string', '2026-01-02 12:38:45', '2026-01-02 12:38:45'),
(232, 6, 'email_driver', 'smtp', 'string', '2026-01-02 12:38:45', '2026-01-02 12:38:45'),
(233, 6, 'email_notifications', 'false', 'string', '2026-01-02 12:38:45', '2026-01-02 12:38:45'),
(234, NULL, 'system_name', 'Worksuite CRM', 'string', '2026-01-02 13:09:27', '2026-01-02 13:09:27'),
(235, NULL, 'default_currency', 'USD', 'string', '2026-01-02 13:09:27', '2026-01-02 13:09:27'),
(236, NULL, 'default_timezone', 'UTC', 'string', '2026-01-02 13:09:27', '2026-01-02 13:09:27'),
(237, NULL, 'session_timeout', '30', 'string', '2026-01-02 13:09:27', '2026-01-02 13:09:27'),
(238, NULL, 'max_file_size', '10', 'string', '2026-01-02 13:09:27', '2026-01-02 13:09:27'),
(239, NULL, 'allowed_file_types', 'pdf,doc,docx,xls,xlsx,jpg,jpeg,png', 'string', '2026-01-02 13:09:27', '2026-01-02 13:09:27'),
(240, NULL, 'email_from', 'noreply@worksuite.com', 'string', '2026-01-02 13:09:27', '2026-01-02 13:09:27'),
(241, NULL, 'email_from_name', 'Worksuite CRM', 'string', '2026-01-02 13:09:27', '2026-01-02 13:09:27'),
(242, NULL, 'smtp_host', '', 'string', '2026-01-02 13:09:27', '2026-01-02 13:09:27'),
(243, NULL, 'smtp_port', '587', 'string', '2026-01-02 13:09:27', '2026-01-02 13:09:27'),
(244, NULL, 'smtp_username', 'techmahindraadmin@gmail.com', 'string', '2026-01-02 13:09:27', '2026-01-02 13:09:27'),
(245, NULL, 'smtp_password', '123456', 'string', '2026-01-02 13:09:27', '2026-01-02 13:09:27'),
(246, NULL, 'backup_frequency', 'daily', 'string', '2026-01-02 13:09:27', '2026-01-02 13:09:27'),
(247, NULL, 'enable_audit_log', 'true', 'string', '2026-01-02 13:09:27', '2026-01-02 13:09:27'),
(248, 1, 'company_email', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(249, 1, 'company_phone', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(250, 1, 'company_address', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(251, 1, 'company_website', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(252, 1, 'company_logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(253, 1, 'system_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(254, 1, 'default_currency', 'USD', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(255, 1, 'default_timezone', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(256, 1, 'date_format', 'Y-m-d', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(257, 1, 'time_format', 'H:i', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(258, 1, 'fiscal_year_start', '01-01', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(259, 1, 'session_timeout', '30', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(260, 1, 'max_file_size', '10', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(261, 1, 'allowed_file_types', 'pdf,doc,docx,xls,xlsx,jpg,jpeg,png', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(262, 1, 'default_language', 'fr', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(263, 1, 'currency_symbol_position', 'before', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(264, 1, 'date_format_localization', 'Y-m-d', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(265, 1, 'time_format_localization', 'H:i', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(266, 1, 'timezone_localization', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(267, 1, 'email_from', 'noreply@company.com', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(268, 1, 'email_from_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(269, 1, 'smtp_host', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(270, 1, 'smtp_port', '587', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(271, 1, 'smtp_username', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(272, 1, 'smtp_password', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(273, 1, 'smtp_encryption', 'tls', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(274, 1, 'email_driver', 'smtp', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(275, 1, 'primary_color', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(276, 1, 'secondary_color', '#76AF88', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(277, 1, 'sidebar_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(278, 1, 'top_menu_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(279, 1, 'top_menu_logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(280, 1, 'top_menu_color', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(281, 1, 'footer_text', '© 2024 Worksuite CRM. All rights reserved.', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(282, 1, 'footer_color', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(283, 1, 'pwa_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(284, 1, 'pwa_app_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(285, 1, 'pwa_app_short_name', 'Worksuite', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(286, 1, 'pwa_app_description', 'CRM Application', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(287, 1, 'pwa_app_icon', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(288, 1, 'pwa_app_color', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(289, 1, 'module_leads', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(290, 1, 'module_clients', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(291, 1, 'module_projects', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(292, 1, 'module_tasks', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(293, 1, 'module_invoices', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(294, 1, 'module_estimates', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(295, 1, 'module_proposals', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(296, 1, 'module_payments', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(297, 1, 'module_expenses', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(298, 1, 'module_contracts', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(299, 1, 'module_subscriptions', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(300, 1, 'module_employees', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(301, 1, 'module_attendance', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(302, 1, 'module_time_tracking', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(303, 1, 'module_events', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(304, 1, 'module_departments', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(305, 1, 'module_positions', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(306, 1, 'module_messages', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(307, 1, 'module_tickets', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(308, 1, 'module_documents', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(309, 1, 'module_reports', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(310, 1, 'left_menu_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(311, 1, 'email_notifications', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(312, 1, 'sms_notifications', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(313, 1, 'push_notifications', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(314, 1, 'notification_sound', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(315, 1, 'google_calendar_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(316, 1, 'google_calendar_client_id', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(317, 1, 'google_calendar_client_secret', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(318, 1, 'slack_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(319, 1, 'slack_webhook_url', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(320, 1, 'zapier_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(321, 1, 'zapier_api_key', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(322, 1, 'cron_job_enabled', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(323, 1, 'cron_job_frequency', 'daily', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(324, 1, 'cron_job_last_run', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(325, 1, 'auto_update_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(326, 1, 'update_channel', 'stable', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(327, 1, 'last_update_check', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(328, 1, 'default_role', 'employee', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(329, 1, 'enable_two_factor', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(330, 1, 'client_portal_enabled', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(331, 1, 'client_portal_url', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(332, 1, 'client_can_view_invoices', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(333, 1, 'client_can_view_projects', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(334, 1, 'auto_convert_lead', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(335, 1, 'default_lead_source', 'website', 'string', '2026-01-03 13:52:13', '2026-01-03 13:54:11'),
(336, 1, 'auto_update_plugins', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(340, 2, 'company_name', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(341, 3, 'company_name', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(342, 4, 'company_name', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(343, 7, 'company_name', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(344, 8, 'company_name', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(345, 5, 'company_name', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(346, 2, 'currency', 'USD', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(347, 3, 'currency', 'USD', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(348, 4, 'currency', 'USD', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(349, 6, 'currency', 'USD', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(350, 7, 'currency', 'USD', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(351, 8, 'currency', 'USD', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(352, 5, 'currency', 'USD', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(353, 2, 'timezone', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(354, 3, 'timezone', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(355, 4, 'timezone', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(356, 6, 'timezone', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(357, 7, 'timezone', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(358, 8, 'timezone', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(359, 5, 'timezone', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(360, 2, 'logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(361, 3, 'logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(362, 4, 'logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(363, 6, 'logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(364, 7, 'logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(365, 8, 'logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(366, 5, 'logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(367, 2, 'theme_mode', 'light', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(368, 3, 'theme_mode', 'light', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(369, 4, 'theme_mode', 'light', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(370, 6, 'theme_mode', 'light', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(371, 7, 'theme_mode', 'light', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(372, 8, 'theme_mode', 'light', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(373, 5, 'theme_mode', 'light', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(374, 2, 'font_family', 'Open Sans, sans-serif', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(375, 3, 'font_family', 'Open Sans, sans-serif', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(376, 4, 'font_family', 'Open Sans, sans-serif', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(377, 6, 'font_family', 'Open Sans, sans-serif', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(378, 7, 'font_family', 'Open Sans, sans-serif', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(379, 8, 'font_family', 'Open Sans, sans-serif', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(380, 5, 'font_family', 'Open Sans, sans-serif', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(381, 2, 'primary_dark', '#0a8f8b', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(382, 3, 'primary_dark', '#0a8f8b', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(383, 4, 'primary_dark', '#0a8f8b', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(384, 6, 'primary_dark', '#0a8f8b', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(385, 7, 'primary_dark', '#0a8f8b', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(386, 8, 'primary_dark', '#0a8f8b', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(387, 5, 'primary_dark', '#0a8f8b', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(388, 2, 'primary_accent', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(389, 3, 'primary_accent', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(390, 4, 'primary_accent', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(391, 6, 'primary_accent', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(392, 7, 'primary_accent', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(393, 8, 'primary_accent', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(394, 5, 'primary_accent', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(395, 2, 'secondary_accent', '#17a644', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(396, 3, 'secondary_accent', '#17a644', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(397, 4, 'secondary_accent', '#17a644', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(398, 6, 'secondary_accent', '#17a644', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(399, 7, 'secondary_accent', '#17a644', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(400, 8, 'secondary_accent', '#17a644', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(401, 5, 'secondary_accent', '#17a644', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(402, 2, 'main_bg', '#F0F1F1', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(403, 3, 'main_bg', '#F0F1F1', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(404, 4, 'main_bg', '#F0F1F1', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(405, 6, 'main_bg', '#F0F1F1', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(406, 7, 'main_bg', '#F0F1F1', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(407, 8, 'main_bg', '#F0F1F1', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(408, 5, 'main_bg', '#F0F1F1', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(409, 2, 'primary_text', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(410, 3, 'primary_text', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(411, 4, 'primary_text', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(412, 6, 'primary_text', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(413, 7, 'primary_text', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(414, 8, 'primary_text', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(415, 5, 'primary_text', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(416, 2, 'secondary_text', '#767A78', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(417, 3, 'secondary_text', '#767A78', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(418, 4, 'secondary_text', '#767A78', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(419, 6, 'secondary_text', '#767A78', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(420, 7, 'secondary_text', '#767A78', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(421, 8, 'secondary_text', '#767A78', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(422, 5, 'secondary_text', '#767A78', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(423, 2, 'company_email', 'info@company.com', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(424, 3, 'company_email', 'info@company.com', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(425, 4, 'company_email', 'info@company.com', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(426, 7, 'company_email', 'info@company.com', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(427, 8, 'company_email', 'info@company.com', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(428, 5, 'company_email', 'info@company.com', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(429, 2, 'company_phone', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(430, 3, 'company_phone', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(431, 4, 'company_phone', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(432, 7, 'company_phone', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(433, 8, 'company_phone', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(434, 5, 'company_phone', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(435, 2, 'company_address', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(436, 3, 'company_address', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(437, 4, 'company_address', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(438, 7, 'company_address', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(439, 8, 'company_address', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(440, 5, 'company_address', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(441, 2, 'company_website', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(442, 3, 'company_website', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(443, 4, 'company_website', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(444, 7, 'company_website', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(445, 8, 'company_website', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(446, 5, 'company_website', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(447, 2, 'company_logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(448, 3, 'company_logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(449, 4, 'company_logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(450, 7, 'company_logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(451, 8, 'company_logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(452, 5, 'company_logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(453, 2, 'system_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(454, 3, 'system_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(455, 4, 'system_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(456, 7, 'system_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(457, 8, 'system_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(458, 5, 'system_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(459, 2, 'default_currency', 'USD', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(460, 3, 'default_currency', 'USD', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(461, 4, 'default_currency', 'USD', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(462, 7, 'default_currency', 'USD', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(463, 8, 'default_currency', 'USD', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(464, 5, 'default_currency', 'USD', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(465, 2, 'default_timezone', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(466, 3, 'default_timezone', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(467, 4, 'default_timezone', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(468, 7, 'default_timezone', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(469, 8, 'default_timezone', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(470, 5, 'default_timezone', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(471, 2, 'date_format', 'Y-m-d', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(472, 3, 'date_format', 'Y-m-d', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(473, 4, 'date_format', 'Y-m-d', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(474, 7, 'date_format', 'Y-m-d', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(475, 8, 'date_format', 'Y-m-d', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(476, 5, 'date_format', 'Y-m-d', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(477, 2, 'time_format', 'H:i', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(478, 3, 'time_format', 'H:i', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(479, 4, 'time_format', 'H:i', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(480, 7, 'time_format', 'H:i', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(481, 8, 'time_format', 'H:i', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(482, 5, 'time_format', 'H:i', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(483, 2, 'fiscal_year_start', '01-01', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(484, 3, 'fiscal_year_start', '01-01', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(485, 4, 'fiscal_year_start', '01-01', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(486, 7, 'fiscal_year_start', '01-01', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(487, 8, 'fiscal_year_start', '01-01', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(488, 5, 'fiscal_year_start', '01-01', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(489, 2, 'session_timeout', '30', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(490, 3, 'session_timeout', '30', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(491, 4, 'session_timeout', '30', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(492, 7, 'session_timeout', '30', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(493, 8, 'session_timeout', '30', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(494, 5, 'session_timeout', '30', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(495, 2, 'max_file_size', '10', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(496, 3, 'max_file_size', '10', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(497, 4, 'max_file_size', '10', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(498, 7, 'max_file_size', '10', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(499, 8, 'max_file_size', '10', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(500, 5, 'max_file_size', '10', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(501, 2, 'allowed_file_types', 'pdf,doc,docx,xls,xlsx,jpg,jpeg,png', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(502, 3, 'allowed_file_types', 'pdf,doc,docx,xls,xlsx,jpg,jpeg,png', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(503, 4, 'allowed_file_types', 'pdf,doc,docx,xls,xlsx,jpg,jpeg,png', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(504, 7, 'allowed_file_types', 'pdf,doc,docx,xls,xlsx,jpg,jpeg,png', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(505, 8, 'allowed_file_types', 'pdf,doc,docx,xls,xlsx,jpg,jpeg,png', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(506, 5, 'allowed_file_types', 'pdf,doc,docx,xls,xlsx,jpg,jpeg,png', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(507, 2, 'default_language', 'en', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(508, 3, 'default_language', 'en', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(509, 4, 'default_language', 'en', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(510, 7, 'default_language', 'en', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(511, 8, 'default_language', 'en', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(512, 5, 'default_language', 'en', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(513, 2, 'currency_symbol_position', 'before', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(514, 3, 'currency_symbol_position', 'before', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(515, 4, 'currency_symbol_position', 'before', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(516, 7, 'currency_symbol_position', 'before', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(517, 8, 'currency_symbol_position', 'before', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(518, 5, 'currency_symbol_position', 'before', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(519, 2, 'date_format_localization', 'DD/MM/YYYY', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(520, 3, 'date_format_localization', 'DD/MM/YYYY', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(521, 4, 'date_format_localization', 'DD/MM/YYYY', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(522, 7, 'date_format_localization', 'DD/MM/YYYY', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(523, 8, 'date_format_localization', 'DD/MM/YYYY', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(524, 5, 'date_format_localization', 'DD/MM/YYYY', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(525, 2, 'time_format_localization', '24h', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(526, 3, 'time_format_localization', '24h', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(527, 4, 'time_format_localization', '24h', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(528, 7, 'time_format_localization', '24h', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(529, 8, 'time_format_localization', '24h', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(530, 5, 'time_format_localization', '24h', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(531, 2, 'timezone_localization', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(532, 3, 'timezone_localization', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(533, 4, 'timezone_localization', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(534, 7, 'timezone_localization', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(535, 8, 'timezone_localization', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(536, 5, 'timezone_localization', 'UTC', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(537, 2, 'email_from', 'noreply@company.com', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(538, 3, 'email_from', 'noreply@company.com', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(539, 4, 'email_from', 'noreply@company.com', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(540, 7, 'email_from', 'noreply@company.com', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(541, 8, 'email_from', 'noreply@company.com', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(542, 5, 'email_from', 'noreply@company.com', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(543, 2, 'email_from_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(544, 3, 'email_from_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(545, 4, 'email_from_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(546, 7, 'email_from_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(547, 8, 'email_from_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(548, 5, 'email_from_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(549, 2, 'smtp_host', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(550, 3, 'smtp_host', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(551, 4, 'smtp_host', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(552, 7, 'smtp_host', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(553, 8, 'smtp_host', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(554, 5, 'smtp_host', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(555, 2, 'smtp_port', '587', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(556, 3, 'smtp_port', '587', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(557, 4, 'smtp_port', '587', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(558, 7, 'smtp_port', '587', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(559, 8, 'smtp_port', '587', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(560, 5, 'smtp_port', '587', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(561, 2, 'smtp_username', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(562, 3, 'smtp_username', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(563, 4, 'smtp_username', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(564, 7, 'smtp_username', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(565, 8, 'smtp_username', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(566, 5, 'smtp_username', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(567, 2, 'smtp_password', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(568, 3, 'smtp_password', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(569, 4, 'smtp_password', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(570, 7, 'smtp_password', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(571, 8, 'smtp_password', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(572, 5, 'smtp_password', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(573, 2, 'smtp_encryption', 'tls', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(574, 3, 'smtp_encryption', 'tls', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(575, 4, 'smtp_encryption', 'tls', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(576, 7, 'smtp_encryption', 'tls', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(577, 8, 'smtp_encryption', 'tls', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(578, 5, 'smtp_encryption', 'tls', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(579, 2, 'email_driver', 'smtp', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(580, 3, 'email_driver', 'smtp', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(581, 4, 'email_driver', 'smtp', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(582, 7, 'email_driver', 'smtp', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(583, 8, 'email_driver', 'smtp', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(584, 5, 'email_driver', 'smtp', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(585, 2, 'primary_color', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(586, 3, 'primary_color', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(587, 4, 'primary_color', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(588, 6, 'primary_color', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(589, 7, 'primary_color', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(590, 8, 'primary_color', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(591, 5, 'primary_color', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(592, 2, 'secondary_color', '#76AF88', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(593, 3, 'secondary_color', '#76AF88', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(594, 4, 'secondary_color', '#76AF88', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(595, 6, 'secondary_color', '#76AF88', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(596, 7, 'secondary_color', '#76AF88', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(597, 8, 'secondary_color', '#76AF88', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(598, 5, 'secondary_color', '#76AF88', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(599, 2, 'sidebar_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(600, 3, 'sidebar_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(601, 4, 'sidebar_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(602, 6, 'sidebar_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(603, 7, 'sidebar_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(604, 8, 'sidebar_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(605, 5, 'sidebar_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(606, 2, 'top_menu_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(607, 3, 'top_menu_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(608, 4, 'top_menu_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(609, 6, 'top_menu_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(610, 7, 'top_menu_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(611, 8, 'top_menu_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(612, 5, 'top_menu_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(613, 2, 'top_menu_logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(614, 3, 'top_menu_logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(615, 4, 'top_menu_logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(616, 6, 'top_menu_logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(617, 7, 'top_menu_logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(618, 8, 'top_menu_logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(619, 5, 'top_menu_logo', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(620, 2, 'top_menu_color', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(621, 3, 'top_menu_color', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(622, 4, 'top_menu_color', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(623, 6, 'top_menu_color', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(624, 7, 'top_menu_color', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(625, 8, 'top_menu_color', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(626, 5, 'top_menu_color', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(627, 2, 'footer_text', '© 2024 Worksuite CRM. All rights reserved.', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(628, 3, 'footer_text', '© 2024 Worksuite CRM. All rights reserved.', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(629, 4, 'footer_text', '© 2024 Worksuite CRM. All rights reserved.', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(630, 6, 'footer_text', '© 2024 Worksuite CRM. All rights reserved.', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(631, 7, 'footer_text', '© 2024 Worksuite CRM. All rights reserved.', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(632, 8, 'footer_text', '© 2024 Worksuite CRM. All rights reserved.', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(633, 5, 'footer_text', '© 2024 Worksuite CRM. All rights reserved.', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(634, 2, 'footer_color', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(635, 3, 'footer_color', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(636, 4, 'footer_color', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(637, 6, 'footer_color', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(638, 7, 'footer_color', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(639, 8, 'footer_color', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(640, 5, 'footer_color', '#102D2C', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(641, 2, 'pwa_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(642, 3, 'pwa_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(643, 4, 'pwa_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(644, 6, 'pwa_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(645, 7, 'pwa_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(646, 8, 'pwa_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(647, 5, 'pwa_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(648, 2, 'pwa_app_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(649, 3, 'pwa_app_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(650, 4, 'pwa_app_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(651, 6, 'pwa_app_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(652, 7, 'pwa_app_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(653, 8, 'pwa_app_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(654, 5, 'pwa_app_name', 'Worksuite CRM', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(655, 2, 'pwa_app_short_name', 'Worksuite', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(656, 3, 'pwa_app_short_name', 'Worksuite', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(657, 4, 'pwa_app_short_name', 'Worksuite', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(658, 6, 'pwa_app_short_name', 'Worksuite', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(659, 7, 'pwa_app_short_name', 'Worksuite', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(660, 8, 'pwa_app_short_name', 'Worksuite', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(661, 5, 'pwa_app_short_name', 'Worksuite', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(662, 2, 'pwa_app_description', 'CRM Application', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(663, 3, 'pwa_app_description', 'CRM Application', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(664, 4, 'pwa_app_description', 'CRM Application', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(665, 6, 'pwa_app_description', 'CRM Application', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(666, 7, 'pwa_app_description', 'CRM Application', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(667, 8, 'pwa_app_description', 'CRM Application', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(668, 5, 'pwa_app_description', 'CRM Application', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(669, 2, 'pwa_app_icon', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(670, 3, 'pwa_app_icon', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(671, 4, 'pwa_app_icon', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(672, 6, 'pwa_app_icon', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(673, 7, 'pwa_app_icon', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(674, 8, 'pwa_app_icon', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(675, 5, 'pwa_app_icon', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(676, 2, 'pwa_app_color', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(677, 3, 'pwa_app_color', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(678, 4, 'pwa_app_color', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(679, 6, 'pwa_app_color', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(680, 7, 'pwa_app_color', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(681, 8, 'pwa_app_color', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(682, 5, 'pwa_app_color', '#217E45', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(683, 2, 'module_leads', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(684, 3, 'module_leads', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(685, 4, 'module_leads', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(686, 6, 'module_leads', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(687, 7, 'module_leads', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(688, 8, 'module_leads', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(689, 5, 'module_leads', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(690, 2, 'module_clients', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(691, 3, 'module_clients', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(692, 4, 'module_clients', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(693, 6, 'module_clients', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(694, 7, 'module_clients', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(695, 8, 'module_clients', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(696, 5, 'module_clients', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(697, 2, 'module_projects', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(698, 3, 'module_projects', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(699, 4, 'module_projects', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(700, 6, 'module_projects', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(701, 7, 'module_projects', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(702, 8, 'module_projects', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(703, 5, 'module_projects', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(704, 2, 'module_tasks', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(705, 3, 'module_tasks', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(706, 4, 'module_tasks', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(707, 6, 'module_tasks', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(708, 7, 'module_tasks', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(709, 8, 'module_tasks', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(710, 5, 'module_tasks', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(711, 2, 'module_invoices', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(712, 3, 'module_invoices', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(713, 4, 'module_invoices', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(714, 6, 'module_invoices', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(715, 7, 'module_invoices', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(716, 8, 'module_invoices', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(717, 5, 'module_invoices', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(718, 2, 'module_estimates', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(719, 3, 'module_estimates', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(720, 4, 'module_estimates', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(721, 6, 'module_estimates', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(722, 7, 'module_estimates', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(723, 8, 'module_estimates', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(724, 5, 'module_estimates', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(725, 2, 'module_proposals', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(726, 3, 'module_proposals', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(727, 4, 'module_proposals', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(728, 6, 'module_proposals', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(729, 7, 'module_proposals', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(730, 8, 'module_proposals', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(731, 5, 'module_proposals', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(732, 2, 'module_payments', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(733, 3, 'module_payments', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(734, 4, 'module_payments', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(735, 6, 'module_payments', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13');
INSERT INTO `system_settings` (`id`, `company_id`, `setting_key`, `setting_value`, `setting_type`, `created_at`, `updated_at`) VALUES
(736, 7, 'module_payments', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(737, 8, 'module_payments', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(738, 5, 'module_payments', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(739, 2, 'module_expenses', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(740, 3, 'module_expenses', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(741, 4, 'module_expenses', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(742, 6, 'module_expenses', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(743, 7, 'module_expenses', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(744, 8, 'module_expenses', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(745, 5, 'module_expenses', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(746, 2, 'module_contracts', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(747, 3, 'module_contracts', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(748, 4, 'module_contracts', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(749, 6, 'module_contracts', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(750, 7, 'module_contracts', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(751, 8, 'module_contracts', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(752, 5, 'module_contracts', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(753, 2, 'module_subscriptions', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(754, 3, 'module_subscriptions', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(755, 4, 'module_subscriptions', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(756, 6, 'module_subscriptions', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(757, 7, 'module_subscriptions', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(758, 8, 'module_subscriptions', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(759, 5, 'module_subscriptions', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(760, 2, 'module_employees', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(761, 3, 'module_employees', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(762, 4, 'module_employees', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(763, 6, 'module_employees', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(764, 7, 'module_employees', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(765, 8, 'module_employees', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(766, 5, 'module_employees', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(767, 2, 'module_attendance', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(768, 3, 'module_attendance', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(769, 4, 'module_attendance', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(770, 6, 'module_attendance', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(771, 7, 'module_attendance', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(772, 8, 'module_attendance', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(773, 5, 'module_attendance', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(774, 2, 'module_time_tracking', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(775, 3, 'module_time_tracking', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(776, 4, 'module_time_tracking', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(777, 6, 'module_time_tracking', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(778, 7, 'module_time_tracking', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(779, 8, 'module_time_tracking', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(780, 5, 'module_time_tracking', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(781, 2, 'module_events', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(782, 3, 'module_events', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(783, 4, 'module_events', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(784, 6, 'module_events', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(785, 7, 'module_events', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(786, 8, 'module_events', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(787, 5, 'module_events', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(788, 2, 'module_departments', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(789, 3, 'module_departments', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(790, 4, 'module_departments', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(791, 6, 'module_departments', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(792, 7, 'module_departments', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(793, 8, 'module_departments', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(794, 5, 'module_departments', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(795, 2, 'module_positions', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(796, 3, 'module_positions', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(797, 4, 'module_positions', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(798, 6, 'module_positions', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(799, 7, 'module_positions', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(800, 8, 'module_positions', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(801, 5, 'module_positions', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(802, 2, 'module_messages', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(803, 3, 'module_messages', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(804, 4, 'module_messages', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(805, 6, 'module_messages', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(806, 7, 'module_messages', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(807, 8, 'module_messages', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(808, 5, 'module_messages', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(809, 2, 'module_tickets', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(810, 3, 'module_tickets', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(811, 4, 'module_tickets', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(812, 6, 'module_tickets', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(813, 7, 'module_tickets', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(814, 8, 'module_tickets', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(815, 5, 'module_tickets', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(816, 2, 'module_documents', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(817, 3, 'module_documents', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(818, 4, 'module_documents', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(819, 6, 'module_documents', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(820, 7, 'module_documents', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(821, 8, 'module_documents', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(822, 5, 'module_documents', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(823, 2, 'module_reports', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(824, 3, 'module_reports', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(825, 4, 'module_reports', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(826, 6, 'module_reports', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(827, 7, 'module_reports', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(828, 8, 'module_reports', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(829, 5, 'module_reports', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(830, 2, 'left_menu_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(831, 3, 'left_menu_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(832, 4, 'left_menu_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(833, 6, 'left_menu_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(834, 7, 'left_menu_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(835, 8, 'left_menu_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(836, 5, 'left_menu_style', 'default', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(837, 2, 'email_notifications', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(838, 3, 'email_notifications', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(839, 4, 'email_notifications', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(840, 7, 'email_notifications', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(841, 8, 'email_notifications', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(842, 5, 'email_notifications', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(843, 2, 'sms_notifications', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(844, 3, 'sms_notifications', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(845, 4, 'sms_notifications', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(846, 6, 'sms_notifications', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(847, 7, 'sms_notifications', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(848, 8, 'sms_notifications', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(849, 5, 'sms_notifications', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(850, 2, 'push_notifications', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(851, 3, 'push_notifications', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(852, 4, 'push_notifications', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(853, 6, 'push_notifications', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(854, 7, 'push_notifications', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(855, 8, 'push_notifications', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(856, 5, 'push_notifications', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(857, 2, 'notification_sound', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(858, 3, 'notification_sound', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(859, 4, 'notification_sound', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(860, 6, 'notification_sound', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(861, 7, 'notification_sound', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(862, 8, 'notification_sound', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(863, 5, 'notification_sound', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(864, 2, 'google_calendar_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(865, 3, 'google_calendar_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(866, 4, 'google_calendar_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(867, 6, 'google_calendar_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(868, 7, 'google_calendar_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(869, 8, 'google_calendar_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(870, 5, 'google_calendar_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(871, 2, 'google_calendar_client_id', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(872, 3, 'google_calendar_client_id', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(873, 4, 'google_calendar_client_id', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(874, 6, 'google_calendar_client_id', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(875, 7, 'google_calendar_client_id', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(876, 8, 'google_calendar_client_id', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(877, 5, 'google_calendar_client_id', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(878, 2, 'google_calendar_client_secret', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(879, 3, 'google_calendar_client_secret', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(880, 4, 'google_calendar_client_secret', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(881, 6, 'google_calendar_client_secret', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(882, 7, 'google_calendar_client_secret', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(883, 8, 'google_calendar_client_secret', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(884, 5, 'google_calendar_client_secret', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(885, 2, 'slack_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(886, 3, 'slack_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(887, 4, 'slack_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(888, 6, 'slack_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(889, 7, 'slack_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(890, 8, 'slack_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(891, 5, 'slack_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(892, 2, 'slack_webhook_url', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(893, 3, 'slack_webhook_url', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(894, 4, 'slack_webhook_url', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(895, 6, 'slack_webhook_url', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(896, 7, 'slack_webhook_url', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(897, 8, 'slack_webhook_url', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(898, 5, 'slack_webhook_url', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(899, 2, 'zapier_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(900, 3, 'zapier_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(901, 4, 'zapier_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(902, 6, 'zapier_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(903, 7, 'zapier_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(904, 8, 'zapier_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(905, 5, 'zapier_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(906, 2, 'zapier_api_key', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(907, 3, 'zapier_api_key', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(908, 4, 'zapier_api_key', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(909, 6, 'zapier_api_key', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(910, 7, 'zapier_api_key', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(911, 8, 'zapier_api_key', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(912, 5, 'zapier_api_key', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(913, 2, 'cron_job_enabled', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(914, 3, 'cron_job_enabled', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(915, 4, 'cron_job_enabled', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(916, 6, 'cron_job_enabled', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(917, 7, 'cron_job_enabled', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(918, 8, 'cron_job_enabled', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(919, 5, 'cron_job_enabled', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(920, 2, 'cron_job_frequency', 'daily', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(921, 3, 'cron_job_frequency', 'daily', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(922, 4, 'cron_job_frequency', 'daily', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(923, 6, 'cron_job_frequency', 'daily', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(924, 7, 'cron_job_frequency', 'daily', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(925, 8, 'cron_job_frequency', 'daily', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(926, 5, 'cron_job_frequency', 'daily', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(927, 2, 'cron_job_last_run', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(928, 3, 'cron_job_last_run', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(929, 4, 'cron_job_last_run', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(930, 6, 'cron_job_last_run', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(931, 7, 'cron_job_last_run', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(932, 8, 'cron_job_last_run', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(933, 5, 'cron_job_last_run', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(934, 2, 'auto_update_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(935, 3, 'auto_update_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(936, 4, 'auto_update_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(937, 6, 'auto_update_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(938, 7, 'auto_update_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(939, 8, 'auto_update_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(940, 5, 'auto_update_enabled', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(941, 2, 'update_channel', 'stable', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(942, 3, 'update_channel', 'stable', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(943, 4, 'update_channel', 'stable', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(944, 6, 'update_channel', 'stable', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(945, 7, 'update_channel', 'stable', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(946, 8, 'update_channel', 'stable', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(947, 5, 'update_channel', 'stable', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(948, 2, 'last_update_check', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(949, 3, 'last_update_check', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(950, 4, 'last_update_check', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(951, 6, 'last_update_check', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(952, 7, 'last_update_check', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(953, 8, 'last_update_check', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(954, 5, 'last_update_check', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(955, 2, 'default_role', 'employee', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(956, 3, 'default_role', 'employee', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(957, 4, 'default_role', 'employee', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(958, 6, 'default_role', 'employee', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(959, 7, 'default_role', 'employee', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(960, 8, 'default_role', 'employee', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(961, 5, 'default_role', 'employee', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(962, 2, 'enable_two_factor', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(963, 3, 'enable_two_factor', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(964, 4, 'enable_two_factor', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(965, 6, 'enable_two_factor', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(966, 7, 'enable_two_factor', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(967, 8, 'enable_two_factor', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(968, 5, 'enable_two_factor', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(969, 2, 'client_portal_enabled', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(970, 3, 'client_portal_enabled', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(971, 4, 'client_portal_enabled', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(972, 6, 'client_portal_enabled', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(973, 7, 'client_portal_enabled', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(974, 8, 'client_portal_enabled', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(975, 5, 'client_portal_enabled', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(976, 2, 'client_portal_url', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(977, 3, 'client_portal_url', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(978, 4, 'client_portal_url', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(979, 6, 'client_portal_url', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(980, 7, 'client_portal_url', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(981, 8, 'client_portal_url', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(982, 5, 'client_portal_url', '', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(983, 2, 'client_can_view_invoices', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(984, 3, 'client_can_view_invoices', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(985, 4, 'client_can_view_invoices', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(986, 6, 'client_can_view_invoices', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(987, 7, 'client_can_view_invoices', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(988, 8, 'client_can_view_invoices', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(989, 5, 'client_can_view_invoices', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(990, 2, 'client_can_view_projects', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(991, 3, 'client_can_view_projects', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(992, 4, 'client_can_view_projects', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(993, 6, 'client_can_view_projects', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(994, 7, 'client_can_view_projects', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(995, 8, 'client_can_view_projects', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(996, 5, 'client_can_view_projects', 'true', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(997, 2, 'auto_convert_lead', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(998, 3, 'auto_convert_lead', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(999, 4, 'auto_convert_lead', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1000, 6, 'auto_convert_lead', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1001, 7, 'auto_convert_lead', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1002, 8, 'auto_convert_lead', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1003, 5, 'auto_convert_lead', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1004, 2, 'default_lead_source', 'website', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1005, 3, 'default_lead_source', 'website', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1006, 4, 'default_lead_source', 'website', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1007, 6, 'default_lead_source', 'website', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1008, 7, 'default_lead_source', 'website', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1009, 8, 'default_lead_source', 'website', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1010, 5, 'default_lead_source', 'website', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1011, 2, 'auto_update_plugins', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1012, 3, 'auto_update_plugins', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1013, 4, 'auto_update_plugins', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1014, 6, 'auto_update_plugins', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1015, 7, 'auto_update_plugins', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1016, 8, 'auto_update_plugins', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13'),
(1017, 5, 'auto_update_plugins', 'false', 'string', '2026-01-03 13:52:13', '2026-01-03 13:52:13');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `code` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `sub_description` varchar(500) DEFAULT NULL,
  `task_category` varchar(100) DEFAULT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `client_id` int(10) UNSIGNED DEFAULT NULL,
  `lead_id` int(10) UNSIGNED DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `status` enum('Incomplete','Doing','Done') DEFAULT 'Incomplete',
  `priority` enum('High','Medium','Low') DEFAULT NULL,
  `estimated_time` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `completed_on` datetime DEFAULT NULL,
  `created_by` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `company_id`, `code`, `title`, `sub_description`, `task_category`, `project_id`, `client_id`, `lead_id`, `start_date`, `due_date`, `status`, `priority`, `estimated_time`, `description`, `completed_on`, `created_by`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 'FVS-1', 'Implement authentication', NULL, 'Development', 1, NULL, NULL, '2025-01-19', '2025-01-26', 'Done', 'High', '8h', 'Implement JWT authentication', '2025-01-25 10:00:00', 1, '2025-12-22 09:24:55', '2025-12-22 10:31:47', 0),
(2, 1, '1001-1', 'first', NULL, NULL, 2, NULL, NULL, '2025-12-23', '2026-01-07', 'Doing', 'Medium', NULL, 'okkkkkkk', NULL, 1, '2025-12-23 10:27:20', '2025-12-24 12:41:40', 0),
(3, 1, 'TASK-0001', 'first', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', 'Medium', NULL, NULL, NULL, 1, '2025-12-27 10:48:20', '2025-12-27 10:48:20', 0),
(4, 1, '12312312-1', 'titileeee', NULL, NULL, 6, NULL, NULL, '2025-12-27', '2025-12-31', '', 'Medium', NULL, 'ddad', NULL, 1, '2025-12-27 13:05:08', '2025-12-27 13:05:08', 0),
(5, 1, '12312312-2', 'titile.................', NULL, NULL, 6, NULL, NULL, '2025-12-29', '2026-01-10', '', 'Medium', NULL, 'okkkkkk', NULL, 1, '2025-12-29 05:37:24', '2025-12-29 05:37:24', 0),
(6, 1, '12312312-3', 'api', NULL, NULL, 6, NULL, NULL, '2025-12-29', '2026-01-10', 'Incomplete', 'High', NULL, 'okkkk', NULL, 1, '2025-12-29 07:11:25', '2025-12-30 07:06:42', 1),
(7, 1, '234234-1', 'dfd', NULL, NULL, 7, NULL, NULL, '2025-12-30', '2025-12-24', 'Doing', 'High', NULL, 'dfff', NULL, 1, '2025-12-30 07:06:22', '2025-12-30 07:06:22', 0),
(8, 1, 'TASK-0002', '566', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-27', '', 'High', NULL, 'ghg', NULL, 1, '2025-12-30 07:29:50', '2025-12-30 07:29:50', 0),
(9, 1, 'TASK-0003', 'gffgf', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-24', '', 'Medium', NULL, 'fgfg', NULL, 1, '2025-12-30 07:35:02', '2025-12-30 07:53:38', 1),
(10, 1, 'TASK-0004', 'asasa', NULL, NULL, NULL, 27, NULL, NULL, '2025-12-27', '', 'Medium', NULL, 'sas', NULL, 1, '2025-12-30 11:04:19', '2025-12-30 11:04:19', 0),
(11, 1, 'TASK-0005', 'task1111 rajjjj', NULL, NULL, NULL, 27, NULL, NULL, '2025-12-12', '', 'Medium', NULL, 'okkkk', NULL, 1, '2025-12-31 10:57:29', '2025-12-31 10:57:29', 0),
(12, 1, 'TASK-0006', 'task 111', NULL, NULL, NULL, 15, NULL, NULL, '2025-12-31', '', 'High', NULL, 'okkkk', NULL, 1, '2025-12-31 11:03:31', '2025-12-31 11:03:31', 0),
(13, 1, '454-1', 'newwww task', NULL, NULL, 10, 27, NULL, NULL, '2026-01-01', '', 'High', NULL, 'okkkkk', NULL, 1, '2025-12-31 11:18:39', '2025-12-31 11:18:39', 0),
(14, 1, 'TASK-0007', 'taskk', NULL, NULL, NULL, 28, NULL, NULL, '2026-01-01', '', 'Medium', NULL, 'okkk', NULL, 1, '2025-12-31 11:33:00', '2025-12-31 11:33:00', 0),
(15, 1, 'PRJ003-1', 'task title', NULL, NULL, 15, NULL, NULL, NULL, '2025-12-31', 'Incomplete', 'Medium', NULL, 'okk', NULL, 1, '2025-12-31 13:32:51', '2025-12-31 13:32:51', 0),
(16, 1, 'PRJ003-2', 'task', NULL, NULL, 15, NULL, NULL, NULL, NULL, 'Incomplete', 'Medium', NULL, 'okkkk', NULL, 1, '2025-12-31 13:33:08', '2025-12-31 13:33:08', 0),
(17, 1, 'PRJ003-3', 'task titlr', NULL, NULL, 15, NULL, NULL, NULL, '2026-01-01', 'Incomplete', 'High', NULL, 'okkkk', NULL, 1, '2025-12-31 13:35:00', '2025-12-31 13:35:00', 0),
(18, 1, 'PRJ003-4', 'miless', NULL, NULL, 15, NULL, NULL, NULL, '2025-12-31', 'Incomplete', 'High', NULL, 'ddad', NULL, 1, '2025-12-31 13:37:20', '2025-12-31 13:37:20', 0),
(19, 1, 'PRJ003-5', 'dfdf', NULL, NULL, 15, NULL, NULL, NULL, '2025-12-31', 'Incomplete', 'High', NULL, 'afaf', NULL, 1, '2025-12-31 13:43:34', '2025-12-31 13:43:34', 0),
(20, 1, 'PRJ003-5', 'dfdf', NULL, NULL, 15, NULL, NULL, NULL, '2025-12-31', 'Incomplete', 'High', NULL, 'afaf', NULL, 1, '2025-12-31 13:43:34', '2025-12-31 13:43:34', 0),
(21, 1, 'PRJ003-7', 'afaf', NULL, NULL, 15, NULL, NULL, NULL, '2026-01-02', 'Incomplete', 'High', NULL, 'afafaf', NULL, 1, '2025-12-31 13:43:59', '2025-12-31 13:43:59', 0),
(22, 6, 'TASK-0001', 'task 11', NULL, NULL, NULL, 32, NULL, NULL, '2026-01-01', '', 'Medium', NULL, 'okkk', NULL, 1, '2026-01-01 09:08:00', '2026-01-01 12:07:03', 1),
(23, 6, '3435-1', 'ui task', NULL, NULL, 17, NULL, NULL, '2026-01-01', '2026-01-12', 'Doing', 'Medium', NULL, 'fasaffsfsd', NULL, 1, '2026-01-01 11:04:28', '2026-01-03 11:11:04', 0),
(24, 6, 'TASK-0002', 'ui task', NULL, NULL, NULL, 29, NULL, NULL, '2026-01-01', '', 'Medium', NULL, 'okk', NULL, 1, '2026-01-01 12:02:16', '2026-01-01 12:07:07', 1),
(25, 6, '3435-2', 'API task', NULL, NULL, 17, NULL, NULL, '2026-01-01', '2026-01-30', 'Incomplete', 'Medium', NULL, 'okkk', NULL, 1, '2026-01-01 12:08:14', '2026-01-03 11:24:04', 0),
(26, 6, 'WMS0001-1', 'ui', NULL, NULL, 18, NULL, NULL, NULL, '2026-01-09', 'Incomplete', 'Medium', NULL, 'okk done ', NULL, 1, '2026-01-01 12:09:41', '2026-01-01 13:37:55', 1),
(27, 6, 'WMS0001-2', 'mii1', NULL, NULL, 18, NULL, NULL, NULL, '2026-01-15', 'Incomplete', 'High', NULL, 'okkk', NULL, 1, '2026-01-01 12:10:06', '2026-01-01 13:37:47', 1),
(28, 6, 'WMS0001-3', 't1', NULL, NULL, 18, 32, NULL, NULL, '2026-01-31', '', 'Medium', NULL, 'sss', NULL, 18, '2026-01-01 12:12:19', '2026-01-01 13:37:50', 1),
(29, 6, 'WMS0001-4', 'szzxc', NULL, NULL, 18, NULL, NULL, NULL, '2026-01-14', 'Incomplete', 'Medium', NULL, 'xcxzcxzc', NULL, 1, '2026-01-02 11:31:02', '2026-01-02 11:31:02', 0),
(30, 6, 'TASK-0003', 'WMS', NULL, NULL, NULL, NULL, NULL, '2026-01-01', '2026-02-05', 'Doing', 'Medium', NULL, '', NULL, 1, '2026-01-02 11:41:08', '2026-01-02 11:41:08', 0),
(31, 6, 'TASK-0004', 'gym', NULL, NULL, NULL, NULL, NULL, '2026-01-01', '2026-01-31', 'Doing', 'Medium', NULL, '', NULL, 1, '2026-01-02 11:41:08', '2026-01-02 11:41:08', 0),
(32, 6, 'TASK-0005', 'virat project CRM', NULL, NULL, NULL, NULL, NULL, '2026-01-01', '2026-02-20', 'Done', 'Medium', NULL, '', NULL, 1, '2026-01-02 11:41:09', '2026-01-02 11:43:46', 0),
(33, 6, 'TASK-0006', 'p', NULL, NULL, NULL, NULL, NULL, '2025-12-31', '2026-01-10', 'Done', 'Medium', NULL, '', NULL, 1, '2026-01-02 11:41:09', '2026-01-03 11:11:51', 1),
(34, 6, 'TASK-0007', 'pen222', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Incomplete', 'Medium', NULL, 'okkkkk', NULL, 1, '2026-01-03 11:10:37', '2026-01-03 11:11:55', 1),
(35, 6, 'PRJ001-1', 'ui', NULL, NULL, 20, NULL, NULL, NULL, '2026-01-31', 'Done', 'Medium', NULL, 'okkk  doneee', NULL, 1, '2026-01-03 11:26:00', '2026-01-03 11:54:47', 0),
(36, 6, 'PRJ001-2', 'api', NULL, NULL, 20, NULL, NULL, NULL, '2026-02-06', 'Incomplete', 'Medium', NULL, 'okkk doneee', NULL, 1, '2026-01-03 11:26:32', '2026-01-03 12:00:29', 0),
(37, 6, 'PRJ001-3', 'okkk', NULL, NULL, 20, NULL, NULL, NULL, '2026-01-30', '', 'High', NULL, 'okk', NULL, 1, '2026-01-03 11:29:34', '2026-01-03 11:54:45', 0),
(38, 6, 'PRJ001-4', 'okk', NULL, NULL, 20, NULL, NULL, NULL, '2026-01-23', 'Doing', 'High', NULL, 'okkk', NULL, 1, '2026-01-03 11:31:57', '2026-01-03 11:54:43', 0),
(39, 6, 'PRJ001-5', 'okk', NULL, 'milestone', 20, NULL, NULL, NULL, '2026-01-15', 'Incomplete', 'High', NULL, 'okk', NULL, 1, '2026-01-03 11:54:10', '2026-01-03 11:54:10', 0),
(40, 6, 'TASK-0008', 'ui', NULL, NULL, NULL, 32, NULL, NULL, '2026-01-22', '', 'High', NULL, 'okk', NULL, 1, '2026-01-03 12:23:27', '2026-01-03 12:23:27', 0),
(41, 6, 'TASK-0009', 'uiii', NULL, NULL, NULL, 32, NULL, NULL, '2026-01-22', '', 'High', NULL, 'okk', NULL, 1, '2026-01-03 12:23:37', '2026-01-03 12:23:37', 0);

-- --------------------------------------------------------

--
-- Table structure for table `task_assignees`
--

CREATE TABLE `task_assignees` (
  `id` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `task_assignees`
--

INSERT INTO `task_assignees` (`id`, `task_id`, `user_id`, `created_at`) VALUES
(1, 1, 1, '2025-12-22 09:24:55'),
(2, 1, 2, '2025-12-22 09:24:55'),
(3, 3, 19, '2025-12-27 10:48:20'),
(4, 4, 19, '2025-12-27 13:05:08'),
(5, 4, 22, '2025-12-27 13:05:08'),
(6, 5, 19, '2025-12-29 05:37:24'),
(7, 5, 22, '2025-12-29 05:37:24'),
(8, 6, 19, '2025-12-29 07:11:25'),
(9, 6, 22, '2025-12-29 07:11:25'),
(10, 7, 22, '2025-12-30 07:06:22'),
(11, 7, 19, '2025-12-30 07:06:22'),
(12, 23, 27, '2026-01-01 11:04:28'),
(13, 23, 28, '2026-01-01 11:04:28'),
(16, 25, 27, '2026-01-03 11:24:04');

-- --------------------------------------------------------

--
-- Table structure for table `task_comments`
--

CREATE TABLE `task_comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `comment` text NOT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `task_comments`
--

INSERT INTO `task_comments` (`id`, `task_id`, `user_id`, `comment`, `file_path`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 2, 2, 'fdsdfsfdf', NULL, '2025-12-24 12:37:59', '2025-12-24 12:37:59', 0);

-- --------------------------------------------------------

--
-- Table structure for table `task_files`
--

CREATE TABLE `task_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_size` bigint(20) DEFAULT NULL,
  `file_type` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `task_files`
--

INSERT INTO `task_files` (`id`, `task_id`, `user_id`, `file_path`, `file_name`, `file_size`, `file_type`, `description`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 4, 1, 'uploads\\file-1766840708658-618909548.png', 'Screenshot (3).png', 440262, 'image/png', NULL, '2025-12-27 13:05:08', '2025-12-27 13:05:08', 0),
(2, 5, 1, 'uploads\\file-1766986643847-128549073.png', 'Screenshot (3).png', 440262, 'image/png', NULL, '2025-12-29 05:37:24', '2025-12-29 05:37:24', 0),
(3, 6, 1, 'uploads\\file-1766992285545-3608812.png', 'Screenshot (3).png', 440262, 'image/png', NULL, '2025-12-29 07:11:25', '2025-12-29 07:11:25', 0),
(4, 7, 1, 'uploads\\file-1767078382901-865112579.png', 'Screenshot (1).png', 183151, 'image/png', NULL, '2025-12-30 07:06:22', '2025-12-30 07:06:22', 0),
(5, 23, 1, 'uploads\\file-1767265468385-836400877.png', 'Screenshot (3).png', 440262, 'image/png', NULL, '2026-01-01 11:04:28', '2026-01-01 11:04:28', 0),
(6, 25, 1, 'uploads\\file-1767269294627-211620071.pdf', 'CRM.pdf', 3222158, 'application/pdf', NULL, '2026-01-01 12:08:14', '2026-01-01 12:08:14', 0);

-- --------------------------------------------------------

--
-- Table structure for table `task_tags`
--

CREATE TABLE `task_tags` (
  `id` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `tag` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `task_tags`
--

INSERT INTO `task_tags` (`id`, `task_id`, `tag`, `created_at`) VALUES
(1, 1, 'backend', '2025-12-22 09:24:55'),
(2, 1, 'auth', '2025-12-22 09:24:55'),
(3, 4, 'Design', '2025-12-27 13:05:08'),
(4, 4, 'Design', '2025-12-27 13:05:08'),
(5, 5, 'Design', '2025-12-29 05:37:24'),
(6, 5, 'Design', '2025-12-29 05:37:24'),
(7, 6, 'Design', '2025-12-29 07:11:25'),
(8, 6, 'Design', '2025-12-29 07:11:25'),
(9, 7, 'Enhancement', '2025-12-30 07:06:22'),
(10, 7, 'Enhancement', '2025-12-30 07:06:22'),
(11, 23, 'Bug', '2026-01-01 11:04:28'),
(12, 23, 'Bug', '2026-01-01 11:04:28'),
(15, 25, 'Design', '2026-01-03 11:24:04'),
(16, 25, 'Design', '2026-01-03 11:24:04'),
(17, 25, 'Design', '2026-01-03 11:24:04'),
(18, 25, 'Design', '2026-01-03 11:24:04');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `ticket_id` varchar(50) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  `priority` enum('High','Medium','Low') DEFAULT 'Medium',
  `description` text DEFAULT NULL,
  `status` enum('Open','Pending','Closed') DEFAULT 'Open',
  `assigned_to_id` int(10) UNSIGNED DEFAULT NULL,
  `created_by` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `company_id`, `ticket_id`, `subject`, `client_id`, `priority`, `description`, `status`, `assigned_to_id`, `created_by`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 'TKT-001', 'tickety', NULL, 'Medium', 'gdfgdfgdfgdg', 'Open', NULL, 1, '2025-12-31 13:16:31', '2025-12-31 13:16:31', 0),
(9, 6, 'TKT-002', 'ticket', 32, 'Medium', 'okkk  doneee', 'Pending', NULL, 1, '2026-01-02 13:23:05', '2026-01-02 13:57:26', 0),
(10, 6, 'TKT-003', 'web  development', 29, 'Medium', 'okkkkk', 'Open', NULL, 1, '2026-01-03 07:54:43', '2026-01-03 07:54:43', 0);

-- --------------------------------------------------------

--
-- Table structure for table `ticket_comments`
--

CREATE TABLE `ticket_comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `ticket_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `comment` text NOT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `time_logs`
--

CREATE TABLE `time_logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `task_id` int(10) UNSIGNED DEFAULT NULL,
  `hours` decimal(5,2) NOT NULL,
  `date` date NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `time_logs`
--

INSERT INTO `time_logs` (`id`, `company_id`, `user_id`, `project_id`, `task_id`, `hours`, `date`, `description`, `created_at`, `updated_at`, `is_deleted`) VALUES
(1, 1, 13, 2, 2, 0.50, '2025-12-25', '', '2025-12-23 10:33:23', '2025-12-23 10:33:23', 0),
(2, 1, 25, 6, 5, 12.00, '2025-12-30', '1212', '2025-12-30 12:54:55', '2025-12-30 12:54:55', 0),
(3, 1, 1, 15, NULL, 5.00, '2025-12-31', 'fdfd', '2025-12-31 13:42:50', '2025-12-31 13:42:50', 0),
(4, 6, 18, 18, NULL, 5.00, '2026-01-01', 'okkk', '2026-01-01 12:11:07', '2026-01-03 06:39:03', 1),
(5, 6, 27, 18, NULL, 5.00, '2026-01-01', 'okkk', '2026-01-01 12:40:21', '2026-01-03 06:12:08', 1),
(6, 6, 27, 17, 25, 4.00, '2026-01-03', 'okk', '2026-01-03 06:12:01', '2026-01-03 06:12:37', 0),
(7, 6, 27, 17, 23, 1.00, '2026-01-03', 'okk', '2026-01-03 06:12:24', '2026-01-03 06:12:24', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','EMPLOYEE','CLIENT','SUPERADMIN') NOT NULL DEFAULT 'EMPLOYEE',
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `avatar` varchar(500) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `emergency_contact_name` varchar(255) DEFAULT NULL,
  `emergency_contact_phone` varchar(50) DEFAULT NULL,
  `emergency_contact_relation` varchar(100) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `bank_account_number` varchar(100) DEFAULT NULL,
  `bank_ifsc` varchar(50) DEFAULT NULL,
  `bank_branch` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0,
  `billing_address` text DEFAULT NULL,
  `billing_city` varchar(100) DEFAULT NULL,
  `billing_state` varchar(100) DEFAULT NULL,
  `billing_country` varchar(100) DEFAULT NULL,
  `billing_postal_code` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `company_id`, `name`, `email`, `password`, `role`, `status`, `avatar`, `phone`, `address`, `emergency_contact_name`, `emergency_contact_phone`, `emergency_contact_relation`, `bank_name`, `bank_account_number`, `bank_ifsc`, `bank_branch`, `created_at`, `updated_at`, `is_deleted`, `billing_address`, `billing_city`, `billing_state`, `billing_country`, `billing_postal_code`) VALUES
(1, 1, ' Admin', 'admin@crmapp.com', '$2a$10$sLBAU/lpQzk7LtcUiiFGNOrw8Qv0Svne.TxUN/gFXpxyxMNUtmQgy', 'ADMIN', 'Active', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 07:15:36', '2026-01-03 10:20:42', 0, NULL, NULL, NULL, NULL, NULL),
(2, 1, 'Demo ', 'employee@demo.com', '$2a$12$O100Ykz2CbG.JPFQ76F6qOK1GYOSLtVXjFwBhwn4glPaAqDSfw7T2', 'EMPLOYEE', 'Active', NULL, '+1-555-0101', '123 Employee St, New York', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 07:15:36', '2025-12-26 05:52:07', 0, NULL, NULL, NULL, NULL, NULL),
(3, 1, 'Demo Client', 'client@demo.com', '$2a$10$CyMeAtmMNZ478BjpE3FPBOHnRpOcDCmcc7KTM2atWJqiluvv/PTSq', 'CLIENT', 'Active', NULL, '454656565', 'sdfsdfsdfsdfs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 07:15:36', '2025-12-26 07:55:22', 1, NULL, NULL, NULL, NULL, NULL),
(12, 1, 'tech panda', 'ankit@crmapp.com', '$2a$10$jFlqvcqqkegulmwVbeR1feiLFlaJXnpKyxV4dnGqNz0hMS3gUrV2i', 'CLIENT', 'Active', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-23 07:59:04', '2025-12-23 07:59:04', 0, NULL, NULL, NULL, NULL, NULL),
(13, 1, 'kavya', 'kavya@crmapp.com', '$2a$10$IiWArQOyuYP7ap9eYK8w8OimuzDeMlmMMzfykWl0jKjDiBhclgy1.', 'EMPLOYEE', 'Active', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-23 08:48:33', '2025-12-23 08:48:33', 0, NULL, NULL, NULL, NULL, NULL),
(14, 1, 'Ronak', 'ronak@gmail.com', '$2a$10$r0ryRWwQI1jNRFkiocrt4.UykFVTWUMbQ4Ebw7yTUBt.vksIghc6W', 'EMPLOYEE', 'Active', NULL, '343534634646', 'bhopal', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-23 13:20:18', '2025-12-27 06:56:09', 1, NULL, NULL, NULL, NULL, NULL),
(16, 4, 'somya', 'somya@gmail.com', '$2a$10$bMgZ6DvWPbM9eJ8nd8JOpeEV6qUVKbw/X.RggA8EIB4oF2G0C.9TG', 'EMPLOYEE', 'Active', NULL, '234534534636 ', 'indore', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-24 08:43:42', '2025-12-24 08:43:42', 0, NULL, NULL, NULL, NULL, NULL),
(17, 1, 'Super Admin', 'superadmin@crmapp.com', '$2a$12$tUv.yzSs2mzqEnOuuBH63eAoWW73j5DBujSaL4ci3lDOZ/Az/S38a', 'SUPERADMIN', 'Active', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-25 10:44:50', '2025-12-25 10:49:24', 0, NULL, NULL, NULL, NULL, NULL),
(18, 6, 'tech mahindra admin', 'techmahindraadmin@gmail.com', '$2a$10$aH9IIf.nv6gnfd1/xSePTevrDWvRjR84TIKPhJNkrerAAkZXw/9R6', 'ADMIN', 'Active', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-26 07:58:22', '2025-12-26 07:58:22', 0, NULL, NULL, NULL, NULL, NULL),
(19, 1, 'sakshi', 'sakshi@gmail.com', '$2a$10$5qw7iZIsGLjhv118xs8lf.JcqbCVw8GjqVh97YTKZC/46FQ9fGXHS', 'EMPLOYEE', 'Active', NULL, '73462374623472366666666666666666', 'indore', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-26 10:48:31', '2025-12-27 10:14:32', 0, NULL, NULL, NULL, NULL, NULL),
(20, 1, 'ishu', 'ishu@gmail.com', '$2a$10$cWj4UjD2HofR1gaox6ErL.31eBpvkJGWUxYHnta8qFC7batswZOPe', 'CLIENT', 'Active', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-26 11:37:52', '2025-12-26 11:37:52', 0, NULL, NULL, NULL, NULL, NULL),
(21, 1, 'ishu2', 'ishu2@gmail.com', '$2a$10$3Y3vkaZklo8m98yZoTx98.ZFgacm2XGMsR4jnzWTa7QGtlD8E11hu', 'CLIENT', 'Active', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-26 12:34:36', '2025-12-26 12:34:36', 0, NULL, NULL, NULL, NULL, NULL),
(22, 1, 'jojo', 'jojo@gmail.com', '$2a$10$yLIfQ/eZjAIO234IS33XjOT4FRodWhdEVR3n9Hiu0QU7D7HvFyv0y', 'EMPLOYEE', 'Active', NULL, '387287274264', 'sdfsdfsdfsdfs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-27 06:55:08', '2025-12-27 06:55:52', 0, NULL, NULL, NULL, NULL, NULL),
(23, 1, 'demo client', 'democlient@gmail.com', '$2a$10$UCfYNI29fyYPut7DarrxLuIf2zdKX/TSAb3dGrUs6q3G.gKonvogK', 'CLIENT', 'Active', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-27 07:33:00', '2025-12-27 07:33:00', 0, NULL, NULL, NULL, NULL, NULL),
(24, 1, 'asas', 'jay@gmail.com', '$2a$10$IDsf2ytqqKNs3hZtTne2EeBIaDVU59Kob.RiK/pJEtxa9T1VmiOre', 'CLIENT', 'Active', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-30 11:28:00', '2025-12-30 11:28:00', 0, NULL, NULL, NULL, NULL, NULL),
(25, 1, 'sasas', 'a@gmail.com', '$2a$10$hAOO.fUmygbNt0nQ2WRdMewQB1LkSAzitWKofX40E4185TWtP9522', 'EMPLOYEE', 'Active', NULL, '04545454555', 'demo\ndemo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-30 12:45:22', '2025-12-30 12:45:22', 0, NULL, NULL, NULL, NULL, NULL),
(26, 6, 'vinay', 'vinay@gmail.com', '$2a$10$JKdayayfgg14B45otwPFO.qDV/EX41xH7maCmDPm7CXg6W14jGfEm', 'CLIENT', 'Active', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-31 12:42:14', '2025-12-31 12:42:14', 0, NULL, NULL, NULL, NULL, NULL),
(27, 6, 'Raja', 'Raja@gmail.com', '$2a$10$Ol7PXvp3Spm1s1xRy4m2hePZmDhHkhQwYqZICN5DH.4LC.vMIBvPO', 'EMPLOYEE', 'Active', NULL, '8475733895', 'indore, rajen nagar', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-01 06:07:26', '2026-01-01 12:40:40', 0, NULL, NULL, NULL, NULL, NULL),
(28, 6, 'kavya', 'kavya@gmail.com', '$2a$10$t4uBCbVl3Pg3qPfiOiSk0ODIKOuubW0zwdTW9FhzOg/uB5HUFdQhO', 'EMPLOYEE', 'Active', NULL, '3472378445', 'bhopal', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-01 06:08:32', '2026-01-01 06:08:32', 0, NULL, NULL, NULL, NULL, NULL),
(29, 6, 'virat@gmail.com', 'virat@gmail.com', '$2a$10$BQ9JdqDxq1iPVHD3nDRJSOobp8QYbFB3K.eFDuFuGdREOFLwlNaqC', 'CLIENT', 'Active', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-01 09:07:26', '2026-01-01 09:07:26', 0, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_sticky_notes`
--

CREATE TABLE `user_sticky_notes` (
  `id` int(11) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_sticky_notes`
--

INSERT INTO `user_sticky_notes` (`id`, `user_id`, `content`, `created_at`, `updated_at`) VALUES
(1, 1, 'My quick notes here...', '2025-12-29 06:28:19', '2025-12-29 06:28:19');

-- --------------------------------------------------------

--
-- Table structure for table `user_todos`
--

CREATE TABLE `user_todos` (
  `id` int(11) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` text DEFAULT NULL,
  `is_completed` tinyint(1) DEFAULT 0,
  `is_deleted` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_todos`
--

INSERT INTO `user_todos` (`id`, `user_id`, `title`, `description`, `is_completed`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 'Set roles and permissions for team members', NULL, 0, 0, '2025-12-29 06:28:19', '2025-12-29 06:28:19'),
(2, 1, 'Setup notifications for tasks', NULL, 0, 0, '2025-12-29 06:28:19', '2025-12-29 06:28:19'),
(3, 1, 'Re-arrange the widgets of my dashboard', NULL, 0, 0, '2025-12-29 06:28:19', '2025-12-29 06:28:19'),
(4, 1, 'Setup IP restriction for time logs', NULL, 0, 0, '2025-12-29 06:28:19', '2025-12-29 06:28:19'),
(5, 1, 'Discuss with team members', NULL, 0, 0, '2025-12-29 06:28:19', '2025-12-29 06:28:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_attendance` (`user_id`,`date`),
  ADD KEY `idx_attendance_user` (`user_id`),
  ADD KEY `idx_attendance_date` (`date`),
  ADD KEY `idx_attendance_status` (`status`),
  ADD KEY `idx_attendance_company` (`company_id`);

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_audit_user` (`user_id`),
  ADD KEY `idx_audit_module` (`module`),
  ADD KEY `idx_audit_action` (`action`),
  ADD KEY `idx_audit_date` (`created_at`),
  ADD KEY `idx_audit_company` (`company_id`);

--
-- Indexes for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_company_id` (`company_id`),
  ADD KEY `idx_is_deleted` (`is_deleted`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_client_name` (`company_name`),
  ADD KEY `idx_client_status` (`status`),
  ADD KEY `idx_client_owner` (`owner_id`),
  ADD KEY `idx_client_company` (`company_id`),
  ADD KEY `idx_client_deleted` (`is_deleted`);

--
-- Indexes for table `client_contacts`
--
ALTER TABLE `client_contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_contact_client` (`client_id`),
  ADD KEY `idx_contact_email` (`email`),
  ADD KEY `idx_contact_deleted` (`is_deleted`);

--
-- Indexes for table `client_groups`
--
ALTER TABLE `client_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_client_group_client` (`client_id`),
  ADD KEY `idx_client_group_name` (`group_name`);

--
-- Indexes for table `client_labels`
--
ALTER TABLE `client_labels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_client_label_client` (`client_id`),
  ADD KEY `idx_client_label_name` (`label`);

--
-- Indexes for table `client_managers`
--
ALTER TABLE `client_managers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_client_manager` (`client_id`,`user_id`),
  ADD KEY `idx_client_mgr_client` (`client_id`),
  ADD KEY `idx_client_mgr_user` (`user_id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_company_name` (`name`),
  ADD KEY `idx_company_deleted` (`is_deleted`),
  ADD KEY `idx_company_package` (`package_id`);

--
-- Indexes for table `company_packages`
--
ALTER TABLE `company_packages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_package_company` (`company_id`),
  ADD KEY `idx_package_deleted` (`is_deleted`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_company_id` (`company_id`),
  ADD KEY `idx_lead_id` (`lead_id`),
  ADD KEY `idx_assigned_user_id` (`assigned_user_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_contact_type` (`contact_type`),
  ADD KEY `idx_is_deleted` (`is_deleted`);

--
-- Indexes for table `contracts`
--
ALTER TABLE `contracts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `idx_contract_number` (`contract_number`),
  ADD KEY `idx_contract_status` (`status`),
  ADD KEY `idx_contract_client` (`client_id`),
  ADD KEY `idx_contract_company` (`company_id`),
  ADD KEY `idx_contract_deleted` (`is_deleted`);

--
-- Indexes for table `credit_notes`
--
ALTER TABLE `credit_notes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `credit_note_number` (`credit_note_number`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `idx_credit_note_number` (`credit_note_number`),
  ADD KEY `idx_credit_note_invoice` (`invoice_id`),
  ADD KEY `idx_credit_note_company` (`company_id`),
  ADD KEY `idx_credit_note_deleted` (`is_deleted`),
  ADD KEY `credit_notes_ibfk_client` (`client_id`);

--
-- Indexes for table `custom_fields`
--
ALTER TABLE `custom_fields`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_custom_field_module` (`module`),
  ADD KEY `idx_custom_field_company` (`company_id`),
  ADD KEY `idx_custom_field_deleted` (`is_deleted`);

--
-- Indexes for table `custom_field_enabled_in`
--
ALTER TABLE `custom_field_enabled_in`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_field_enabled` (`custom_field_id`,`enabled_in`),
  ADD KEY `idx_custom_field_enabled_field` (`custom_field_id`);

--
-- Indexes for table `custom_field_options`
--
ALTER TABLE `custom_field_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_custom_field_option_field` (`custom_field_id`);

--
-- Indexes for table `custom_field_visibility`
--
ALTER TABLE `custom_field_visibility`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_field_visibility` (`custom_field_id`,`visibility`),
  ADD KEY `idx_custom_field_vis_field` (`custom_field_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `head_id` (`head_id`),
  ADD KEY `idx_dept_name` (`name`),
  ADD KEY `idx_dept_company` (`company_id`),
  ADD KEY `idx_dept_deleted` (`is_deleted`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_document_user` (`user_id`),
  ADD KEY `idx_document_category` (`category`),
  ADD KEY `idx_document_company` (`company_id`),
  ADD KEY `idx_document_deleted` (`is_deleted`),
  ADD KEY `idx_documents_client_id` (`client_id`),
  ADD KEY `idx_documents_lead_id` (`lead_id`),
  ADD KEY `idx_documents_project_id` (`project_id`),
  ADD KEY `idx_documents_user_id` (`user_id`);

--
-- Indexes for table `email_templates`
--
ALTER TABLE `email_templates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_email_template_company` (`company_id`),
  ADD KEY `idx_email_template_deleted` (`is_deleted`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `position_id` (`position_id`),
  ADD KEY `idx_employee_user` (`user_id`),
  ADD KEY `idx_employee_dept` (`department_id`);

--
-- Indexes for table `estimates`
--
ALTER TABLE `estimates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `estimate_number` (`estimate_number`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `idx_estimate_number` (`estimate_number`),
  ADD KEY `idx_estimate_status` (`status`),
  ADD KEY `idx_estimate_client` (`client_id`),
  ADD KEY `idx_estimate_company` (`company_id`),
  ADD KEY `idx_estimate_deleted` (`is_deleted`);

--
-- Indexes for table `estimate_items`
--
ALTER TABLE `estimate_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_estimate_item_estimate` (`estimate_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `host_id` (`host_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `idx_event_date` (`starts_on_date`),
  ADD KEY `idx_event_status` (`status`),
  ADD KEY `idx_event_company` (`company_id`),
  ADD KEY `idx_event_deleted` (`is_deleted`);

--
-- Indexes for table `event_clients`
--
ALTER TABLE `event_clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_event_client` (`event_id`,`client_id`),
  ADD KEY `idx_event_client_event` (`event_id`),
  ADD KEY `idx_event_client_client` (`client_id`);

--
-- Indexes for table `event_departments`
--
ALTER TABLE `event_departments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_event_dept` (`event_id`,`department_id`),
  ADD KEY `idx_event_dept_event` (`event_id`),
  ADD KEY `idx_event_dept_dept` (`department_id`);

--
-- Indexes for table `event_employees`
--
ALTER TABLE `event_employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_event_employee` (`event_id`,`user_id`),
  ADD KEY `idx_event_emp_event` (`event_id`),
  ADD KEY `idx_event_emp_user` (`user_id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `expense_number` (`expense_number`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `idx_expense_number` (`expense_number`),
  ADD KEY `idx_expense_status` (`status`),
  ADD KEY `idx_expense_company` (`company_id`),
  ADD KEY `idx_expense_deleted` (`is_deleted`),
  ADD KEY `idx_expenses_client_id` (`client_id`),
  ADD KEY `idx_expenses_project_id` (`project_id`),
  ADD KEY `idx_expenses_employee_id` (`employee_id`),
  ADD KEY `idx_expenses_category` (`category`),
  ADD KEY `idx_expenses_expense_date` (`expense_date`);

--
-- Indexes for table `expense_items`
--
ALTER TABLE `expense_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_expense_item_expense` (`expense_id`);

--
-- Indexes for table `finance_templates`
--
ALTER TABLE `finance_templates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_finance_template_company` (`company_id`),
  ADD KEY `idx_finance_template_type` (`type`),
  ADD KEY `idx_finance_template_deleted` (`is_deleted`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invoice_number` (`invoice_number`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `idx_invoice_number` (`invoice_number`),
  ADD KEY `idx_invoice_status` (`status`),
  ADD KEY `idx_invoice_client` (`client_id`),
  ADD KEY `idx_invoice_date` (`invoice_date`),
  ADD KEY `idx_invoice_company` (`company_id`),
  ADD KEY `idx_invoice_deleted` (`is_deleted`);

--
-- Indexes for table `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_invoice_item_invoice` (`invoice_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_company_id` (`company_id`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_is_deleted` (`is_deleted`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `idx_lead_email` (`email`),
  ADD KEY `idx_lead_status` (`status`),
  ADD KEY `idx_lead_owner` (`owner_id`),
  ADD KEY `idx_lead_company` (`company_id`),
  ADD KEY `idx_lead_deleted` (`is_deleted`);

--
-- Indexes for table `lead_labels`
--
ALTER TABLE `lead_labels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_lead_label_lead` (`lead_id`),
  ADD KEY `idx_lead_label_name` (`label`);

--
-- Indexes for table `lead_managers`
--
ALTER TABLE `lead_managers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lead_status_history`
--
ALTER TABLE `lead_status_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `changed_by` (`changed_by`),
  ADD KEY `idx_company_id` (`company_id`),
  ADD KEY `idx_lead_id` (`lead_id`),
  ADD KEY `idx_new_status` (`new_status`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `leave_requests`
--
ALTER TABLE `leave_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `approved_by` (`approved_by`),
  ADD KEY `idx_leave_user` (`user_id`),
  ADD KEY `idx_leave_status` (`status`),
  ADD KEY `idx_leave_date` (`start_date`),
  ADD KEY `idx_leave_company` (`company_id`),
  ADD KEY `idx_leave_deleted` (`is_deleted`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_message_from` (`from_user_id`),
  ADD KEY `idx_message_to` (`to_user_id`),
  ADD KEY `idx_message_read` (`is_read`),
  ADD KEY `idx_message_company` (`company_id`),
  ADD KEY `idx_message_deleted` (`is_deleted`);

--
-- Indexes for table `message_recipients`
--
ALTER TABLE `message_recipients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_msg_recipient_msg` (`message_id`),
  ADD KEY `idx_msg_recipient_user` (`user_id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_company` (`company_id`),
  ADD KEY `idx_user` (`user_id`),
  ADD KEY `idx_client` (`client_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_notification_user` (`user_id`),
  ADD KEY `idx_notification_read` (`is_read`),
  ADD KEY `idx_notification_company` (`company_id`);

--
-- Indexes for table `offline_requests`
--
ALTER TABLE `offline_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_company_id` (`company_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_request_type` (`request_type`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_package_id` (`package_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_company_id` (`company_id`),
  ADD KEY `idx_client_id` (`client_id`),
  ADD KEY `idx_invoice_id` (`invoice_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_is_deleted` (`is_deleted`),
  ADD KEY `idx_order_date` (`order_date`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_order_id` (`order_id`),
  ADD KEY `idx_item_id` (`item_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `idx_payment_invoice` (`invoice_id`),
  ADD KEY `idx_payment_status` (`status`),
  ADD KEY `idx_payment_date` (`paid_on`),
  ADD KEY `idx_payment_company` (`company_id`),
  ADD KEY `idx_payment_deleted` (`is_deleted`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `idx_permission_module` (`module`);

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_position_name` (`name`),
  ADD KEY `idx_position_dept` (`department_id`),
  ADD KEY `idx_position_company` (`company_id`),
  ADD KEY `idx_position_deleted` (`is_deleted`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `idx_project_code` (`short_code`),
  ADD KEY `idx_project_status` (`status`),
  ADD KEY `idx_project_client` (`client_id`),
  ADD KEY `idx_project_company` (`company_id`),
  ADD KEY `idx_project_deleted` (`is_deleted`),
  ADD KEY `idx_project_manager` (`project_manager_id`);

--
-- Indexes for table `project_members`
--
ALTER TABLE `project_members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_project_member` (`project_id`,`user_id`),
  ADD KEY `idx_project_member_project` (`project_id`),
  ADD KEY `idx_project_member_user` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_role_company` (`company_id`),
  ADD KEY `idx_role_deleted` (`is_deleted`);

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_role_permission` (`role_id`,`permission_id`),
  ADD KEY `idx_role_perm_role` (`role_id`),
  ADD KEY `idx_role_perm_permission` (`permission_id`);

--
-- Indexes for table `social_leads`
--
ALTER TABLE `social_leads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_social_lead_platform` (`platform`),
  ADD KEY `idx_social_lead_company` (`company_id`),
  ADD KEY `idx_social_lead_deleted` (`is_deleted`);

--
-- Indexes for table `social_media_integrations`
--
ALTER TABLE `social_media_integrations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_company_platform` (`company_id`,`platform`,`is_deleted`),
  ADD KEY `auto_assign_to` (`auto_assign_to`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `idx_social_integration_platform` (`platform`),
  ADD KEY `idx_social_integration_company` (`company_id`),
  ADD KEY `idx_social_integration_status` (`status`),
  ADD KEY `idx_social_integration_deleted` (`is_deleted`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_subscription_client` (`client_id`),
  ADD KEY `idx_subscription_status` (`status`),
  ADD KEY `idx_subscription_company` (`company_id`),
  ADD KEY `idx_subscription_deleted` (`is_deleted`);

--
-- Indexes for table `system_settings`
--
ALTER TABLE `system_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_setting` (`company_id`,`setting_key`),
  ADD KEY `idx_setting_key` (`setting_key`),
  ADD KEY `idx_setting_company` (`company_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `idx_task_code` (`code`),
  ADD KEY `idx_task_status` (`status`),
  ADD KEY `idx_task_project` (`project_id`),
  ADD KEY `idx_task_company` (`company_id`),
  ADD KEY `idx_task_deleted` (`is_deleted`);

--
-- Indexes for table `task_assignees`
--
ALTER TABLE `task_assignees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_task_assignee` (`task_id`,`user_id`),
  ADD KEY `idx_task_assignee_task` (`task_id`),
  ADD KEY `idx_task_assignee_user` (`user_id`);

--
-- Indexes for table `task_comments`
--
ALTER TABLE `task_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_task_comment_task` (`task_id`),
  ADD KEY `idx_task_comment_user` (`user_id`);

--
-- Indexes for table `task_files`
--
ALTER TABLE `task_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_task_file_task` (`task_id`),
  ADD KEY `idx_task_file_user` (`user_id`);

--
-- Indexes for table `task_tags`
--
ALTER TABLE `task_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_task_tag_task` (`task_id`),
  ADD KEY `idx_task_tag_name` (`tag`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ticket_id` (`ticket_id`),
  ADD KEY `assigned_to_id` (`assigned_to_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `idx_ticket_id` (`ticket_id`),
  ADD KEY `idx_ticket_status` (`status`),
  ADD KEY `idx_ticket_client` (`client_id`),
  ADD KEY `idx_ticket_priority` (`priority`),
  ADD KEY `idx_ticket_company` (`company_id`),
  ADD KEY `idx_ticket_deleted` (`is_deleted`);

--
-- Indexes for table `ticket_comments`
--
ALTER TABLE `ticket_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_ticket_comment_ticket` (`ticket_id`),
  ADD KEY `idx_ticket_comment_user` (`user_id`);

--
-- Indexes for table `time_logs`
--
ALTER TABLE `time_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_time_log_user` (`user_id`),
  ADD KEY `idx_time_log_project` (`project_id`),
  ADD KEY `idx_time_log_task` (`task_id`),
  ADD KEY `idx_time_log_date` (`date`),
  ADD KEY `idx_time_log_company` (`company_id`),
  ADD KEY `idx_time_log_deleted` (`is_deleted`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_user_email` (`email`),
  ADD KEY `idx_user_role` (`role`),
  ADD KEY `idx_user_company` (`company_id`),
  ADD KEY `idx_user_deleted` (`is_deleted`);

--
-- Indexes for table `user_sticky_notes`
--
ALTER TABLE `user_sticky_notes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- Indexes for table `user_todos`
--
ALTER TABLE `user_todos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_completed` (`is_completed`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `client_contacts`
--
ALTER TABLE `client_contacts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `client_groups`
--
ALTER TABLE `client_groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `client_labels`
--
ALTER TABLE `client_labels`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `client_managers`
--
ALTER TABLE `client_managers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `company_packages`
--
ALTER TABLE `company_packages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `contracts`
--
ALTER TABLE `contracts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `credit_notes`
--
ALTER TABLE `credit_notes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `custom_fields`
--
ALTER TABLE `custom_fields`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `custom_field_enabled_in`
--
ALTER TABLE `custom_field_enabled_in`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `custom_field_options`
--
ALTER TABLE `custom_field_options`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `custom_field_visibility`
--
ALTER TABLE `custom_field_visibility`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `email_templates`
--
ALTER TABLE `email_templates`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `estimates`
--
ALTER TABLE `estimates`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `estimate_items`
--
ALTER TABLE `estimate_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `event_clients`
--
ALTER TABLE `event_clients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `event_departments`
--
ALTER TABLE `event_departments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `event_employees`
--
ALTER TABLE `event_employees`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `expense_items`
--
ALTER TABLE `expense_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `finance_templates`
--
ALTER TABLE `finance_templates`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `invoice_items`
--
ALTER TABLE `invoice_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `lead_labels`
--
ALTER TABLE `lead_labels`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `lead_managers`
--
ALTER TABLE `lead_managers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `lead_status_history`
--
ALTER TABLE `lead_status_history`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `leave_requests`
--
ALTER TABLE `leave_requests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `message_recipients`
--
ALTER TABLE `message_recipients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `offline_requests`
--
ALTER TABLE `offline_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `positions`
--
ALTER TABLE `positions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `project_members`
--
ALTER TABLE `project_members`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `social_leads`
--
ALTER TABLE `social_leads`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `social_media_integrations`
--
ALTER TABLE `social_media_integrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `system_settings`
--
ALTER TABLE `system_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1403;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `task_assignees`
--
ALTER TABLE `task_assignees`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `task_comments`
--
ALTER TABLE `task_comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `task_files`
--
ALTER TABLE `task_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `task_tags`
--
ALTER TABLE `task_tags`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ticket_comments`
--
ALTER TABLE `ticket_comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `time_logs`
--
ALTER TABLE `time_logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `user_sticky_notes`
--
ALTER TABLE `user_sticky_notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_todos`
--
ALTER TABLE `user_todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `audit_logs_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `clients_ibfk_2` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `client_contacts`
--
ALTER TABLE `client_contacts`
  ADD CONSTRAINT `client_contacts_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `client_groups`
--
ALTER TABLE `client_groups`
  ADD CONSTRAINT `client_groups_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `client_labels`
--
ALTER TABLE `client_labels`
  ADD CONSTRAINT `client_labels_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `client_managers`
--
ALTER TABLE `client_managers`
  ADD CONSTRAINT `client_managers_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `client_managers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `fk_company_package` FOREIGN KEY (`package_id`) REFERENCES `company_packages` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `company_packages`
--
ALTER TABLE `company_packages`
  ADD CONSTRAINT `fk_company_packages_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `contacts_ibfk_2` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `contacts_ibfk_3` FOREIGN KEY (`assigned_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `contracts`
--
ALTER TABLE `contracts`
  ADD CONSTRAINT `contracts_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `contracts_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `contracts_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `contracts_ibfk_4` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `credit_notes`
--
ALTER TABLE `credit_notes`
  ADD CONSTRAINT `credit_notes_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `credit_notes_ibfk_2` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `credit_notes_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `credit_notes_ibfk_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `custom_fields`
--
ALTER TABLE `custom_fields`
  ADD CONSTRAINT `custom_fields_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `custom_field_enabled_in`
--
ALTER TABLE `custom_field_enabled_in`
  ADD CONSTRAINT `custom_field_enabled_in_ibfk_1` FOREIGN KEY (`custom_field_id`) REFERENCES `custom_fields` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `custom_field_options`
--
ALTER TABLE `custom_field_options`
  ADD CONSTRAINT `custom_field_options_ibfk_1` FOREIGN KEY (`custom_field_id`) REFERENCES `custom_fields` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `custom_field_visibility`
--
ALTER TABLE `custom_field_visibility`
  ADD CONSTRAINT `custom_field_visibility_ibfk_1` FOREIGN KEY (`custom_field_id`) REFERENCES `custom_fields` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `departments_ibfk_2` FOREIGN KEY (`head_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `documents_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `email_templates`
--
ALTER TABLE `email_templates`
  ADD CONSTRAINT `email_templates_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `employees_ibfk_3` FOREIGN KEY (`position_id`) REFERENCES `positions` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `estimates`
--
ALTER TABLE `estimates`
  ADD CONSTRAINT `estimates_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `estimates_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `estimates_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `estimates_ibfk_4` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `estimate_items`
--
ALTER TABLE `estimate_items`
  ADD CONSTRAINT `estimate_items_ibfk_1` FOREIGN KEY (`estimate_id`) REFERENCES `estimates` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`host_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `events_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `event_clients`
--
ALTER TABLE `event_clients`
  ADD CONSTRAINT `event_clients_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `event_clients_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `event_departments`
--
ALTER TABLE `event_departments`
  ADD CONSTRAINT `event_departments_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `event_departments_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `event_employees`
--
ALTER TABLE `event_employees`
  ADD CONSTRAINT `event_employees_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `event_employees_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `expenses_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `expense_items`
--
ALTER TABLE `expense_items`
  ADD CONSTRAINT `expense_items_ibfk_1` FOREIGN KEY (`expense_id`) REFERENCES `expenses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `finance_templates`
--
ALTER TABLE `finance_templates`
  ADD CONSTRAINT `finance_templates_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `invoices_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `invoices_ibfk_4` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD CONSTRAINT `invoice_items_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `leads`
--
ALTER TABLE `leads`
  ADD CONSTRAINT `leads_created_by_fk` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `leads_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `leads_owner_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `lead_labels`
--
ALTER TABLE `lead_labels`
  ADD CONSTRAINT `lead_labels_ibfk_1` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `lead_status_history`
--
ALTER TABLE `lead_status_history`
  ADD CONSTRAINT `lead_status_history_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `lead_status_history_ibfk_2` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `lead_status_history_ibfk_3` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `leave_requests`
--
ALTER TABLE `leave_requests`
  ADD CONSTRAINT `leave_requests_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `leave_requests_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `leave_requests_ibfk_3` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`from_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`to_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `message_recipients`
--
ALTER TABLE `message_recipients`
  ADD CONSTRAINT `message_recipients_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `message_recipients_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `offline_requests`
--
ALTER TABLE `offline_requests`
  ADD CONSTRAINT `fk_offline_package` FOREIGN KEY (`package_id`) REFERENCES `company_packages` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `offline_requests_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`),
  ADD CONSTRAINT `payments_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `payments_ibfk_4` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `positions`
--
ALTER TABLE `positions`
  ADD CONSTRAINT `positions_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `positions_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `projects_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `projects_ibfk_4` FOREIGN KEY (`project_manager_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `project_members`
--
ALTER TABLE `project_members`
  ADD CONSTRAINT `project_members_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_members_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `social_leads`
--
ALTER TABLE `social_leads`
  ADD CONSTRAINT `social_leads_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `social_media_integrations`
--
ALTER TABLE `social_media_integrations`
  ADD CONSTRAINT `social_media_integrations_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `social_media_integrations_ibfk_2` FOREIGN KEY (`auto_assign_to`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `social_media_integrations_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `subscriptions_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `system_settings`
--
ALTER TABLE `system_settings`
  ADD CONSTRAINT `system_settings_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `tasks_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `task_assignees`
--
ALTER TABLE `task_assignees`
  ADD CONSTRAINT `task_assignees_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_assignees_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `task_comments`
--
ALTER TABLE `task_comments`
  ADD CONSTRAINT `task_comments_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `task_files`
--
ALTER TABLE `task_files`
  ADD CONSTRAINT `task_files_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_files_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `task_tags`
--
ALTER TABLE `task_tags`
  ADD CONSTRAINT `task_tags_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tickets_ibfk_3` FOREIGN KEY (`assigned_to_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `tickets_ibfk_4` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `ticket_comments`
--
ALTER TABLE `ticket_comments`
  ADD CONSTRAINT `ticket_comments_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ticket_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `time_logs`
--
ALTER TABLE `time_logs`
  ADD CONSTRAINT `time_logs_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `time_logs_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `time_logs_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `time_logs_ibfk_4` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_sticky_notes`
--
ALTER TABLE `user_sticky_notes`
  ADD CONSTRAINT `user_sticky_notes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_todos`
--
ALTER TABLE `user_todos`
  ADD CONSTRAINT `user_todos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
