#!/bin/bash
# Hospital Management System - Linux/Mac Startup Script

echo "========================================"
echo "  Hospital Management System"
echo "========================================"
echo ""

# Check if compiled
if [ ! -f "HospitalManagementSystem/WebServer.class" ]; then
    echo "[INFO] Compiling application..."
    javac -cp "mysql-connector-j-8.2.0.jar:." -d . src/HospitalManagementSystem/*.java
    if [ $? -ne 0 ]; then
        echo "[ERROR] Compilation failed!"
        exit 1
    fi
    echo "[SUCCESS] Compilation completed!"
    echo ""
fi

echo "[INFO] Starting web server..."
echo "[INFO] Server will be available at http://localhost:8080"
echo "[INFO] Press Ctrl+C to stop the server"
echo ""
echo "========================================"
echo ""

java -cp "mysql-connector-j-8.2.0.jar:." HospitalManagementSystem.WebServerMain
