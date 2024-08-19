var input = document.getElementById("capslock");
var input1 = document.getElementById("password")
var text = document.getElementById("CapsLockWarn");
input.addEventListener("keyup", function(event) {


if (event.getModifierState("CapsLock")) {
    text.style.opacity = "1";
    text.style.scale = "100%"
  } else {
    text.style.opacity = "0"
    text.style.scale = "75%"
  }
});

input1.addEventListener("keyup", function(event) {


    if (event.getModifierState("CapsLock")) {
        text.style.opacity = "1";
        text.style.scale = "100%"
      } else {
        text.style.opacity = "0"
        text.style.scale = "75%"
      }
    });