document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const homeButton = document.querySelector('.home-button'); // Home button for PC

    console.log("🔍 Checking Elements:");
    console.log("menuToggle:", menuToggle);
    console.log("navMenu:", navMenu);
    console.log("homeButton:", homeButton);

    if (!menuToggle || !navMenu) {
        console.error("⚠️ Menu toggle button or nav menu NOT FOUND. Check your HTML.");
        return;
    }

    // Function to check screen size and toggle menu visibility
    function updateMenuVisibility() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = "block"; // Show hamburger on mobile
            homeButton.style.display = "none"; // Hide Home button on mobile
        } else {
            menuToggle.style.display = "none"; // Hide hamburger on PC
            homeButton.style.display = "block"; // Show Home button on PC
            navMenu.classList.remove('nav-active'); // Ensure menu is closed on PC
        }
    }

    // Run function on load and resize
    updateMenuVisibility();
    window.addEventListener("resize", updateMenuVisibility);

    // Toggle menu on button click
    menuToggle.addEventListener('click', function (event) {
        event.stopPropagation();
        console.log("🍔 Menu button clicked!");
        navMenu.classList.toggle('nav-active');
        menuToggle.classList.toggle('active');

        // Change icon from ☰ to ✖ when menu is active
        menuToggle.innerHTML = navMenu.classList.contains('nav-active') ? "✖" : "☰";
    });

    // Close menu when clicking a menu link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('nav-active');
            menuToggle.classList.remove('active');
            menuToggle.innerHTML = "☰"; // Reset to burger icon
            console.log("🔗 Menu link clicked. Menu closed.");
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove('nav-active');
            menuToggle.classList.remove('active');
            menuToggle.innerHTML = "☰"; // Reset to burger icon
            console.log("🖱️ Clicked outside menu. Menu closed.");
        }
    });

    console.log("✅ JavaScript Loaded Successfully!");
});
