"use strict"

const display = document.querySelector(".monitor__text"),
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
        display.textContent += current.textContent;
    }

    if (current.id == "Backspace") {
        display.textContent = display.textContent.slice(0, display.textContent.length-1);
    }
    if (current.id == "Space") {
        display.textContent += " ";
    }
    if (current.id == "Enter") display.innerHTML = "";
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