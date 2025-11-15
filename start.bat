@echo off
REM Hospital Management System - Windows Startup Script

echo ========================================
echo   Hospital Management System
echo ========================================
echo.

REM Check if compiled
if not exist "HospitalManagementSystem\WebServer.class" (
    echo [INFO] Compiling application...
    javac -cp "mysql-connector-j-8.2.0.jar;." -d . src\HospitalManagementSystem\*.java
    if errorlevel 1 (
        echo [ERROR] Compilation failed!
        pause
        exit /b 1
    )
    echo [SUCCESS] Compilation completed!
    echo.
)

echo [INFO] Starting web server...
echo [INFO] Server will be available at http://localhost:8080
echo [INFO] Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

java -cp "mysql-connector-j-8.2.0.jar;." HospitalManagementSystem.WebServerMain

pause
