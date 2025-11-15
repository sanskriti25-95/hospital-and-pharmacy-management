-- Patient Dashboard Schema
-- Add new tables for medical records, prescriptions, and health history

USE hospital;

-- Update patients table with more details
ALTER TABLE patients 
ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS email VARCHAR(100),
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS blood_group VARCHAR(10),
ADD COLUMN IF NOT EXISTS emergency_contact VARCHAR(100),
ADD COLUMN IF NOT EXISTS emergency_phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS allergies TEXT,
ADD COLUMN IF NOT EXISTS chronic_conditions TEXT,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Medical history table
CREATE TABLE IF NOT EXISTS medical_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    condition_name VARCHAR(200),
    diagnosis_date DATE,
    status VARCHAR(50), -- Active, Resolved, Chronic
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_id INT,
    prescription_date DATE,
    diagnosis TEXT,
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL
);

-- Medications table (linked to prescriptions)
CREATE TABLE IF NOT EXISTS medications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prescription_id INT NOT NULL,
    medicine_name VARCHAR(200),
    dosage VARCHAR(100),
    frequency VARCHAR(100), -- e.g., "Twice daily", "After meals"
    duration VARCHAR(50), -- e.g., "7 days", "2 weeks"
    instructions TEXT,
    FOREIGN KEY (prescription_id) REFERENCES prescriptions(id) ON DELETE CASCADE
);

-- Lab reports table
CREATE TABLE IF NOT EXISTS lab_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    appointment_id INT,
    report_type VARCHAR(100), -- Blood Test, X-Ray, MRI, etc.
    report_date DATE,
    test_name VARCHAR(200),
    results TEXT,
    report_file VARCHAR(255), -- Path to file if uploaded
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL
);

-- Vitals/Health metrics table
CREATE TABLE IF NOT EXISTS vitals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    appointment_id INT,
    recorded_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    blood_pressure VARCHAR(20),
    heart_rate INT,
    temperature DECIMAL(4,1),
    weight DECIMAL(5,2),
    height DECIMAL(5,2),
    bmi DECIMAL(4,2),
    oxygen_saturation INT,
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL
);

-- Sample data for testing
-- Insert sample medical history
INSERT INTO medical_history (patient_id, condition_name, diagnosis_date, status, notes) VALUES
(1, 'Hypertension', '2024-01-15', 'Active', 'Regular monitoring required'),
(1, 'Type 2 Diabetes', '2023-06-20', 'Active', 'Controlled with medication');

-- Insert sample prescriptions
INSERT INTO prescriptions (patient_id, doctor_id, prescription_date, diagnosis, notes) VALUES
(1, 10, '2025-11-10', 'Seasonal Flu', 'Rest and medication for 5 days'),
(1, 10, '2025-10-15', 'Hypertension follow-up', 'Continue current medication');

-- Insert sample medications
INSERT INTO medications (prescription_id, medicine_name, dosage, frequency, duration, instructions) VALUES
(1, 'Paracetamol', '500mg', 'Three times daily', '5 days', 'Take after meals'),
(1, 'Azithromycin', '250mg', 'Once daily', '3 days', 'Take on empty stomach'),
(2, 'Amlodipine', '5mg', 'Once daily', '30 days', 'Take in the morning');

-- Insert sample lab reports
INSERT INTO lab_reports (patient_id, report_type, report_date, test_name, results, notes) VALUES
(1, 'Blood Test', '2025-11-01', 'Complete Blood Count', 'Hemoglobin: 14.5 g/dL (Normal)\nWBC: 7500 cells/mcL (Normal)\nPlatelets: 250,000/mcL (Normal)', 'All values within normal range'),
(1, 'Blood Test', '2025-10-01', 'Lipid Profile', 'Total Cholesterol: 180 mg/dL\nLDL: 110 mg/dL\nHDL: 55 mg/dL\nTriglycerides: 120 mg/dL', 'Lipid levels are acceptable');

-- Insert sample vitals
INSERT INTO vitals (patient_id, recorded_date, blood_pressure, heart_rate, temperature, weight, height, bmi, oxygen_saturation) VALUES
(1, '2025-11-10 10:30:00', '130/85', 78, 98.6, 75.5, 175.0, 24.7, 98),
(1, '2025-10-15 09:15:00', '128/82', 75, 98.4, 76.0, 175.0, 24.8, 99);
