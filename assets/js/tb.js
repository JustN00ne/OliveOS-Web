document.addEventListener("DOMContentLoaded", function() {
    // Get the div by its ID
    var taskbarDiv = document.getElementById("taskbar_main_div");

    // Check if the div exists
    if (taskbarDiv) {
        // Change the "left" value to 0px to trigger the slide-in effect
        taskbarDiv.style.left = "0px";
    }
});
