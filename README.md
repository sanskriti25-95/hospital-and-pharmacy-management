# 🏥 Hospital Management System

A modern, web-based hospital management system built with Java backend and vanilla JavaScript frontend. This comprehensive system manages patient records, doctor information, appointments, medical history, prescriptions, lab reports, and vital signs tracking.

![Java](https://img.shields.io/badge/Java-8+-orange?style=flat-square)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

### 🏠 Main Application
- **Patient Management**: Add and view patient records with complete demographic information
- **Doctor Directory**: Browse detailed doctor profiles including specializations, cabin numbers, timings, and experience
- **Appointment Booking**: Smart appointment scheduling with time slot management
  - 30-minute time slots from 9:00 AM to 5:00 PM
  - Maximum 3 patients per time slot
  - Daily booking limit of 20 appointments per doctor
  - Real-time availability checking

### 📊 Patient Dashboard
Comprehensive patient health record system featuring:
- **Patient Information**: Complete demographic and contact details
- **Medical Background**: Allergies and chronic conditions tracking
- **Vital Signs**: Real-time health metrics monitoring
  - Blood Pressure
  - Heart Rate
  - Temperature
  - Weight & BMI
  - Oxygen Saturation
- **Medical History**: Complete disease and condition tracking with status management
- **Prescriptions**: Detailed prescription records with medications
  - Medicine names and dosages
  - Frequency and duration
  - Special instructions
- **Lab Reports**: Comprehensive laboratory test results
  - Blood tests
  - X-rays and imaging
  - Test results and notes
- **Appointment History**: Complete record of past and upcoming appointments

## 🛠️ Technology Stack

### Backend
- **Java 8+**: Core application logic and REST API
- **Java HttpServer**: Lightweight embedded web server
- **JDBC**: Database connectivity
- **MySQL 8.0**: Relational database management

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations and gradients
- **JavaScript (ES6+)**: Async/await for API calls, dynamic UI updates
- **Google Fonts**: Inter font family for clean typography

### Database
- **MySQL 8.0**: Relational database with the following tables:
  - `patients`: Patient demographic information
  - `doctors`: Doctor profiles and schedules
  - `appointments`: Appointment bookings with time slots
  - `medical_history`: Patient medical conditions
  - `prescriptions`: Prescription records
  - `medications`: Prescribed medicines
  - `lab_reports`: Laboratory test results
  - `vitals`: Health metrics tracking

## 📋 Prerequisites

- **Java Development Kit (JDK) 8 or higher**
- **MySQL Server 8.0+**
- **MySQL Connector/J** (included in project)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## 🚀 Installation & Setup

### 1. Clone or Download the Project

```bash
git clone <repository-url>
cd Hospital-Management-System
```

### 2. Database Setup

Start MySQL server and run the following SQL scripts in order:

```bash
# Connect to MySQL
mysql -u root -p
```

Then execute the schema files:

```sql
-- Execute the setup script
source setup_database.sql;

-- Execute the patient dashboard schema
source patient_dashboard_schema.sql;
```

Or use MySQL Workbench to execute these files.

**Database Configuration:**
- Host: `localhost:3306`
- Database: `hospital`
- Username: `root`
- Password: *(empty - update in WebServerMain.java if different)*

### 3. Update Database Credentials (if needed)

Edit `src/HospitalManagementSystem/WebServerMain.java`:

```java
private static final String url = "jdbc:mysql://localhost:3306/hospital";
private static final String username = "root";
private static final String password = "YOUR_PASSWORD"; // Update if needed
```

### 4. Compile the Application

```bash
# Navigate to project directory
cd Hospital-Management-System

# Compile Java files
javac -cp "mysql-connector-j-8.2.0.jar;." -d . src/HospitalManagementSystem/*.java
```

**Note:** On Linux/Mac, use colon `:` instead of semicolon `;`:
```bash
javac -cp "mysql-connector-j-8.2.0.jar:." -d . src/HospitalManagementSystem/*.java
```

### 5. Run the Application

```bash
# Start the web server
java -cp "mysql-connector-j-8.2.0.jar;." HospitalManagementSystem.WebServerMain
```

**Note:** On Linux/Mac:
```bash
java -cp "mysql-connector-j-8.2.0.jar:." HospitalManagementSystem.WebServerMain
```

You should see:
```
Web server started at http://localhost:8080
```

### 6. Access the Application

Open your web browser and navigate to:
- **Main Application**: http://localhost:8080
- **Patient Dashboard**: http://localhost:8080/dashboard.html

## 📁 Project Structure

```
Hospital-Management-System/
├── src/
│   └── HospitalManagementSystem/
│       ├── WebServerMain.java          # Application entry point
│       └── WebServer.java              # HTTP server and REST API
├── web/
│   ├── index.html                      # Main application page
│   ├── dashboard.html                  # Patient dashboard page
│   ├── styles.css                      # Main application styles
│   ├── dashboard.css                   # Dashboard styles
│   ├── animations.css                  # CSS animations
│   ├── app.js                          # Main application logic
│   └── dashboard.js                    # Dashboard logic
├── mysql-connector-j-8.2.0.jar         # MySQL JDBC driver
├── setup_database.sql                  # Initial database schema
├── patient_dashboard_schema.sql        # Dashboard tables and sample data
└── README.md                           # This file
```

## 🔌 API Endpoints

### Patient Management
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Add new patient
- `GET /api/patient-dashboard?patient_id=X` - Get complete patient info

### Doctor Management
- `GET /api/doctors` - Get all doctors with details

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Book new appointment

### Medical Records
- `GET /api/medical-history?patient_id=X` - Get patient medical history
- `GET /api/prescriptions?patient_id=X` - Get patient prescriptions
- `GET /api/medications?prescription_id=X` - Get prescription medications
- `GET /api/lab-reports?patient_id=X` - Get patient lab reports
- `GET /api/vitals?patient_id=X` - Get patient vital signs

## 💡 Usage Guide

### Adding a Patient
1. Navigate to the **Patients** tab
2. Fill in the patient's name, age, and gender
3. Click **Add Patient**
4. Patient will appear in the list below

### Viewing Doctors
1. Click on the **Doctors** tab
2. Browse the list of available doctors
3. View their specializations, cabin numbers, timings, and experience

### Booking an Appointment
1. Go to the **Appointments** tab
2. Select a patient from the dropdown
3. Select a doctor
4. Choose an appointment date
5. Select a time slot (9:00 AM - 5:00 PM in 30-minute intervals)
6. Click **Book Appointment**
7. System will validate slot availability and confirm booking

### Accessing Patient Dashboard
1. Click **Patient Dashboard** in the navigation
2. Select a patient from the dropdown
3. View comprehensive medical records across different tabs:
   - Vital Signs
   - Medical History
   - Prescriptions
   - Lab Reports
   - Appointments

## 🎨 Design Features

### User Interface
- **Minimalistic Design**: Clean, modern interface with professional aesthetics
- **Color Scheme**: Primary blue (#2563eb) with gradient accents
- **Typography**: Inter font family for optimal readability
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: Fade-in, slide-in, and hover effects

### User Experience
- **Real-time Validation**: Instant feedback on form submissions
- **Loading States**: Visual indicators during data fetching
- **Empty States**: Informative messages when no data is available
- **Status Badges**: Color-coded indicators for medical conditions
- **Tab Navigation**: Easy access to different sections

## 🔒 Security Considerations

⚠️ **Important**: This is a demonstration project. For production use, implement:

- User authentication and authorization
- Role-based access control (Admin, Doctor, Receptionist)
- Password encryption
- SQL injection prevention (using PreparedStatements - already implemented)
- HTTPS/SSL encryption
- Session management
- Input validation and sanitization
- CORS configuration
- Rate limiting
- Audit logging

## 🐛 Troubleshooting

### Server won't start
- Ensure MySQL service is running
- Check if port 8080 is available
- Verify database credentials in WebServerMain.java
- Ensure JDBC driver is in the correct location

### Database connection errors
- Verify MySQL is running: `mysql -u root -p`
- Check database exists: `SHOW DATABASES;`
- Confirm user has permissions: `GRANT ALL ON hospital.* TO 'root'@'localhost';`

### Slot booking not working
- Check DEBUG output in terminal for slot availability
- Verify `appointment_time` and `max_patients_per_slot` columns exist
- Ensure doctors table has `max_patients_per_slot` values

### Dashboard not loading data
- Open browser console (F12) to check for errors
- Verify patient ID is selected
- Check terminal for API errors
- Ensure all dashboard tables are created

## 📝 Sample Data

The system includes sample data for testing:
- 6 Indian doctors with various specializations
- Sample medical history records
- Sample prescriptions with medications
- Lab reports (blood tests, lipid profiles)
- Vital signs records

## 🚀 Future Enhancements

- [ ] User authentication system
- [ ] Email notifications for appointments
- [ ] SMS reminders
- [ ] File upload for lab reports
- [ ] Print prescription functionality
- [ ] Doctor dashboard
- [ ] Admin panel
- [ ] Payment integration
- [ ] Inventory management
- [ ] Analytics and reporting
- [ ] Mobile application

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Hospital Management System - A modern web application for healthcare management.

## 🙏 Acknowledgments

- Google Fonts for the Inter font family
- MySQL for the robust database system
- Java community for excellent documentation

---

**Note**: This is an educational project demonstrating web application development with Java backend and vanilla JavaScript frontend. Consult with healthcare IT professionals before deploying in a production environment.

For questions or support, please open an issue in the repository.
