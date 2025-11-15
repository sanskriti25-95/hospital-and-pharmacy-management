-- Hospital Management System Database Setup
-- Run this script to create the database and tables

-- Create database
CREATE DATABASE IF NOT EXISTS hospital;
USE hospital;

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100) NOT NULL
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

-- Insert sample doctors (optional)
INSERT INTO doctors (name, specialization) VALUES
('Dr. John Smith', 'Cardiologist'),
('Dr. Sarah Johnson', 'Pediatrician'),
('Dr. Michael Brown', 'Neurologist'),
('Dr. Emily Davis', 'Orthopedic');

-- Display success message
SELECT 'Database setup completed successfully!' AS Status;
SELECT 'Sample doctors added to the system' AS Info;
