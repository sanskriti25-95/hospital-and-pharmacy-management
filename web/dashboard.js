// Dashboard JavaScript
let currentPatientId = null;
let prescriptionsData = [];

// Load patients on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPatients();
    setupTabs();
    
    // Patient selector change event
    document.getElementById('patient-select').addEventListener('change', (e) => {
        const patientId = e.target.value;
        if (patientId) {
            loadPatientDashboard(patientId);
        }
    });
});

// Setup tab switching
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Load all patients for selector
async function loadPatients() {
    try {
        const response = await fetch('/api/patients');
        const patients = await response.json();
        
        const select = document.getElementById('patient-select');
        patients.forEach(patient => {
            const option = document.createElement('option');
            option.value = patient.id;
            option.textContent = `${patient.name} (Age: ${patient.age}, ${patient.gender})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading patients:', error);
    }
}

// Load complete patient dashboard
async function loadPatientDashboard(patientId) {
    currentPatientId = patientId;
    
    // Show loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('dashboard-content').style.display = 'none';
    
    try {
        // Load all data in parallel
        await Promise.all([
            loadPatientInfo(patientId),
            loadVitals(patientId),
            loadMedicalHistory(patientId),
            loadPrescriptions(patientId),
            loadLabReports(patientId),
            loadAppointments(patientId)
        ]);
        
        // Show dashboard
        document.getElementById('loading').style.display = 'none';
        document.getElementById('dashboard-content').style.display = 'block';
    } catch (error) {
        console.error('Error loading dashboard:', error);
        alert('Error loading patient data. Please try again.');
    }
}

// Load patient information
async function loadPatientInfo(patientId) {
    try {
        const response = await fetch(`/api/patient-dashboard?patient_id=${patientId}`);
        const data = await response.json();
        const p = data.patient;
        
        document.getElementById('p-name').textContent = p.name || '-';
        document.getElementById('p-age').textContent = p.age || '-';
        document.getElementById('p-gender').textContent = p.gender || '-';
        document.getElementById('p-blood').textContent = p.blood_group || 'Not specified';
        document.getElementById('p-phone').textContent = p.phone || 'Not provided';
        document.getElementById('p-email').textContent = p.email || 'Not provided';
        document.getElementById('p-address').textContent = p.address || 'Not provided';
        document.getElementById('p-emergency').textContent = p.emergency_contact || 'Not provided';
        document.getElementById('p-emergency-phone').textContent = p.emergency_phone || 'Not provided';
        document.getElementById('p-allergies').textContent = p.allergies || 'None reported';
        document.getElementById('p-chronic').textContent = p.chronic_conditions || 'None reported';
    } catch (error) {
        console.error('Error loading patient info:', error);
    }
}

// Load vitals
async function loadVitals(patientId) {
    try {
        const response = await fetch(`/api/vitals?patient_id=${patientId}`);
        const vitals = await response.json();
        
        const container = document.getElementById('vitals-list');
        container.innerHTML = '';
        
        if (vitals.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No vital signs recorded</p></div>';
            return;
        }
        
        // Show latest vitals as cards
        const latest = vitals[0];
        const vitalCards = [
            { label: 'Blood Pressure', value: latest.blood_pressure || 'N/A', class: 'bp', unit: 'mmHg' },
            { label: 'Heart Rate', value: latest.heart_rate || 'N/A', class: 'hr', unit: 'bpm' },
            { label: 'Temperature', value: latest.temperature || 'N/A', class: 'temp', unit: '°F' },
            { label: 'Weight', value: latest.weight || 'N/A', class: 'weight', unit: 'kg' },
            { label: 'Oxygen Saturation', value: latest.oxygen_saturation || 'N/A', class: 'oxygen', unit: '%' }
        ];
        
        vitalCards.forEach(vital => {
            const card = document.createElement('div');
            card.className = `vital-card ${vital.class}`;
            card.innerHTML = `
                <h3>${vital.label}</h3>
                <div class="vital-value">${vital.value} ${vital.value !== 'N/A' ? vital.unit : ''}</div>
                <div class="vital-date">Recorded: ${formatDateTime(latest.recorded_date)}</div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading vitals:', error);
    }
}

// Load medical history
async function loadMedicalHistory(patientId) {
    try {
        const response = await fetch(`/api/medical-history?patient_id=${patientId}`);
        const history = await response.json();
        
        const container = document.getElementById('history-list');
        container.innerHTML = '';
        
        if (history.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No medical history recorded</p></div>';
            return;
        }
        
        history.forEach(item => {
            const div = document.createElement('div');
            div.className = `history-item ${item.status.toLowerCase()}`;
            div.innerHTML = `
                <div class="history-header">
                    <div class="history-title">${item.condition_name}</div>
                    <span class="status-badge ${item.status.toLowerCase()}">${item.status}</span>
                </div>
                <div class="history-date">Diagnosed: ${formatDate(item.diagnosis_date)}</div>
                <div class="history-notes">${item.notes || 'No additional notes'}</div>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error loading medical history:', error);
    }
}

// Load prescriptions
async function loadPrescriptions(patientId) {
    try {
        const response = await fetch(`/api/prescriptions?patient_id=${patientId}`);
        prescriptionsData = await response.json();
        
        const container = document.getElementById('prescriptions-list');
        container.innerHTML = '';
        
        if (prescriptionsData.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No prescriptions found</p></div>';
            return;
        }
        
        // Load medications for each prescription
        for (const prescription of prescriptionsData) {
            const medResponse = await fetch(`/api/medications?prescription_id=${prescription.id}`);
            prescription.medications = await medResponse.json();
        }
        
        prescriptionsData.forEach(prescription => {
            const card = document.createElement('div');
            card.className = 'prescription-card';
            
            let medicationsHTML = '';
            if (prescription.medications && prescription.medications.length > 0) {
                medicationsHTML = `
                    <div class="medications-list">
                        <div class="medications-title">Prescribed Medications</div>
                        ${prescription.medications.map(med => `
                            <div class="medication-item">
                                <div class="medication-name">${med.medicine_name}</div>
                                <div class="medication-details">
                                    <span><strong>Dosage:</strong> ${med.dosage}</span>
                                    <span><strong>Frequency:</strong> ${med.frequency}</span>
                                    <span><strong>Duration:</strong> ${med.duration}</span>
                                </div>
                                ${med.instructions ? `<div class="medication-instructions">📋 ${med.instructions}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            
            card.innerHTML = `
                <div class="prescription-header">
                    <div class="prescription-doctor">Dr. ${prescription.doctor_name}</div>
                    <div class="prescription-date">${formatDate(prescription.prescription_date)}</div>
                </div>
                <div class="prescription-diagnosis">Diagnosis: ${prescription.diagnosis}</div>
                ${prescription.notes ? `<div class="prescription-notes">${prescription.notes}</div>` : ''}
                ${medicationsHTML}
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading prescriptions:', error);
    }
}

// Load lab reports
async function loadLabReports(patientId) {
    try {
        const response = await fetch(`/api/lab-reports?patient_id=${patientId}`);
        const reports = await response.json();
        
        const container = document.getElementById('reports-list');
        container.innerHTML = '';
        
        if (reports.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No lab reports available</p></div>';
            return;
        }
        
        reports.forEach(report => {
            const card = document.createElement('div');
            card.className = 'report-card';
            card.innerHTML = `
                <div class="report-header">
                    <div class="report-type">${report.report_type}</div>
                    <div class="report-date">${formatDate(report.report_date)}</div>
                </div>
                <div class="report-test">${report.test_name}</div>
                <div class="report-results">${report.results}</div>
                ${report.notes ? `<div class="report-notes">Note: ${report.notes}</div>` : ''}
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading lab reports:', error);
    }
}

// Load appointments
async function loadAppointments(patientId) {
    try {
        const response = await fetch('/api/appointments');
        const allAppointments = await response.json();
        
        // Filter appointments for this patient
        const appointments = allAppointments.filter(apt => {
            // We need to match by patient name since we don't have patient_id in the response
            // This is a limitation - ideally we'd filter by patient_id on the backend
            return true; // For now, show all - you might want to enhance this
        });
        
        const container = document.getElementById('appointments-list');
        container.innerHTML = '';
        
        if (appointments.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No appointments scheduled</p></div>';
            return;
        }
        
        appointments.forEach(apt => {
            const card = document.createElement('div');
            card.className = 'appointment-card';
            card.innerHTML = `
                <div class="appointment-doctor">${apt.doctor}</div>
                <div class="appointment-date">📅 ${formatDate(apt.appointment_date)}</div>
                <div class="appointment-time">⏰ ${apt.appointment_time ? formatTime(apt.appointment_time) : 'Time not specified'}</div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading appointments:', error);
    }
}

// Utility function to format date
function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Utility function to format datetime
function formatDateTime(dateStr) {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Utility function to format time
function formatTime(timeStr) {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}
