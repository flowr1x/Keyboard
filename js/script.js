"use strict"

let current;
document.addEventListener("keydown", function(event) {
    console.log(event.key + ":  " + event.code);
    current = document.getElementById(event.code);
    if (!current) return;
    current.classList.toggle("active");
})

document.addEventListener("keyup", function(event) {
    current = document.getElementById(event.code);
    if (!current) return;

    current.classList.toggle("active");
})