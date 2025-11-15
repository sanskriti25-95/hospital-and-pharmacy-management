# 📦 Project Overview

## Hospital Management System - Web Application

A complete, modern web-based hospital management system with patient records, appointments, medical history, prescriptions, and health monitoring.

---

## 📂 Project Structure

```
Hospital-Management-System/
│
├── 📄 Documentation
│   ├── README.md                       ⭐ Complete documentation
│   ├── QUICKSTART.md                   🚀 5-minute setup guide
│   ├── CONFIGURATION.md                ⚙️ Configuration options
│   └── LICENSE                         📜 MIT License
│
├── 🗄️ Database Scripts
│   ├── setup_database.sql              📊 Initial database schema
│   ├── patient_dashboard_schema.sql    📋 Dashboard tables & sample data
│   ├── update_doctors.sql              👨‍⚕️ Doctor data updates
│   └── add_timing_feature.sql          ⏰ Appointment timing feature
│
├── ☕ Java Backend
│   └── src/HospitalManagementSystem/
│       ├── WebServerMain.java          🎯 Application entry point
│       └── WebServer.java              🌐 HTTP server & REST API
│
├── 🎨 Frontend
│   └── web/
│       ├── index.html                  🏠 Main application page
│       ├── dashboard.html              📊 Patient dashboard
│       ├── styles.css                  💅 Main styles
│       ├── dashboard.css               💅 Dashboard styles
│       ├── animations.css              ✨ CSS animations
│       ├── app.js                      ⚡ Main application logic
│       └── dashboard.js                ⚡ Dashboard logic
│
├── 🚀 Startup Scripts
│   ├── start.bat                       🪟 Windows startup
│   └── start.sh                        🐧 Linux/Mac startup
│
└── 📚 Dependencies
    └── mysql-connector-j-8.2.0.jar     🔌 MySQL JDBC driver
```

---

## 🎯 Quick Reference

### Start the Application

**Windows:**
```bash
# Double-click start.bat OR run:
start.bat
```

**Linux/Mac:**
```bash
./start.sh
```

**Manual:**
```bash
# Compile
javac -cp "mysql-connector-j-8.2.0.jar;." -d . src/HospitalManagementSystem/*.java

# Run (Windows)
java -cp "mysql-connector-j-8.2.0.jar;." HospitalManagementSystem.WebServerMain

# Run (Linux/Mac)
java -cp "mysql-connector-j-8.2.0.jar:." HospitalManagementSystem.WebServerMain
```

### Access URLs

- **Main Application**: http://localhost:8080
- **Patient Dashboard**: http://localhost:8080/dashboard.html

### Database Setup

```sql
-- Execute in order:
source setup_database.sql;
source patient_dashboard_schema.sql;
```

---

## 🌟 Key Features

### Main Application
✅ Patient management (add, view)
✅ Doctor directory with details
✅ Smart appointment booking
✅ Time slot management (30-min intervals)
✅ Slot availability checking
✅ Daily booking limits

### Patient Dashboard
✅ Complete patient information
✅ Medical background tracking
✅ Vital signs monitoring
✅ Medical history with status
✅ Prescription management
✅ Medication tracking
✅ Lab reports
✅ Appointment history

---

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| Backend | Java 8+ |
| Web Server | Java HttpServer |
| Database | MySQL 8.0+ |
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Styling | Custom CSS with animations |
| Fonts | Inter (Google Fonts) |

---

## 📊 Database Schema

### Tables
1. **patients** - Patient demographic data
2. **doctors** - Doctor profiles and schedules
3. **appointments** - Appointment bookings
4. **medical_history** - Medical conditions
5. **prescriptions** - Prescription records
6. **medications** - Prescribed medicines
7. **lab_reports** - Test results
8. **vitals** - Health metrics

### Key Fields
- Appointment slots: 9:00 AM - 5:00 PM
- Max patients per slot: 3 (configurable)
- Daily appointment limit: 20 per doctor

---

## 🔌 API Endpoints

### Patient APIs
- `GET /api/patients` - List all patients
- `POST /api/patients` - Add new patient
- `GET /api/patient-dashboard?patient_id=X` - Complete patient data

### Doctor APIs
- `GET /api/doctors` - List all doctors

### Appointment APIs
- `GET /api/appointments` - List all appointments
- `POST /api/appointments` - Book appointment

### Medical Record APIs
- `GET /api/medical-history?patient_id=X`
- `GET /api/prescriptions?patient_id=X`
- `GET /api/medications?prescription_id=X`
- `GET /api/lab-reports?patient_id=X`
- `GET /api/vitals?patient_id=X`

---

## 🎨 UI Features

### Design
- Minimalistic, clean interface
- Primary color: #2563eb (blue)
- Inter font family
- Smooth animations
- Responsive layout

### Components
- Tab-based navigation
- Color-coded status badges
- Gradient vital cards
- Loading states
- Empty states
- Hover effects

---

## 📝 Sample Data Included

✅ 6 Indian doctors (various specializations)
✅ Sample patients
✅ Medical history records
✅ Prescriptions with medications
✅ Lab reports (blood tests)
✅ Vital signs data
✅ Appointment bookings

---

## 🔒 Security Notes

⚠️ **This is a demonstration project**

For production use, implement:
- User authentication
- Role-based access control
- Password encryption
- HTTPS/SSL
- Input validation
- Session management
- Audit logging

---

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Complete project documentation |
| QUICKSTART.md | 5-minute setup guide |
| CONFIGURATION.md | Configuration & customization |
| LICENSE | MIT License terms |

---

## 🚀 Getting Started

1. **Read**: [QUICKSTART.md](QUICKSTART.md) for setup
2. **Configure**: [CONFIGURATION.md](CONFIGURATION.md) for customization
3. **Run**: Execute `start.bat` (Windows) or `./start.sh` (Linux/Mac)
4. **Access**: http://localhost:8080

---

## 🆘 Support

- Check [README.md](README.md) troubleshooting section
- Review [CONFIGURATION.md](CONFIGURATION.md) for settings
- Open an issue on the repository

---

## 📅 Version

**Version**: 1.0.0
**Date**: November 2025
**Status**: Production Ready (Educational)

---

**Made with ❤️ for healthcare management**
