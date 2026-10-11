let count = Number(localStorage.getItem("visitors") || 0);

if (!localStorage.getItem("visitorCounted")) {
    count++;
    localStorage.setItem("visitors", count);
    localStorage.setItem("visitorCounted", "true");
}

document.getElementById("visitorCount").textContent = count;
let locationText = "Detecting location...";
function addZero(n) {
    if (n < 10) {
        return "0" + n;
    }
    return n;
}
function updateTicker() {
let now = new Date();
let dateString = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
let timestring = addZero(now.getHours()) + ":" + addZero(now.getMinutes()) + ":" + addZero(now.getSeconds());
  document.getElementById("ticker").textContent =
        "Date:" + dateString + "| Time:" +timestring + "| Location: " + locationText;
}
updateTicker();

setInterval(updateTicker,1000);
const savedLocation = localStorage.getItem("userLocation");

if (savedLocation) {
    locationText = savedLocation;
} else {
    navigator.geolocation.getCurrentPosition(function(position) {
        locationText = "Lat " + position.coords.latitude + ", Lon " + position.coords.longitude;
        localStorage.setItem("userLocation", locationText);
    },
    function(error) {
        locationText = "Location not available";
    });
}

const navLinks = document.querySelectorAll(".nav-link");
const currentPage = window.location.pathname.split("/").pop();
navLinks.forEach(function (link) {
    const linkPage = link.getAttribute("href").split("#")[0];
    if (linkPage === currentPage) {
        link.classList.add("active-link");
    }
});
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.forEach(function (l) {
            l.classList.remove("active-link");
        });
        link.classList.add("active-link");
    });
});

const form = document.querySelector("#queries form");
if (form) {
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name= document.getElementById("name").value.trim();
    const email= document.getElementById("email").value.trim();
    const subject= document.getElementById("subject").value.trim();
    const message= document.getElementById("message").value.trim();
    if(name===""|| email===""|| subject===""|| message==="" ){
        alert("Please fill in all fields.");
        return;
    }
    if(!email.includes("@") || !email.includes(".")){
        alert("Please enter a valid email address.");
        return;
    }
    alert("Thank You! Your Message Has Been Submitted.");
    form.reset();
})};

function setNavbarHeight() {
    const navbar = document.querySelector(".navbar");
    document.documentElement.style.setProperty("--navbar-height", navbar.offsetHeight + "px");
}
setNavbarHeight();
window.addEventListener("load", setNavbarHeight);
window.addEventListener("resize", setNavbarHeight);