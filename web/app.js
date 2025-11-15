// Simple frontend logic using fetch (form-encoded requests)

function qs(sel){return document.querySelector(sel)}

async function fetchJson(url){
  const r = await fetch(url);
  return r.json();
}

function setActive(tab){
  document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
  tab.classList.add('active');
  const t = tab.id;
  qs('#patients-section').classList.toggle('hidden', t!=='tab-patients');
  qs('#doctors-section').classList.toggle('hidden', t!=='tab-doctors');
  qs('#appointments-section').classList.toggle('hidden', t!=='tab-appointments');
}

async function loadDoctors(){
  const container = qs('#doctors-list');
  container.innerHTML = '<div class="loading" style="margin: 20px auto;"></div>';
  try {
    const list = await fetchJson('/api/doctors');
    container.innerHTML = '';
    const sel = qs('#a-doctor'); sel.innerHTML='';
    if(list.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">—</div>No doctors found</div>';
      return;
    }
    list.forEach((d, idx)=>{
      const el = document.createElement('div'); 
      el.className='card doctor-card';
      el.style.animationDelay = `${idx * 0.1}s`;
      let details = `<div class="card-title">${d.name}</div>
                     <div class="card-detail">${d.specialization}</div>`;
      if(d.cabin) details += `<div class="card-meta">${d.cabin}</div>`;
      if(d.timing) details += `<div class="card-meta">${d.timing}</div>`;
      if(d.experience) details += `<div class="card-meta">${d.experience} years experience</div>`;
      if(d.phone) details += `<div class="card-meta">${d.phone}</div>`;
      el.innerHTML = details;
      container.appendChild(el);
      const opt = document.createElement('option'); opt.value = d.id; opt.textContent = d.name + ' ('+d.specialization+')'; sel.appendChild(opt);
    });
  } catch(e) {
    container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">!</div>Error loading doctors</div>';
  }
}

async function loadPatients(){
  const container = qs('#patients-list');
  container.innerHTML = '<div class="loading" style="margin: 20px auto;"></div>';
  try {
    const list = await fetchJson('/api/patients');
    container.innerHTML = '';
    const sel = qs('#a-patient'); sel.innerHTML='';
    if(list.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">—</div>No patients yet</div>';
      return;
    }
    list.forEach((p, idx)=>{
      const el = document.createElement('div'); 
      el.className='card';
      el.style.animationDelay = `${idx * 0.1}s`;
      el.innerHTML = `<div class="card-title">${p.name}</div><div class="card-detail">Age ${p.age} • ${p.gender}</div>`;
      container.appendChild(el);
      const opt = document.createElement('option'); opt.value = p.id; opt.textContent = p.name + ' (Age '+p.age+')'; sel.appendChild(opt);
    });
  } catch(e) {
    container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">!</div>Error loading patients</div>';
  }
}

async function loadAppointments(){
  const container = qs('#appointments-list');
  container.innerHTML = '<div class="loading" style="margin: 20px auto;"></div>';
  try {
    const list = await fetchJson('/api/appointments');
    container.innerHTML='';
    if(list.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">—</div>No appointments booked</div>';
      return;
    }
    list.forEach((a, idx)=>{
      const el = document.createElement('div'); 
      el.className='card';
      el.style.animationDelay = `${idx * 0.1}s`;
      const timeStr = a.appointment_time ? ` at ${formatTime(a.appointment_time)}` : '';
      el.innerHTML = `<div class="card-title">${a.patient} → ${a.doctor}</div><div class="card-detail">${a.appointment_date}${timeStr}</div>`;
      container.appendChild(el);
    });
  } catch(e) {
    container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">!</div>Error loading appointments</div>';
  }
}

function formatTime(time){
  if(!time) return '';
  const parts = time.split(':');
  if(parts.length < 2) return time;
  let hour = parseInt(parts[0]);
  const min = parts[1];
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${min} ${ampm}`;
}

async function addPatient(){
  const name = qs('#p-name').value.trim();
  const age = qs('#p-age').value.trim();
  const gender = qs('#p-gender').value;
  if(!name) return alert('Enter name');
  const body = `name=${encodeURIComponent(name)}&age=${encodeURIComponent(age)}&gender=${encodeURIComponent(gender)}`;
  const r = await fetch('/api/patients',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body});
  const j = await r.json();
  if(j.status==='ok' || j.id){
    qs('#p-name').value='';qs('#p-age').value='';
    await loadPatients();
    alert('Patient added');
  } else alert('Failed');
}

async function bookAppointment(){
  const pid = qs('#a-patient').value;
  const did = qs('#a-doctor').value;
  const date = qs('#a-date').value;
  const time = qs('#a-time').value;
  if(!pid||!did||!date||!time) return alert('Please fill all fields');
  const body = `patient_id=${encodeURIComponent(pid)}&doctor_id=${encodeURIComponent(did)}&appointment_date=${encodeURIComponent(date)}&appointment_time=${encodeURIComponent(time)}`;
  const r = await fetch('/api/appointments',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body});
  const j = await r.json();
  const msg = qs('#appointment-message');
  msg.className = 'message';
  msg.style.display = 'block';
  if(j.status==='ok'){
    msg.textContent= j.message || 'Appointment booked successfully';
    msg.classList.add('success');
    await loadAppointments();
    qs('#a-date').value = '';
  } else if(j.status==='slot_full'){
    msg.textContent= j.message || 'This time slot is fully booked. Please choose another time.';
    msg.classList.add('error');
  } else if(j.status==='doctor_busy'){
    msg.textContent= j.message || 'Doctor is fully booked for this day. Please select another date.';
    msg.classList.add('error');
  } else if(j.status==='unavailable'){
    msg.textContent='Doctor not available at this time';
    msg.classList.add('error');
  } else {
    msg.textContent= j.message || 'Failed to book appointment';
    msg.classList.add('error');
  }
}

// wire up
window.addEventListener('DOMContentLoaded', async ()=>{
  qs('#tab-patients').addEventListener('click',e=>setActive(e.target));
  qs('#tab-doctors').addEventListener('click',e=>setActive(e.target));
  qs('#tab-appointments').addEventListener('click',e=>setActive(e.target));
  qs('#add-patient').addEventListener('click', addPatient);
  qs('#book-appointment').addEventListener('click', bookAppointment);
  await loadDoctors();
  await loadPatients();
  await loadAppointments();
});
