-- Add appointment time and enhance availability checking
USE hospital;

-- Add time column to appointments table
ALTER TABLE appointments 
ADD COLUMN IF NOT EXISTS appointment_time TIME;

-- Add max patients per slot to doctors table
ALTER TABLE doctors 
ADD COLUMN IF NOT EXISTS max_patients_per_slot INT DEFAULT 3;

-- Update existing doctors with max patients
UPDATE doctors SET max_patients_per_slot = 3;

SELECT 'Database schema updated successfully!' AS Status;
