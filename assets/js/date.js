function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    document.getElementById("taskbar_time").textContent = formattedTime;
}

function updateDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = now.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    document.getElementById("taskbar_date").textContent = formattedDate;
}

// Update the time and date immediately and then every second
updateTime();
updateDate();
setInterval(updateTime, 1000);
setInterval(updateDate, 1000 * 60 * 60 * 24); // Update date every 24 hours