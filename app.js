document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    console.log("🔍 Checking Elements:");
    console.log("menuToggle:", menuToggle);
    console.log("navMenu:", navMenu);

    if (!menuToggle || !navMenu) {
        console.error("⚠️ Menu toggle button or nav menu NOT FOUND. Check your HTML.");
        return;
    }

    // Toggle menu on button click
    menuToggle.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent event from bubbling up
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

    // Ensure script runs correctly
    console.log("✅ JavaScript Loaded Successfully!");
});
