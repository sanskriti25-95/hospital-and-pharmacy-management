# 🚀 Quick Start Guide

Get the Hospital Management System up and running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Java 8 or higher installed: `java -version`
- ✅ MySQL 8.0+ installed and running
- ✅ A modern web browser

## Step-by-Step Setup

### 1️⃣ Database Setup (2 minutes)

Open MySQL Workbench or MySQL command line:

```sql
-- Execute these files in order:
source setup_database.sql;
source patient_dashboard_schema.sql;
```

Or manually run:
```bash
mysql -u root -p < setup_database.sql
mysql -u root -p < patient_dashboard_schema.sql
```

### 2️⃣ Configure Database Connection (30 seconds)

Open `src/HospitalManagementSystem/WebServerMain.java` and update if needed:

```java
private static final String password = ""; // Add your MySQL password
```

### 3️⃣ Compile & Run (1 minute)

**Windows:**
```bash
cd Hospital-Management-System
javac -cp "mysql-connector-j-8.2.0.jar;." -d . src/HospitalManagementSystem/*.java
java -cp "mysql-connector-j-8.2.0.jar;." HospitalManagementSystem.WebServerMain
```

**Linux/Mac:**
```bash
cd Hospital-Management-System
javac -cp "mysql-connector-j-8.2.0.jar:." -d . src/HospitalManagementSystem/*.java
java -cp "mysql-connector-j-8.2.0.jar:." HospitalManagementSystem.WebServerMain
```

### 4️⃣ Access the Application (30 seconds)

Open your browser and navigate to:
- **Main App**: http://localhost:8080
- **Patient Dashboard**: http://localhost:8080/dashboard.html

## 🎉 You're All Set!

### Try These Features:

1. **Add a Patient**
   - Go to Patients tab
   - Enter name, age, gender
   - Click "Add Patient"

2. **View Doctors**
   - Click Doctors tab
   - See 6 pre-loaded Indian doctors

3. **Book an Appointment**
   - Go to Appointments tab
   - Select patient and doctor
   - Choose date and time
   - Click "Book Appointment"

4. **View Patient Dashboard**
   - Click "Patient Dashboard" link
   - Select a patient
   - Explore medical records, prescriptions, vitals, etc.

## 🆘 Troubleshooting

**Port 8080 already in use?**
```bash
# Find and kill the process using port 8080
# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:8080 | xargs kill -9
```

**MySQL connection error?**
- Start MySQL service
- Verify credentials in WebServerMain.java
- Check if 'hospital' database exists: `SHOW DATABASES;`

**Compilation errors?**
- Ensure JDK 8+ is installed
- Verify mysql-connector-j-8.2.0.jar exists
- Check file paths are correct

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the API endpoints
- Customize the UI in web/ folder
- Add your own features!

---

Need help? Check the troubleshooting section in README.md or open an issue.
