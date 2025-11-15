# ⚙️ Configuration Guide

## Database Configuration

### Connection Settings

Edit `src/HospitalManagementSystem/WebServerMain.java`:

```java
private static final String url = "jdbc:mysql://localhost:3306/hospital";
private static final String username = "root";
private static final String password = ""; // Your MySQL password
```

### Changing Database Name

If you want to use a different database name:

1. Update the URL in `WebServerMain.java`:
```java
private static final String url = "jdbc:mysql://localhost:3306/YOUR_DB_NAME";
```

2. Update all SQL files:
```sql
CREATE DATABASE YOUR_DB_NAME;
USE YOUR_DB_NAME;
```

### Remote Database

To connect to a remote MySQL server:

```java
private static final String url = "jdbc:mysql://YOUR_HOST:3306/hospital";
private static final String username = "YOUR_USERNAME";
private static final String password = "YOUR_PASSWORD";
```

## Server Configuration

### Changing Port Number

Edit `src/HospitalManagementSystem/WebServerMain.java`:

```java
public static void main(String[] args) throws Exception {
    // ... connection code ...
    
    WebServer server = new WebServer(connection, 8080); // Change port here
    server.start();
    System.out.println("Web server started at http://localhost:8080"); // Update message
}
```

### Web Root Directory

The web files are served from the `web/` folder. To change this location, edit `src/HospitalManagementSystem/WebServer.java`:

```java
public WebServer(Connection connection, int port) throws IOException {
    this.connection = connection;
    this.port = port;
    this.webRoot = new File("web"); // Change folder name here
    // ...
}
```

## Application Settings

### Appointment Slot Configuration

Edit `src/HospitalManagementSystem/WebServer.java` in the `handleAppointments` method:

**Maximum patients per time slot:**
```java
int maxPatients = 3; // Change default value
```

Or update in the database:
```sql
UPDATE doctors SET max_patients_per_slot = 5 WHERE id = 10;
```

**Daily appointment limit:**
```java
if(totalDayBookings >= 20){ // Change this number
    writeJson(exchange, 200, "{\"status\":\"doctor_busy\",...}");
    return;
}
```

### Time Slots

Edit `web/index.html` to modify available time slots:

```html
<select id="a-time">
    <option value="">Select Time</option>
    <option value="09:00:00">9:00 AM</option>
    <option value="09:30:00">9:30 AM</option>
    <!-- Add or remove time slots here -->
    <option value="17:00:00">5:00 PM</option>
</select>
```

## UI Customization

### Color Scheme

Edit `web/styles.css` and `web/dashboard.css`:

```css
:root {
  --primary: #2563eb;        /* Primary color */
  --primary-hover: #1d4ed8;  /* Hover state */
  --text: #0f172a;           /* Text color */
  --text-light: #64748b;     /* Light text */
  --border: #e2e8f0;         /* Border color */
}
```

### Fonts

Change the font family in CSS files:

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}
```

### Dashboard Gradients

Edit `web/dashboard.css` for vital card colors:

```css
.vital-card.bp { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.vital-card.hr { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
/* Modify gradient colors here */
```

## Sample Data

### Adding Sample Doctors

Edit `setup_database.sql` or run:

```sql
INSERT INTO doctors (name, specialization, cabin, timing, phone, experience, max_patients_per_slot) 
VALUES ('Dr. John Doe', 'General Physician', 'Cabin 101', '9:00 AM - 5:00 PM', '+1-234-567-8900', 15, 3);
```

### Adding Sample Patients

```sql
INSERT INTO patients (name, age, gender, phone, email, blood_group) 
VALUES ('Jane Smith', 35, 'Female', '555-0123', 'jane@example.com', 'O+');
```

### Sample Medical Records

```sql
-- Medical history
INSERT INTO medical_history (patient_id, condition_name, diagnosis_date, status, notes) 
VALUES (1, 'Hypertension', '2024-01-15', 'Active', 'Regular monitoring required');

-- Prescriptions
INSERT INTO prescriptions (patient_id, doctor_id, prescription_date, diagnosis, notes) 
VALUES (1, 1, '2025-11-15', 'Seasonal Flu', 'Rest and medication');

-- Medications
INSERT INTO medications (prescription_id, medicine_name, dosage, frequency, duration, instructions) 
VALUES (1, 'Paracetamol', '500mg', 'Three times daily', '5 days', 'Take after meals');

-- Vitals
INSERT INTO vitals (patient_id, blood_pressure, heart_rate, temperature, weight, height, oxygen_saturation) 
VALUES (1, '120/80', 72, 98.6, 70.0, 170.0, 98);
```

## Security Configuration

### Enable HTTPS (Production)

For production deployment, configure SSL:

1. Obtain SSL certificate
2. Use a reverse proxy (nginx, Apache)
3. Or implement Java HTTPS server

Example nginx configuration:
```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:8080;
    }
}
```

### Database Security

1. Create dedicated database user:
```sql
CREATE USER 'hospital_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON hospital.* TO 'hospital_user'@'localhost';
FLUSH PRIVILEGES;
```

2. Update WebServerMain.java with new credentials

### CORS Configuration

To allow cross-origin requests, edit `WebServer.java`:

```java
private void handleStatic(HttpExchange exchange) {
    exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
    // ... rest of the code
}
```

## Performance Tuning

### Database Connection Pooling

For production, implement connection pooling using HikariCP or similar.

### Caching

Add caching for frequently accessed data like doctor lists.

### Compression

Enable GZIP compression for responses.

## Logging Configuration

Add logging to track errors and debug issues:

```java
import java.util.logging.*;

Logger logger = Logger.getLogger(WebServer.class.getName());
logger.info("Request processed successfully");
logger.severe("Error occurred: " + e.getMessage());
```

## Environment Variables

For production, use environment variables instead of hardcoded credentials:

```java
private static final String url = System.getenv("DB_URL");
private static final String username = System.getenv("DB_USER");
private static final String password = System.getenv("DB_PASS");
```

Set environment variables:
```bash
# Windows
set DB_URL=jdbc:mysql://localhost:3306/hospital
set DB_USER=root
set DB_PASS=yourpassword

# Linux/Mac
export DB_URL=jdbc:mysql://localhost:3306/hospital
export DB_USER=root
export DB_PASS=yourpassword
```

---

For more information, see [README.md](README.md)
