// script.js
let alarms = [];

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const clockElement = document.getElementById('clock');
    clockElement.textContent = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${ampm}`;
}

function setAlarm() {
    const hour = parseInt(document.getElementById('hour').value);
    const minute = parseInt(document.getElementById('minute').value);
    const second = parseInt(document.getElementById('second').value);
    const ampm = document.getElementById('ampm').value;

    const alarmTime = new Date();
    alarmTime.setHours(hour + (ampm === 'PM' && hour < 12 ? 12 : 0)); // Adjust for PM
    alarmTime.setMinutes(minute);
    alarmTime.setSeconds(second);

    alarms.push(alarmTime);
    displayAlarms();

    // Clear input fields
    document.getElementById('hour').value = '';
    document.getElementById('minute').value = '';
    document.getElementById('second').value = '';
}

function deleteAlarm(index) {
    alarms.splice(index, 1);
    displayAlarms();
}

function displayAlarms() {
    const alarmsList = document.getElementById('alarms');
    alarmsList.innerHTML = '';

    alarms.forEach((alarm, index) => {
        const alarmItem = document.createElement('div');
        alarmItem.textContent = `Alarm: ${alarm.getHours()}:${alarm.getMinutes()}:${alarm.getSeconds()} ${alarm.getHours() >= 12 ? 'PM' : 'AM'}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteAlarm(index);

        alarmItem.appendChild(deleteButton);
        alarmsList.appendChild(alarmItem);
    });
}

// Update clock every second
setInterval(updateClock, 1000);
