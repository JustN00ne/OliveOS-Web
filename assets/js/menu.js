document.addEventListener("DOMContentLoaded", function() {
    var taskbarIconFrame = document.getElementById("taskbar_main_icon_frame");
    var taskbarDiv = document.getElementById("taskbar_main_div");

    // Create the close icon frame element
    var closeIconFrame = document.createElement("div");
    closeIconFrame.id = "taskbar_close_icon_frame";
    closeIconFrame.className = "taskbar_close_icon"
    closeIconFrame.innerHTML = "";

    // Append the close icon frame to the taskbar div
    taskbarDiv.appendChild(closeIconFrame);

    if (taskbarIconFrame && taskbarDiv) {
        taskbarIconFrame.addEventListener("click", function() {
            if (taskbarDiv.style.width === "100%") {
                taskbarDiv.style.width = "100px";
                taskbarIconFrame.style.opacity = "1"
                taskbarIconFrame.style.pointerEvents = "all"
                closeIconFrame.style.display = "none"; // Hide the close icon
                taskbarDiv.style.backdropFilter = "blur(20px)"
            } else {
                taskbarIconFrame.style.opacity = "0"
                taskbarDiv.style.width = "100%";
                taskbarDiv.style.opacity = "1";
                taskbarIconFrame.style.pointerEvents = "none"
                closeIconFrame.style.display = "block"; // Show the close icon
                taskbarDiv.style.backdropFilter = "blur(150px)"
            }
        });

        closeIconFrame.addEventListener("click", function() {
            taskbarDiv.style.width = "100px";
            taskbarIconFrame.style.opacity = "1"
            taskbarIconFrame.style.pointerEvents = "all"
            closeIconFrame.style.display = "none"; // Hide the close icon
            taskbarDiv.style.backdropFilter = "blur(20px)"
        });
    }
});
