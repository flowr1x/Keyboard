"use strict"

const displayText = document.querySelector(".monitor__text"),
      display = document.querySelector("monitor__display"),
      keyboard = document.querySelector(".keyboard"),
      shift = Array.from(document.querySelectorAll("[data-shift]")),
      capsLock = Array.from(document.querySelectorAll("[data-symbol]")),
      arrayOriginShift = [];

const arrayShift = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
 '_', '+', '{', '}', '|', ':', '"', '<', '>', '?'];

for (let el of shift) {
    arrayOriginShift.push(el.innerHTML);
}

let isCapsLock = false,
    isShift = false;

function onKeyDown(event) {
    let current = document.getElementById(event.code);
    if (!current) return;
    
    current.classList.add("active");

    if (event.code == "CapsLock") {
        isCapsLock = !isCapsLock;
        onCapsLock(isCapsLock);
    }

    if (event.shiftKey) {
        isShift = true;
        for (let i = 0; i < arrayShift.length; i++) {
            shift[i].innerHTML = arrayShift[i];
        }
        onCapsLock(!isCapsLock);
    }

    if (shift.includes(current) || capsLock.includes(current)) {
        displayText.innerHTML += current.innerHTML;
    }

    if (current.id == "Backspace") {
        displayText.innerHTML = displayText.innerHTML.slice(0, -1);
    }

    if (current.id == "Space") {
        displayText.innerHTML += "&#x2007;";
    }
    
    if (current.id == "Enter") addEnter();

    if (displayText.offsetWidth >= 435)  {
        if (current.id == "Backspace") 
            displayText.innerHTML = displayText.innerHTML.slice(0, -1);
        else addEnter();
    }  
}  
function addEnter() {
    displayText.innerHTML += "<br>";
}
function onKeyUp(event) {
    let current = document.getElementById(event.code);
    if (!current) return;

    if (isShift && !event.shiftKey) {
        isShift = false;

        for (let i = 0; i < arrayOriginShift.length; i++) {
            shift[i].innerHTML = arrayOriginShift[i];
        }

        onCapsLock(isCapsLock);
    }

    current.classList.remove("active");
}

function onCapsLock(isPress) {
    if (isPress) {
        capsLock.forEach(el => el.innerHTML = el.innerHTML.toUpperCase());
    } else {
        capsLock.forEach(el => el.innerHTML = el.innerHTML.toLowerCase());
    }
}

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.addEventListener("click", () => displayText.innerHTML = "");
keyboard.onmousedown = () => false;

// Theme black or white
const toggle = document.querySelector(".toggle");
toggle.addEventListener("click", function(event) {
    let current = this.firstElementChild;
    
    document.body.classList.toggle("_active");
    current.classList.toggle("toggle__active");

});