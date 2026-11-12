
var contactForm = document.getElementById("contact-form");
var nameInput = document.getElementById("cname");
var emailInput = document.getElementById("cemail");
var messageInput = document.getElementById("message");
var topicSelect = document.getElementById("topic");
var sendButton = document.getElementById("send-btn");

var nameHint = document.getElementById("name-hint");
var emailHint = document.getElementById("email-hint");
var countHint = document.getElementById("count-hint");

var modal = document.getElementById("thanks-modal");
var modalText = document.getElementById("modal-text");
var modalClose = document.getElementById("modal-close");
var toast = document.getElementById("toast");


function nameOk() {
    return nameInput.value.trim().length >= 3;
}

function emailOk() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
}

function messageOk() {
    return messageInput.value.trim().length >= 10;
}

function checkForm() {
    var allOk = nameOk() && emailOk() && messageOk();

    nameHint.textContent = (!nameOk() && nameInput.value !== "") ? "Name needs at least 3 letters." : "";
    emailHint.textContent = (!emailOk() && emailInput.value !== "") ? "Please enter a valid email." : "";
    countHint.textContent = messageInput.value.length + " / 200 letters (minimum 10)";
    countHint.classList.toggle("warn", messageInput.value.length >= 180);

    sendButton.disabled = !allOk;
    sendButton.classList.toggle("ready", allOk); // makes the button pulse
}

contactForm.addEventListener("input", checkForm);

contactForm.addEventListener("reset", function () {
    // wait until the form is really cleared, then check again
    setTimeout(checkForm, 0);
});



function shakeIfWrong(input, isOk) {
    input.addEventListener("blur", function () {
        if (input.value !== "" && !isOk()) {
            input.classList.add("shake");
        }
    });
    input.addEventListener("animationend", function () {
        input.classList.remove("shake");
    });
}

shakeIfWrong(nameInput, nameOk);
shakeIfWrong(emailInput, emailOk);
shakeIfWrong(messageInput, messageOk);



function openModal(text) {
    modalText.textContent = text;
    modal.classList.add("open");
    modalClose.focus();
}

function closeModal() {
    modal.classList.remove("open");
}

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var visitorName = nameInput.value.trim();
    var topicText = topicSelect.options[topicSelect.selectedIndex].text;

    contactForm.reset();
    openModal("Thank you, " + visitorName + "! We got your message (" + topicText + "). We will reply soon.");
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", function (event) {
    if (event.target === modal) {   // click on the dark background
        closeModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});



setTimeout(function () {
    toast.classList.add("show");
}, 1000);

setTimeout(function () {
    toast.classList.remove("show");
}, 6000);

toast.addEventListener("click", function () {
    toast.classList.remove("show");
});



var boxes = document.querySelectorAll(".content-box");

for (var i = 0; i < boxes.length; i++) {
    boxes[i].classList.add("reveal");
}

if (typeof IntersectionObserver === "undefined") {
    // very old browser: just show everything
    for (var j = 0; j < boxes.length; j++) {
        boxes[j].classList.add("show");
    }
} else {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    for (var k = 0; k < boxes.length; k++) {
        observer.observe(boxes[k]);
    }
}


checkForm();