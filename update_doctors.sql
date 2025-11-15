-- Update doctors table with additional details
USE hospital;

-- Add new columns to doctors table
ALTER TABLE doctors 
ADD COLUMN IF NOT EXISTS cabin VARCHAR(50),
ADD COLUMN IF NOT EXISTS timing VARCHAR(100),
ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS experience INT;

-- Disable safe update mode temporarily
SET SQL_SAFE_UPDATES = 0;

-- Clear existing data
DELETE FROM doctors;

-- Re-enable safe update mode
SET SQL_SAFE_UPDATES = 1;

-- Insert doctors with complete details
INSERT INTO doctors (name, specialization, cabin, timing, phone, experience) VALUES
('Dr. Rajesh Kumar', 'Cardiologist', 'Cabin 101', '9:00 AM - 2:00 PM', '+91-9876543210', 15),
('Dr. Priya Sharma', 'Pediatrician', 'Cabin 205', '10:00 AM - 4:00 PM', '+91-9876543211', 12),
('Dr. Arjun Patel', 'Neurologist', 'Cabin 302', '8:00 AM - 1:00 PM', '+91-9876543212', 18),
('Dr. Anjali Reddy', 'Orthopedic', 'Cabin 103', '11:00 AM - 5:00 PM', '+91-9876543213', 10),
('Dr. Vikram Singh', 'Dermatologist', 'Cabin 207', '9:30 AM - 3:30 PM', '+91-9876543214', 8),
('Dr. Neha Gupta', 'Gynecologist', 'Cabin 304', '2:00 PM - 6:00 PM', '+91-9876543215', 14);

SELECT * FROM doctors;
